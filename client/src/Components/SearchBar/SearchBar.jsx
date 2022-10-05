import react from "react";
import { getBreedsByName } from "../../Actions";
import { useState } from "react";
import { useDispatch } from "react-redux";
import './SearchBar.css'

export default function SearchBar({page}) {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");

  function handleInput(e) {
    setInput(e.target.value);
    page(1)
  }

  function handleClick(e) {
    e.preventDefault();
    dispatch(getBreedsByName(input));
    setInput("");
  }

  return (
    <div className="searchContainer">
      <input
        className="searchInput"
        value={input}
        onChange={(e) => handleInput(e)}
        placeholder="Ingrese busqueda"
      />
      <button className="searchBtn" onClick={(e) => handleClick(e)}>Search</button>
    </div>
  );
}
