import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import active_user from "../component/users";

export default function EditUser() {
  let navigate = useNavigate();

  const { id } = useParams();

  const [stock, setStock] = useState({
    name: "",
    quantity: 0,
    price: 0,
  });

  const [changeStock, setChangeStock] = useState({
    buy: 0,
    add: 0,
  });

  const { buy, add } = changeStock;
  const { name, quantity, price } = stock;

  // const { add, buy } = changeStock;

  const onInputChange = (e) => {
    setStock({ ...stock, [e.target.name]: e.target.value });
    setChangeStock({ ...changeStock, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/stock/${id}`, {
      name: name,
      quantity: parseInt(quantity) + parseInt(add),
      price: price,
    });
    await axios.post(`http://localhost:8080/purchase_item`, {
      date: new Date(),
      item_id: id,
      user_id: active_user[0].id,
      quantity: add,
    });
    navigate("/");
  };

  const onBuy = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/stock/${id}`, {
      name: name,
      quantity: buy < quantity ? quantity - buy : 0,
      price: price,
    });
    await axios.post(`http://localhost:8080/purchase_item`, {
      date: new Date(),
      item_id: id,
      user_id: active_user[0].id,
      quantity: buy,
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
          {/* <form onSubmit={(e) => onSubmit(e)}> */}
          <div className="mb-3">
            <label htmlFor="Name" className="form-label">
              Name
            </label>
            {active_user[0].username === "admin" ? (
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter the stock name"
                name="name"
                value={name}
                onChange={(e) => onInputChange(e)}
              />
            ) : (
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter the stock name"
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
                type={"number"}
                className="form-control"
                placeholder="Enter the stock price"
                name="price"
                value={price}
                onChange={(e) => onInputChange(e)}
              />
            ) : (
              <input
                type={"number"}
                className="form-control"
                placeholder="Enter the stock price"
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
              type={"number"}
              className="form-control"
              placeholder="Enter the stock quantity"
              name="quantity"
              value={quantity}
              disabled
            />
          </div>

          {active_user[0].username === "admin" && (
            <div className="mb-3">
              <label htmlFor="Add" className="form-label">
                Add
              </label>
              <input
                type={"number"}
                className="form-control"
                placeholder="Enter the stock"
                name="add"
                value={add}
                onChange={(e) => onInputChange(e)}
              />
            </div>
          )}
          {active_user[0].username !== "admin" && (
            <div className="mb-3">
              <label htmlFor="Buy" className="form-label">
                Buy
              </label>
              <input
                type={"number"}
                className="form-control"
                placeholder="Enter the digit"
                name="buy"
                value={buy}
                onChange={(e) => onInputChange(e)}
              />
            </div>
          )}

          {active_user[0].username === "admin" && (
            <button
              type="submit"
              className="btn btn-outline-primary"
              onClick={(e) => onSubmit(e)}
            >
              Submit
            </button>
          )}
          {active_user[0].username !== "admin" && (
            <button
              type="submit"
              className="btn btn-outline-primary"
              onClick={(e) => onBuy(e)}
            >
              Buy
            </button>
          )}

          <Link className="btn btn-outline-danger mx-2" to="/">
            Cancel
          </Link>
          {/* </form> */}
        </div>
      </div>
    </div>
  );
}
