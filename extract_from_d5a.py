import json, os

log_path = r"C:\Users\nekon\.gemini\antigravity-ide\brain\d5a8fc00-3f38-416e-a6d5-880cde2dd192\.system_generated\logs\transcript_full.jsonl"
print(f"Exists: {os.path.exists(log_path)}")

if os.path.exists(log_path):
    with open(log_path, 'r', encoding='utf-8') as f:
        for line in f:
            if "INITIAL_PLAYERS" in line and len(line) > 10000:
                print(f"Found line with INITIAL_PLAYERS! Length: {len(line)}")
                try:
                    data = json.loads(line)
                    # Check tool calls
                    tool_calls = data.get("tool_calls", [])
                    for tc in tool_calls:
                        args = tc.get("args", {})
                        code = args.get("CodeContent") or args.get("ReplacementContent")
                        if code and "INITIAL_PLAYERS" in code:
                            print(f"  Tool call code length: {len(code)}")
                            with open("extracted_d5a_mockdata.js", "w", encoding="utf-8") as out:
                                out.write(code)
                            print("  Saved to extracted_d5a_mockdata.js!")
                except Exception as e:
                    print("Error:", e)
