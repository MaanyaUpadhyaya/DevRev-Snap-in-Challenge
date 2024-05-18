**This code create a work item issue.**


**To create an issue we have to first create a product. The follwing code snippet helps in dong that:**
def create_product(api_key, url, owned_by):
    data = {
        "type": "product",
        "name": "Maanya",
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


**The next Step is to define capabilities of the product:**
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


**Then id of the capabilty used to create work item.**
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