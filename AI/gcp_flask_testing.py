from flask import Flask, request, jsonify, render_template
from werkzeug.utils import secure_filename
# from demo_fu import recipe_to_flask_api  # 모델 함수를 가져옵니다.
# # from korea import korea_to_flask_api
from feedbackLLM import feedback

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
    print("LLM")
    if request.method =='POST':
        print("LLM OK")
        return jsonify({'error': 'LLM Feedback Failure'}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0',debug=True, port = 5000)