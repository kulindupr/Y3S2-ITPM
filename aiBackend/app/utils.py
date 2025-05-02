import os
from langchain_community.document_loaders import TextLoader, PyPDFLoader
import logging

logger = logging.getLogger(__name__)

def load_documents_from_folder(folder_path):
    docs = []
    if not os.path.exists(folder_path):
        logger.error(f"Document folder {folder_path} does not exist")
        raise FileNotFoundError(f"Document folder {folder_path} does not exist")
        
    for file in os.listdir(folder_path):
        try:
            full_path = os.path.join(folder_path, file)
            if file.endswith('.txt'):
                loader = TextLoader(full_path)
            elif file.endswith('.pdf'):
                loader = PyPDFLoader(full_path)
            else:
                logger.info(f"Skipping unsupported file: {file}")
                continue
                
            loaded_docs = loader.load()
            # Filter out empty documents
            valid_docs = [doc for doc in loaded_docs if doc.page_content.strip()]
            if not valid_docs:
                logger.warning(f"No valid content found in file: {file}")
                continue
                
            docs.extend(valid_docs)
            logger.info(f"Successfully loaded {len(valid_docs)} documents from {file}")
            
        except Exception as e:
            logger.error(f"Error loading file {file}: {str(e)}")
            continue
            
    if not docs:
        logger.error("No valid documents found in the folder")
        raise ValueError("No valid documents found in the folder")
        
    return docs
