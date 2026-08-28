"""Post The DAO hack carousel to LinkedIn."""
from pathlib import Path
import sys

sys.path.insert(0, str(Path(__file__).parent.parent))

from scoter.official.auth import load_token
from scoter.official.poster import create_document_post

POST_TEXT = """US$ 60 milhões drenados em loop. Literalmente.

Em 2016, o The DAO era o maior crowdfunding da história: US$ 150 milhões arrecadados em 28 dias.

Até que alguém descobriu que a função splitDAO fazia uma chamada externa antes de zerar o saldo do usuário.

O atacante criou um contrato que reentrava pelo fallback e repetia o saque. Cada chamada drenava mais ETH antes que o saldo fosse atualizado.

3,6 milhões de ETH desapareceram.

O resultado? O Ethereum se dividiu em dois: ETH e Ethereum Classic.

Um hard fork para reverter um bug.

A linha que causou tudo:

call.value(balance)();
balances[msg.sender] = 0; // tarde demais

A ordem importa. Sempre.

Esse caso popularizou o padrão Checks-Effects-Interactions e mudou para sempre como escrevemos smart contracts.

Desliza no carrossel para ver o código vulnerável e a transação na blockchain.

#blockchain #web3 #solidity #security #ethereum #smartcontracts"""

PDF_PATH = Path(__file__).parent.parent.parent / "pdfs" / "carousel-hack-01-the-dao.pdf"


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
    result = create_document_post(token, POST_TEXT, PDF_PATH, title="The DAO Hack — US$ 60M em Reentrancy")
    print(f"SUCCESS! Post ID: {result}")


if __name__ == "__main__":
    main()
