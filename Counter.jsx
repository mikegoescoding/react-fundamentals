import { useState } from "react";

// ─── Counter Component ────────────────────────────────────────────────
// Demonstrates useState, props with destructuring, conditional styling,
// and multiple instances of a component with independent state.
//
// Key concepts:
// - useState returns [currentValue, setterFunction]
// - Never update state directly — always use the setter
// - Props are function arguments for components
// - Each component instance has its own independent state
// - The left side holds whatever the right side returns

function Counter({ startingCount }) {
  const [count, setCount] = useState(startingCount);

  return (
    <div>
      {/* Conditional inline style — re-evaluates every render */}
      <h1 style={{ color: count < 0 ? "red" : "white" }}>{count}</h1>
      <button onClick={() => setCount(count + 1)}>Add 1</button>
      <button onClick={() => setCount(count - 1)}>Subtract 1</button>
      {/* Reset goes back to the prop value, not hardcoded 0 */}
      <button onClick={() => setCount(startingCount)}>Reset</button>
    </div>
  );
}

// Three independent counters — same component, different starting values
// Clicking Add 1 on one counter does not affect the others
function App() {
  return (
    <div>
      <Counter startingCount={0} />
      <Counter startingCount={10} />
      <Counter startingCount={-5} />
    </div>
  );
}

export default App;
