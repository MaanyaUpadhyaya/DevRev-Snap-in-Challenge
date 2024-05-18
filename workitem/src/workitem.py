import requests

def create_work(api_key, owned_by, product_id):
    url= "https://api.devrev.ai/works.create"
    data = {
        "type": "issue",
        "applies_to_part": product_id,
        "owned_by": [owned_by],
        "title": "Work",
        
    }

    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
    }

    response = requests.post(url, headers=headers, json=data)

    if response.status_code == 201:
        print("Issue creation successful!")
        print(response.json())  # Print the response content
        return response.json()["work"]["id"]
    else:
        print("Error creating issue:")
        print(response.text)
        return None

def create_parts(api_key, url, owned_by, product_id):
    data = {
        "type": "capability",
        "name": "RCB",
        "owned_by": [owned_by],
        "parent_part": [product_id],
    }

    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
    }

    response = requests.post(url, headers=headers, json=data)

    if response.status_code == 201:
        print("Part creation successful!")
        print(response.json())
        part_id = response.json()["part"]["id"]
        create_work(api_key, owned_by, part_id)
        return part_id
    else:
        print("Error creating part:")
        print(response.text)
        return None

def create_product(api_key, url, owned_by):
    data = {
        "type": "product",
        "name": "ankith",
        "owned_by": [owned_by],
    }

    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
    }

    response = requests.post(url, headers=headers, json=data)

    if response.status_code == 201:
        print("Product creation successful!")
        print(response.json())
        product_id = response.json()["part"]["id"]
        create_parts(api_key, url, owned_by, product_id)
        return product_id
    else:
        print("Error creating product:")
        print(response.text)
        return None

api_key = "eyJhbGciOiJSUzI1NiIsImlzcyI6Imh0dHBzOi8vYXV0aC10b2tlbi5kZXZyZXYuYWkvIiwia2lkIjoic3RzX2tpZF9yc2EiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOlsiamFudXMiXSwiYXpwIjoiZG9uOmlkZW50aXR5OmR2cnYtaW4tMTpkZXZvLzJSM3Y5V05YQ0M6ZGV2dS8xIiwiZXhwIjoxODEwNjE5OTY0LCJodHRwOi8vZGV2cmV2LmFpL2F1dGgwX3VpZCI6ImRvbjppZGVudGl0eTpkdnJ2LXVzLTE6ZGV2by9zdXBlcjphdXRoMF91c2VyL2dvb2dsZS1vYXV0aDJ8MTA5NDM1MDExOTg4MzcyMDg3NzI2IiwiaHR0cDovL2RldnJldi5haS9hdXRoMF91c2VyX2lkIjoiZ29vZ2xlLW9hdXRoMnwxMDk0MzUwMTE5ODgzNzIwODc3MjYiLCJodHRwOi8vZGV2cmV2LmFpL2Rldm9fZG9uIjoiZG9uOmlkZW50aXR5OmR2cnYtaW4tMTpkZXZvLzJSM3Y5V05YQ0MiLCJodHRwOi8vZGV2cmV2LmFpL2Rldm9pZCI6IkRFVi0yUjN2OVdOWENDIiwiaHR0cDovL2RldnJldi5haS9kZXZ1aWQiOiJERVZVLTEiLCJodHRwOi8vZGV2cmV2LmFpL2Rpc3BsYXluYW1lIjoiNG5tMjBpczE5NyIsImh0dHA6Ly9kZXZyZXYuYWkvZW1haWwiOiI0bm0yMGlzMTk3QG5tYW1pdC5pbiIsImh0dHA6Ly9kZXZyZXYuYWkvZnVsbG5hbWUiOiI0Tk0yMElTMTk3IE1BQU5ZQSBSIE0gVVBBREhZQVlBIiwiaHR0cDovL2RldnJldi5haS9pc192ZXJpZmllZCI6dHJ1ZSwiaHR0cDovL2RldnJldi5haS90b2tlbnR5cGUiOiJ1cm46ZGV2cmV2OnBhcmFtczpvYXV0aDp0b2tlbi10eXBlOnBhdCIsImlhdCI6MTcxNjAxMTk2NCwiaXNzIjoiaHR0cHM6Ly9hdXRoLXRva2VuLmRldnJldi5haS8iLCJqdGkiOiJkb246aWRlbnRpdHk6ZHZydi1pbi0xOmRldm8vMlIzdjlXTlhDQzp0b2tlbi91bUhjbk5ZaiIsIm9yZ19pZCI6Im9yZ190WEhDR0U4ZDVxU2xrcEZnIiwic3ViIjoiZG9uOmlkZW50aXR5OmR2cnYtaW4tMTpkZXZvLzJSM3Y5V05YQ0M6ZGV2dS8xIn0.qMz1y-zeMmKoeOFZkGUviLZ3GmOzGeRobC40vRadjCsnbRuEZa6UAq3k8udRFM1PRSEsic7Yq-v2kXUddnCMczk9fSopOgKOSk_elX8otiSlz1sdI14uX2VYWWBXPxKyh8OqNVxGNcXS1XMOkV-QmV1Gg1kVAcIYXdz9RvvO-OYPkBLn1LbG3z3EFciTmJnJfSYHeJbL_H870-kD0HOh9bwbZp5Lq2rMUc1Kv8dD1lztUo6RuOtjLthsxQo5-5A1ef-WLkfa8p1ngc-F3zDBoaH-NVaUU_wI4rSO5AWNLU29ao4rqTO5fUFGFZvac7xNjPCzHKZYdC59Xj67rk9qRA"
url = "https://api.devrev.ai/parts.create"
owned_by = "don:identity:dvrv-in-1:devo/2R3v9WNXCC:devu/1"

create_product(api_key, url, owned_by)
