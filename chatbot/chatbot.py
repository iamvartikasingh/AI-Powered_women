from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import logging
import boto3
from botocore.exceptions import ClientError

app = Flask(__name__)
CORS(app, resources={r"/chat": {"origins": "http://localhost:5173"}}, supports_credentials=True)

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO, format="%(levelname)s: %(message)s")
@app.route("/test", methods=["GET"])
def test():
    return jsonify({"message": "CORS works!"})
model_id = "arn:aws:bedrock:us-east-2:613811229790:inference-profile/us.amazon.nova-lite-v1:0"

# === Load User Data ===
with open("intake_form.json", "r") as f:
    user_data = json.load(f)

# Load the saved web search summaries
with open("web_search_results.json", "r") as f:
    web_search_data = json.load(f)

# Extract values from JSON
name = user_data.get("name")
city = user_data.get("city")
country = user_data.get("country")
professional_role = user_data.get("professional_role")[0]
ai_competency_level = user_data.get("ai_competency_level")
ai_tool_familiarity = ", ".join(user_data.get("ai_tool_familiarity", []))
weekly_learning_time = user_data.get("weekly_learning_time")
primary_interest = ", ".join(user_data.get("primary_interest", []))
problem_area_keywords = ", ".join(user_data.get("problem_area_keywords", []))
preferred_learning_method = ", ".join(user_data.get("preferred_learning_method", []))
mentorship_interest = user_data.get("mentorship_interest")
mentor_peer_qualities = ", ".join(user_data.get("mentor_peer_qualities", []))
tech_comfort_level = user_data.get("tech_comfort_level")
industry = user_data.get("industry")
web_search = "\n\n".join([
    f"🔹 {a['title']}\n{a['url']}\n{a['summary']}" for a in web_search_data
])

# System prompt
system_prompt = [{"text": f"""You are a helpful chatbot for the user, who will answer every query the user asks based upon the use of AI in Life sciences. 
1. You have the following information about the user:
- Name: {name}
- Based in: {city}
- Role: {professional_role}
- AI Skill: {ai_competency_level}
- Tools: {ai_tool_familiarity}
- Weekly Learning Time: {weekly_learning_time}
- Comfort with Tech: {tech_comfort_level}
- Learning Preferences: {preferred_learning_method}
- Industry: {industry}

2. You must answer concisely, and suggest 2 good but short follow-up questions after every response relevant to the chat. Return the queries like 'If you'd like more depth, here are a few follow up questions- '.
3. Base ALL the questions and answers around the user profile that you have. 
4. Use ALL knowledge that you have on AI and its advances in the Life Sciences industry and answer every query accordingly.
"""}]

# Bedrock client
bedrock_client = boto3.client("bedrock-runtime", region_name="us-east-2")

# Chat generator
def generate_response(messages):
    try:
        response = bedrock_client.converse(
            modelId=model_id,
            messages=messages,
            system=system_prompt,
            inferenceConfig={"temperature": 0.1}
        )
        return response["output"]["message"]

    except ClientError as err:
        logger.error("Client error: %s", err.response["Error"]["Message"])
        return {"role": "assistant", "content": [{"text": "Sorry, something went wrong."}]}

# === Flask Chat Route ===
@app.route("/chat", methods=["POST", "OPTIONS"])
def chat():
    if request.method == "OPTIONS":
        return '', 204  # CORS preflight success response

    data = request.json
    user_message = data.get("message")
    if not user_message:
        return jsonify({"error": "Message is required"}), 400

    try:
        messages = [{"role": "user", "content": [{"text": user_message}]}]
        response = generate_response(messages)
        reply = [c["text"] for c in response["content"]]
        return jsonify({"response": reply})
    except Exception as e:
        logger.exception("Error generating chatbot response")
        return jsonify({"error": "Failed to get response"}), 500

# === Run Flask Server ===
if __name__ == "__main__":
    app.run(debug=True)