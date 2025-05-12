import csv
import requests
import time
from helpers import smart_split
from survey_config import FIELD_MAPPING

FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdDKYlPuLiK9KheYt8LoDjxYkafQNUw2uNm64mq8Gk2nrbVDA/formResponse'

CSV_FILE = 'data/survey_responses.csv'

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
