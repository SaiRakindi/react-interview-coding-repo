import React, { useState } from "react";

const Items = () => {
  const [items, setItems] = useState([1, 2, 3]);

  const handleClick = () => {
    const newItems = [...items];
    newItems.push(4);
    setItems(newItems);
  };

  return (
    <div>
      <button onClick={handleClick}>Add Item</button>

      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default Items;
