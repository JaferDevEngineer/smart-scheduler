import React from "react";
import "../pageStyles/Appointments.css";
import { getConsumerAppointments } from "../services/appointmentService";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { FaEdit, FaTrash } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
const AppointmentsPage = () => {
  const { user } = useAuth();
  const {
    data: appointments = [], // default empty array
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["appointments", user?.id],
    queryFn: () => getConsumerAppointments(user.id),
    enabled: !!user?.id,
    staleTime: 5 * 60 * 1000,
  });

  const getStatusClass = (status) => {
    switch (status) {
      case "Upcoming":
        return "status upcoming";
      case "Ongoing":
        return "status ongoing";
      case "Completed":
        return "status completed";
      case "Cancelled":
        return "status cancelled";
      default:
        return "status";
    }
  };

  if (isLoading) return <p>Loading appointments...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className="appointments-container">
      <h2 className="page-title">Appointments</h2>
      <table className="appointments-table">
        <thead>
          <tr>
            <th>Appointment ID</th>
            <th>Provider</th>
            <th>Created At</th>
            <th>Start At</th>
            <th>End At</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appt) => (
            <tr key={appt.id}>
              <td>{appt.id}</td>
              <td>{appt.providerId}</td>
              <td>{new Date(appt.createdAt).toLocaleString()}</td>
              <td>{new Date(appt.startDateTime).toLocaleString()}</td>
              <td>{new Date(appt.endDateTime).toLocaleString()}</td>
              <td>
                <span className={getStatusClass(appt.status)}>
                  {appt.status}
                </span>
              </td>
              <td className="actions">
                <button className="edit-btn" >
                  <FaEdit />
                </button>
                <button className="delete-btn">
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentsPage;
