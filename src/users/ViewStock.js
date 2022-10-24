import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export default function ViewUser() {
  const [stock, setStock] = useState({
    name: "",
    username: "",
    email: "",
  });

  const { id } = useParams();

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8080/stock/${id}`);
    console.log("dataaa", result);
    setStock(result.data);
  };

  return (
    <div className="comtainer">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Stock Details</h2>
          <div className="card">
            <div className="card-header">
              Details for user id :
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>Name: </b>
                  {stock.name}
                </li>
                <li className="list-group-item">
                  <b>Username: </b>
                  {stock.quantity}
                </li>
                <li className="list-group-item">
                  <b>Email: </b>
                  {stock.price}
                </li>
              </ul>
            </div>
          </div>
          <Link className="btn btn-primary my-2" to={"/"}>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
