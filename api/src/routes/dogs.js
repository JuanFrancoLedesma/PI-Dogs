const { Router } = require("express"); //Importo de express Router
const dogsRouter = Router(); // Defino mi router
const { Dog, Temperament } = require("../db"); //Importo las tablas de mi DB
const { Op } = require("sequelize");
const {
  getAllBreeds,
  filterByName,
  filterById,
  temperaments,
  formatApiBreed,
  formatDbBreed
} = require("./functions");
const { default: axios } = require("axios");

//Defino un middleware que traera todos los datos de la api y de mi db, para que asi no importa desde que ruta ingrese el usuario, siempre tenga los datos disponibles.

dogsRouter.use((req, res, next) => {
  //Aqui mi codigo generico para todas las rutas

  //Utilizo la funcion cb next() para que luego de ejecutarse el middleware, continue hacia la ruta atacada
  next();
});

dogsRouter.get("/", async (req, res, next) => {
  try {
    const breeds = await getAllBreeds(); //Uso funcion para traer todas las razas de la api, de mi db y formatearlas
    temperaments(breeds); //Guardo los temperamentos en mi db
    const { name } = req.query; //verifico si llego algo por query
    if (name) {
      const breedsFilter = filterByName(breeds, name); //Si llego es que debo filtrar por esa palabra
      if (!breedsFilter)
        return res.status(400).send("No se encontraron razas."); //si no existe
      return res.status(200).json(breedsFilter); //Si se encontro algo
    }
    return res.status(200).send(breeds); //Simplemente envio las razas
  } catch (error) {
    next(error);
    return res.status(400).send("Algo salio mal, estoy en /dogs");
  }
});

// dogsRouter.get("/", async (req, res) => {
//   const {name} = req.query
//   try{
//     if(name){
//       const apiBreeds = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${name}`)
//       const apiFormat = formatApiBreed(apiBreeds.data)
//       return res.send(apiFormat)
//       const dbBreeds = await Dog.findAll({
//         where: {name:{[Op.like]: `%${name}%`}},
//         include: {
//           model: Temperament,
//           attributes: ['name'],
//           through: {
//               attributes: [],
//           }
//       }
//     })
//     // const apiFormat = formatApiBreed(apiBreeds.data)
//     const dbFormat = formatDbBreed(dbBreeds)
//     return res.status(200).send(apiBreeds.data.concat(dbFormat))
//     }
//     const breeds = await getAllBreeds()
//     res.status(200).send(breeds)
//   } catch(error){
//     res.status(400).send('No se encontraron razas')
//   }
//   })



dogsRouter.get("/:idRaza", async (req, res) => {
  try {
    const breeds = await getAllBreeds(); //traigo todas las razas
    const { idRaza } = req.params; //Me guardo el id
    const breed = filterById(breeds, idRaza); //Busco por ese id
    if (!breed) return res.status(400).send("No se encontro la raza");
    res.status(200).send(breed);
  } catch (error) {
    return res.status(400).send("Algo salio mal, estoy en /dogs:idRaza");
  }
});

dogsRouter.post("/", async (req, res) => {
  const { name, height, weight, life_span, image, temperaments } = req.body;
  if (!name || !height || !weight)
    return res.status(400).send("Faltan datos necesarios"); //Si no me mandan algo de esto la raza no se crea
  try {
    const newBreed = await Dog.create({ //Creo la raza
      name,
      height,
      weight,
      life_span,
      image,
    });
    const breedTemper = await Temperament.findAll({ //Traigo las instancias de temperamentos que coincidan con los pasados
      where: { name: temperaments },
    });
    await newBreed.addTemperament(breedTemper); //Relaciono mi nueva raza con cada temperamento
    res.status(200).send(newBreed); 
  } catch (error) {
    res.status(400).send("Algo fallo, estoy en post a /dog");
  }
});

dogsRouter.delete('/delete/:id', async (req,res)=>{
  const {id} = req.params; //Recibo un id por params
  try{
    const deletedBreed = await Dog.findByPk(id) //Busco alguna raza que coincida
    await deletedBreed.destroy() //La elimino
    res.status(200).send('La raza se elimino correctamente')
  } catch(error){
    res.status(400).send('No se pudo eliminar la raza')
  }

})

module.exports = dogsRouter;
