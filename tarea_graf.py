import requests
import matplotlib.pyplot as plt
import matplotlib.image as mpimg
import numpy as np
from io import BytesIO
from pymongo import MongoClient

# Conexión a MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["tarea"]
collection = db["villagers"]

# Gráfica de la distribución de especies
pipeline = [
    {"$group": {"_id": "$species", "total": {"$sum": 1}}},
    {"$sort": {"total": -1}}
]

resultados = list(collection.aggregate(pipeline))
especies = [r["_id"] for r in resultados]
totales = [r["total"] for r in resultados]

colores = plt.cm.PuRd(np.linspace(0.3, 0.9, len(especies)))

fig, ax = plt.subplots(figsize=(14, 7))
bars = ax.bar(especies, totales, color=colores, edgecolor="white", linewidth=1.5)

for bar, total in zip(bars, totales):
    ax.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 0.3,
            str(total), ha="center", va="bottom", fontsize=9, fontweight="bold")

ax.set_facecolor("#F9F9F9")
fig.patch.set_facecolor("#F9F9F9")
ax.spines["top"].set_visible(False)
ax.spines["right"].set_visible(False)
ax.set_title("Aldeanos por especie en Animal Crossing", fontsize=16, fontweight="bold", pad=20)
ax.set_xlabel("Especie", fontsize=12)
ax.set_ylabel("Número de aldeanos", fontsize=12)
plt.xticks(rotation=45, ha="right", fontsize=10)
plt.tight_layout()
plt.show()

# Mostrar la imagen de Fauna
fauna = collection.find_one({"name": "Fauna"})
response = requests.get(fauna["image_url"])
img = mpimg.imread(BytesIO(response.content), format="png")

plt.figure(figsize=(4, 4))
plt.imshow(img)
plt.axis("off")
plt.title(fauna["name"])
plt.show()