import requests
import os

# Récupération des variables d'environnement pour les deux bases
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_ANON_KEY = os.getenv("SUPABASE_ANON_KEY")

SUPABASE_URL_DB2 = os.getenv("SUPABASE_URL_DB2")
SUPABASE_ANON_KEY_DB2 = os.getenv("SUPABASE_ANON_KEY_DB2")

def ping_database(url, anon_key, table_name, db_name):
    if not url or not anon_key:
        print(f"Les informations de connexion pour la base {db_name} ne sont pas définies.")
        return
    
    headers = {
        "apikey": anon_key,
        "Authorization": f"Bearer {anon_key}"
    }

    # Ping de la table spécifiée
    response = requests.get(f"{url}/rest/v1/{table_name}", headers=headers)
    
    if response.status_code == 200:
        print(f"Ping réussi pour {url}/{table_name} :", response.json())
    else:
        print(f"Erreur pour {db_name} :", response.status_code, response.text)

if __name__ == "__main__":
    print("=== Ping DB1 (accounts) ===")
    ping_database(SUPABASE_URL, SUPABASE_ANON_KEY, "accounts", "DB1")

    print("=== Ping DB2 (articles) ===")
    ping_database(SUPABASE_URL_DB2, SUPABASE_ANON_KEY_DB2, "articles", "DB2")
