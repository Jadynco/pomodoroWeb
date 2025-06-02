import React, { useState, useEffect } from "react";
import chime from './chime.wav'
import SetModal from "./setModal"

export default function Timer ({setRblur}){
   const [minutes, setMinutes] = useState(30);
   const [tminutes, setTminutes] = useState(30);
   const [seconds, setSeconds] = useState(0);
   const [tseconds, setTseconds] = useState(0);
   const [hours, setHours] = useState(0)
   const [thours, setThours] = useState(0)
   const [active, setActive]= useState(false);
   const [show, setShow]= useState(false);   
   const chimeAudio = new Audio(chime);

   useEffect(()=>{
      setMinutes(tminutes);
      setSeconds(tseconds);
      setHours(thours);
      setRblur(show);
   },[tminutes,tseconds,thours,show])

   useEffect(() =>{
      let interval =null;

      if(active){
         interval = setInterval(() =>{
           
      
            if(seconds === 0){

               if(minutes > 0){
               setSeconds(59);
               setMinutes(prevMinutes => prevMinutes -1);
               } 

               else if(hours > 0){
                  setHours(prevHours => prevHours -1);
                  setMinutes(59);
                  setSeconds(59);
                     }
                  }
               
            
            else{
               setSeconds(prevSeconds => prevSeconds-1);
            }

            if(seconds<2 && minutes<1 && hours<1){
               chimeAudio.play();
               setActive(false)
               clearInterval(interval)
              
            }

         }, 1000);
      }
      return () => clearInterval(interval);
   },[hours,seconds,minutes,active,chimeAudio]);

  return(
<div>
<div className ={`timer ${show ? 'blur' : ''}`}>
   <div className="main">
     {hours > 0 ? (hours < 10 ? `0${hours}:` : `${hours}:`):``}
     {minutes < 10 ? `0${minutes}`: minutes}:
     {seconds < 10 ? `0${seconds}`: seconds}
   </div>

   <div className= "set">
      <button onClick={() => {
   
         setShow(true)
         setActive(false)
         }}>set</button>
   </div>
  
  <div className="control">
      <button onClick={() => setActive(true)}>Start</button>
      <button onClick={() => setActive(false)}>Stop</button>
      <button onClick={() =>{
          setActive(false);
          setSeconds(tseconds);
          setMinutes(tminutes);
          setHours(thours);
        }}>Reset</button>
   </div>

</div>
<div className= "modal">
      {show && <SetModal 
         setShow={setShow} tseconds={tseconds}
         setTminutes={setTminutes} tminutes={tminutes}
         setThours={setThours} thours={thours}
         setTseconds={setTseconds}>
         </SetModal>}
   </div>
</div>

);
}