"""Post 'Enquanto isso lá na firma' with image to LinkedIn."""
from pathlib import Path
import sys

sys.path.insert(0, str(Path(__file__).parent.parent))

from scoter.official.auth import load_token
from scoter.official.poster import create_image_post

POST_TEXT = """Enquanto isso lá na firma....

#developer #programmer #python #javascript #typescript #rust #solidity #golang #java #kotlin #blockchain #web3 #coding #softwareengineering"""

IMAGE_PATH = Path("/Users/olivmath/Desktop/Captura de Tela 2026-08-25 às 19.05.58.png")


def main():
    token = load_token()
    if not token:
        print("ERROR: No token found. Run `scoter login` first.")
        sys.exit(1)

    if not IMAGE_PATH.exists():
        print(f"ERROR: Image not found at {IMAGE_PATH}")
        sys.exit(1)

    print(f"Token: {token[:20]}...")
    print(f"Image: {IMAGE_PATH} ({IMAGE_PATH.stat().st_size / 1024:.0f} KB)")
    print(f"Text length: {len(POST_TEXT)} chars")
    print()

    print("Uploading image and creating post...")
    result = create_image_post(token, POST_TEXT, IMAGE_PATH)
    print(f"SUCCESS! Post ID: {result}")


if __name__ == "__main__":
    main()
