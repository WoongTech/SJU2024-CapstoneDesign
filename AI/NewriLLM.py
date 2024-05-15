from langchain_community.chat_models import ChatOllama
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate

from langchain_community.vectorstores import FAISS
from langchain_community.vectorstores.utils import DistanceStrategy
from langchain_community.embeddings import HuggingFaceEmbeddings

from langchain_community.document_loaders import PyPDFDirectoryLoader
from langchain_community.document_loaders.csv_loader import CSVLoader

from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_core.runnables import RunnablePassthrough
from langchain.retrievers.multi_query import MultiQueryRetriever

import pandas as pd
import json
import time

class NewriLLM():
    def __init__(self):
        # Base LLM : yanolja/EEVE
        self.llm = ChatOllama(model="eeve:latest")
        # RAG Embedding Model
        self.embedding_model = HuggingFaceEmbeddings(
            model_name='bespin-global/klue-sroberta-base-continue-learning-by-mnr',
            model_kwargs={'device':'cpu'},
            encode_kwargs={'normalize_embeddings':True},
        )
        #Vector DB
        self.vector_db = None

        # Testing Data
        self.dri = """Total Water (L/d)	Carbohydrate (g/d)	Total Fiber (g/d)	Fat (g/d)	Protein (g/d)	Vitamin A (μg/d)	Vitamin C (mg/d)	Vitamin D (μg/d)	Thiamin (mg/d)	Riboflavin (mg/d)	Niacin (mg/d)	Calcium (mg/d)	Iron (mg/d)	Phosphorus (mg/d)	Potassium (mg/d)	Sodium (mg/d)
        3.7	130	30	20	56	900	90	15	1.2	1.3	16	1000	8	700	3400	1500"""
        self.desease_instruction = """Disease Name	Energy (kcal)	Water (g)	Protein (g)	Fat (g)	Ash (g)	Carbohydrate (g)	Sugar (g)	Dietary fiber (g)	Calcium (mg)	Iron (mg)	Phosphorus (mg)	Potassium (mg)	Sodium (mg)	Vitamin A (μg RAE)	Retinol (μg)	Beta-carotene (μg)	Thiamine (mg)	Riboflavin (mg)	Niacin (mg)	Vitamin C (mg)	Vitamin D (μg)	Cholesterol (mg)	Saturated fatty acid (g)	Trans Fatty acids (g)
        Dysphagia	Sufficient for hydration and nutrition	6-8 cups or as tolerated, use thickeners if necessary	Adjust according to swallowing capability	Use to enhance caloric intake as needed	NULL	Adjust texture for ease of swallowing	Prefer easy to swallow foods, avoid thick or sticky textures	Ensure adequate intake to prevent constipation	NULL	NULL	NULL	NULL	Use as tolerated, may need to limit	NULL	NULL	NULL	NULL	NULL	NULL	NULL	NULL	NULL	Use to enhance caloric intake as needed	NULL	"""
        self.diet_diary = """수분(g)	단백질(g)	지방(g)	회분(g)	탄수화물(g)	당류(g)	식이섬유(g)	칼슘(mg)	철(mg)	인(mg)	칼륨(mg)	나트륨(mg)	비타민 A(μg RAE)	레티놀(μg)	베타카로틴(μg)	티아민(mg)	리보플라빈(mg)	니아신(mg)	비타민 C(mg)	비타민 D(μg)	콜레스테롤(mg)	포화지방산(g)	트랜스지방산(g)
        70.2	7.23	3	1.08	18.52	3.27	3.4	36	1.76	83	170	215	46	0	550	0	0.1	1.77	0.49	0	76.08	1.05	0.01"""
        self.day_diary = """Total Water (L/d)	Carbohydrate (g/d)	Total Fiber (g/d)	Fat (g/d)	Protein (g/d)	Vitamin A (μg/d)	Vitamin C (mg/d)	Vitamin D (μg/d)	Thiamin (mg/d)	Riboflavin (mg/d)	Niacin (mg/d)	Calcium (mg/d)	Iron (mg/d)	Phosphorus (mg/d)	Potassium (mg/d)	Sodium (mg/d)
        1.7	70	10	5	50	500	60	5	0.2	0.7	6	300	8	200	2400	1000"""


    def set_llm(self, model_name):
        """
        LLM Model 설정하고, Chat 객체 생성
        """
        try:
            self.llm = ChatOllama(model = model_name)
            print("Model set to " + model_name)
        except Exception as e:
            print("Error occured while setting LLM model: " + str(e))


    def save_vectordb(self, doc_path, db_path, doc_type='directory'):
        if doc_type == 'directory':
            loader = PyPDFDirectoryLoader(doc_path)
        elif doc_type == 'csv':
            loader = CSVLoader(doc_path)
        else:
            print("[ERROR] Invalid doc_type")
            
        documents = loader.load()

        text_splitter = RecursiveCharacterTextSplitter(chunk_size = 100, chunk_overlap = 50)
        texts = text_splitter.split_documents(documents)
        self.vector_db = FAISS.from_documents(texts,
                                        embedding = self.embedding_model,
                                        distance_strategy = DistanceStrategy.COSINE
                                        )
        # save db
        self.vector_db.save_local(db_path)


    def load_vectordb(self, db_path):
        # load db
        self.vector_db = FAISS.load_local(db_path, self.embedding_model, allow_dangerous_deserialization=True)


    def get_dietary_guidelines(self, disease_info):
        try:
            self.load_vectordb("./db/faiss/dietary_guidelines")
        except Exception as e:
            print("Error loading dietary_guidelines DB :",e)
            self.save_vectordb("./guideline_pdf", './db/faiss/dietary_guidelines')

        # Execution time
        start = time.time()
        retriever = self.vector_db.as_retriever()
        question = """{context}에 따라 한글로 {question}에 대한 짧은 답변을 생성해줘"""
        prompt = ChatPromptTemplate.from_template(question)
        rag_chain = (
        {"context": retriever , "question": RunnablePassthrough()}
        |prompt
        |self.llm
        |StrOutputParser()
        )
        
        question = "다음 사용자 질병 정보에 적합한 식사요법, 추천 식재료, 비추천 식재료를 짧게 요약해서 알려줘 :" + str(disease_info)
        response = rag_chain.invoke(question)

        print("[DEBUG] question :",question, "\nAI :", response)
        print("[DEBUG] invoke time :", time.time() - start)
        
        return str(response)


    def llm_feedback(self, dri="", dietary_guidelines="", foods_ingredients="", diet_diary="", day_diary=""):
        """
        피드백 프롬프트 템플릿 적용하여 피드백 생성. default value로 빈 String이 들어가 있음에 유의
        """
        start = time.time()
        try:
            prompt = ChatPromptTemplate.from_template("""Objective : Evaluate the nutritional adequacy of the following diet based on the provided DRI and specific diet instruction.
                                                        User DRI Information:
                                                        {DRI}

                                                        Specific Diet Instruction based on disease user have:
                                                        {DIETARY_GUIDELINES}

                                                        Foods and Ingredients Consumed:
                                                        {FOODS_INGREDIENTS}

                                                        Nutrition Intake Information of current meal:
                                                        {DIET_DIARY}

                                                        Cumulative Nutrition Intake Information:
                                                        {DAY_DIARY}

                                                        Please provide in Korean. Total response should be more than 100 characters, less than 200 characters in JSON:
                                                        Brief Summary of short dietary advice, recommendation, on the dietary evaluation. highlighting areas for improvement and suggestions tailored to the user's specific needs and conditions.

                                                        JSON example:
                                                        "feedback" : "___",
                                                        "prohibited ingredient" : "___",
                                                        "recommended ingredient" : "___" """)

            chain = prompt | self.llm | StrOutputParser()

            print("Generating Feedback")
            print("Input Variables:\ndri : {}\nguideline : {}\nfoods_ingredients : {}\ndiet_diary : {}\nday_diary : {}".format(dri,dietary_guidelines,foods_ingredients,diet_diary,day_diary))
            response = chain.invoke({"DRI": dri, "DIETARY_GUIDELINES": dietary_guidelines, "FOODS_INGREDIENTS": foods_ingredients, "DIET_DIARY": diet_diary, "DAY_DIARY": day_diary})
            print("[AI] feedback :", response)
            print("[DEBUG] Feedback Time: ", time.time()-start)
            return response

        except BaseException as e:
            print("Failed to make feedback response: " + str(e))
            return ""


    def recipe_recommendation(self, dietary_guidelines, feedback):
        try:
            self.load_vectordb("./db/faiss/recipe_data")
        except Exception as e:
            print("Error loading recipe Vector DB :",e)
            self.save_vectordb("./recipe_data/recipe.csv","./db/faiss/recipe_data", 'csv')

        # Execution time
        start = time.time()
        retriever_from_llm = MultiQueryRetriever.from_llm(
            retriever=self.vector_db.as_retriever(), llm=self.llm
        )

        question = "다음 피드백에 따라 사용자의 다음 식단에 적합한 메뉴를 추천해줘." + str(feedback)
        unique_docs = retriever_from_llm.invoke(question)

        print(unique_docs)
        print("[DEBUG] invoke time :", time.time() - start)
        
        return unique_docs


# Newri LLM 테스팅용
dri_ex = """Total Water (L/d)	Carbohydrate (g/d)	Total Fiber (g/d)	Fat (g/d)	Protein (g/d)	Vitamin A (μg/d)	Vitamin C (mg/d)	Vitamin D (μg/d)	Thiamin (mg/d)	Riboflavin (mg/d)	Niacin (mg/d)	Calcium (mg/d)	Iron (mg/d)	Phosphorus (mg/d)	Potassium (mg/d)	Sodium (mg/d)
3.7	130	30	20	56	900	90	15	1.2	1.3	16	1000	8	700	3400	1500"""
diet_diary_ex = """수분(g)	단백질(g)	지방(g)	회분(g)	탄수화물(g)	당류(g)	식이섬유(g)	칼슘(mg)	철(mg)	인(mg)	칼륨(mg)	나트륨(mg)	비타민 A(μg RAE)	레티놀(μg)	베타카로틴(μg)	티아민(mg)	리보플라빈(mg)	니아신(mg)	비타민 C(mg)	비타민 D(μg)	콜레스테롤(mg)	포화지방산(g)	트랜스지방산(g)
70.2	7.23	3	1.08	18.52	3.27	3.4	36	1.76	83	170	215	46	0	550	0	0.1	1.77	0.49	0	76.08	1.05	0.01"""
day_diary_ex = """Total Water (L/d)	Carbohydrate (g/d)	Total Fiber (g/d)	Fat (g/d)	Protein (g/d)	Vitamin A (μg/d)	Vitamin C (mg/d)	Vitamin D (μg/d)	Thiamin (mg/d)	Riboflavin (mg/d)	Niacin (mg/d)	Calcium (mg/d)	Iron (mg/d)	Phosphorus (mg/d)	Potassium (mg/d)	Sodium (mg/d)
1.7	70	10	5	50	500	60	5	0.2	0.7	6	300	8	200	2400	1000"""
newri_llm = NewriLLM()
dietary_guidelines_ex = newri_llm.get_dietary_guidelines("['diabetes': False, 'obesity': False, 'cardio': 'highblp,hyperlipidemia', 'digestive': 'liver_disease,after_liver_transplant', 'kidney_disease': 'hemodialysis,Lupus', 'nervous_system': 'braintumor', 'osteoporosis': True, 'constipation': True, 'anaemia': True, 'urinary_stone': True, 'gout': True, 'cancer': 'pancreas,stomach']")
feedback_ex = newri_llm.llm_feedback(dri = dri_ex, dietary_guidelines=dietary_guidelines_ex, diet_diary = diet_diary_ex, day_diary = day_diary_ex)
recommended_recipe = newri_llm.recipe_recommendation(dietary_guidelines_ex, feedback_ex)