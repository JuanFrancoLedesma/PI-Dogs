import react from "react";
import { getBreedsByName } from "../../Actions";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");

  function handleInput(e) {
    setInput(e.target.value);
  }

  function handleClick(e) {
    e.preventDefault();
    dispatch(getBreedsByName(input));
    setInput('')
  }

  return (
    <div>
      <input
        value={input}
        onChange={(e) => handleInput(e)}
        placeholder="Ingrese busqueda"
      />
      <button onClick={(e) => handleClick(e)}>Search</button>
    </div>
  );
}
