import { useState, useEffect } from "react";

function App() {
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (time === 0) {
      console.log("nada");
    } else {
      setInterval(() => {
        setTime(time + 0.1);
      }, 100);
    }
  }, [time]);

  function starTTimer() {
    setInterval(() => {
      setTime(time + 0.1);
    }, 100);
  }

  console.log(time);

  return (
    <div className="App">
      <h1>TIMER</h1>
      <div>{time}</div>
      <button onClick={() => starTTimer()}>START</button>
    </div>
  );
}

export default App;
