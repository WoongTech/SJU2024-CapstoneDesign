from flask import Flask, request, jsonify, render_template
from werkzeug.utils import secure_filename
from demo_fu import recipe_to_flask_api  # 모델 함수를 가져옵니다.
from korea import korea_to_flask_api
from NewriLLM import NewriLLM
from semantic import get_top_similar_food

app = Flask(__name__)
@app.route('/upload', methods=['POST'])
def upload_file():

    if request.method == 'POST':
        file = request.files['foodImage']  # 이미지 파일 받기  # 로컬에 저장
        filename = secure_filename(file.filename)
        file_path = f'dataset/{filename}'
        file.save(file_path)
        print('인아')
        korean_or_all = request.form.get('koreanOrAll')
        print(f"Received file: {filename}, koreanorall: {korean_or_all}")
        # 모델 호출
        if korean_or_all == 'ALL':
            result = recipe_to_flask_api(file_path)
        elif korean_or_all == 'KOREAN':
            result = korea_to_flask_api(file_path)
            print(result)
            food_be = get_top_similar_food(result['food'])
            print(food_be)
            result['food_be']=food_be
        else:
            return jsonify({'error': 'Invalid value for koreanorall'}), 400

        if result:
            return jsonify(result), 200
        else:
            return jsonify({'error': 'Not a valid recipe'}), 400
        
# 식단 피드백 생성
@app.route('/feedback', methods=['POST'])
def make_feedback():
    if request.method =='POST':
        llm_module = NewriLLM()
        # 사용자 정보 취득
        try:
            member_dri = request.json['dri']
            member_disease = request.json['diseaseInfo']
            member_foods_ingredients = request.json['diets']
            member_dietdiary = request.json['dietDiaries']
            member_daydiary = request.json['dayDiary']
            print(request.json, member_dri, member_disease, member_foods_ingredients, member_dietdiary, member_daydiary)
            disease_instruction = llm_module.get_desease_instruction(member_disease)
            feedback = llm_module.inference_feedback( member_dri, member_disease, member_foods_ingredients, member_dietdiary, member_daydiary)
        except Exception as e:
            print('Error occurred while getting user information from DB')
            feedback = llm_module.inference_feedback()
            disease_instruction = ""
        result = {'feedback': feedback, 'disease_instruction': disease_instruction}
        if result:
            return jsonify(result), 200
        else:
            return jsonify({'error': 'Failed to create feedback'}), 400
        
# 레시피 추천 
@app.route('/recipe_recommendation', methods=['POST'])
def make_feedback():
    if request.method =='POST':
        llm_module = NewriLLM()
        # 사용자 정보 취득
        try:
            feedback = request.json['feedback']
            disease_instruction = request.json['disease_instruction']
            print(feedback, disease_instruction)
            recommended_recipe = llm_module.recipe_recommendation(disease_instruction, feedback)
        except Exception as e:
            return jsonify({'error': 'failed to get user information from DB'}), 400
        result = {'recipe_list': recommended_recipe}
        if result:
            return jsonify(result), 200
        else:
            return jsonify({'error': 'Failed to create feedback'}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0',debug=True, port = 5000)
