import React, { useState, useEffect, useCallback } from "react";

const activeStyle = {
  backgroundColor: "orange",
  boxShadow: "0 3px orange",
  height: 77,
  marginTop: 13,
};

const inactiveStyle = {
  backgroundColor: "grey",
  marginTop: 10,
  boxShadow: "3px 3px 5px black",
};

const DrumPad = (props) => {
  const [padStyle, setPadStyle] = useState(inactiveStyle);

  const activatePad = useCallback(() => {
    if (props.power) {
      if (padStyle.backgroundColor === "orange") {
        setPadStyle(inactiveStyle);
      } else {
        setPadStyle(activeStyle);
      }
    } else if (padStyle.marginTop === 13) {
      setPadStyle(inactiveStyle);
    } else {
      setPadStyle({
        height: 77,
        marginTop: 13,
        backgroundColor: "grey",
        boxShadow: "0 3px grey",
      });
    }
    setTimeout(() => setPadStyle(inactiveStyle), 100);
  }, [props, padStyle, setPadStyle]);

  const playSound = useCallback(() => {
    const sound = document.getElementById(props.keyTrigger);
    sound.currentTime = 0;
    const playPromise = sound.play();
    if (playPromise !== undefined) {
      playPromise
        .then((_) => {
          console.log("1");
        })
        .catch((error) => {
          console.log("0");
        });
    }
    activatePad();
    setTimeout(() => activatePad(), 100);
    props.updateDisplay(props.clipId.replace(/-/g, " "));
  }, [activatePad, props]);

  useEffect(() => {
    function handleKeyPress(e) {
      if (e.keyCode === props.keyCode) {
        playSound();
      }
    }
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [playSound, props.keyCode]);

  return (
    <div
      className="drum-pad"
      id={props.clipId}
      onClick={playSound}
      style={padStyle}
    >
      <audio className="clip" id={props.keyTrigger} src={props.clip} />
      {props.keyTrigger}
    </div>
  );
};

export default DrumPad;
