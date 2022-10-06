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
  formatDbBreed,
  dogsFromDb,
  getDbBreedsOnly,
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
  const { name, height, weight, life_span, image, temperaments, password } =
    req.body;
  if (!name || !height || !weight || !password)
    return res.status(400).send("Faltan datos necesarios"); //Si no me mandan algo de esto la raza no se crea
  try {
    const newBreed = await Dog.create({
      //Creo la raza
      name,
      height,
      weight,
      life_span,
      image,
      password,
    });
    const breedTemper = await Temperament.findAll({
      //Traigo las instancias de temperamentos que coincidan con los pasados
      where: { name: temperaments },
    });
    await newBreed.addTemperament(breedTemper); //Relaciono mi nueva raza con cada temperamento
    res.status(200).send(newBreed);
  } catch (error) {
    console.log(error);
    res.status(400).send("Algo fallo, estoy en post a /dog");
  }
});

dogsRouter.delete("/delete/:id", async (req, res) => {
  const { id } = req.params; //Recibo un id por params
  try {
    const deletedBreed = await Dog.findByPk(id); //Busco alguna raza que coincida
    await deletedBreed.destroy(); //La elimino
    res.status(200).send("La raza se elimino correctamente");
  } catch (error) {
    res.status(400).send("No se pudo eliminar la raza");
  }
});

dogsRouter.put("/update/:id", async (req, res) => {
  const updateBreed = { ...req.body }; //Recibo por body los datos
  const { id } = req.params; //Me guardo el id de la raza a actualizar
  try {
    const oldBreed = await Dog.findByPk(id); //Busco la instancia de la raza

    if (oldBreed.dataValues.password !== updateBreed.password)
      return res.status(400).send("Contraseña invalida"); //verifico la contrasña

    const formatUpdateBreed = {
      name: updateBreed.name ? updateBreed.name : oldBreed.dataValues.name,
      height: updateBreed.height
        ? updateBreed.height
        : oldBreed.dataValues.height,
      weight: updateBreed.weight
        ? updateBreed.weight
        : oldBreed.dataValues.weight,
      life_span: updateBreed.life_span
        ? updateBreed.life_span
        : oldBreed.dataValues.life_span,
      password: oldBreed.dataValues.password,
    };

    if (!updateBreed.temperaments || updateBreed.temperaments.length === 0) {
      const breedsDb = await getDbBreedsOnly();
      const oldBreedTemperaments = breedsDb
        .find((b) => b.id === id)
        .temperament.split(", "); //Busco los temperamentos antiguos
      console.log(oldBreedTemperaments);
      const temperaments = await Temperament.findAll({
        where: { name: oldBreedTemperaments },
      });
      await oldBreed.update(formatUpdateBreed);
      await oldBreed.setTemperaments(temperaments);
      return res.send("Raza actualizada!");
    }
    const updateBreedTemperaments = updateBreed.temperaments;
    const temperaments = await Temperament.findAll({
      where: { name: updateBreedTemperaments },
    });
    await oldBreed.update(formatUpdateBreed);
    await oldBreed.setTemperaments(temperaments);
    res.send("Raza actualizada!");
  } catch (error) {
    console.log(error);
    res.status(400).send("Algo fallo en put a update");
  }
});

module.exports = dogsRouter;
