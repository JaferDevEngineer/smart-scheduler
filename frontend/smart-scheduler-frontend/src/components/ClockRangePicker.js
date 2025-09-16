import { useState } from "react";
import TimeKeeper from "react-timekeeper";
import "./ClockRangePicker.css"


const ClockRangePicker = ({ onChange, unavailable = [] }) => {
      const [startTime, setStartTime] = useState("10:00am");
  const [endTime, setEndTime] = useState("11:00am");
  const [picking, setPicking] = useState("start"); // "start" or "end"

  const handleChange = (newTime) => {
    if (picking === "start") {
      setStartTime(newTime.formatted);
      setPicking("end");
    } else {
      setEndTime(newTime.formatted);
      setPicking("start");
      onChange({ startTime: newTime.formatted, endTime }); // callback after range selected
    }
  };

  const isUnavailable = (hour, minute) => {
    const formatted = `${hour}:${minute < 10 ? "0" + minute : minute}`;
    return unavailable.includes(formatted);
  };

  return (
    <div className="clock-range-picker">
      <div className="summary">
        <span>From: {startTime}</span>
        <span>To: {endTime}</span>
      </div>

      <TimeKeeper
        time={picking === "start" ? startTime : endTime}
        onChange={handleChange}
        switchToMinuteOnHourSelect
        forceCoarseMinutes={false}
        coarseMinutes={5}
        disabledTimeRangeValidator={({ hour, minute }) =>
          isUnavailable(hour, minute)
        }
      />

      <p className="hint">
        Now selecting: <strong>{picking.toUpperCase()}</strong> time
      </p>
    </div>
  );

};
export default ClockRangePicker;