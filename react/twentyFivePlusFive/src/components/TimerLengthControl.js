import React from "react";

const TimerLengthControl = (props) => {
  return (
    <div className="length-control">
      <div id={props.titleID}>{props.title}</div>
      <button
        className="btn-level"
        id={props.minID}
        onClick={props.onClick}
        value="-"
      >
        <i className="fa fa-arrow-down fa-2x" />
      </button>
      <div className="btn-level" id={props.lengthID}>
        {props.length}
      </div>
      <button
        className="btn-level"
        id={props.addID}
        onClick={props.onClick}
        value="+"
      >
        <i className="fa fa-arrow-up fa-2x" />
      </button>
    </div>
  );
};

export default TimerLengthControl;
