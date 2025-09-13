import React from "react";
import { Link,useLocation } from "react-router-dom";
import "../components/sideBar.css";
import {ReactComponent as AppointmentIcon} from '../assests/dashboardLogos/reminder-appointment (1).svg'
import {ReactComponent as ProviderIcon} from '../assests/dashboardLogos/corporate.svg'
import {ReactComponent as HomeIcon} from '../assests/dashboardLogos/home.svg'
import {ReactComponent as MessageIcon} from '../assests/dashboardLogos/messages.svg'
import {ReactComponent as ReviewIcon} from '../assests/dashboardLogos/review.svg'
import {ReactComponent as AnalyticsIcon} from '../assests/dashboardLogos/dashboard-monitor.svg'
import {ReactComponent as NotificationIcon} from '../assests/dashboardLogos/bell-notification-social-media.svg'
import {ReactComponent as SettingsIcon} from '../assests/dashboardLogos/settings.svg'

const SideBar = () =>{
    const location = useLocation();
    return (
      <div className="sidebar">
        <h2 className="sidebar-logo"> Smart Scheduler</h2>
        <ul className="sidebar-links">
          <li className={location.pathname === "/dashboard" ? "active" : ""}>
          <span className="icon" > <HomeIcon /></span>
            <Link to="/dashboard">Home</Link>
          </li>
          <li
            className={
              location.pathname === "/appointments" ? "active" : ""
            }
          ><Link to="/appointments">
            <span className="icon" > <AppointmentIcon /></span>
            Appointments</Link>
          </li>
          <li
            className={
              location.pathname === "/providers" ? "active" : ""
            }
          >
            <Link to="/providers">
            <span className="icon" > <ProviderIcon /></span>
            Providers</Link>
          </li>
          <li
            className={
              location.pathname === "/dashboard/settings" ? "active" : ""
            }
          >
            <Link to="/dashboard/settings">
             <span className="icon" > <MessageIcon /></span>
            Chats</Link>
          </li>
          <li
            className={
              location.pathname === "/dashboard/settings" ? "active" : ""
            }
          >
            <Link to="/dashboard/settings">
             <span className="icon" > <ReviewIcon /></span>
             FeedBacks</Link>
          </li>
          
          <li
            className={
              location.pathname === "/dashboard/settings" ? "active" : ""
            }
          >
            <Link to="/dashboard/settings">
              <span className="icon" > <AnalyticsIcon /></span>
              Analytics</Link>
          </li>
          <li
            className={
              location.pathname === "/dashboard/settings" ? "active" : ""
            }
          >
            <Link to="/dashboard/settings">
            <span className="icon" > <NotificationIcon /></span>
            Notifications</Link>
          </li>
          <li
            className={
              location.pathname === "/dashboard/settings" ? "active" : ""
            }
          >
            <Link to="/dashboard/settings">
             <span className="icon" > <SettingsIcon /></span>
             Settings</Link>
          </li>
        </ul>
      </div>
    );
}
export default SideBar;