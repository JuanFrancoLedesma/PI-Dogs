const axios = require('axios'); //Importo axios para poder hacer peticiones a la api
const { Dog, Temperament } = require('../db'); //Importo las tablas de mi DB

const dogsFromApi = async () => {
    const breeds = await axios.get('https://api.thedogapi.com/v1/breeds?api_key=live_ab4GxOCmAOv1Y4DibXhZ4E55EETxcSsLE12yQj0IzOBKhnRnRhlcMicJOcOjtZeL')
    return breeds.data
}

const dogsFromDb = async () => {
    return await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    })
}

const formatApiBreed = (breeds) => {
    const breed = breeds.map(e => { //doy un formato a las razas traidas desde la api
        return {
            id: e.id,
            name: e.name,
            height: e.height.metric,
            weight: e.weight.metric,
            life_span: e.life_span,
            image: e.image.url,
            temperament: e.temperament,
            createdByUser: false
        }
    })
    return breed
}

const getAllBreeds = async () => {
    let dogsApi = await dogsFromApi()
    dogsApi = formatApiBreed(dogsApi) //le da la misma forma que mi base de datos
    const dogsDb = await dogsFromDb()
    const breeds = dogsApi.concat(dogsDb) //en un solo array tengo tanto las razas de la api como de la db
    return breeds
}

const filterByName = (array, name) => {
    let filter = array.filter(x => x.name.toLowerCase().includes(name.toLowerCase()))
    if (filter.length === 0) return false
    // let breeds = filter.map(x => x.name)
    return filter
}

const filterById = (array, id) => {
    return array.find(e => e.id == id)
}

const temperaments = async (breeds) => {
    try{
        let temperaments = []
        temperamentOfAllDogs = breeds.map(e => e.temperament)
        temperamentOfAllDogs.map(t => {
            if (!t) return
            return (t.split(',')
                .map(t => t.trim()).map(e => {
                    if (temperaments.some(t => t === e)) return
                    temperaments.push(e)
                }))
        })
        temperaments.map(t => {
            Temperament.findOrCreate({
                where: { name: t }
            })
        })
        return temperaments
    } catch(error){
        return false
    }

}

module.exports = {
    dogsFromApi,
    dogsFromDb,
    formatApiBreed,
    getAllBreeds,
    filterByName,
    filterById,
    temperaments
}