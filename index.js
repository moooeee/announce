import { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { mountAnnouncer, announce } from "./announce";

function App() {
  const [msg, setMsg] = useState("");

  useEffect(() => {
    mountAnnouncer();
  }, []);

  return (
    <div>
      <div>
        <input value={msg} onChange={(e) => setMsg(e.target.value)} />
        <button onClick={() => announce(msg)}>announce</button>
      </div>
    </div>
  );
}

createRoot(document.getElementById("app")).render(<App />);
