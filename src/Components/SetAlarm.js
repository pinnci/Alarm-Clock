import React, { useState } from 'react';
import {useTransition, animated} from 'react-spring';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle} from '@fortawesome/free-solid-svg-icons'

function SetAlarm(props){
    const [validate,setValidate] = useState({
        hours:'',
        minutes:''
    })

    const [alarm,setAlarm] = useState(false);

    const alarmTransitions = useTransition(alarm, null, {
        from: { position: 'absolute', opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
    })

    //Update hours state on input change
    function updateHours(e){
        let value = e.target.value;
        let hours = document.getElementById('hours');
        let errHours = document.getElementById('errHours');

        setValidate(prevState => ({
            ...prevState,
           hours:value
        }))

        if(hours.value > 23 || hours.value < 1 || hours.value.length == 1){
            hours.style.border='1.5px solid red';
            errHours.innerHTML='<span>Please enter 01-23</span>'
        }else{
            hours.style.border='1px solid grey'
            errHours.innerHTML='';
        }
    }

    //Turn off set alarm input by click on overlay
    function turnOff(e){
        if(e.target.className==='overlay' && e.target.className !== 'setAlarmForm'){
            setAlarm(false);
        }
    }

    //Update minutes state on input change
    function updateMinutes(e){
        let value = e.target.value;
        let minutes = document.getElementById('minutes');
        let errMinutes = document.getElementById('errMinutes');

        setValidate(prevState => ({
            ...prevState,
            minutes:value
        }))

        if(minutes.value > 59|| minutes.value < 1 || minutes.value.length == 1 ){
            minutes.style.border='1.5px solid red';
            errMinutes.innerHTML='<span>Please enter 01-59</span>';
        }else{
            minutes.style.border='1.5px solid grey';
            errMinutes.innerHTML='';
        }
    }

    //Validate form on submit
    function validateForm(e){
        e.preventDefault();
        let getInfo;

        let hours = document.getElementById('hours');
        let errHours = document.getElementById('errHours');
        let minutes = document.getElementById('minutes');
        let errMinutes = document.getElementById('errMinutes');

        let errCount = 0;

        if(Number(validate.hours) > 23 || Number(validate.hours) < 1 || validate.hours.length === 1 || validate.hours === ''){
                hours.style.border='1.5px solid red';
                errHours.innerHTML='<span>Please enter 01-23</span>';
                errCount++;
        }

        if(Number(validate.minutes) > 59 || Number(validate.minutes) < 1 || validate.minutes.length === 1 || validate.minutes === ''){
                minutes.style.border='1.5px solid red';
                errMinutes.innerHTML='<span>Please enter 01-59</span>';
                errCount++;
        }

        if(errCount === 0){
            return (
                getInfo = props.getInfo(e),
                setAlarm(false),
                setValidate({
                    hours:'',
                    minutes:''
                })
            )
        }else{
            return;
        }
    }

    return(
        <div>
            <button className="btn-setAlarm" onClick={()=>setAlarm(true)}>SET ALARM</button>

                {
                    alarmTransitions.map(({ item, key, props }) =>
                    item && 
                    <animated.div 
                        key={key} 
                        style={props}
                        className="overlay"
                        onClick={turnOff}>
                            <form className='setAlarmForm' onSubmit={validateForm}>
                                <FontAwesomeIcon 
                                    icon={faTimesCircle} 
                                    className="closeIcon"
                                    onClick={() => setAlarm(false)} />

                                <h3>Please set your alarm</h3>

                                <label htmlFor="text">Message</label>
                                <input type="text" id="text" autoComplete="off" autoFocus="on" />

                                <div className="flex">
                                    <div className="inputNumber">
                                        <label htmlFor="hours">Hour</label>
                                        <input type="number" id="hours" onChange={updateHours} />
                                        <div id="errHours"></div>
                                    </div>
                                
                                    <div className="inputNumber">
                                        <label htmlFor="minutes">Minute</label>
                                        <input type="number" id="minutes" onChange={updateMinutes} />
                                        <div id="errMinutes"></div>
                                    </div>
                                </div>
                                <button onClick={validateForm}>SET ALARM</button>
                            </form>
                    </animated.div>
                    )
                }
        </div>
    );
}

export default SetAlarm;