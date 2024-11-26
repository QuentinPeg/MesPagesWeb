import requests
import os

# Récupération des variables d'environnement
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_ANON_KEY  = os.getenv("SUPABASE_ANON_KEY")

def ping_database():
    if not SUPABASE_URL or not SUPABASE_ANON_KEY :
        print("Les variables d'environnement SUPABASE_URL et SUPABASE_ANON_KEY  ne sont pas définies.")
        return
    
    headers = {
        "apikey": SUPABASE_ANON_KEY ,
        "Authorization": f"Bearer {SUPABASE_ANON_KEY }"
    }

    # Exemple : Ping une table ou une requête minimale
    response = requests.get(f"{SUPABASE_URL}/rest/v1/accounts", headers=headers)
    
    if response.status_code == 200:
        print("Ping réussi :", response.json())
    else:
        print("Erreur :", response.status_code, response.text)

if __name__ == "__main__":
    ping_database()