import react from "react";
import { useState, useEffect } from "react"; //Manejar estado interno y ciclo de vida
import { useDispatch, useSelector } from "react-redux"; //Manejar estado global, traer estado y enviar acciones
import { breedCreate, getTemperaments } from "../../Actions"; //Traigo la action creator
import { Link, useHistory } from "react-router-dom";
import "./BreedCreate.css";

export default function BreedCreate() {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getTemperaments());
  }, []);

  const temperaments = useSelector((state) => state.temperaments);

  const [input, setInput] = useState({
    name: "",
    heightm: "",
    heightM: "",
    weightm: "",
    weightM: "",
    life_spanm: "",
    life_spanM: "",
    image: "",
    temperaments: [],
  });

  const [error, setError] = useState({});

  function handleInput(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setError(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSelect(e) {
    if (e.target.value === "default") return setInput({ ...input });
    if (input.temperaments.includes(e.target.value))
      return setInput({ ...input });
    setInput(() => {
      return {
        ...input,
        temperaments: [...input.temperaments, e.target.value],
      };
    });
    setError(
      validate({
        ...input,
        temperaments: [...input.temperaments, e.target.value],
      })
    );
  }

  function handleDelete(e) {
    e.preventDefault();
    setInput({
      ...input,
      temperaments: input.temperaments.filter(
        (temperament) => temperament !== e.target.value
      ),
    });
    setError(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function validate({
    name,
    heightm,
    heightM,
    weightm,
    weightM,
    life_spanm,
    life_spanM,
    temperaments,
  }) {
    let errors = {};
    //Altura
    heightm = Number(heightm);
    heightM = Number(heightM);
    weightm = Number(weightm);
    weightM = Number(weightM);
    life_spanm = Number(life_spanm);
    life_spanM = Number(life_spanM);
    //Nombre
    if (!name) errors.name = "Ingresa el nombre!";
    else if (!/[a-zA-Z]+/.test(name)) errors.name = "Solo letras!";
    //Altura
    if (!heightm || !heightM) errors.height = "Ingresa las alturas!";
    else if (/[[a-zA-Z]+]+/.test(heightm) || /[[a-zA-Z]+]+/.test(heightM))
      errors.height = "Solo números!";
    else if (heightm === heightM)
      errors.height = "Las alturas minimas y maximas deben ser diferentes";
    else if (heightm > heightM)
      errors.height = "La altura minima debe ser menor que la maxima";
    //Peso
    if (!weightm || !weightM) errors.weight = "Ingresa los pesos!";
    else if (weightm === weightM)
      errors.weight = "Los pesos minimos y maximos deben ser diferentes";
    else if (weightm > weightM)
      errors.weight = "El peso minimo debe ser menor que el maximo";
    else if (/[a-zA-Z]+]+/.test(weightm) || /[[a-zA-Z]+]+/.test(weightM))
      errors.weight = "Solo números!";
    //Esperanza de vida
    if (!life_spanm || !life_spanM)
      errors.life_span = "Ingresa los años de vida!(Opcional)";
    else if (life_spanm === life_spanM)
      errors.life_span =
        "Los años de vida minimos y maximos deben ser diferentes";
    else if (life_spanm > life_spanM)
      errors.life_span =
        "Los años de vida minimos debe ser menores que los maximos";
    if (temperaments && temperaments.length === 0)
      errors.temperaments = "Debes seleccionar al menos un temperamento!";
    return errors;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const newBreed = {
      name: input.name,
      weight: `${input.weightm} - ${input.weightM}`,
      height: `${input.heightm} - ${input.heightM}`,
      life_span: `${input.life_spanm} - ${input.life_spanM}`,
      image: input.image,
      temperaments: input.temperaments,
    };
    dispatch(breedCreate(newBreed));
    setInput({
      name: "",
      heightm: "",
      heightM: "",
      weightm: "",
      weightM: "",
      life_spanm: "",
      life_spanM: "",
      image: "",
      temperaments: [],
    });
    history.push('/home')
  }

  return (
    <div className="BreedCreate">
      <div className="encab">
        <div className="backbtn">
          <Link to="/home">
            <button>Home</button>
          </Link>
        </div>
        <div className="createTittle">
          <h1>Dogs Factory</h1>
        </div>
      </div>
      <div className="form">
        <form>
          <div className="entrada">
            <label>Nombre: </label>
            <input
              className="inputsimple"
              type="text"
              name="name"
              value={input.value}
              autoComplete="off"
              placeholder="Ingresa nombre de tu raza"
              maxLength="30"
              onChange={(e) => handleInput(e)}
              required
            />
          </div>
          <div className="error">{error.name && <p>{error.name}</p>}</div>
          <div className="entrada">
            <label>Altura: </label>
            <input
              className="inputdoble"
              type="number"
              max="110"
              min="7"
              name="heightm"
              value={input.heightm}
              placeholder="Altura mas baja en cm"
              onChange={(e) => handleInput(e)}
              required
            />
            <input
              className="inputdoble"
              type="number"
              max="110"
              min="7"
              name="heightM"
              value={input.heightM}
              placeholder="Altura mas alta en cm"
              onChange={(e) => handleInput(e)}
              required
            />
          </div>
          <div className="error">{error.height && <p>{error.height}</p>}</div>
          <div className="entrada">
            <label>Peso: </label>
            <input
              className="inputdoble"
              type="number"
              max="200"
              min="1"
              name="weightm"
              value={input.weightm}
              placeholder="Peso mas bajo en kg"
              onChange={(e) => handleInput(e)}
              required
            />
            <input
              className="inputdoble"
              type="number"
              max="200"
              min="1"
              name="weightM"
              value={input.weightM}
              placeholder="Peso mas alto en kg"
              onChange={(e) => handleInput(e)}
              required
            />
          </div>
          <div className="error">{error.weight && <p>{error.weight}</p>}</div>
          <div className="entrada">
            <label>Esperanza de vida: </label>
            <input
              className="inputdoble"
              type="number"
              max="30"
              min="1"
              name="life_spanm"
              value={input.life_spanm}
              placeholder="Años de vida minimos en años."
              onChange={(e) => handleInput(e)}
            />
            <input
              className="inputdoble"
              type="number"
              max="200"
              min="1"
              name="life_spanM"
              value={input.life_spanM}
              placeholder="Años de vida maximos en años."
              onChange={(e) => handleInput(e)}
            />
          </div>
          <div className="error">
            {error.life_span && <p>{error.life_span}</p>}
          </div>
          <div className="entrada">
            <label>Imagen del canino: </label>
            <input
              className="inputsimple"
              type="url"
              name="image"
              value={input.image}
              placeholder="Url o sube la foto de tu pc!"
              onChange={(e) => handleInput(e)}
            />
            {/* <input
            type='file'
            name=""
            value={input.image}
            onChange={(e) => handleInput(e)}
            /> */}
          </div>
          <div className="entrada">
            <select
              name="temperamentos"
              onChange={(e) => handleSelect(e)}
              required
            >
              <option name="temperaments" value="" key="0">
                Temperamentos
              </option>
              {temperaments.map((temperament, index) => {
                return (
                  <option
                    name="temperaments"
                    value={temperament}
                    key={index + 1}
                  >
                    {temperament}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="temperament_submit">
            <div className="temperamentError">
              {error.temperaments && <p>{error.temperaments}</p>}
              {input.temperaments?.map((temperament, index) => {
                return (
                  <div key={index} className='linea'>
                    <label>{temperament} </label>
                    <button
                      name="temperaments"
                      value={temperament}
                      onClick={(e) => handleDelete(e)}
                    >
                      Delete
                    </button>
                  </div>
                );
              })}
            </div>
            <div className="submitbtn">
              <button
                disabled={
                  !input.name ||
                  !input.heightM ||
                  !input.heightm ||
                  !input.weightm ||
                  !input.weightM ||
                  !input.temperaments.length ||
                  error.name ||
                  error.height ||
                  error.weight
                }
                onClick={(e) => handleSubmit(e)}
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
