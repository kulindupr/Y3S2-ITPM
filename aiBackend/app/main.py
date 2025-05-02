from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse, JSONResponse
from app.models import QueryRequest
from app.rag_pipeline import answer_question
from app.dependencies import load_vectorstore
import logging
import asyncio

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Templates directory
templates = Jinja2Templates(directory="app/static")

@app.on_event("startup")
async def startup():
    logger.info("Starting up application")
    try:
        # Run the synchronous load_vectorstore in a thread pool
        await asyncio.get_event_loop().run_in_executor(None, load_vectorstore)
        logger.info("Vectorstore loaded successfully")
    except Exception as e:
        logger.error(f"Error loading vectorstore: {str(e)}")
        raise

@app.get("/", response_class=HTMLResponse)
async def read_root(request: Request):
    logger.info("Serving frontend")
    return templates.TemplateResponse("index.html", {"request": request})

@app.post("/ask")
async def ask_question(query: QueryRequest):
    logger.info(f"Received question: {query.question}")
    try:
        # Run the synchronous answer_question in a thread pool
        response = await asyncio.get_event_loop().run_in_executor(
            None, answer_question, query.question
        )
        logger.info("Question answered successfully")
        return JSONResponse(content={"answer": response})
    except Exception as e:
        logger.error(f"Error processing question: {str(e)}")
        return JSONResponse(
            status_code=500,
            content={"answer": f"Error: {str(e)}"}
        )
