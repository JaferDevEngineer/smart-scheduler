import React, { useEffect, useState } from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import "react-datepicker/dist/react-datepicker.css";
import ReactDatePicker from "react-datepicker";

import "../pageStyles/CreateAppointmentDrawer.css";
import ClockRangePicker from "../components/ClockRangePicker";
import { useAuth } from "../context/AuthContext";
import { getUnAvailableTime } from "../services/appointmentService";
import {AppDrawPageMode} from "../constants/AppointmentDrawerPageMode"

const hhmmToMinutes = (t) => {
  const [h = "0", m = "0"] = String(t).split(":");
  return (parseInt(h, 10) || 0) * 60 + (parseInt(m, 10) || 0);
};
const pad2 = (n) => String(n).padStart(2, "0");
const minutesToHHMMSS = (mins) =>
  `${pad2(Math.floor(mins / 60))}:${pad2(mins % 60)}:00`;
const dateToYMDLocal = (d) =>
  `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;

function dateTimeToMinutes(dateTimeStr) {
  const date = new Date(dateTimeStr);
  return date.getHours() * 60 + date.getMinutes();
}

async function fetchUnavailableBlocks(providerId, consumerId, date,appointment) {
  let data = await getUnAvailableTime(consumerId, providerId, date);

  if(appointment){
    const starTime =appointment.startDateTime.split("T")[1];
    const endTime = appointment.endDateTime.split("T")[1];
    data = data.filter((d) => d.fromTime !== starTime && d.toTime !== endTime);
  }
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
function buildDateTime(dateStr, time) {
  return `${dateStr}T${time}`; // keep only HH:mm
}

export default function CreateAppointmentDrawer({
  pageType,
  appointment = null ,
  onClose,
  provider,
  open,
  submit,
}) {
  const { user } = useAuth();
 const [date, setDate] = useState(() => {
    // initial value
    return new Date().toISOString().split("T")[0];
  });

  const [timeRange, setTimeRange] = useState({
    fromTime: 11 * 60,
    toTime: 13 * 60,
  });
  const [notes, setNotes] = useState("");
  const [unavailable, setUnavailable] = useState([]);
  useEffect(() => {
    if (appointment?.startDateTime) {
      setDate(appointment.startDateTime.split("T")[0]);
      const timeRangeUpdate =  {fromTime: dateTimeToMinutes(appointment.startDateTime),toTime:dateTimeToMinutes(appointment.endDateTime)}; 
      setTimeRange(timeRangeUpdate)
      setNotes(appointment.notes)
    
    } else {
      setDate(new Date().toISOString().split("T")[0]);
    }
  }, [appointment]);
  const [canSubmit, setCanSubmit] = useState(true);


  const [submitting, setSubmitting] = useState(false);
  const NOTES_MAX = 500;

  useEffect(() => {
    if (!provider) return;
    (async () => {
      const blocks = await fetchUnavailableBlocks(provider.id, user.id, date,appointment);
      setUnavailable(blocks);
    })();
  }, [provider, date]);

  const handleSubmit = async () => {
    if (!canSubmit || !provider || submitting) return;

    const { fromTime, toTime } = timeRange;
    const startTime = minutesToHHMMSS(fromTime);
    const endTime = minutesToHHMMSS(toTime);
    const trimmedNotes = notes.trim();

    let startDateTime = buildDateTime(date, startTime);
    let endDateTime = buildDateTime(date, endTime);

    const dateChanged = appointment.startDateTime !== startDateTime || appointment.endDateTime !== endDateTime;
    const cancelled = false;
    try {
      setSubmitting(true);
      if (typeof submit === "function") {
        switch(pageType){
          case AppDrawPageMode.BOOK_APP:
            await submit(
            user.id,
            provider?.id,
            startDateTime,
            endDateTime,
            trimmedNotes
          );
            break;
        case AppDrawPageMode.UPDATE:
          await submit(
            appointment.uid,
            startDateTime,
            endDateTime,
            trimmedNotes,
            cancelled,
            dateChanged,
          );
          break;
        }
         
      }
      onClose?.();
    } catch (err) {
      console.error("Submit failed:", err);
    } finally {
      setSubmitting(false);
    }
  };

  // if(appointment){
  //   setDate(appointment.startDateTime.split("T")[0])
  // }

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
         <div className="title-row">
            <h2 className="drawer-title">Book Appointment</h2>

            <span
              className={`status-badge ${
                pageType === AppDrawPageMode.BOOK_APP
                  ? "requested"
                  : appointment?.status?.toLowerCase()
              }`}
            >
              {pageType === AppDrawPageMode.BOOK_APP ? "Requested" : appointment?.status}
            </span>
          </div>
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
              minDate={new Date()}
              shouldCloseOnSelect
              className="date-input"
              calendarClassName="brand-datepicker"
              popperClassName="date-popper"
              showPopperArrow={false}
              todayButton="Today"
            />
          </div>

          {/* Time range */}
          <div className="field">
            <label className="field-label">Time Range</label>
            <ClockRangePicker
              value={timeRange}
              onChange={(next) => setTimeRange(next)}
              onValidityChange={(ok) => {
                console.log("canSubmit ",ok )
                setCanSubmit(ok);
              }}
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
            disabled={!canSubmit || submitting || !provider}
            title={
              !canSubmit
                ? "Selected time overlaps an unavailable slot or is zero-length"
                : "Confirm appointment"
            }
          >
            {submitting
              ? "Booking…"
              : appointment
              ? "Update Appointment"
              : "Confirm Appointment"}
          </button>
        </footer>
      </div>
    </Drawer>
  );
}
