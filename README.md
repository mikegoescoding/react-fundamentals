# React Fundamentals

React component exercises covering hooks, state, props, async data fetching, and conditional rendering.

## What I practiced

- `useState` — storing and updating values React watches and re-renders on change
- `useEffect` — running side effects after render (data fetching, subscriptions)
- Dependency arrays — `[]` for on-mount only, `[value]` to re-run when value changes
- Props with destructuring — passing data from parent to child components
- Multiple component instances with independent state
- Async data fetching inside React components
- Loading states and error states
- Conditional rendering with `&&` and ternary operators
- Dynamic API URLs using template literals and state values
- `e.target.value` in onChange handlers — the React equivalent of `this.value`

## Files

| File | Description |
|------|-------------|
| `Counter.jsx` | useState, props, conditional styling, multiple instances |
| `JokeApp.jsx` | useEffect, async fetch, loading/error states, category dropdown |

## How to run

These are React components — they need a Vite project to run.

```bash
npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev
```

Then replace `src/App.jsx` with the contents of either file.

## Key concepts

**`useState` rule** — never update state directly. Always use the setter function or React won't see the change and won't re-render.

**`useEffect` dependency array** — controls when the effect runs. Empty `[]` means once on mount. `[value]` means every time that value changes.

**`response.ok`** — fetch only throws for network failures. Always check `response.ok` for HTTP errors like 404.

**`&&` vs ternary** — use `&&` when there's no else case (show or show nothing). Use ternary when there are two possible outputs (show this or show that).

## Tech stack

React, Vite, JavaScript
