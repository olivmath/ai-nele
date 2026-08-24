"""Post the RWA carousel to LinkedIn."""
from pathlib import Path
import sys

sys.path.insert(0, str(Path(__file__).parent.parent))

from scoter.official.auth import load_token
from scoter.official.poster import create_document_post

POST_TEXT = """92% dos fundos crypto estão investindo em tokenização de ativos reais.
0% em memecoins.

Os números contam uma história clara.

No Brasil, as captações com ativos tokenizados \
saltaram de R$1,6 bi para R$3 bi em apenas 6 meses.

O sandbox da CVM fechou seu primeiro ciclo \
e autorizou 4 empresas a operar.

Não é projeção. São dados do primeiro semestre de 2026.

Enquanto as redes sociais focam em narrativas \
de curto prazo, o capital institucional está \
se posicionando em:

→ Títulos de renda fixa tokenizados
→ Cotas de fundos fracionadas on-chain
→ Imóveis com liquidez via marketplace

Os indícios apontam pra uma mudança estrutural \
no mercado cripto — de especulação pra infraestrutura.

Quais tendências vocês estão acompanhando?

#developer #programmer #blockchain #web3 #zkp #hackathon #solidity #rust #python #javascript #java #golang"""

PDF_PATH = Path(__file__).parent.parent / "carousel-rwa.pdf"


def main():
    token = load_token()
    if not token:
        print("ERROR: No token found. Run `scoter login` first.")
        sys.exit(1)

    print(f"Token: {token[:20]}...")
    print(f"PDF: {PDF_PATH} ({PDF_PATH.stat().st_size / 1024:.0f} KB)")
    print(f"Text length: {len(POST_TEXT)} chars")
    print()

    print("Uploading document and creating post...")
    result = create_document_post(token, POST_TEXT, PDF_PATH, title="RWA vs Memecoins — Dados 2026")
    print(f"SUCCESS! Post ID: {result}")


if __name__ == "__main__":
    main()
