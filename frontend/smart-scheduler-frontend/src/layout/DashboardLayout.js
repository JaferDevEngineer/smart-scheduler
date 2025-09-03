import SideBar from "../components/Sidebar";

import "../layout/DashBoardLayout.css"

const DashBoardLayout = ({children}) => {
    console.log('DashboardLayout Rendered',children);
  return (
    <div className="dashboard-layout">
      <SideBar/>
      <div className="dashboard-content">
        {/* <div className="dashboard-header">
          <h2> Welcome to Smart scheduler</h2>
        </div> */}
        <div className="dashboard-main"> {children}</div>
      </div>
    </div>
  );
}
export default DashBoardLayout;

