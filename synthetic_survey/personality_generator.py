import csv
import time
import json
import random
import sys
import os
from gemini_client import call_gemini
from helpers import clean_response

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

OUTPUT_FILE = "data/generated_personalities.csv"

def load_contexts(filepath: str) -> list:
    """
    Loads archetypes from a JSON file.

    Args:
        filepath (str): Path to the archetypes JSON file.

    Returns:
        list: List of archetype dictionaries.
    """
    with open(filepath, 'r', encoding='utf-8') as file:
        return json.load(file)

def generate_personality_prompt(i: int, archetypes: list, contexts: list, cultures: list, traits_list: list) -> str:
    num_archetypes = random.choice([1, 2])
    selected_archetypes = random.sample(archetypes, num_archetypes)
    
    archetype_types = ' & '.join([a['type'] for a in selected_archetypes])
    archetype_descriptions = '\n\n'.join(
        [f"{a['type']}: {a['description']}" for a in selected_archetypes]
    )
    
    context = random.choice(contexts)
    culture = random.choice(cultures)
    traits = random.sample(traits_list, k=random.randint(2, 3))
    traits_str = ', '.join(traits)
    
    bias_note = (
        "Also, include any contradictions or conflicting expectations this user might have "
        "(e.g., loves personalization but dislikes data tracking)."
    )
    
    prompt = (
        f"Generate a unique and detailed user personality profile for a web usability study.\n\n"
        f"User Archetypes: {archetype_types}\n"
        f"Descriptions:\n{archetype_descriptions}\n\n"
        f"Context: The user is currently engaged in the following activity:\n"
        f"{context}\n\n"
        f"Cultural & Geographic Background: {culture}\n\n"
        f"Psychographic Traits: {traits_str}\n\n"
        f"Include:\n"
        f"- Name, Age, Occupation (fictional)\n"
        f"- Tech savviness\n"
        f"- Browsing habits\n"
        f"- Design preferences (specific: colors, typography, animations, etc.)\n"
        f"- Web usability traits\n"
        f"- Frustrations & expectations when using websites\n"
        f"- Unique personal notes\n\n"
        f"{bias_note}\n\n"
        f"Make sure this profile is detailed and distinct. Label it as Profile #{i}."
    )
    
    return prompt


def generate_and_save_personalities(num_personalities: int):
    """
    Generates personalities using the Gemini API and saves them to a CSV file.

    Args:
        num_personalities (int): Number of personalities to generate.
    """
    archetypes = load_contexts('data/personalities/archetypes.json')
    print(f"Loaded {len(archetypes)} archetypes from 'data/personalities/archetypes.json'")
    contexts = load_contexts('data/personalities/contexts.json')
    print(f"Loaded {len(contexts)} contexts from 'data/personalities/contexts.json'")
    cultures = load_contexts('data/personalities/cultures.json')
    print(f"Loaded {len(cultures)} cultures from 'data/personalities/cultures.json'")
    traits = load_contexts('data/personalities/traits.json')
    print(f"Loaded {len(traits)} traits from 'data/personalities/traits.json'")
    fieldnames = ['id', 'profile_description']

    with open(OUTPUT_FILE, mode='a', newline='', encoding='utf-8') as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        if csvfile.tell() == 0:
            writer.writeheader()

        for i in range(51, num_personalities + 51):
            prompt = generate_personality_prompt(i, archetypes, contexts, cultures, traits)
            print(f"Generating personality #{i} ({archetypes[(i - 1) % len(archetypes)]['type']})...")
            profile_text = call_gemini(prompt)

            if not profile_text.strip():
                print(f"⚠️ Warning: Empty response for profile #{i}, skipping.")
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
    TOTAL_PERSONALITIES = 150  # Modify as needed
    generate_and_save_personalities(TOTAL_PERSONALITIES)
