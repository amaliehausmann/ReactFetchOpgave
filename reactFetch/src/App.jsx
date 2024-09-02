import { useEffect, useState } from "react";
import "./App.scss";

function App() {
  // Usestates
  const [jokeData, setJokeData] = useState();
  const [jokeType, setJokeType] = useState();
  const [selectedType, setSelectedType] = useState("");
  const [mode, setMode] = useState('light');
  const [modeImage, setModeImage] = useState('../src/assets/moon.svg')

  // API urls
  const defaultUrl = "https://official-joke-api.appspot.com/jokes/random";
  const typeurl = "https://official-joke-api.appspot.com/types";

  // Funktion der henter data fra et API. Hvis der ikke er noget specificeret API bruger den default API'et.
  // Tjekker om data'en er et Array. Hvis det er vælger den det første objekt i arrayet ellers bliver jokedata sat til dataen.
  async function fetchJoke(jokeUrl = defaultUrl) {
    const res = await fetch(jokeUrl);
    const data = await res.json();
    setJokeData(data);

    if (Array.isArray(data)) {
      setJokeData(data[0]);
    } else {
      setJokeData(data);
    }
  }

  // Fetcher en type af joke fra API'et, bliver kaldt når DOM loader. Anvender tomt dependcy array
  useEffect(() => {
    async function fetchJokeType() {
      const res = await fetch(typeurl);
      const data = await res.json();
      setJokeType(data);
    }

    fetchJokeType();
  }, []);

  // Kalder fetchJoke ved load. Anvender tomt dependency array
  useEffect(() => {
    fetchJoke();
  }, []);

  // Funktion der fetcher en joke når den bliver kaldt
  function getNewJoke() {
    fetchJoke();
  }

  // Funktion der tjekker om der er en selected typeurl.
  // Hvis der er det indsætter den selected type som en template string i url'en, og fetcher en joke fra det url
  function getJokeByCategory() {
    if (selectedType) {
      const jokebytypeurl = `https://official-joke-api.appspot.com/jokes/${selectedType}/random`;
      fetchJoke(jokebytypeurl);
    }
  }

  function changeStyle(){
    if(mode === 'light'){
      setMode('dark')
      setModeImage('../src/assets/sunny.svg')
    } else{
      setMode('light')
      setModeImage('../src/assets/moon.svg')
    }
  }

  return (
    <>
    <div className={mode}>
      <h1>HAHAHA!</h1>

      {/* Sætter en option som selectedtype når den bliver valgt */}
      <select
        name=""
        id=""
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
      >
        <option value="">Vælg kategori</option>
        {/* mapper hvert item i arrayet som options i en select */}
        {jokeType?.map((item) => {
          return (
            <option key={item} value={item}>
              {item}
            </option>
          );
        })}
      </select>
      {/* displayer joken */}
      {jokeData && (
        <>
          <h2>{jokeData.setup}</h2>
          <h3>{jokeData.punchline}</h3>
        </>
      )}
      {/* kalder funktionerne on click */}
      <button className="newJoke" onClick={() => getNewJoke()}>Get new joke</button>
      <button className="jokeCategory" onClick={() => getJokeByCategory()}>Get joke by category</button>
      <button className="lightDark" onClick={()=> changeStyle()}> <img src={modeImage} alt="" /> </button>
      </div>
    </>
  );
}

export default App;
