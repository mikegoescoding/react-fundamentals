import { useState, useEffect } from "react";

// ─── Joke App ─────────────────────────────────────────────────────────
// Demonstrates useEffect, async data fetching inside React,
// loading/error states, conditional rendering, and dynamic API URLs.
//
// Key concepts:
// - useEffect runs after render — used for side effects like fetching
// - Empty [] dependency array = run once on mount
// - [selectedType] dependency array = run whenever selectedType changes
// - useState(null) for data that hasn't loaded yet
// - Separate fetch function called by both useEffect and button click
// - response.ok must be checked manually — fetch doesn't throw on 404
// - && for conditional rendering when there's no else case
// - Ternary for conditional rendering when there are two possible outputs

function JokeApp() {
  const [joke, setJoke] = useState(null);
  const [types, setTypes] = useState(null);
  const [selectedType, setSelectedType] = useState("general");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch a joke for the currently selected type
  async function jokeGetter() {
    try {
      setLoading(true);
      setJoke(null);   // clear previous joke while loading
      setError(null);  // clear previous error

      const response = await fetch(
        `https://official-joke-api.appspot.com/jokes/${selectedType}/random`
      );

      if (!response.ok) {
        throw new Error(`Something went wrong: ${response.status}`);
      }

      const data = await response.json();
      setJoke(data[0]); // API returns an array — grab the first element
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }

  // Fetch available joke types once on mount
  async function typeGetter() {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        "https://official-joke-api.appspot.com/types"
      );

      if (!response.ok) {
        throw new Error(`Something went wrong: ${response.status}`);
      }

      const data = await response.json();
      setTypes(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }

  // Fetch types once when component mounts
  useEffect(() => {
    typeGetter();
  }, []);

  // Fetch a joke whenever selectedType changes (including on first mount)
  useEffect(() => {
    jokeGetter();
  }, [selectedType]);

  return (
    <div>
      {/* Conditional rendering with && — show or show nothing */}
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {joke && <p>{joke.setup}</p>}
      {joke && <p>{joke.punchline}</p>}
      {joke && (
        <p style={{ color: "gray", fontSize: "0.8rem", fontStyle: "italic" }}>
          Type: {joke.type}
        </p>
      )}

      <button onClick={() => jokeGetter()}>Get another joke</button>

      {/* Category selector — only renders once types have loaded */}
      {types && (
        <select onChange={(e) => setSelectedType(e.target.value)}>
          {types.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}

function App() {
  return (
    <div>
      <JokeApp />
    </div>
  );
}

export default App;
