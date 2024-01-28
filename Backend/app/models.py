from pydantic import BaseModel
from typing import List
from sqlalchemy import Column, Integer, String
from app.database import Base

class JobDetails(BaseModel):
    title: str
    companyName: str
    experience: str
    qualifications: List[str]
    salary: str
    location: str
    jobType: str
    shift: str
    description: List[str]
    additionalDetails: List[str] = []



class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, index=True)
    email = Column(String, index=True)
    password = Column(String)
