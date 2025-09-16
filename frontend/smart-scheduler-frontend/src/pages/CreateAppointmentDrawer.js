import { useState} from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import ClockRangePicker from "../components/ClockRangePicker";
import "../pageStyles/CreateAppointmentDrawer.css";

const CreateAppointmentDrawer = ({ onClose, provider }) => {
  const [timeRange, setTimeRange] = useState({ startTime: "10:00am", endTime: "11:00am" });

  const handleSubmit = () => {
    if (timeRange.startTime >= timeRange.endTime) {
      alert("End time must be after start time!");
      return;
    }

    console.log("Creating appointment", {
      provider: provider.id,
      ...timeRange,
    });

    onClose();
  };

  return (
    <Drawer
      open={!!provider}
      onClose={onClose}
      direction="right"
      size={400}
      className="appointment-drawer"
    >
      <div className="drawer-content">
        <h2>Book Appointment with {provider.name}</h2>

        <ClockRangePicker
          onChange={(range) => setTimeRange(range)}
          unavailable={["12:00", "12:30", "13:00"]} // Example: lunch break blocked
        />

        <button className="save-btn" onClick={handleSubmit}>
          Confirm Appointment
        </button>
      </div>
    </Drawer>
  );
};
export default CreateAppointmentDrawer;
