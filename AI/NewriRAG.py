from typing import Any
from langchain_community.vectorstores import FAISS
from langchain_community.vectorstores.utils import DistanceStrategy
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.document_loaders import PyPDFDirectoryLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter

class NewriRAG():
    def __init__(self):
        self. embedding_model = HuggingFaceEmbeddings(
            model_name='jhgan/ko-sbert-nli',
            model_kwargs={'device':'cpu'},
            encode_kwargs={'normalize_embeddings':True},
        )
        self.vector_db = None


    def save_vectorstore(self, doc_path, db_path):
        loader = PyPDFDirectoryLoader(doc_path)
        documents = loader.load()
        text_splitter = RecursiveCharacterTextSplitter(chunk_size = 100, chunk_overlap = 50)
        texts = text_splitter.split_documents(documents)
        self.vector_db = FAISS.from_documents(texts,
                                        embedding = self.embedding_model,
                                        distance_strategy = DistanceStrategy.COSINE
                                        )
        # save db
        self.vector_db.save_local(db_path)


    def load_vectorstore(self, db_path):
        # load db
        self.vector_db = FAISS.load_local(db_path, self.embedding_model)


    def inqurey(self):
        query = "신장질환이 있는 경우 조심해야하는 식재료와 추천하는 식재료 알려줘"
        if self.vector_db is None:
            print("Error : No database connection")
            return
        docs = self.vector_db.max_marginal_relevance_search(query, k=4, fetch_k=10)
        print(docs)


rag = NewriRAG()
rag.save_vectorstore("./", './db/faiss/dietary_guidelines')
rag.inqurey()
    