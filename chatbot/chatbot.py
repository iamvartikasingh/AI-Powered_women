import json
import logging
import boto3
from botocore.exceptions import ClientError

# === Setup ===
logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO, format="%(levelname)s: %(message)s")

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
# web_search = json.dumps(build_summary_json(
#     "AI in lifesciences industry",
#     "7faa4b2515682fd8ce102f45d259347e6ac3fee23cc6d582f3af7cccca1b48bf"
# ))



system_prompt = [{"text" : f"""You are a helpful chatbot for the user, who will answer every query the user asks based upon the use of AI in Life sciences. 
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

# === Bedrock client ===
bedrock_client = boto3.client("bedrock-runtime", region_name="us-east-2")

# === Chat Function ===
def generate_response(messages):
    try:
        response = bedrock_client.converse(
            modelId=model_id,
            messages=messages,
            system=system_prompt,
            inferenceConfig={"temperature": 0.1}
        )

        # logger.info("Tokens Used: %s", response['usage'])
        return response["output"]["message"]

    except ClientError as err:
        logger.error("Client error: %s", err.response["Error"]["Message"])
        return {"role": "assistant", "content": [{"text": "Sorry, something went wrong."}]}

# === Main Loop ===
def main():
    print("🤖 Chat started! Type 'exit' to quit.\n")
    messages = []

    # Initial welcome message
    print(f"Chatbot🤖: Hi {name}! How may I help you today?")

    while True:
        user_input = input("You: ")
        if user_input.lower() in ["exit", "quit"]:
            break

        messages.append({
            "role": "user",
            "content": [{"text": user_input}]
        })

        response_message = generate_response(messages)
        messages.append(response_message)

        for content in response_message["content"]:
            print("Chatbot🤖:", content["text"])
        print()

    print("👋 Chat ended. See you next time!")

if __name__ == "__main__":
    main()