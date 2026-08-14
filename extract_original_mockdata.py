import json
import os

log_path = r"C:\Users\nekon\.gemini\antigravity-ide\brain\d5a8fc00-3f38-416e-a6d5-880cde2dd192\.system_generated\logs\transcript_full.jsonl"
out_path = r"c:\Users\nekon\SFCCdeta\src\data\mockData.js"

found_content = None

if os.path.exists(log_path):
    with open(log_path, 'r', encoding='utf-8') as f:
        for line in f:
            try:
                data = json.loads(line)
                # Look for mockData.js content in tool calls or responses
                content_str = json.dumps(data, ensure_ascii=False)
                if "window.INITIAL_PLAYERS" in content_str or "id: 'p01'" in content_str:
                    # Search inside tool_calls or content
                    tool_calls = data.get("tool_calls", [])
                    for tc in tool_calls:
                        args = tc.get("args", {})
                        code = args.get("CodeContent") or args.get("ReplacementContent")
                        if code and ("window.INITIAL_PLAYERS" in code or "id: 'p01'" in code) and len(code) > 5000:
                            found_content = code
            except Exception as e:
                pass

if found_content:
    print(f"Found original mockData.js content! Length: {len(found_content)}")
    # Clean any potential garbled text if present or write directly
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(found_content)
    print("Successfully restored full mockData.js from conversation history!")
else:
    print("Original mockData.js not directly found in transcript_full.jsonl, scanning alternative steps...")
