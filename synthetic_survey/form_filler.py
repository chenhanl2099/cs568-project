import csv
import datetime
import json
import time
import random
from gemini_client import call_gemini

INPUT_FILE = "data/generated_personalities.csv"
OUTPUT_FILE = "data/response_form.csv"

FIELDNAMES = [
    "Timestamp",
    "Do you have any background in web development or design?  ",
    "  How often do you interact with websites or web apps?  ",
    "What device do you use most often to browse the web? ",
    "Please rate how important the following aspects are to you when using a website (with 1 being the least important and 5 the most):   [Aesthetic design (visuals)]",
    "Please rate how important the following aspects are to you when using a website (with 1 being the least important and 5 the most):   [Responsiveness (adapts to screen size)]",
    'Please rate how important the following aspects are to you when using a website (with 1 being the least important and 5 the most):   [Accessibility (easy for all users, including with disabilities)]',
    "Please rate how important the following aspects are to you when using a website (with 1 being the least important and 5 the most):   [Navigation (easy to find things)]",
    "Please rate how important the following aspects are to you when using a website (with 1 being the least important and 5 the most):   [Page speed and performance]",
    "When visiting a website, which of these annoys you the most?",
    "  Which design style do you personally prefer?  ",
    "When a button or link is clicked, how important is it that there’s immediate feedback (like a color change or loading spinner)?",
    "When shopping online, which two feature do you value most in the checkout process?  ",
    "Have you ever used a website that felt especially well-designed? What made it stand out to you? ",
    "Would you be interested in participating in future tests of new website designs (e.g., A/B testing)?  ",
    "If you answered yes to the question above, please leave a way of contact here:"
]

def build_prompt(profile_desc):
    """Builds the full prompt to send to Gemini with strict answer choices."""

    return f"""
You are filling out a web interface preferences survey as the following user:

{profile_desc}

You must ONLY pick answers from the provided answer choices exactly as listed below (no free text or new wording). For multiple-choice questions, select the option(s) that best fit the user's personality.

Provide your answers in JSON format like this:

{{
    "Do you have any background in web development or design?": "[choose one: Yes, I am a professional developer/designer / Yes, I have some experience (e.g., hobbyist, student) / No, I am a general user]",
    "How often do you interact with websites or web apps?": "[choose one: More than 20 times a day / Between 5 to 20 times a day / Up to 5 times a day / Rarely]",
    "What device do you use most often to browse the web?": "[choose one: Desktop/Laptop / Tablet / Mobile phone / Other…]",
    "Aesthetic design (visuals)": [choose a number between 1 and 5],
    "Responsiveness (adapts to screen size)": [choose a number between 1 and 5],
    "Accessibility (easy for all users, including with disabilities)": [choose a number between 1 and 5],
    "Navigation (easy to find things)": [choose a number between 1 and 5],
    "Page speed and performance": [choose a number between 1 and 5],
    "When visiting a website, which of these annoys you the most?": "[choose one: Cluttered or messy design / Slow loading times / Poor mobile adaptation / Difficult navigation / Inconsistent fonts/colors / Other…]",
    "Which design style do you personally prefer?": "[choose one: Minimalist and clean / Bold and colorful / Classic and traditional / Futuristic/innovative / No strong preference]",
    "When a button or link is clicked, how important is it that there’s immediate feedback (like a color change or loading spinner)?": "[choose one: Very important / Somewhat important / Not important]",
    "When shopping online, which two features do you value most in the checkout process?": "[choose exactly two: Clear price breakdown (tax, shipping, etc.) / Fast and simple checkout flow / Trust signals (security badges, reviews) / Multiple payment options / Ability to easily edit cart items / Other…]",
    "Have you ever used a website that felt especially well-designed? What made it stand out to you?": "[optional: provide a short sentence]",
    "Would you be interested in participating in future tests of new website designs (e.g., A/B testing)?": "[choose one: Yes / No]",
    "If you answered yes to the question above, please leave a way of contact here:": "[optional: provide a fake email address if Yes, otherwise leave blank]"
}}

Be precise. Only pick from the choices listed above without inventing new wording.
"""

def parse_response(json_str):
    """Parses the Gemini JSON output into our CSV row format."""
    try:
        # Clean: remove ```json ... ``` code block if present
        cleaned = json_str.strip()
        if cleaned.startswith("```json"):
            cleaned = cleaned[7:]
        if cleaned.startswith("```"):
            cleaned = cleaned[3:]
        if cleaned.endswith("```"):
            cleaned = cleaned[:-3]

        cleaned = cleaned.strip()

        data = json.loads(cleaned)
        
        checkout_value = data.get("When shopping online, which two features do you value most in the checkout process?", "")
        if isinstance(checkout_value, list):
            checkout_str = ", ".join(checkout_value)
        else:
            checkout_str = checkout_value.strip()

        return {
            "Do you have any background in web development or design?  ": data.get("Do you have any background in web development or design?", "").strip(),
            "  How often do you interact with websites or web apps?  ": data.get("How often do you interact with websites or web apps?", "").strip(),
            "What device do you use most often to browse the web? ": data.get("What device do you use most often to browse the web?", "").strip(),
            "Please rate how important the following aspects are to you when using a website (with 1 being the least important and 5 the most):   [Aesthetic design (visuals)]": data.get("Aesthetic design (visuals)", 3),
            "Please rate how important the following aspects are to you when using a website (with 1 being the least important and 5 the most):   [Responsiveness (adapts to screen size)]": data.get("Responsiveness (adapts to screen size)", 3),
            'Please rate how important the following aspects are to you when using a website (with 1 being the least important and 5 the most):   [Accessibility (easy for all users, including with disabilities)]': data.get("Accessibility (easy for all users, including with disabilities)", 3),
            "Please rate how important the following aspects are to you when using a website (with 1 being the least important and 5 the most):   [Navigation (easy to find things)]": data.get("Navigation (easy to find things)", 3),
            "Please rate how important the following aspects are to you when using a website (with 1 being the least important and 5 the most):   [Page speed and performance]": data.get("Page speed and performance", 3),
            "When visiting a website, which of these annoys you the most?": data.get("When visiting a website, which of these annoys you the most?", "").strip(),
            "  Which design style do you personally prefer?  ": data.get("Which design style do you personally prefer?", "").strip(),
            "When a button or link is clicked, how important is it that there’s immediate feedback (like a color change or loading spinner)?": data.get("When a button or link is clicked, how important is it that there’s immediate feedback (like a color change or loading spinner)?", "").strip(),
            "When shopping online, which two feature do you value most in the checkout process?  ": checkout_str,
            "Have you ever used a website that felt especially well-designed? What made it stand out to you? ": data.get("Have you ever used a website that felt especially well-designed? What made it stand out to you?", "").strip(),
            "Would you be interested in participating in future tests of new website designs (e.g., A/B testing)?  ": data.get("Would you be interested in participating in future tests of new website designs (e.g., A/B testing)?", "").strip(),
            "If you answered yes to the question above, please leave a way of contact here:": data.get("If you answered yes to the question above, please leave a way of contact here:", "").strip()
        }
    except json.JSONDecodeError as e:
        print(f"JSON decode error: {e}")
        return None

def random_timestamp(start_date, end_date):
    """
    Generates a random datetime between two datetime objects.
    """
    delta = end_date - start_date
    int_delta = int(delta.total_seconds())
    random_second = random.randint(0, int_delta)
    return start_date + datetime.timedelta(seconds=random_second)

def main():
    with open(INPUT_FILE, mode='r', encoding='utf-8') as infile, \
         open(OUTPUT_FILE, mode='w', newline='', encoding='utf-8') as outfile:

        reader = csv.DictReader(infile)
        writer = csv.DictWriter(outfile, fieldnames=FIELDNAMES)
        writer.writeheader()

        for row in reader:
            profile_desc = row['profile_description']
            prompt = build_prompt(profile_desc)
            print(f"Generating survey response for profile...")

            gemini_response = call_gemini(prompt)

            survey_data = parse_response(gemini_response)

            if survey_data:
                start_date = datetime.datetime(2025, 3, 13, 0, 0, 0)
                end_date = datetime.datetime.now()
                rand_dt = random_timestamp(start_date, end_date)
                timestamp = rand_dt.strftime("%m/%d/%Y %H:%M:%S")
                survey_data["Timestamp"] = timestamp
                writer.writerow(survey_data)
            else:
                print("Skipping due to parsing error.")

            time.sleep(0.5)

    print(f"✅ Done! Responses saved to {OUTPUT_FILE}")


if __name__ == "__main__":
    main()
