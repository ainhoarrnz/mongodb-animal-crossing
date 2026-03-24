# mongodb-animal-crossing
MongoDB data analysis on Animal Crossing villagers dataset
# MongoDB Analysis — Animal Crossing Villagers

Data analysis project using MongoDB, Python and JavaScript on the 
Animal Crossing: New Horizons villagers dataset.

## Dataset

Two data sources combined:
- **Nookpedia API** — main villagers data (species, personality, appearances, etc.)
- **Kaggle CSV** ([NookPlaza Dataset](https://www.kaggle.com/datasets/jessicali9530/animal-crossing-new-horizons-nookplaza-dataset)) — hobby field

## Repository structure
```
├── tarea_Ainhoa_Arranz.js   ← MongoDB queries (filters, projections, aggregation pipelines)
├── hobbys.py                ← API ingestion + hobby field enrichment via PyMongo
├── tarea_graf.py            ← Species distribution chart + Fauna image (matplotlib)
├── villagers.csv            ← Supplementary dataset from Kaggle
├── Figure_1.png             ← Species distribution bar chart
└── Fauna.png                ← Output: Fauna villager image
```

## What the analysis covers

- Data ingestion from a REST API into MongoDB
- Field enrichment by combining two data sources (API + CSV) using PyMongo
- Filtering and projection queries
- Aggregation pipelines: distribution by species, personality, gender, game debut
- Cross-collection lookup ($lookup) to enrich villager data
- Data visualisation with matplotlib

## How to run

1. Start a local MongoDB instance (`mongod`)
2. Request a free API key at https://nookipedia.com/wiki/Nookipedia:API
3. Add your key to `hobbys.py`
4. Run `hobbys.py` to load data from the API and enrich with hobby field
5. Import `villagers.csv` via MongoDB Compass
6. Run queries in `tarea_Ainhoa_Arranz.js` using NoSQLBooster or mongosh
7. Run `tarea_graf.py` for visualisations

## Requirements
```
pymongo
requests
matplotlib
```

## Author

Ainhoa Arranz Martínez · MSc Big Data, Data Science & Business Analytics (UCM/NTIC)
