from langchain_community.chat_models import ChatOllama
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate
import pandas as pd
import json

class NewriLLM():
    def __init__(self):
        self.llm = ChatOllama(model="llama3:latest") # eeve로 Base model 선정
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

    def inference_feedback(self, dri="", desease_json=None, foods_ingredients="", diet_diary="", day_diary=""):
        """
        피드백 프롬프트 템플릿 적용하여 피드백 생성. default value로 빈 String이 들어가 있음에 유의
        """
        try:
            prompt = ChatPromptTemplate.from_template("""Objective : Evaluate the nutritional adequacy of the following diet based on the provided DRI and specific diet instruction.
                                                        User DRI Information:
                                                        {DRI}

                                                        Specific Diet Instruction based on disease user have:
                                                        {DESEASE_INSTRUCTION}

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
                                                        "recommended ingredient" : "___"
                                                        """)

            chain = prompt | self.llm | StrOutputParser()

            # 질병별 지침사항 추출
            try:
                desease_dict = json.loads(desease_json)
                desease_instruction = self.get_desease_instruction(desease_dict)
            except BaseException as e:
                print("Error decoding desease JSON")
                desease_instruction = ""
            
            # Newri LLM 테스팅용
            dri = """Total Water (L/d)	Carbohydrate (g/d)	Total Fiber (g/d)	Fat (g/d)	Protein (g/d)	Vitamin A (μg/d)	Vitamin C (mg/d)	Vitamin D (μg/d)	Thiamin (mg/d)	Riboflavin (mg/d)	Niacin (mg/d)	Calcium (mg/d)	Iron (mg/d)	Phosphorus (mg/d)	Potassium (mg/d)	Sodium (mg/d)
        3.7	130	30	20	56	900	90	15	1.2	1.3	16	1000	8	700	3400	1500"""
            desease_instruction = """Disease Name	Energy (kcal)	Water (g)	Protein (g)	Fat (g)	Ash (g)	Carbohydrate (g)	Sugar (g)	Dietary fiber (g)	Calcium (mg)	Iron (mg)	Phosphorus (mg)	Potassium (mg)	Sodium (mg)	Vitamin A (μg RAE)	Retinol (μg)	Beta-carotene (μg)	Thiamine (mg)	Riboflavin (mg)	Niacin (mg)	Vitamin C (mg)	Vitamin D (μg)	Cholesterol (mg)	Saturated fatty acid (g)	Trans Fatty acids (g)
        tomato alergy, diabetes,Based on individual assessment,NULL,Balanced intake,Reduce cholesterol intake,NULL,"Limit simple sugars, balance intake","Limit intake, prefer complex carbs",Sufficient intake,NULL,NULL,NULL,NULL,Reduce,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,Reduce,Reduce,NULL,	"""
            diet_diary = """수분(g)	단백질(g)	지방(g)	회분(g)	탄수화물(g)	당류(g)	식이섬유(g)	칼슘(mg)	철(mg)	인(mg)	칼륨(mg)	나트륨(mg)	비타민 A(μg RAE)	레티놀(μg)	베타카로틴(μg)	티아민(mg)	리보플라빈(mg)	니아신(mg)	비타민 C(mg)	비타민 D(μg)	콜레스테롤(mg)	포화지방산(g)	트랜스지방산(g)
        70.2	7.23	3	1.08	18.52	3.27	3.4	36	1.76	83	170	215	46	0	550	0	0.1	1.77	0.49	0	76.08	1.05	0.01"""
            day_diary = """Total Water (L/d)	Carbohydrate (g/d)	Total Fiber (g/d)	Fat (g/d)	Protein (g/d)	Vitamin A (μg/d)	Vitamin C (mg/d)	Vitamin D (μg/d)	Thiamin (mg/d)	Riboflavin (mg/d)	Niacin (mg/d)	Calcium (mg/d)	Iron (mg/d)	Phosphorus (mg/d)	Potassium (mg/d)	Sodium (mg/d)
        1.7	70	10	5	50	500	60	5	0.2	0.7	6	300	8	200	2400	1000"""

            print("Generating Feedback")
            response = chain.invoke({"DRI": dri, "DESEASE_INSTRUCTION": desease_instruction, "FOODS_INGREDIENTS": foods_ingredients, "DIET_DIARY": diet_diary, "DAY_DIARY": day_diary})

            return response

        except BaseException as e:
            print("Failed to make feedback response: " + str(e))
            return ""


    def get_desease_instruction(self, desease_dict):
        """
        입력받은 사용자 질병 dictionary에서 질병을 추출하여 해당 질병에 맞는 지침사항을 return
        """
        try:
            desease_instruction = ""
            guidelines = pd.read_csv('./dietary_guidelines.csv', index_col='Disease Name')
            for key, value in desease_dict.items():
                if value:
                    value_list = value.split(', ')
                    for desease in value_list:
                        combined_string = key + ' Instructions: ' + str(guidelines.loc[key].to_dict())
                        desease_instruction += combined_string
            print(desease_instruction,"\n\n")

            return desease_instruction
        except Exception as e:
            print("Error occured while getting desease instruction: " + str(e))
            return ""


llmclass = NewriLLM()
feedback = llmclass.inference_feedback() # type: ignore
print("feedback: ", feedback)
