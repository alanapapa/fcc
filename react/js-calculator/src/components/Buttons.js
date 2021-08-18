import React from "react";

const clearStyle = { background: "#ac3939" },
  operatorStyle = { background: "#666666" },
  equalsStyle = {
    background: "#004466",
    position: "absolute",
    height: 130,
    bottom: 5,
  };

const Buttons = (props) => {
  const buttons = [
    {
      id: "clear",
      className: "jumbo",
      style: clearStyle,
      value: "AC",
      onClick: props.initialize,
    },
    {
      id: "divide",
      onClick: props.operators,
      style: operatorStyle,
      value: "/",
    },
    {
      id: "multiply",
      onClick: props.operators,
      style: operatorStyle,
      value: "x",
    },
    {
      id: "seven",
      onClick: props.numbers,
      value: "7",
    },
    {
      id: "eight",
      onClick: props.numbers,
      value: "8",
    },
    {
      id: "nine",
      onClick: props.numbers,
      value: "9",
    },
    {
      id: "subtract",
      onClick: props.operators,
      style: operatorStyle,
      value: "‑",
    },
    {
      id: "four",
      onClick: props.numbers,
      value: "4",
    },
    {
      id: "five",
      onClick: props.numbers,
      value: "5",
    },
    {
      id: "six",
      onClick: props.numbers,
      value: "6",
    },
    {
      id: "add",
      onClick: props.operators,
      style: operatorStyle,
      value: "+",
    },
    {
      id: "one",
      onClick: props.numbers,
      value: "1",
    },
    {
      id: "two",
      onClick: props.numbers,
      value: "2",
    },
    {
      id: "three",
      onClick: props.numbers,
      value: "3",
    },
    {
      id: "zero",
      onClick: props.numbers,
      value: "0",
      className: "jumbo",
    },
    {
      id: "decimal",
      onClick: props.decimal,
      value: ".",
    },
    {
      id: "equals",
      onClick: props.evaluate,
      style: equalsStyle,
      value: "=",
    },
  ];

  return (
    <div>
      {buttons.map((item) => {
        return (
          <button
            key={item.id}
            id={item.id}
            className={item.className}
            onClick={item.onClick}
            value={item.value}
            style={item.style}
          >
            {item.value}
          </button>
        );
      })}
    </div>
  );
};

export default Buttons;
