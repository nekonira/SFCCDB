import base64
import os

src_path = r"C:\Users\nekon\.gemini\antigravity-ide\brain\ac89fd2a-cb35-4d55-ac69-24a7b845f8e8\.user_uploaded\media_1789437889536.jpg"
dst_path = r"c:\Users\nekon\SFCCdeta\src\data\haalandDemonCardImage.js"

with open(src_path, "rb") as f:
    b64 = base64.b64encode(f.read()).decode("utf-8")

js_content = f'window.HAALAND_DEMON_CARD_IMAGE = "data:image/jpeg;base64,{b64}";\n'

with open(dst_path, "w", encoding="utf-8") as f:
    f.write(js_content)

print(f"Card image generated successfully! ({len(js_content)} bytes)")
