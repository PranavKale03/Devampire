import React from "react";

import "./Users.css";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import UsersList from "./UsersList";

const Users = () => {

  return (
    <div className="home-container-1">
      <LeftSidebar />
      <div className="home-container-2" style={{ marginTop: "40px" }}>
        <h1 style={{ fontWeight: "400", color: "#b9c3d0" }}>Users</h1>
        <UsersList />
      </div>
    </div>
  );
};

export default Users;