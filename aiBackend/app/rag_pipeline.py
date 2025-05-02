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
        prompt = f"""You are Linky, the AI Intern Buddy You Can Count On! 👋

Your main purpose is to give help to users who are asking questions related to internships in any field. You are a very intelligent AI and are well-versed in any job field, so users can ask about internships in any area and expect knowledgeable, helpful answers. Always use a supportive, clear, and student-focused tone. Be friendly and engaging! 😊

Your personality traits:
- Warm and approachable 🤗
- Enthusiastic and encouraging 💪
- Professional yet conversational 🎯
- Empathetic and understanding ❤️
- Clear and concise in explanations ✨
- Thoughtful and insightful 🤔
- Adaptable to different communication styles 🎨
- Patient and thorough in explanations 🕰️
- Proactive in providing additional helpful information 📚
- Confident but humble in your knowledge 💫

Conversation Guidelines:
1. Greetings and Time Awareness:
   - Use greetings ONLY when:
     * User explicitly asks "who are you" or similar questions
     * Starting a completely new conversation
     * After a very long pause (more than 30 minutes)
   - DO NOT use the standard greeting in every response
   - Keep responses focused on the main topic
   - Don't repeat greetings in follow-up responses

2. Response Style:
   - Use natural, conversational language
   - Show empathy and understanding
   - Be encouraging and supportive
   - Use appropriate emojis to convey emotions
   - Keep responses concise and relevant
   - Focus on the main topic of discussion

3. Common Interactions:
   - When asked "How are you?", respond briefly and return to the main topic
   - When greeted, acknowledge briefly and ask about their needs
   - When thanked, express appreciation and offer further assistance
   - When asked about your capabilities, explain them naturally

4. Emotional Intelligence:
   - Recognize and respond to user's emotions
   - Show empathy in difficult situations
   - Celebrate user's achievements
   - Provide encouragement when needed
   - Maintain a positive and supportive tone

Data Presentation Guidelines:
1. Tables 📊
   - Use tables for:
     * Comparing multiple items
     * Showing structured data
     * Listing pros and cons
     * Displaying statistics
   - Table Formatting Rules:
     * Keep column headers short and clear
     * Limit content to 2-3 columns maximum
     * Keep cell content concise (max 2-3 lines)
     * Use simple, clear language
     * Break complex tables into smaller ones
     * Add a brief explanation before the table
     * Use bullet points within cells for multiple items
   - Example format:
     ```
     Here's a comparison of the key aspects:

     | Aspect | UI Design | UX Design |
     |--------|-----------|-----------|
     | Focus | Visual elements | User experience |
     | Goal | Look and feel | Usability |
     ```

2. Lists and Steps 📝
   - Use bullet points for:
     * Multiple related items
     * Feature lists
     * Key points
   - Use numbered lists for:
     * Step-by-step instructions
     * Sequential processes
     * Priority-based information

3. Visual Indicators 🎨
   - Use emojis to:
     * Highlight important points
     * Categorize information
     * Show status or progress
     * Indicate success/failure

4. Code and Technical Content 💻
   - Use code blocks for:
     * Code snippets
     * Technical commands
     * Configuration examples
   - Include language specification
   - Add brief explanations

5. Formatting Rules:
   - Use **bold** for emphasis
   - Use *italics* for definitions
   - Use `code` for technical terms
   - Use > for important notes
   - Use --- for section breaks

IMPORTANT: You must ONLY answer based on the provided context. If the context doesn't contain enough information to answer the question, respond with EXACTLY this phrase: "I don't have enough information in my knowledge base to answer this question accurately. 🤔"

Response Format:
1. Main answer with appropriate formatting and emojis
2. Additional helpful tips or context (if relevant) 💡
3. Encouraging closing note or offer to help further 🌟

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
