import datetime
import random
import re

def random_timestamp(start_date: datetime.datetime, end_date: datetime.datetime) -> datetime.datetime:
    """
    Generates a random datetime between two datetime objects.

    Args:
        start_date (datetime): The earliest possible datetime.
        end_date (datetime): The latest possible datetime.

    Returns:
        datetime: A randomly selected datetime between start_date and end_date.
    """
    delta = end_date - start_date
    int_delta = int(delta.total_seconds())
    random_second = random.randint(0, int_delta)
    return start_date + datetime.timedelta(seconds=random_second)

def smart_split(s: str) -> list:
    """
    Splits a comma-separated string, but ignores commas inside parentheses.

    Args:
        s (str): The input string to split.

    Returns:
        list: A list of split and cleaned string parts.
    """
    return [x.strip() for x in re.split(r',\s*(?![^()]*\))', s) if x.strip()]

def clean_response(text: str) -> str:
    """
    Cleans AI response text to be a single line suitable for CSV.

    Args:
        text (str): The raw AI response.

    Returns:
        str: The cleaned response with no internal newlines and escaped quotes.
    """
    return ' '.join(text.strip().splitlines()).replace('"', '""')

def clean_json_response(raw_text: str) -> str:
    """
    Strips code block markers (like ```json ... ```) from the Gemini response.

    Args:
        raw_text (str): The raw response from Gemini.

    Returns:
        str: Cleaned JSON string.
    """
    cleaned = raw_text.strip()
    if cleaned.startswith("```json"):
        cleaned = cleaned[7:]
    if cleaned.startswith("```"):
        cleaned = cleaned[3:]
    if cleaned.endswith("```"):
        cleaned = cleaned[:-3]
    return cleaned.strip()
