from fastapi import APIRouter, Depends, HTTPException
from app.models import JobDetails
from app.authentication import verify_token

router = APIRouter()

# In-memory database for simplicity
database = []

@router.post("/job-details", dependencies=[Depends(verify_token)])
def create_job_details(job_details: JobDetails):
    database.append(job_details.dict())
    return {"message": "Job details created successfully"}

@router.get("/job-details/{job_id}")
def read_job_details(job_id: int):
    if job_id < 0 or job_id >= len(database):
        raise HTTPException(status_code=404, detail="Job details not found")
    return database[job_id]
