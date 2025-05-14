import csv
import json
import os
import time
from typing import Dict, List
from gemini_client import call_gemini
from helpers import clean_json_response

# Paths
PROFILE_PATH = "data/generated_personalities.csv"
EVAL_TEMPLATE_PATH = "evaluation_table.json"
APP_CODE_PATH = "data/application/Claude.json"
OUTPUT_PATH = "synthetic_eval_Claude.json"

# Load evaluation template
with open(EVAL_TEMPLATE_PATH, "r", encoding="utf-8") as f:
    evaluation_template = json.load(f)
criteria_list = evaluation_template["scores"]

# Load application code
with open(APP_CODE_PATH, "r", encoding="utf-8") as f:
    application_code = f.read()

# Load existing results (if resuming)
if os.path.exists(OUTPUT_PATH):
    with open(OUTPUT_PATH, "r", encoding="utf-8") as f:
        saved_results = json.load(f)
    evaluated_users = {entry["user_id"] for entry in saved_results}
else:
    saved_results = []
    evaluated_users = set()

# Load user profiles
with open(PROFILE_PATH, newline='', encoding='utf-8') as csvfile:
    reader = csv.DictReader(csvfile)
    profiles = [
        {"user_id": row["id"], "profile_description": row["profile_description"]}
        for row in reader if row["id"] not in evaluated_users
    ]

def generate_prompt(profile_description: str, app_code: str, eval_criteria: List[Dict]) -> str:
    prompt = (
        f"You are evaluating a website application as the following user persona:\n\n"
        f"{profile_description}\n\n"
        f"The application source code is as follows:\n\n"
        f"{app_code}\n\n"
        f"Assess the application using the following criteria. Give each a score from 1 to 5 (1 = poor, 5 = excellent):\n\n"
    )
    for item in eval_criteria:
        prompt += (
            f"- {item['Category']} / {item['Criteria']}: {item['Scoring Criteria']} "
            f"(Common GPT Issues: {item['Common GPT Issues']})\n"
        )
    prompt += (
        "\nReturn JSON in this format:\n"
        "{\n  \"scores\": [\n    {\"Category\": \"UI Design\", \"Criteria\": \"Aesthetics\", \"Score\": 3},\n    ...\n  ]\n}"
    )
    return prompt

def parse_score_response(raw_response: str) -> List[Dict]:
    """
    Cleans and parses the Gemini response into the expected score list format.
    """
    try:
        cleaned = clean_json_response(raw_response)
        parsed = json.loads(cleaned)
        return parsed.get("scores", [])
    except json.JSONDecodeError as e:
        print(f"⚠️ JSON decode error: {e}")
        return []

def main():
    for profile in profiles:
        print(f"Evaluating: {profile['user_id']}")
        prompt = generate_prompt(profile["profile_description"], application_code, criteria_list)
        response = call_gemini(prompt)
        scores = parse_score_response(response)

        result = {
            "user_id": profile["user_id"],
            "scores": scores
        }

        saved_results.append(result)

        # Save after each user
        with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
            json.dump(saved_results, f, indent=2, ensure_ascii=False)

        time.sleep(0.5)

    print(f"✅ Done! Results written to {OUTPUT_PATH}")

if __name__ == "__main__":
    main()
