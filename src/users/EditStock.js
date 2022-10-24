import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import active_user from "../component/users";

export default function EditUser() {
  let navigate = useNavigate();

  const { id } = useParams();

  const [stock, setStock] = useState({
    name: "",
    username: "",
    email: "",
  });

  const { name, quantity, price } = stock;

  const onInputChange = (e) => {
    setStock({ ...stock, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/stock/${id}`, stock);
    await axios.post(`http://localhost:8080/purchase_item`, {
      date: new Date(),
      item_id: id,
      user_id: active_user[0].id,
      quantity: quantity,
    });
    navigate("/");
  };

  useEffect(() => {
    loadStock();
  }, []);

  const loadStock = async () => {
    const result = await axios.get(`http://localhost:8080/stock/${id}`);
    setStock(result.data);
  };

  return (
    <div className="comtainer">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          {active_user[0].username === "admin" ? (
            <h2 className="text-center m-4">Edit Stock</h2>
          ) : (
            <h2 className="text-center m-4">Buy Stock</h2>
          )}
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                Name
              </label>
              {active_user[0].username === "admin" ? (
                <input
                  type={"text"}
                  className="form-control"
                  placeholder="Enter your name"
                  name="name"
                  value={name}
                  onChange={(e) => onInputChange(e)}
                />
              ) : (
                <input
                  type={"text"}
                  className="form-control"
                  placeholder="Enter your name"
                  name="name"
                  value={name}
                  disabled
                />
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="Price" className="form-label">
                Price
              </label>
              {active_user[0].username === "admin" ? (
                <input
                  type={"text"}
                  className="form-control"
                  placeholder="Enter your price address"
                  name="price"
                  value={price}
                  onChange={(e) => onInputChange(e)}
                />
              ) : (
                <input
                  type={"text"}
                  className="form-control"
                  placeholder="Enter your price address"
                  name="price"
                  value={price}
                  disabled
                />
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="Quantity" className="form-label">
                Quantity
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your sername"
                name="quantity"
                value={quantity}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <button type="submit" className="btn btn-outline-primary">
              {active_user[0].username === "admin" ? "Submit" : "Buy"}
            </button>

            <Link className="btn btn-outline-danger mx-2" to="/">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
