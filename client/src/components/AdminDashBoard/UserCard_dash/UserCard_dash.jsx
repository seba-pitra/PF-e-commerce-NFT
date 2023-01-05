import React from "react";
import "./UserCard_dash.css";
import { auth } from "../../../firebase.js";
import { deleteUser } from "firebase/auth";
import { Link } from "react-router-dom";
import axios from "axios";
// Components
import BlockIcon from "@material-ui/icons/Block";

const UserCard_dash = ({ id, name, last_name, email, dni }) => {
  const handleBlock = async () => {
    const res = await axios.delete(`/user/${id}`);
    console.log(res.data);
  };

  const handleClick = (e) => {
    e.preventDefault();
    console.log(auth.currentUser);
  };

  return (
    <div className="user-dash-card">
      <div className="user-dash-id">
        <Link to={`/admin/user/${id}`}>
          <p>{id}</p>
        </Link>
      </div>
      <div className="user-dash-name">
        <p>{name}</p>
      </div>
      <div className="user-dash-last_name">
        <p>{last_name}</p>
      </div>
      <div className="user-dash-email">
        <p>{email}</p>
      </div>
      <div className="user-dash-dni">
        <p>{`${dni || "No DNI"}`}</p>
      </div>
      <div className="dash-card-icons">
        <div className="card-dash-icon">
          <BlockIcon onClick={handleBlock} />
        </div>
      </div>
    </div>
  );
};

export default UserCard_dash;
