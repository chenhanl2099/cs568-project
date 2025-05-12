import csv
import datetime
import time
import json
from gemini_client import call_gemini
from typing import Optional, Dict
from helpers import random_timestamp, clean_json_response
from survey_config import FIELDNAMES

INPUT_FILE = "data/generated_personalities.csv"
OUTPUT_FILE = "data/survey_responses.csv"

START_DATE = datetime.datetime(2025, 3, 13, 0, 0, 0)
END_DATE = datetime.datetime.now()

def build_prompt(profile_desc: str) -> str:
    """
    Builds the full prompt to send to Gemini with strict answer choices, using FIELDNAMES directly.
    """
    return f"""
You are filling out a web interface preferences survey as the following user:

{profile_desc}

You must ONLY pick answers from the provided answer choices exactly as listed below (no free text or new wording). For multiple-choice questions, select the option(s) that best fit the user's personality.

Provide your answers in JSON format like this:

{{
    "{FIELDNAMES[1]}": "[choose one: Yes, I am a professional developer/designer / Yes, I have some experience (e.g., hobbyist, student) / No, I am a general user]",
    "{FIELDNAMES[2]}": "[choose one: More than 20 times a day / Between 5 to 20 times a day / Up to 5 times a day / Rarely]",
    "{FIELDNAMES[3]}": "[choose one: Desktop/Laptop / Tablet / Mobile phone / Other…]",
    "{FIELDNAMES[4]}": [choose a number between 1 and 5],
    "{FIELDNAMES[5]}": [choose a number between 1 and 5],
    "{FIELDNAMES[6]}": [choose a number between 1 and 5],
    "{FIELDNAMES[7]}": [choose a number between 1 and 5],
    "{FIELDNAMES[8]}": [choose a number between 1 and 5],
    "{FIELDNAMES[9]}": "[choose one: Cluttered or messy design / Slow loading times / Poor mobile adaptation / Difficult navigation / Inconsistent fonts/colors / Other…]",
    "{FIELDNAMES[10]}": "[choose one: Minimalist and clean / Bold and colorful / Classic and traditional / Futuristic/innovative / No strong preference]",
    "{FIELDNAMES[11]}": "[choose one: Very important / Somewhat important / Not important]",
    "{FIELDNAMES[12]}": "[choose exactly two: Clear price breakdown (tax, shipping, etc.) / Fast and simple checkout flow / Trust signals (security badges, reviews) / Multiple payment options / Ability to easily edit cart items / Other…]",
    "{FIELDNAMES[13]}": "[optional: provide a short sentence]",
    "{FIELDNAMES[14]}": "[choose one: Yes / No]",
    "{FIELDNAMES[15]}": "[optional: provide a fake email address if Yes, otherwise leave blank]"
}}

Be precise. Only pick from the choices listed above without inventing new wording.
"""

def parse_response(json_str: str) -> Optional[Dict]:
    """
    Parses the Gemini JSON output into our CSV row format using FIELDNAMES directly.
    """
    try:
        cleaned = clean_json_response(json_str)
        data = json.loads(cleaned)

        checkout_value = data.get(FIELDNAMES[12], "")
        if isinstance(checkout_value, list):
            checkout_str = ", ".join(checkout_value)
        else:
            checkout_str = checkout_value.strip()

        return {
            FIELDNAMES[1]: data.get(FIELDNAMES[1], "").strip(),
            FIELDNAMES[2]: data.get(FIELDNAMES[2], "").strip(),
            FIELDNAMES[3]: data.get(FIELDNAMES[3], "").strip(),
            FIELDNAMES[4]: data.get(FIELDNAMES[4], 3),
            FIELDNAMES[5]: data.get(FIELDNAMES[5], 3),
            FIELDNAMES[6]: data.get(FIELDNAMES[6], 3),
            FIELDNAMES[7]: data.get(FIELDNAMES[7], 3),
            FIELDNAMES[8]: data.get(FIELDNAMES[8], 3),
            FIELDNAMES[9]: data.get(FIELDNAMES[9], "").strip(),
            FIELDNAMES[10]: data.get(FIELDNAMES[10], "").strip(),
            FIELDNAMES[11]: data.get(FIELDNAMES[11], "").strip(),
            FIELDNAMES[12]: checkout_str,
            FIELDNAMES[13]: data.get(FIELDNAMES[13], "").strip(),
            FIELDNAMES[14]: data.get(FIELDNAMES[14], "").strip(),
            FIELDNAMES[15]: data.get(FIELDNAMES[15], "").strip()
        }
    except json.JSONDecodeError as e:
        print(f"⚠️ JSON decode error: {e}")
        return None

def main():
    with open(INPUT_FILE, mode='r', encoding='utf-8') as infile, \
         open(OUTPUT_FILE, mode='w', newline='', encoding='utf-8') as outfile:

        reader = csv.DictReader(infile)
        writer = csv.DictWriter(outfile, fieldnames=FIELDNAMES)
        writer.writeheader()

        count = 0
        for row in reader:
            profile_desc = row['profile_description']
            prompt = build_prompt(profile_desc)
            print(f"Generating survey response for profile #{count}...")
            count += 1

            gemini_response = call_gemini(prompt)
            survey_data = parse_response(gemini_response)

            if survey_data:
                rand_dt = random_timestamp(START_DATE, END_DATE)
                timestamp = rand_dt.strftime("%m/%d/%Y %H:%M:%S")
                survey_data["Timestamp"] = timestamp
                writer.writerow(survey_data)
            else:
                print("⚠️ Skipping due to parsing error.")

            time.sleep(0.5)

    print(f"✅ Done! Responses saved to {OUTPUT_FILE}")

if __name__ == "__main__":
    main()
