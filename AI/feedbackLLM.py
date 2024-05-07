from langchain_community.chat_models import ChatOllama
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate


def feedback():
    llm = ChatOllama(model="eeve:latest")
    
    prompt = ChatPromptTemplate.from_template("""Objective : Evaluate the nutritional adequacy of the following diet based on the provided DRI and specific diet instruction.
                                                User DRI Information:
                                                {DRI}

                                                Specific Diet Instruction based on disease user have:
                                                {DESEASE_INSTRUCTION}

                                                Nutrition Intake Information of current meal:
                                                {DIET_DIARY}

                                                Cumulative Nutrition Intake Information:
                                                {DAY_DIARY}

                                                Please provide:
                                                Short dietary advice, recommendation, more than 100 characters, less than 200 characters on the dietary evaluation. highlighting areas for improvement and suggestions tailored to the user's specific needs and conditions.

                                                Answer example:
                                                feedback : ___""")
    
    chain = prompt | llm | StrOutputParser()
    
    dri = """Total Water (L/d)	Carbohydrate (g/d)	Total Fiber (g/d)	Fat (g/d)	Protein (g/d)	Vitamin A (μg/d)	Vitamin C (mg/d)	Vitamin D (μg/d)	Thiamin (mg/d)	Riboflavin (mg/d)	Niacin (mg/d)	Calcium (mg/d)	Iron (mg/d)	Phosphorus (mg/d)	Potassium (mg/d)	Sodium (mg/d)
3.7	130	30	20	56	900	90	15	1.2	1.3	16	1000	8	700	3400	1500"""
    desease_instruction = """Disease Name	Energy (kcal)	Water (g)	Protein (g)	Fat (g)	Ash (g)	Carbohydrate (g)	Sugar (g)	Dietary fiber (g)	Calcium (mg)	Iron (mg)	Phosphorus (mg)	Potassium (mg)	Sodium (mg)	Vitamin A (μg RAE)	Retinol (μg)	Beta-carotene (μg)	Thiamine (mg)	Riboflavin (mg)	Niacin (mg)	Vitamin C (mg)	Vitamin D (μg)	Cholesterol (mg)	Saturated fatty acid (g)	Trans Fatty acids (g)
Dysphagia	Sufficient for hydration and nutrition	6-8 cups or as tolerated, use thickeners if necessary	Adjust according to swallowing capability	Use to enhance caloric intake as needed	NULL	Adjust texture for ease of swallowing	Prefer easy to swallow foods, avoid thick or sticky textures	Ensure adequate intake to prevent constipation	NULL	NULL	NULL	NULL	Use as tolerated, may need to limit	NULL	NULL	NULL	NULL	NULL	NULL	NULL	NULL	NULL	Use to enhance caloric intake as needed	NULL	"""
    diet_diary = """수분(g)	단백질(g)	지방(g)	회분(g)	탄수화물(g)	당류(g)	식이섬유(g)	칼슘(mg)	철(mg)	인(mg)	칼륨(mg)	나트륨(mg)	비타민 A(μg RAE)	레티놀(μg)	베타카로틴(μg)	티아민(mg)	리보플라빈(mg)	니아신(mg)	비타민 C(mg)	비타민 D(μg)	콜레스테롤(mg)	포화지방산(g)	트랜스지방산(g)
70.2	7.23	3	1.08	18.52	3.27	3.4	36	1.76	83	170	215	46	0	550	0	0.1	1.77	0.49	0	76.08	1.05	0.01"""
    day_diary = """Total Water (L/d)	Carbohydrate (g/d)	Total Fiber (g/d)	Fat (g/d)	Protein (g/d)	Vitamin A (μg/d)	Vitamin C (mg/d)	Vitamin D (μg/d)	Thiamin (mg/d)	Riboflavin (mg/d)	Niacin (mg/d)	Calcium (mg/d)	Iron (mg/d)	Phosphorus (mg/d)	Potassium (mg/d)	Sodium (mg/d)
1.7	70	10	5	50	500	60	5	0.2	0.7	6	300	8	200	2400	1000"""
    
    response = chain.invoke({"DRI": dri, "DESEASE_INSTRUCTION": desease_instruction, "DIET_DIARY": diet_diary, "DAY_DIARY":day_diary})
    
    print(response)
    
    
feedback()