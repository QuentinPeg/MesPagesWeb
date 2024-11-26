import requests
import os

def ping_database(base_url, api_key, table_name="accounts"):
    """
    Ping une base de données Supabase et récupère les données d'une table.

    Args:
        base_url (str): URL de la base de données Supabase.
        api_key (str): Clé API de la base de données.
        table_name (str): Nom de la table à interroger.
    """
    if not base_url or not api_key:
        print(f"Les informations de connexion pour la base {base_url} ne sont pas définies.")
        return
    
    headers = {
        "apikey": api_key,
        "Authorization": f"Bearer {api_key}"
    }

    # Effectue une requête GET sur la table spécifiée
    response = requests.get(f"{base_url}/rest/v1/{table_name}", headers=headers)
    
    if response.status_code == 200:
        print(f"Ping réussi pour {base_url}/{table_name} :", response.json())
    else:
        print(f"Erreur pour {base_url}/{table_name} :", response.status_code, response.text)

if __name__ == "__main__":
    # Base de données 1
    SUPABASE_URL = os.getenv("SUPABASE_URL")
    SUPABASE_ANON_KEY = os.getenv("SUPABASE_ANON_KEY")

    # Base de données 2
    SUPABASE_URL2 = os.getenv("SUPABASE_URL2")
    SUPABASE_ANON_KEY2 = os.getenv("SUPABASE_ANON_KEY2")

    # Ping base de données 1
    print("=== Ping DB1 ===")
    ping_database(SUPABASE_URL, SUPABASE_ANON_KEY, table_name="accounts")

    # Ping base de données 2
    print("=== Ping DB2 ===")
    ping_database(SUPABASE_URL2, SUPABASE_ANON_KEY2, table_name="users")  # Exemple avec une autre table
