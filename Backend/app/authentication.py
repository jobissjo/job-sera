# Import necessary modules
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from typing import Optional
from dotenv import load_dotenv
from pydantic import BaseModel
import os
from datetime import datetime, timedelta
from app.database import SessionLocal
from app.models import User
from sqlalchemy.orm import Session
from passlib.context import CryptContext

# Create an instance of the APIRouter
router = APIRouter()

# Load environment variables from .env
load_dotenv()

# Read environment variables
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 30))

# Create a CryptContext instance
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# Define response model for registration
class UserRegistrationResponse(BaseModel):
    message: str


# Define a function to get the database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Define response model for login
class Token(BaseModel):
    access_token: str
    token_type: str


# Define response model for token data
class TokenData(BaseModel):
    username: Optional[str] = None


# Create an instance of OAuth2PasswordBearer
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


# Define a function to verify the access token
def verify_token(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        return TokenData(username=username)
    except JWTError:
        raise credentials_exception


# Define a function to create an access token
def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    data.update({"exp": expire})
    encoded_jwt = jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


# Define route for generating access token
@router.post("/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    db = SessionLocal()
    try:
        user = db.query(User).filter(User.username == form_data.username).first()
        if user and pwd_context.verify(form_data.password, user.password):
            access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
            access_token = create_access_token(data={"sub": user.username}, expires_delta=access_token_expires)
            return {"access_token": access_token, "token_type": "bearer"}
        else:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid credentials",
                headers={"WWW-Authenticate": "Bearer"},
            )
    finally:
        db.close()


# Define route for user registration
@router.post("/register", response_model=None)
async def register_user(user: User, db: Session = Depends(get_db)):
    try:
        # Check if the username or email already exists in the database
        existing_user = db.query(User).filter(
            (User.username == user.username) | (User.email == user.email)
        ).first()
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Username or email already registered",
            )

        # Hash the user's password
        hashed_password = pwd_context.hash(user.password)
        user.password = hashed_password

        # Store the user details in the SQLite database
        db.add(user)
        db.commit()

        # Return a message indicating successful registration
        return {"message": f"User {user.username} has been registered successfully"}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal Server Error",
        )
