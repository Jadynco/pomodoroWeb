import React, { useState, useEffect } from "react";

export default function SetModal({
  setShow,
  setTminutes,
  setTseconds,
  tseconds,
  tminutes,
  setThours,
  thours,
}) {
  const [error, setError] = useState(false);
  const [tempseconds, setTempseconds] = useState(tseconds);
  const [tempminutes, setTempminutes] = useState(tminutes);
  const [temphours, setTemphours] = useState(thours);

  const changeSeconds = (e) => {
    let value = e.target.value;

    if (value === "00") {
      setError(true);
    } else if (value < 60 && value > -1) {
      setTempseconds(value);
    } else {
      setError(true);
    }
  };

  const changeMinutes = (e) => {
    let value = e.target.value;

    if (value === "00") {
      setError(true);
    } else if (value < 60 && value > -1) {
      setTempminutes(value);
    } else {
      setError(true);
    }
  };

  const changeHours = (e) => {
    let value = e.target.value;

    if (value === "00") {
      setError(true);
    } else if (value < 100 && value > -1) {
      setTemphours(value);
    } else {
      setError(true);
    }
  };

  return (
    <div className="setdiv">
      <label>
        <p>Hours</p>
        <input type="number" value={temphours} onChange={changeHours}></input>
      </label>

      <label>
        <p>Minutes</p>
        <input
          type="number"
          value={tempminutes}
          onChange={changeMinutes}
        ></input>
      </label>

      <label>
        <p>Seconds</p>
        <input
          type="number"
          value={tempseconds}
          onChange={changeSeconds}
        ></input>
      </label>

      <button
        onClick={() => {
          setShow(false);
          {
            tempminutes !== "" ? setTminutes(tempminutes) : setTminutes(0);
          }
          {
            tempseconds !== "" ? setTseconds(tempseconds) : setTseconds(0);
          }
          {
            tempseconds !== "" ? setThours(temphours) : setThours(0);
          }
        }}
      >
        set
      </button>
    </div>
  );
}
