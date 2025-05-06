import csv
import time
import random
import json
import os
from gemini_client import call_gemini

OUTPUT_FILE = "data/generated_personalities.csv"
ARCHETYPES_FILE = "data/archetypes.json"

def load_archetypes(filepath):
    with open(filepath, 'r', encoding='utf-8') as file:
        return json.load(file)

def generate_personality_prompt(i: int, archetypes) -> str:
    """
    Creates a diverse prompt to generate a unique personality.

    Args:
        i (int): The index number for uniqueness.
        archetypes (list): List of archetypes loaded from the JSON file.

    Returns:
        str: A formatted prompt string.
    """
    archetype = random.choice(archetypes)

    prompt = (
        f"Generate a unique and detailed user personality profile for a web usability study.\n\n"
        f"User Archetype: {archetype['type']}\n"
        f"Description: {archetype['description']}\n\n"
        f"Include:\n"
        f"- Name, Age, Occupation (fictional)\n"
        f"- Tech savviness\n"
        f"- Browsing habits\n"
        f"- Design preferences (be specific: colors, typography, animations, etc.)\n"
        f"- Web usability traits\n"
        f"- Frustrations & expectations when using websites\n"
        f"- Additional unique details to make the user distinct\n\n"
        f"Make sure this profile is significantly different from others and includes rich details. Label it as Profile #{i}."
    )
    return prompt

def clean_response(text: str) -> str:
    """
    Cleans the AI response to be a single line suitable for CSV.

    Args:
        text (str): The raw AI response.

    Returns:
        str: The cleaned response with no internal newlines.
    """
    return ' '.join(text.strip().splitlines()).replace('"', '""')

def generate_and_save_personalities(num_personalities: int):
    """
    Generates personalities using the Gemini API and saves them to a CSV file.

    Args:
        num_personalities (int): The number of personalities to generate.
    """
    archetypes = load_archetypes(ARCHETYPES_FILE)
    fieldnames = ['id', 'profile_description']

    print(f"Loaded {len(archetypes)} archetypes from {ARCHETYPES_FILE}")

    with open(OUTPUT_FILE, mode='a', newline='', encoding='utf-8') as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        if csvfile.tell() == 0:
            writer.writeheader()

        for i in range(1, num_personalities + 1):
            prompt = generate_personality_prompt(i, archetypes)
            print(f"Generating personality #{i} ({archetypes[(i - 1) % len(archetypes)]['type']})...")
            profile_text = call_gemini(prompt)

            if not profile_text.strip():
                print(f"Warning: Empty response for profile #{i}, skipping.")
                continue

            cleaned_text = clean_response(profile_text)
            print(f"✅ Saved profile #{i}")

            writer.writerow({
                'id': f"profile_{i}",
                'profile_description': cleaned_text
            })

            time.sleep(0.5)

    print(f"\n✅ Done! {num_personalities} diverse personalities saved to {OUTPUT_FILE}")

if __name__ == "__main__":
    TOTAL_PERSONALITIES = 50
    generate_and_save_personalities(TOTAL_PERSONALITIES)
