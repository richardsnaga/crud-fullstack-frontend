import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import active_user from "../component/users";

export default function Home() {
  const [stocks, setStocks] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    loadStocks();
  }, []);

  console.log("USERRR", active_user);
  const loadStocks = async () => {
    const result = await axios.get("http://localhost:8080/stocks");
    console.log(result);

    setStocks(result.data);
  };

  const deleteStocks = async (id) => {
    await axios.delete(`http://localhost:8080/stock/${id}`);
    loadStocks();
  };

  return (
    <div className="container">
      <div className="py-4">
        {active_user[0].username === "admin" && (
          <Link className="btn btn-primary float-start mb-2" to="/addstock">
            Add Stock
          </Link>
        )}
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Price</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock, index) => (
              <tr>
                <th scope="row" key={index}>
                  {index + 1}
                </th>
                <td>{stock.name}</td>
                <td>{stock.quantity}</td>
                <td>{stock.price}</td>
                <td>
                  <Link
                    className="btn btn-primary mx-2"
                    to={`/viewstock/${stock.id}`}
                  >
                    View
                  </Link>
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/editstock/${stock.id}`}
                  >
                    {active_user[0].username === "admin" ? "Edit" : "Buy"}
                  </Link>
                  {active_user[0].username === "admin" && (
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => deleteStocks(stock.id)}
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
