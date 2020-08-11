import React from 'react';
import {useTransition, animated} from 'react-spring';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

function ListAlarms(props){
    const listAlarmTransitions = useTransition(props.alarms, (item) => item.id, {
        from: { opacity : 0},
        enter: { opacity: 1 },
        leave: { opacity: 0 }
    });

    //Passed Remove alarm function
    function removeAlarm(alarm) {
        props.removeAlarm(alarm);
    }

    return(
        <ul>
            {
                listAlarmTransitions.map(({ item, key, props }) =>
                item && <animated.div key={key} style={props}>
                            <FontAwesomeIcon 
                                icon={faTimesCircle} 
                                className="listIcon"
                                onClick={()=>{removeAlarm(item)}}
                                 />
                        <li
                            key={item.id}
                            id={item.id}
                        >   
                            <h3>{item.hour}:{item.minute}</h3>
                            <span>{item.message}</span>
                        </li>
                </animated.div>
                )
            }
        </ul>
    );
}

export default ListAlarms;
