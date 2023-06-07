import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

const Entry = ({ selected, pokemon, handleClick }) => {
  return (
    <>
      <button className="entry" onClick={() => handleClick(pokemon.id)}>
        {`${selected === pokemon.id ? "X - " : ""}${pokemon.name}`}
      </button>
    </>
  );
};

const POKEMON = [
  { id: 133, name: "Eevee", img: "/pokemonImg/eevee.png" },
  { id: 134, name: "Vaporeon", img: "/pokemonImg/vaporeon.png" },
  { id: 135, name: "Jolteon", img: "/pokemonImg/jolteon.png" },
  { id: 136, name: "Flareon", img: "/pokemonImg/flareon.png" },
  { id: 196, name: "Espeon", img: "/pokemonImg/espeon.png" },
  { id: 197, name: "Umbreon", img: "/pokemonImg/umbreon.png" },
  { id: 470, name: "Leafeon", img: "/pokemonImg/leafeon.png" },
  { id: 471, name: "Glaceon", img: "/pokemonImg/glaceon.png" },
  { id: 700, name: "Sylveon", img: "/pokemonImg/sylveon.png" },
];

const EntryArray = ({ selected, setSelected }) => {
  const handleClick = (id) => {
    setSelected(id);
  };

  return (
    <>
      {POKEMON.map((pokemon) => {
        return (
          <Entry
            key={pokemon.id}
            selected={selected}
            pokemon={pokemon}
            handleClick={handleClick}
          />
        );
      })}
    </>
  );
};

const PokemonDisplay = ({ displayPokemon }) => {
  return <>{displayPokemon && <img src={displayPokemon.img} />}</>;
};

const App = () => {
  const [selected, setSelected] = useState(null);
  const displayPokemon =
    selected !== null
      ? POKEMON.find((pokemon) => pokemon.id === selected)
      : null;

  return (
    <>
      <div className="navbar">
        <EntryArray selected={selected} setSelected={setSelected} />
      </div>
      <div className="display">
        <PokemonDisplay displayPokemon={displayPokemon} />
      </div>
    </>
  );
};

export default App;
