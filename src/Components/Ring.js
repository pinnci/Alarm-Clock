import React,{useState, useEffect} from 'react';
import {useTransition, animated} from 'react-spring';
import soundfile from '../Sound/alarm.mp3';

function Ring(props){
    const [showRing, setShowRing] = useState(true);

    const ringTransitions = useTransition(showRing, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    });

    //Message typed during setup of alarm
    let message = props.message;

    //Passed Remove alarm function
    function removeAlarm(alarm){
        props.removeAlarm(alarm);
    }

    //Turn off alarm
    function turnOff(e){
        e.preventDefault();     
        setShowRing(false);     
        removeAlarm(props.alarm);
    }

    //Play ring sound
    useEffect(()=>{
        const audioElement = document.getElementById('alarmSound');
        audioElement.play();
    },[showRing])

    return(
        <div>
            {ringTransitions.map(({ item, key, props }) =>
            item && <animated.div
                         key={key} 
                         style={props}
                         className="overlay"
                         >  
                            <form>
                                <h3>{message}</h3>
                                <button onClick={turnOff}>TURN OFF</button>
                                
                                <audio id="alarmSound">
                                    <source src={soundfile}></source>
                                </audio>
                            </form>
                         </animated.div>
            )}
        </div>
    );
}

export default Ring;