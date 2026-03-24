import requests
from pymongo import MongoClient

# Conexión a MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["tarea"]
collection = db["villagers"]

# Llamada a la API de Nookpedia
url = "https://api.nookipedia.com/villagers"
headers = {"X-API-KEY": "TU_API_KEY"}  # Solicitar en https://nookipedia.com/wiki/Nookipedia:API}

response = requests.get(url, headers=headers)
data = response.json()

print(f"Aldeanos obtenidos de la API: {len(data)}")

collection.insert_many(data)
print(f"Aldeanos insertados correctamente: {len(data)}")

#Añadir la columna hobby a la colección villagers a partir de los datos de villagers_csv
villagers = db["villagers"]
villagers_csv = db["villagers_csv"]

for aldeano in villagers_csv.find():
    villagers.update_one(
        {"name": aldeano["Name"]},
        {"$set": {"hobby": aldeano["Hobby"]}}
    )

print("Hobby añadido correctamente")