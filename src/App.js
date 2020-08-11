import React, { useState, useEffect } from "react";
import SetAlarm from "./Components/SetAlarm";
import Ring from "./Components/Ring";
import ListAlarms from "./Components/ListAlarms";

function App() {
  const [time, setTime] = useState({
    currentHour: "",
    currentMinute: "",
    currentSecond: "",
    currentDay: "",
    alarms: []
  });

  //Days
  const days = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];

  //Insert current time to state
  function currentTime() {
    let time = new Date().toLocaleTimeString("it-IT");
    let hours = time.substr(0, 2);
    let minutes = time.substr(3, 2);
    let seconds = time.substring(time.length - 2);

    setTime((prevState) => ({
      ...prevState,
      currentHour: hours,
      currentMinute: minutes,
      currentSecond: seconds
    }));
  }

  //Insert current date to state
  function currentDate() {
    let date = new Date();
    let day = days[date.getDay()];

    setTime((prevState) => ({
      ...prevState,
      currentDay: day
    }));
  }

  //Check if it's time
  function checkTime() {
    if (time.alarms[0]) {
      const alarms = time.alarms.map(function (alarm, i) {
        if (time.currentHour === alarm.hour && time.currentMinute === alarm.minute && time.currentSecond >= 0){
          return (
            <Ring
              message={alarm.message}
              key={i}
              alarm={alarm}
              removeAlarm={removeAlarm}
            />
          );
        }
      });
      return alarms;
    }
  }

  //Get info from Input Box
  function getAlarm(e) {
    e.preventDefault();

    let message = document.getElementById("text").value;
    let hour = document.getElementById("hours").value;
    let minute = document.getElementById("minutes").value;

    //Check if time is filled
    if(hour == '' && minute == ''){
      return;
    }

    //Set default Alarm message
    if(message == ''){
      message += 'Alarm !';
    }

    //Add id to alarm
    let id;
    
    if(time.alarms.length > 0 ){
      id = Math.max(...time.alarms.map((alarm) => alarm.id)) + 1
    }else{
      id = 1;
    }

    //Create new alarm object
    const newAlarm = {
      id: id,
      message: message,
      hour: hour,
      minute: minute
    };

    //Insert into state
    setTime((prevState) => ({
      ...prevState,
      alarms: [...prevState.alarms, newAlarm]
    }));
  }

  //Remove alarm
  function removeAlarm(alarm) {
    setTime(prevState => ({
      ...prevState,
      alarms:[...prevState.alarms.filter(el => el.id !== alarm.id)]
    }))
  }

  //Update current time every second
  useEffect(() => {
    const interval = setInterval(() => {
      currentTime();
      currentDate();
      checkTime();
    }, 1000);

    return () => clearInterval(interval);
  });

  return (
    <div className="container">
      {checkTime()}

      <div className="clock">
        <div className="time">
          <div className="column">
            <p>{time.currentDay}</p>
            <span>DAY</span>
          </div>

          <p className="dot">:</p>

          <div className="column">
            <p>{time.currentHour}</p>
            <span>HOURS</span>
          </div>

          <p className="dot">:</p>

          <div className="column">
            <p>{time.currentMinute}</p>
            <span>MINUTES</span>
          </div>

          <p className="dot">:</p>

          <div className="column">
            <p>{time.currentSecond}</p>
            <span>SECONDS</span>
          </div>
        </div>
      </div>

      <SetAlarm getInfo={getAlarm} />

      <ListAlarms alarms={time.alarms} removeAlarm={removeAlarm} />
    </div>
  );
}

export default App;
