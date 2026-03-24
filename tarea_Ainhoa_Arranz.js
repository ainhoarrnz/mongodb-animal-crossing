use tarea
db.villagers.countDocuments()
db.villagers_csv.countDocuments()

// Conocer los campos 
db.villagers.findOne()

//Añadir el campo Hobby mediante pyhton (no incluido en la API)
db.villagers.findOne({hobby: {$exists: true}}, {name: 1, hobby: 1, _id: 0})
db.villagers.countDocuments({hobby: {$exists: true}})

// Eliminar campos no relevantes
db.villagers.updateMany({}, {$unset: {"title_color": "", "text_color": ""}})

// Insertar un aldeano de prueba
db.villagers.insertOne({name: "Prueba", species: "Cat", personality: "Lazy"})

// Borrar el aldeano de prueba
db.villagers.deleteOne({name: "Prueba"})

// Filtrado y proyección

// Contar todos los aldeanos
db.villagers.find().count()

// Ver especies y personalidades únicas
db.villagers.distinct("species")
db.villagers.distinct("personality")

// Aldeanos que son Mouse Y personalidad Cranky
db.villagers.find({$and: [{"species": "Mouse"}, {"personality": "Cranky"}]})

// Comprobamos si están los 12 signos del zodiaco
db.villagers.distinct("sign")

// Aldeanos Sagitario de diciembre
db.villagers.find({$and: [{"sign": "Sagittarius"}, {"birthday_month": "December"}]})

// Aldeanos Sagitario de diciembre Y personalidad Snooty
db.villagers.find({$and: [{"sign": "Sagittarius"}, {"birthday_month": "December"}, {"personality": "Snooty"}]})

// Proyección con campos relevantes
db.villagers.find({}, {"species": 1, "gender": 1, "personality": 1, "phrase": 1, "sign": 1, "_id": 0})

// Ordenar por nombre y limitar a 5
db.villagers.find({}, {"name": 1, "species": 1, "_id": 0}).sort({"name": 1}).limit(5)

// Encontrar el villager favorito de mi amiga
db.villagers.find({"name": "Fauna"})

// Encontrar si hay villagers con mi mismo cumpleaños
db.villagers.find({$and: [{"birthday_month": "April"}, {"birthday_day": "23"}]})



//Pipeline de agregación

//Cuántos aldeanos hay por especie
db.villagers.aggregate([{$group: {"_id": "$species", total: {$sum: 1}}}, {$sort: {total:-1}}])

//Cuántos aldeanos hay por personalidad
db.villagers.aggregate([{$group: {_id: "$personality", total: {$sum: 1}}}, {$sort: {total: -1}}])

//Cuántos aldeanos hay por género 
db.villagers.aggregate([{$group: {_id: "$gender", total: {$sum: 1}}}, {$sort: {total: -1}}])

//Cuántos aldeanos se añaden por cada juego
db.villagers.aggregate([{$group: {_id: "$debut", total: {$sum: 1}}}, {$sort: {total: -1}}])

//Top 1 especie más frecuente con pesonalidad top 1 más frecuente 
db.villagers.aggregate([{$match: {"personality": "Lazy"}}, {$group: {_id: "$species", total: {$sum: 1}}}, {$sort: {total: -1}}, {$limit: 1}])

//Ordenar los juegos según número de vecinos
db.villagers.aggregate([{$unwind: "$appearances"}, {$group: {_id: "$appearances", total: {$sum: 1}}}, {$sort: {total: -1}}])

//Hobby más común por juego
db.villagers.aggregate([
    {$match: {hobby: {$exists: true}}},
    {$unwind: "$appearances"},
    {$group: {_id: {game: "$appearances", hobby: "$hobby"}, total: {$sum: 1}}},
    {$sort: {total: -1}}
])

//Consultar datos de la colección csv para el vecino Fauna
db.villagers.aggregate([
    {$match: {name: "Fauna"}},
    {$lookup: {
        from: "villagers_csv",
        localField: "name",
        foreignField: "Name",
        as: "csv_data"
    }},
    {$unwind: "$csv_data"},
    {$project: {
        name: 1,
        "csv_data.Color 1": 1,
        "csv_data.Color 2": 1,
        _id: 0
    }}
])
