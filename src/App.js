import React, { useEffect, useState } from "react";
import "./App.css";

const Entry = ({ pokemon, handleClick, selected, edit }) => {
  return (
    <>
      <button
        type="submit"
        className="entry"
        onClick={() => handleClick(pokemon)}
      >
        {`${selected === pokemon.id ? (edit ? "" : "X - ") : ""}${
          pokemon.id + " | " + pokemon.name
        }${edit ? (selected === pokemon.id ? " [O]" : "  []") : ""}`}
        {/*{`${selected === pokemon ? "X - " : ""}${pokemon}`}*/}
      </button>
    </>
  );
};

/*const POKEMON = [
  { id: 133, name: "Eevee", img: "/pokemonImg/eevee.png" },
  { id: 134, name: "Vaporeon", img: "/pokemonImg/vaporeon.png" },
  { id: 135, name: "Jolteon", img: "/pokemonImg/jolteon.png" },
  { id: 136, name: "Flareon", img: "/pokemonImg/flareon.png" },
  { id: 196, name: "Espeon", img: "/pokemonImg/espeon.png" },
  { id: 197, name: "Umbreon", img: "/pokemonImg/umbreon.png" },
  { id: 470, name: "Leafeon", img: "/pokemonImg/leafeon.png" },
  { id: 471, name: "Glaceon", img: "/pokemonImg/glaceon.png" },
  { id: 700, name: "Sylveon", img: "/pokemonImg/sylveon.png" },
];*/

/*const EntryArray = ({ selected, setSelected }) => {
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
};*/

const EditPanel = ({ edit, displayPokemon, handleSubmit, handleUpload }) => {
  /*const [newPokemon, setNewPokemon] = useState({
    name: "",
    img: null,
  });*/
  const [newName, setNewName] = useState("");
  const [newImg, setNewImg] = useState(null);

  return (
    <>
      {edit ? (
        <form className="editForm" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="newName">New Name : </label>
          <input
            type="text"
            id="newName"
            className="editInput"
            name="newPokemonName"
            value={newName}
            onInput={(e) => setNewName(e.target.value)}
          />
          <button
            type="submit"
            className="editSubmit"
            onClick={() => handleSubmit(newName, displayPokemon)}
          >
            Update Pokemon Name
          </button>
          <label htmlFor="newImg">New Image : </label>
          <input
            type="file"
            id="newImg"
            className="editInput"
            name="newPokemonImg"
            onChange={(e) => setNewImg(e.target.files[0])}
          />
          {/*<input
            type="text"
            id="newImg"
            className="editInput"
            name="newPokemonImg"
            value={newPokemon.newImg}
            onInput={(e) =>
              setNewPokemon({
                name: newPokemon.name,
                img: e.target.value,
              })
            }
          />*/}
          <button
            type="upload"
            className="editUpload"
            onClick={() => handleUpload(newImg, displayPokemon)}
          >
            Update Pokemon Image
          </button>
        </form>
      ) : (
        ""
      )}
    </>
  );
};

const PokemonDisplay = ({ displayPokemon }) => {
  console.log("yooooooo", displayPokemon);
  return (
    <>
      {displayPokemon.id && (
        <h1>{displayPokemon.id + " - " + displayPokemon.name}</h1>
      )}
      {displayPokemon.id && (
        <img src={`/api/pokemonImg/${displayPokemon.id}.png`} />
      )}
    </>
  );
};

const App = () => {
  /*const POKEMON = [
    "Eevee",
    "Vaporeon",
    "Jolteon",
    "Flareon",
    "Espeon",
    "Umbreon",
    "Leafeon",
    "Glaceon",
    "Sylveon",
  ];*/
  //const [selected, setSelected] = useState(null);
  const [POKEMON, setPOKEMON] = useState([]);
  const [edit, setEdit] = useState(false);
  const [editText, setEditText] = useState("");
  const [displayPokemon, setDisplayPokemon] = useState({
    id: null,
    name: null,
    img: null,
  });
  /*const displayPokemon =
    selected !== null ? POKEMON.find((pokemon) => pokemon === selected) : null;*/
  console.log(displayPokemon);
  console.log(displayPokemon.id);
  console.log(displayPokemon.name);
  console.log(displayPokemon.img);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const res = await fetch("/api/database");
      if (cancelled) {
        return;
      }
      const body = await res.json();
      if (cancelled) {
        return;
      }
      setPOKEMON(body.pokemon);
      console.log("body: ", body);
    })();

    return () => {
      cancelled = true;
    };
  }, []);
  POKEMON.forEach((element) => {
    console.log(element);
    console.log(element.id);
  });

  const handleClick = async (pokemon) => {
    setEditText("");
    setDisplayPokemon({
      id: pokemon.id,
      name: pokemon.name,
      img: pokemon.img,
    });
    /*await fetch("/api/pokemon", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pokemonForm: pokemon,
      }),
    })
      .then((res) => res.json())
      .then((displayPokemon) =>
        setDisplayPokemon({
          id: displayPokemon.data.id,
          name: displayPokemon.data.name,
          img: displayPokemon.data.img,
        })
      );*/
  };

  const handleSubmit = async (newName, currentPokemon) => {
    const url = "/api/editingName/" + currentPokemon.id;
    console.log(url);
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newName }),
    })
      .then((res) => res.json())
      .then((currentPokemon) =>
        POKEMON.forEach((element) => {
          if (currentPokemon.data.id === element.id) {
            element.name = currentPokemon.data.name;
            setDisplayPokemon({
              id: currentPokemon.data.id,
              name: currentPokemon.data.name,
              img: currentPokemon.data.img,
            });
          }
        })
      )
      .then(() => setEditText("Pokemon Name Changed"));
  };

  const handleUpload = async (newImg, currentPokemon) => {
    const url = "/api/editingImg/" + currentPokemon.id;
    console.log(url);
    await fetch(url, {
      method: "POST",
      body: newImg,
    });
    /*.then((res) => res.json())
      .then((currentPokemon) =>
        POKEMON.forEach((element) => {
          if (currentPokemon.data.id === element.id) {
            element.name = currentPokemon.data.name;
            setDisplayPokemon({
              id: currentPokemon.data.id,
              name: currentPokemon.data.name,
              img: currentPokemon.data.img,
            });
          }
        })
      )
      .then(() => setEditText("Pokemon Image Changed"));*/
  };

  const toggleEdit = () => {
    setEdit(!edit);
    setEditText("");
    console.log(edit);
  };

  const resetValues = async () => {
    setDisplayPokemon({
      id: null,
      name: null,
      img: null,
    });
    setEdit(false);
    await fetch("/api/reset")
      .then((res) => res.json())
      .then((body) => setPOKEMON(body.pokemon));
    setEditText("Pokemon Info Reset");
  };

  return (
    <>
      <div className="navbar">
        {POKEMON.map((pokemon) => {
          return (
            <Entry
              key={pokemon.id}
              pokemon={pokemon}
              handleClick={handleClick}
              selected={displayPokemon.id}
              edit={edit}
            />
          );
        })}
        <button
          type="submit"
          className="editButton"
          onClick={() => toggleEdit()}
        >
          Edit Pokemon
          {`${edit ? " - O" : ""}`}
        </button>
        <button
          type="reset"
          className="resetButton"
          onClick={() => resetValues()}
        >
          Reset
        </button>
      </div>
      <div className="editPanel">
        <EditPanel
          edit={edit}
          displayPokemon={displayPokemon}
          handleSubmit={handleSubmit}
          handleUpload={handleUpload}
        ></EditPanel>
        <h3>{editText}</h3>
      </div>
      <div className="display">
        <PokemonDisplay displayPokemon={displayPokemon} />
      </div>
    </>
  );
};

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
/*<div className="navbar">
        <EntryArray selected={selected} setSelected={setSelected} />
      </div>

//<p>{!data ? "Loading..." : data}</p>
//console.log("I am on", window.location.pathname);

/*const [data, setData] = React.useState(null);
  React.useEffect(() => {
    fetch("/api/pokemon")
      .then((res) => res.json())
      .then((data) => setData(JSON.stringify(data.message)));
  }, []);*/

export default App;
