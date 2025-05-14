import json

def escape_multiline_code(source_code: str) -> str:
    """
    Takes a raw multiline source code string and returns a JSON-safe string,
    escaping newlines, quotes, and backslashes.

    Args:
        source_code (str): Multiline source code.

    Returns:
        str: Escaped JSON-compatible string.
    """
    return json.dumps(source_code)

if __name__ == "__main__":
    # Hardcoded multiline source code
    source_code = """
    CODE HERE
    """.strip()

    escaped_string = escape_multiline_code(source_code)

    print("\nEscaped JSON string:\n")
    print(escaped_string)
