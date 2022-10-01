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
        const temperDb = await Temperament.findAll(); //Intento traer temperamentos desde la db
        if(temperDb.length>0){
            const temperaments = temperDb.map(e => e.name)
            return res.status(200).send(temperaments) // si ya estan cargados los devuelvo desde ahi
        }
        const breeds = await getAllBreeds(); //Sino me traigo todas las razas
        const temper = await temperaments(breeds) //Uso funcion que me consigue un array de los temperamentos disponibles
        if(temper) return res.status(200).send(temper) //Los devuelvo
        return res.status(404).send('Algo fallo')
    } catch (error) {
        console.log(error);
        res.status(400).send('Algo fallo, estoy en get a temperaments')
    }
})

module.exports = temperamentRouter;