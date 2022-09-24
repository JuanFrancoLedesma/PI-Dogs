const { Router } = require('express'); //Importo de express Router
const dogsRouter = Router(); // Defino mi router
const { Dog, Temperament } = require('../db'); //Importo las tablas de mi DB
const { getAllBreeds, filterByName, filterById, temperaments } = require('./functions')

//Defino un middleware que traera todos los datos de la api y de mi db, para que asi no importa desde que ruta ingrese el usuario, siempre tenga los datos disponibles.


dogsRouter.use((req, res, next) => {
    //Aqui mi codigo generico para todas las rutas
    
    //Utilizo la funcion cb next() para que luego de ejecutarse el middleware, continue hacia la ruta atacada
    next()
})

dogsRouter.get('/', async (req, res, next) => {
    try {
        const breeds = await getAllBreeds()
        temperaments(breeds)
        const { name } = req.query
        if (name) {
            const breedsFilter = filterByName(breeds, name)
            if (!breedsFilter) return res.status(400).send('No se encontraron razas.')
            return res.status(200).json(breedsFilter)
        }
        return res.status(200).send(breeds)

    } catch (error) {
        next(error)
        return res.status(400).send('Algo salio mal, estoy en /dogs')
    }

})

dogsRouter.get('/:idRaza', async (req, res) => {
    try {
        const breeds = await getAllBreeds()
        const { idRaza } = req.params;
        const breed = filterById(breeds, idRaza)
        console.log(breed);
        if (!breed) return res.status(400).send('No se encontro la raza')
        res.status(200).send(breed)
    } catch (error) {
        return res.status(400).send('Algo salio mal, estoy en /dogs:idRaza')
    }
})

dogsRouter.post('/', async (req, res) => {
    const {
        name,
        height,
        weight,
        life_span,
        image,
        temperaments
    } = req.body;
    if (!name || !height || !weight) return res.status(400).send('Faltan datos necesarios')
    try {
        const newBreed = await Dog.create({
            name,
            height,
            weight,
            life_span,
            image,
        })
        const breedTemper = await Temperament.findAll({
            where: {name : temperaments}
        })
        await newBreed.addTemperament(breedTemper)
        res.status(200).send(newBreed)
        // const dog = await Dog.findOne({ where: { name: newBreed.name }, include:{model : Temperament, 
        // } })
        // console.log(dog);
    } catch (error) {
        res.status(400).send('Algo fallo, estoy en post a /dog')
    }
})


module.exports = dogsRouter;