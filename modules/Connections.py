import requests


def check_connection():
    try:
        requests.get("http://google.com",timeout=3)
        return True
    except requests.ConnectionError:
        return False
