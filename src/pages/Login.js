import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import active_user from "../component/users";

export default function Login() {
  let navigate = useNavigate();

  const [userMsg, setUserMsg] = useState("");

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const { username, password } = user;
  // console.log(user);
  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const usersz = users;
    const user_active = usersz.find((obj) => {
      return obj.username === username && obj.username === password;
    });
    if (user_active != undefined) {
      active_user[0] = user_active;
      navigate("/");
    } else {
      setUserMsg("Username or Password Wrong");
    }
  };

  const [users, setUsers] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    loadUsers();
  }, []);

  // console.log("USERRR", testing);
  const loadUsers = async () => {
    const result = await axios.get("http://localhost:8080/users");
    setUsers(result.data);
  };
  return (
    <div className="comtainer">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Login User</h2>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                Username
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your username"
                name="username"
                value={username}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Username" className="form-label">
                Password
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your sername"
                name="password"
                value={password}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <p style={{ color: "red" }}>{userMsg}</p>
            <button type="submit" className="btn btn-outline-success">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
