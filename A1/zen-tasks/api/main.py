from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Hello from Python Backend!"}

@app.post("/analyze-tasks")
def analyze_tasks(tasks: list):
    # ML Placeholder: Suggest priority based on keywords
    return {"priority_suggestion": "high"}

