import React, { useState, useEffect } from "react";

export default function Stopwatch(){
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);
    const [active, setActive] = useState(false);

    useEffect(() => {

        let interval = null;
        if(active){
            interval = setInterval(() =>{
            clearInterval(interval);
                if(seconds === 59){
                    setSeconds(0);
                    if(minutes!==59){
                    setMinutes(minutes+1);
                    }
                    else{
                        setHours(hours+1);
                        setMinutes(0);
                    }

                }
                else{
                    setSeconds(seconds+1);
                }

            },1000)
            
        }
        return () => clearInterval(interval);
    },[seconds, minutes, hours, active])

    return(
        <div>
        <div className="main">
            {hours<10 ? `0${hours}` : hours}:
            {minutes<10 ?`0${minutes}` : minutes}:
            {seconds<10 ?`0${seconds}` : seconds}
            </div>

        <div className="control">
            <button onClick={() => setActive(true)}>Start</button>
            <button onClick={() => setActive(false)}>Stop</button>
            <button onClick={() =>{
          setActive(false);
          setSeconds(0);
          setMinutes(0);
          setHours(0);
        }}>Reset</button>
        </div>
        </div>
    )
}



