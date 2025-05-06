import csv
import requests
import time
from helpers import smart_split

FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdDKYlPuLiK9KheYt8LoDjxYkafQNUw2uNm64mq8Gk2nrbVDA/formResponse'

CSV_FILE = 'data/survey_responses.csv'

FIELD_MAPPING = {
    "Do you have any background in web development or design?  ": 'entry.1409240751',
    "  How often do you interact with websites or web apps?  ": 'entry.1608125',
    "What device do you use most often to browse the web? ": 'entry.769851704',
    "Please rate how important the following aspects are to you when using a website (with 1 being the least important and 5 the most):   [Aesthetic design (visuals)]": 'entry.674664249',
    "Please rate how important the following aspects are to you when using a website (with 1 being the least important and 5 the most):   [Responsiveness (adapts to screen size)]": 'entry.1869136801',
    'Please rate how important the following aspects are to you when using a website (with 1 being the least important and 5 the most):   [Accessibility (easy for all users, including with disabilities)]': 'entry.464926470',
    "Please rate how important the following aspects are to you when using a website (with 1 being the least important and 5 the most):   [Navigation (easy to find things)]": 'entry.2012751977',
    "Please rate how important the following aspects are to you when using a website (with 1 being the least important and 5 the most):   [Page speed and performance]": 'entry.1687995020',
    "When visiting a website, which of these annoys you the most?": 'entry.1282196343',
    "  Which design style do you personally prefer?  ": 'entry.658852855',
    "When a button or link is clicked, how important is it that there’s immediate feedback (like a color change or loading spinner)?": 'entry.787746205',
    "When shopping online, which two feature do you value most in the checkout process?  ": 'entry.671968419',
    "Have you ever used a website that felt especially well-designed? What made it stand out to you? ": 'entry.452887873',
    "Would you be interested in participating in future tests of new website designs (e.g., A/B testing)?  ": 'entry.2063378387',
    "If you answered yes to the question above, please leave a way of contact here:": 'entry.1314793666'
}

def submit_response(row: dict) -> requests.Response:
    """
    Submits a single row of survey data to the Google Form.

    Args:
        row (dict): A dictionary of CSV row data.

    Returns:
        Response: The HTTP response object.
    """
    data = {}
    for csv_field, entry_id in FIELD_MAPPING.items():
        value = row.get(csv_field, "").strip()
        
        if csv_field == "When shopping online, which two feature do you value most in the checkout process?  ":
            options = smart_split(value)
            for opt in options:
                data.setdefault(entry_id, []).append(opt)
        else:
            data[entry_id] = value

    for key, val in data.items():
        print(f"{key}: {val}")

    return requests.post(FORM_URL, data=data)

def main():
    with open(CSV_FILE, mode='r', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        count = 0
        for row in reader:
            print(f"\n🚀 Submitting row {count + 1}...")
            response = submit_response(row)
            if response.status_code == 200:
                print(f"✅ Row {count + 1} submitted successfully.")
            else:
                print(f"⚠️ Row {count + 1} may have failed (status {response.status_code}).")
            count += 1
            time.sleep(0.5)

    print(f"\n✅ Done! Submitted {count} rows.")

if __name__ == "__main__":
    main()
