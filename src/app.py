from flask import Flask, request, jsonify
import pickle
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 
# Load your trained model
with open('knn_model.pkl', 'rb') as model_file:
    model = pickle.load(model_file)

@app.route('/predict', methods=['POST'])
def predict():
    # Get form data
    data = request.form.to_dict()  # Convert form data to a dictionary
    
    # Convert the data dictionary to a DataFrame
    df = pd.DataFrame([data])
    
    # Rename the columns to match the expected format in the model
    df = df.rename(columns={
        'logicalQuotient': 'Logical quotient rating',
        'codingSkills': 'coding skills rating',
        'hackathons': 'hackathons',
        'publicSpeaking': 'public speaking points',
        'selfLearning': 'self-learning capability?',
        'hardWorker': 'B_hard worker',
        'smartWorker': 'B_smart worker',
        'management': 'A_Management',
        'technical': 'A_Technical',
        'certifications': 'certifications_code',
        'companyType': 'Type of company want to settle in?_code',
        'careerArea': 'interested career area _code'
    })

    # Convert the column types to numeric (if necessary)
    df = df.apply(pd.to_numeric)
    
    # Predict using the model
    prediction = model.predict(df)
    print(prediction)
    # Return the prediction as JSON
    return jsonify({'prediction': prediction[0]})

if __name__ == '__main__':
    app.run(debug=True)
