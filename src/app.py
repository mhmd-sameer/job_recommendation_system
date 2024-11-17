from flask import Flask, request, jsonify
import pickle
import pandas as pd
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

# Load your trained model
# Ensure that the model file is in the correct location
model_path = os.path.join(os.path.dirname(__file__), 'knn_model.pkl')
with open(model_path, 'rb') as model_file:
    try:
        model = pickle.load(model_file)
    except AttributeError as e:
        # Handle any custom class issues that may arise
        print(f"Error loading model: {e}")
        model = None  # Set model to None if loading fails

@app.route('/predict', methods=['POST'])
def predict():
    if model is None:
        return jsonify({'error': 'Model could not be loaded. Please check for any custom classes or file issues.'}), 500

    try:
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
        
        # Return the prediction as JSON
        return jsonify({'prediction': prediction[0]})
    
    except Exception as e:
        # Return an error response if something goes wrong
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    # Ensure the app runs on the correct port and host
    port = int(os.environ.get('PORT', 5000))  # Get port from environment variable
    app.run(host='0.0.0.0', port=port, debug=True)  # Bind to all available IPs
