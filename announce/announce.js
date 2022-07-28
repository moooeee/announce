import { createRoot } from "react-dom/client";
import { useState, createRef, useImperativeHandle, forwardRef } from "react";

const announcerRef = createRef();

function VisuallyHidden({ children }) {
  return (
    <div
      style={{
        border: 0,
        clip: "rect(0 0 0 0)",
        clipPath: "inset(50%)",
        height: 1,
        margin: "0 -1px -1px 0",
        overflow: "hidden",
        padding: 0,
        position: "absolute",
        width: 1,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </div>
  );
}

function mountAnnouncer() {
  if (!announcerRef.current) {
    const node = document.createElement("div");
    document.body.prepend(node);
    createRoot(node).render(<Announcer ref={announcerRef} />);
  }
}

const Announcer = forwardRef(function Announcer(_, ref) {
  const [assertiveMsgs, setAssertiveMsgs] = useState([]);
  const [politeMsgs, setPoliteMsgs] = useState([]);

  const announce = (msg, type = "polite") => {
    if (type === "assertive") {
      setAssertiveMsgs((msgs) => [...msgs, msg]);
    } else {
      setPoliteMsgs((msgs) => [...msgs, msg]);
    }
  };

  useImperativeHandle(announcerRef, () => {
    return { announce };
  });

  return (
    <VisuallyHidden>
      <div aria-live="assertive" aria-relevant="additions" role="log">
        {assertiveMsgs.map((msg, index) => {
          return <div key={index}>{msg}</div>;
        })}
      </div>
      <div aria-live="polite" aria-relevant="additions" role="log">
        {politeMsgs.map((msg, index) => {
          return <div key={index}>{msg}</div>;
        })}
      </div>
    </VisuallyHidden>
  );
});

function announce(msg, type) {
  announcerRef.current.announce(msg, type);
}

export { mountAnnouncer, announce };
