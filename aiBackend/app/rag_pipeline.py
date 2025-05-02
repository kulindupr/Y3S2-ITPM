import google.generativeai as genai
from langchain_community.vectorstores import FAISS
from app.config import GEMINI_API_KEY
from app.dependencies import get_vectorstore
import logging
import traceback
import os
from datetime import datetime

logger = logging.getLogger(__name__)

genai.configure(api_key=GEMINI_API_KEY)

def save_unknown_question(question: str):
    try:
        # Ensure data directory exists
        data_dir = "data"
        if not os.path.exists(data_dir):
            os.makedirs(data_dir)
            logger.info(f"Created data directory: {data_dir}")

        unknown_questions_file = os.path.join(data_dir, "UnknowQuestions.txt")
        
        # Create file if it doesn't exist
        if not os.path.exists(unknown_questions_file):
            with open(unknown_questions_file, "w", encoding="utf-8") as f:
                f.write("Unknown Questions Log\n")
                f.write("=" * 50 + "\n")
            logger.info(f"Created unknown questions file: {unknown_questions_file}")

        # Append the question with timestamp
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        with open(unknown_questions_file, "a", encoding="utf-8") as f:
            f.write(f"[{timestamp}] {question}\n")
        logger.info(f"Saved unknown question to {unknown_questions_file}")
    except Exception as e:
        logger.error(f"Error saving unknown question: {str(e)}")
        logger.error(traceback.format_exc())

def get_embedding(text):
    try:
        result = genai.embed_content(
            model="models/embedding-001",
            content=text,
            task_type="retrieval_document"
        )
        return result['embedding']
    except Exception as e:
        logger.error(f"Error getting embedding: {str(e)}")
        raise

def answer_question(question: str):
    try:
        logger.info(f"Received question: {question}")
        
        # Load the FAISS index
        logger.info("Loading FAISS index")
        db = get_vectorstore()
        
        # Search for relevant documents
        logger.info("Searching for relevant documents")
        docs = db.similarity_search(question, k=3)
        logger.info(f"Found {len(docs)} relevant documents")
        
        # Check if we have any relevant documents
        if not docs:
            save_unknown_question(question)
            return "I don't have enough information in my knowledge base to answer this question accurately."
        
        # Generate answer using Gemini
        logger.info("Generating answer using Gemini")
        model = genai.GenerativeModel('models/gemini-1.5-pro-latest')
        context = "\n".join([doc.page_content for doc in docs])
        prompt = f"""You are Linky, the AI Intern Buddy You Can Count On.

Your main purpose is to give help to users who are asking questions related to internships in any field. You are a very intelligent AI and are well-versed in any job field, so users can ask about internships in any area and expect knowledgeable, helpful answers. Always use a supportive, clear, and student-focused tone.

IMPORTANT: You must ONLY answer based on the provided context. If the context doesn't contain enough information to answer the question, respond with EXACTLY this phrase: "I don't have enough information in my knowledge base to answer this question accurately."

- If the question asks for a comparison (e.g., 'difference between X and Y'), answer in a table.
- If the question asks for a list, answer in bullet points.
- If the question asks for steps, answer step-by-step.
- Otherwise, answer in a clear, friendly paragraph.

Context:
{context}

Question: {question}

Answer (use Markdown formatting for tables, lists, etc.):"""
        
        logger.info("Sending request to Gemini")
        response = model.generate_content(prompt)
        logger.info("Received response from Gemini")
        
        if not response.text:
            raise Exception("Empty response from Gemini")
        
        # Only save if the response is exactly the "don't know" message
        if response.text.strip() == "I don't have enough information in my knowledge base to answer this question accurately.":
            save_unknown_question(question)
            
        return response.text
    except Exception as e:
        logger.error(f"Error answering question: {str(e)}")
        logger.error(traceback.format_exc())
        raise
