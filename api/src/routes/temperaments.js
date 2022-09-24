const { Router } = require('express'); //Importo de express Router
const temperamentRouter = Router(); // Defino mi router
const { Dog, Temperament } = require('../db'); //Importo las tablas de mi DB
const { getAllBreeds, temperaments } = require('./functions')

temperamentRouter.use((req, res, next) => {
    //Aqui mi codigo generico para todas las rutas


    //Utilizo la funcion cb next() para que luego de ejecutarse el middleware, continue hacia la ruta atacada
    next()
})


temperamentRouter.get('/', async (req, res) => {
    try {
        const temperDb = await Temperament.findAll();
        if(temperDb.length>0){
            const temperaments = temperDb.map(e => e.name)
            return res.status(200).send(temperaments)
        }
        const breeds = await getAllBreeds();
        const temper = await temperaments(breeds)
        if(temper) return res.status(200).send(temper)
        return res.status(404).send('no se que onda')
    } catch (error) {
        console.log(error);
        res.status(400).send('Algo fallo, estoy en get a temperaments')
    }
})

module.exports = temperamentRouter;