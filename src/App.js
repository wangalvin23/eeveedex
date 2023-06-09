import React from "react";
import "./App.css";
import { useState } from "react";

const Entry = ({ selected, pokemon, handleClick }) => {
  return (
    <>
      <button
        type="submit"
        className="entry"
        onClick={() => handleClick(pokemon)}
      >
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
  const handleClick = async (pokemon) => {
    setSelected(pokemon.id);
    console.log(pokemon.id + pokemon.name + pokemon.img);
    await fetch("/api/pokemon", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pokemonForm: {
          id: pokemon.id,
          name: pokemon.name,
          img: pokemon.img,
        },
      }),
    });
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
  /*React.useEffect(() => {
    fetch("/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          name: "John",
          email: "john@example.com",
        },
      }),
    });
  });*/

  const [data, setData] = React.useState(null);
  React.useEffect(() => {
    fetch("/api/pokemon")
      .then((res) => res.json())
      .then((data) => setData(JSON.stringify(data.message)));
  }, []);

  const [selected, setSelected] = useState(null);
  const displayPokemon =
    selected !== null
      ? POKEMON.find((pokemon) => pokemon.id === selected)
      : null;

  //console.log("I am on", window.location.pathname);
  return (
    <>
      <div className="navbar">
        <EntryArray selected={selected} setSelected={setSelected} />
      </div>
      <div className="display">
        <PokemonDisplay displayPokemon={displayPokemon} />
      </div>
      <p>{!data ? "Loading..." : data}</p>
    </>
  );
};

export default App;
