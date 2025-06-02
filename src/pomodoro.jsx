import React, { useState, useEffect } from "react";
import chime from "./chime.wav";

export default function Pomodoro() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [totminutes, setTotMinutes] = useState(0);
  const [totseconds, setTotSeconds] = useState(0);
  const [tothours, setTotHours] = useState(0);
  const [wminutes, setWMinutes] = useState(0);
  const [wseconds, setWSeconds] = useState(0);
  const [whours, setWHours] = useState(0);
  const [displayMessage, setDisplayMessage] = useState(false);
  const [active, setActive] = useState(false);
  const [intervals, setIntervals] = useState(5);
  const [trackintervals, setTrackIntervals] = useState(0);
  const chimeAudio = new Audio(chime);

  useEffect(() => {
    let interval = null;
    if (active) {
      interval = setInterval(() => {
        clearInterval(interval);

        if (totseconds === 59) {
          setTotSeconds(0);
          if (totminutes !== 59) {
            setTotMinutes(totminutes + 1);
          } else {
            setTotHours(tothours + 1);
            setTotMinutes(0);
          }
        } else {
          setTotSeconds(totseconds + 1);
        }

        if (displayMessage === false) {
          if (wseconds === 59) {
            setWSeconds(0);
            if (wminutes !== 59) {
              setWMinutes(wminutes + 1);
            } else {
              setWHours(whours + 1);
              setWMinutes(0);
            }
          } else {
            setWSeconds(wseconds + 1); //hello world
          }
        }

        if (seconds === 0) {
          if (minutes !== 0) {
            setSeconds(59);
            setMinutes(minutes - 1);
          } else {
            if (trackintervals % intervals === 4) {
              setMinutes(14);
              setSeconds(59);
              chimeAudio.play(0);
              setTrackIntervals(trackintervals + 1);
            } else {
              if (displayMessage === false) {
                setTrackIntervals(trackintervals + 1);
              }
              chimeAudio.play(0);
              let minutes = displayMessage ? 24 : 4;
              let seconds = 59;

              setSeconds(seconds);
              setMinutes(minutes);
              setDisplayMessage(!displayMessage);
            }
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [seconds, minutes, displayMessage, active]);

  return (
    <div>
      <div className="main">
        <div className="message">
          {displayMessage ? `Break time! New session starts in:` : ``}
        </div>
        <div className="clock">
          <div className="status1">
            <div>
              Total time &emsp;
              {tothours > 0
                ? tothours < 10
                  ? `0${tothours}:`
                  : `${tothours}:`
                : ``}
              {totminutes < 10 ? `0${totminutes}` : totminutes}:
              {totseconds < 10 ? `0${totseconds}` : totseconds}
            </div>

            <div>
              Time working &emsp;
              {whours > 0 ? (whours < 10 ? `0${whours}:` : `${whours}:`) : ``}
              {wminutes < 10 ? `0${wminutes}` : wminutes}:
              {wseconds < 10 ? `0${wseconds}` : wseconds}
            </div>
          </div>
          {minutes < 10 ? `0${minutes}` : minutes}:
          {seconds < 10 ? `0${seconds}` : seconds}
          <div className="status2">
            <div>
              {trackintervals < 10 ? `0${trackintervals}` : { trackintervals }}
              &emsp;Complete sessions
            </div>
            <div>
              {trackintervals}/{intervals - 1}&emsp; Until long break
            </div>
          </div>
        </div>
      </div>
      <div className="control">
        <button onClick={() => setActive(true)}>start</button>
        <button onClick={() => setActive(false)}>Pause</button>
        <button
          onClick={() => {
            setDisplayMessage(false);
            setActive(false);
            setSeconds(0);
            setMinutes(25);
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
