from flask import Flask, request, jsonify, render_template
from werkzeug.utils import secure_filename
# from demo_fu import recipe_to_flask_api  # 모델 함수를 가져옵니다.
# # from korea import korea_to_flask_api
from NewriLLM import NewriLLM

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload_file():
    print("route completed.")
    if request.method == 'POST':
        file = request.files['foodImages']  # 이미지 파일 받기  # 로컬에 저장
        filename = secure_filename(file.filename)
        file_path = f'dataset/{filename}'
        file.save(file_path)
        print('인아')
        korean_or_all = request.form.get('koreanOrAll')
        print(f"Received file: {filename}, koreanorall: {korean_or_all}")
        # 모델 호출
        # if korean_or_all == 'ALL':
        #     result = recipe_to_flask_api(file_path)
        # elif korean_or_all == 'KOREAN':
        #     # result = korea_to_flask_api(file_path)
        result = {'foods':'잡채',
                    'ingredients' : ['fff'],
                    'amount':32}
        # else:
        #     return jsonify({'error': 'Invalid value for koreanorall'}), 400
        
        if result:
            return jsonify(result), 200
        else:
            return jsonify({'error': 'Not a valid recipe'}), 400
        
@app.route('/feedback', methods=['POST'])
def make_feedback():
    if request.method =='POST':
        llm_module = NewriLLM()
        # 사용자 정보 취득
        try:
            member_dri = request.json('dri')
            member_disease = request.json('diseaseInfo')
            member_foods_ingredients = request.json('diets')
            member_dietdiary = request.json('dietDiaries')
            member_daydiary = request.json('dayDiary')
            feedback = llm_module.inference_feedback( member_dri, member_disease, member_foods_ingredients, member_dietdiary, member_daydiary)
        except Exception as e:
            print('Error occurred while getting user information from DB')
            eedback = llm_module.inference_feedback()
        result = {'dayfeedback': feedback}
        if result:
            return jsonify(result), 200
        else:
            return jsonify({'error': 'Failed to create feedback'}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0',debug=True, port = 5000)