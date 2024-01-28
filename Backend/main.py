from fastapi import FastAPI
from app import main, authentication

app = FastAPI()

app.include_router(main.router)
app.include_router(authentication.router)
