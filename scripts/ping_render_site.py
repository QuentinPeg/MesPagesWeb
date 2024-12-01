import requests
import os

RENDER_SITE_URL = os.getenv("RENDER_SITE_URL")

def ping_site(url):
    if not url:
        print("L'URL du site Render n'est pas définie.")
        return
    
    try:
        response = requests.get(url)
        if response.status_code == 200:
            print(f"Ping réussi pour le site : {url}")
        else:
            print(f"Erreur pour le site {url} :", response.status_code, response.text)
    except Exception as e:
        print(f"Erreur lors du ping du site {url} :", str(e))

if __name__ == "__main__":
    print("=== Ping du site Render ===")
    ping_site(RENDER_SITE_URL)
