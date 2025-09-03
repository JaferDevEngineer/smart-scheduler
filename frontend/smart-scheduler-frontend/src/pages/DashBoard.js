import { useEffect } from "react";
import { getConsumerAppointments,getConsumerAppCount } from "../services/appointmentService";
import { useAuth } from "../context/AuthContext";
import { useQuery } from "@tanstack/react-query";

import '../pageStyles/DashBoard.css'

const Dashboard = () => {
    const { user } = useAuth();
    console.log('DashBoard Rendered');
    const {data: counts,isLoading,error} = useQuery({
      queryKey: ["appointmentsCount",user.id],
      queryFn: () => getConsumerAppCount(user.id),
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
    const {data: appointments,appointmentLoading,appError} = useQuery({
      queryKey: ["appointmens",user.id],
      queryFn: () => getConsumerAppointments(user.id),
      staleTime: 5 * 60 * 1000, // 5 minutes
    });


      if (isLoading) {
    return <div className="dashboard-container">Loading...</div>;
  }

  if (error) {
    return <div className="dashboard-container">Error loading counts</div>;
  }

    return (
      <div className="dashboard-container">
        <h2 className="dashboard-header"> {`Welcome, ${user.name} :)`} </h2>
        <div className="status-grid">
          <div className="card pending">
            <h3> Upcoming </h3>
            <p>{counts.pending}</p>
          </div>
          <div className="card accepted ">
            <h3> Accepted </h3>
            <p>{counts.accepted}</p>
          </div>
          <div className="card cancelled">
            <h3> Cancelled </h3>
            <p>{counts.cancelled}</p>
          </div>
          <div className="card completed">
            <h3> Completed </h3>
            <p>{counts.completed}</p>
          </div>
          <div className="card declined">
            <h3> Declined </h3>
            <p>{counts.declined}</p>
          </div>
          <div className="card total">
            <h3> Total </h3>
            <p>{counts.total}</p>
          </div>
        </div>

        <div className="appointment-container">
          <h3>Your Appointments</h3>
          <div className="appointment-list">
            <table className="appointment-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Provider</th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      </div>
    );
    // return <div>Dashboard Page</div>;
}
export default Dashboard;