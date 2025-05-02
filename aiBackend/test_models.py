import google.generativeai as genai
from app.config import GEMINI_API_KEY

genai.configure(api_key=GEMINI_API_KEY)

def list_models():
    try:
        models = genai.list_models()
        print("Available models:")
        for model in models:
            print(f"Name: {model.name}")
            print(f"Supported methods: {model.supported_generation_methods}")
            print("---")
    except Exception as e:
        print(f"Error: {str(e)}")

if __name__ == "__main__":
    list_models() 