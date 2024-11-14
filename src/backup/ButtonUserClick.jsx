import React from "react";

const ButtonUserClick = () => {
  const [position, setPosition] = useState(0);

  const handleClick = (event) => {
    if (event.clientX < window.innerWidth / 2) {
      setPosition(position - 50);
    } else {
      setPosition(position + 50);
    }
  };

  useEffect(() => {
    setPosition(window.innerWidth / 2 - 50);
  }, []);

  return (
    <div>
      <div style={{ width: "100vw", height: "100vh" }} onClick={handleClick}>
        <button
          style={{ position: "absolute", top: "50%", left: `${position}px` }}
        >
          Click me
        </button>
      </div>
    </div>
  );
};

export default ButtonUserClick;
