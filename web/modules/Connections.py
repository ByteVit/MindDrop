import requests


def check_connection():
    try:
        requests.get("http://google.com",timeout=5)
        return True
    except requests.ConnectionError:
        return False
