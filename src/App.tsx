import React from "react";

function getRandomDivination() {
  const results = [
    "Great Fortune",
    "Moderate Fortune",
    "Small Fortune",
    "Neutral",
    "Minor Misfortune",
    "Major Misfortune"
  ];
  return results[Math.floor(Math.random() * results.length)];
}

export default function App(): JSX.Element {
  const [result, setResult] = React.useState<string>(() => getRandomDivination());

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", padding: 24 }}>
      <h1>Minor 6 Line Divination</h1>
      <p>Your omen: <strong>{result}</strong></p>
      <button onClick={() => setResult(getRandomDivination())}>Draw Again</button>
    </div>
  );
}
