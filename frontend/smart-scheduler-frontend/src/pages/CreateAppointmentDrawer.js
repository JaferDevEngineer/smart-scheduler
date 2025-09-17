import React, { useEffect, useState } from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import "react-datepicker/dist/react-datepicker.css";
import ReactDatePicker from "react-datepicker";

import "../pageStyles/CreateAppointmentDrawer.css";
import ClockRangePicker from "../components/ClockRangePicker";
import { useAuth } from "../context/AuthContext";
import { getUnAvailableTime } from "../services/appointmentService";

const hhmmToMinutes = (t) => {
  const [h = "0", m = "0"] = String(t).split(":");
  return (parseInt(h, 10) || 0) * 60 + (parseInt(m, 10) || 0);
};

async function fetchUnavailableBlocks(providerId, consumerId, date) {
  const data = await getUnAvailableTime(consumerId, providerId, date);

  const blocks = (Array.isArray(data) ? data : [])
    .map(({ fromTime, toTime }) => ({
      start: hhmmToMinutes(fromTime),
      end: hhmmToMinutes(toTime),
    }))
    .filter(
      (b) =>
        Number.isFinite(b.start) && Number.isFinite(b.end) && b.end > b.start
    );

  return blocks;
}

export default function CreateAppointmentDrawer({ onClose, provider, open }) {
  const { user } = useAuth();
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);
  const [unavailable, setUnavailable] = useState([]);
  const [timeRange, setTimeRange] = useState({
    fromTime: 11 * 60,
    toTime: 13 * 60,
  });
  const [canSubmit, setCanSubmit] = useState(true);

  const [notes, setNotes] = useState("");
  const NOTES_MAX = 500;

  useEffect(() => {
    if (!provider) return;
    (async () => {
      const blocks = await fetchUnavailableBlocks(provider.id, user.id, date);
      setUnavailable(blocks);
    })();
  }, [provider, date]);

  const handleSubmit = () => {
    if (!canSubmit) return;

    const fromDate = new Date(date);
    const toDate = new Date(date);
    const { fromTime, toTime } = timeRange;

    const setHM = (d, mins) =>
      d.setHours(Math.floor(mins / 60), mins % 60, 0, 0);
    setHM(fromDate, fromTime);
    setHM(toDate, toTime);
    if (toTime < fromTime) toDate.setDate(toDate.getDate() + 1);

    console.log("Creating appointment", {
      provider: provider.id,
      fromDate,
      toDate,
      timeRange,
      notes: notes.trim(),
    });
    onClose();
  };

  return (
    <Drawer
      open={!!open}
      onClose={onClose}
      direction="right"
      size={400}
      duration={380} // animation length in ms
      overlayOpacity={0.42} // built-in overlay fade
      overlayColor="rgba(15,23,42,.42)"
      className="appointment-drawer" // your inner content styles
    >
      <div className="drawer-shell">
        {/* Header */}
        <header className="drawer-header">
          <h2 className="drawer-title">Book Appointment</h2>
          <div className="drawer-subtitle">
            Provider: <strong>{provider?.name}</strong>
          </div>
        </header>

        {/* Scrollable body */}
        <main className="drawer-body">
          {/* Date */}
          <div className="field">
            <label htmlFor="dateField" className="field-label">
              Date
            </label>
            <ReactDatePicker
              id="dateField"
              selected={date}
              onChange={(d) => d && setDate(d.toISOString().split("T")[0])}
              dateFormat="EEE, dd MMM yyyy"
              //   minDate={new Date()}
              shouldCloseOnSelect
              className="date-input"
              calendarClassName="brand-datepicker"
              popperClassName="date-popper"
              showPopperArrow={false}
              todayButton="Today"
            />
          </div>

          {/* Time range */}
          <div className="field clock-field">
            <label className="field-label">Time Range</label>
            <ClockRangePicker
              value={timeRange}
              onChange={(next) => setTimeRange(next)}
              onValidityChange={(ok) => setCanSubmit(ok)}
              unavailable={unavailable}
              size={280}
              stepMinutes={5}
              showReadout={true}
              primaryColor="#273A4C"
            />
          </div>

          {/* Notes */}
          <div className="field">
            <label htmlFor="notesField" className="field-label">
              Notes (optional)
            </label>
            <textarea
              id="notesField"
              className="notes-textarea"
              placeholder="Add any notes for the provider…"
              value={notes}
              onChange={(e) => setNotes(e.target.value.slice(0, NOTES_MAX))}
              rows={5}
              maxLength={NOTES_MAX}
            />
            <div className="help-row">
              <span className="chars">
                {notes.length}/{NOTES_MAX}
              </span>
            </div>
          </div>
        </main>

        {/* Sticky footer */}
        <footer className="drawer-footer">
          <button
            className="save-btn"
            onClick={handleSubmit}
            disabled={!canSubmit}
            title={
              !canSubmit
                ? "Selected time overlaps an unavailable slot or is zero-length"
                : "Confirm appointment"
            }
          >
            Confirm Appointment
          </button>
        </footer>
      </div>
    </Drawer>
  );
}
