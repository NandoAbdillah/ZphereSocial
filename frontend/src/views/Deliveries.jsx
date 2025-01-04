import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import moment from "moment";

export default function Deliveries() {
  const [carts, setCarts] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    axiosClient
      .get("/checkout-items")
      .then((response) => {
        const data = response.data.data || [];
        setCarts(data);
      })
      .catch((err) => {});
  }, []);

  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  const handleCheckboxChange = (id) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(id)
        ? prevSelectedItems.filter((itemId) => itemId !== id)
        : [...prevSelectedItems, id]
    );
  };

  const handleRemoveFromCart = () => {
    axiosClient
      .post("/remove-from-cart-many", { ids: selectedItems })
      .then(() => {
        // Handle success (e.g., reload cart items)
        setCarts(carts.filter((cart) => !selectedItems.includes(cart.id)));
        setSelectedItems([]);
      })
      .catch((err) => {
        // Handle error
      });
  };

  return (
    <>
      {carts && (
        <div className="col-lg-12">
          <div className="col-lg-12 mb-3">
            <div className="card p-md-5 p-4 bg-primary-gradiant rounded-3 shadow-xss bg-pattern border-0 overflow-hidden">
              <div className="bg-pattern-div"></div>
              <h2 className="display2-size display2-md-size fw-700 text-white mb-0 mt-0">
                Deliveries Orders
                <span className="fw-700 ls-3 text-grey-200 font-xsssss mt-2 d-block">
                  {carts.length} ITEM FOUND
                </span>
              </h2>
            </div>
          </div>

          <div className="col-lg-12">
            <div className="table-responsive">
              <table
                className="table table-striped table-hover table-bordered table-resizable"
                style={{ borderRadius: "10px", overflow: "hidden" }}
              >
                <thead className="thead-dark text-center">
                  <tr>
                    <th>Select</th>
                    <th>Owner Name</th>
                    <th>Item</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Payment</th>
                    <th>Owner Message</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {carts.map((cart) => (
                    <tr key={cart.id}>
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(cart.id)}
                          onChange={() => handleCheckboxChange(cart.id)}
                        />
                      </td>
                      <td>
                        <div className="d-flex align-items-center justify-content-center">
                          <h4 className="mb-0">
                            {cart.item_detail.user_detail.first_name}{" "}
                            {cart.item_detail.user_detail.last_name}
                          </h4>
                        </div>
                      </td>
                      <td>{cart.item_detail.item}</td>
                      <td>
                        <span className="badge badge-info">
                          {cart.item_detail.category}
                        </span>
                      </td>
                      <td>{rupiah(cart.item_detail.price)}</td>
                      <td>{cart.payment}</td>
                      <td
                        className="text-truncate"
                        style={{
                          maxWidth: "200px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                        title={cart.description}
                      >
                        {cart.description}
                      </td>
                      <td>
                        <a href={`/checkout-details/${cart.id}`}>
                          <span
                            className={`badge badge-${
                              cart.status === "processing_order"
                                ? "warning"
                                : "success"
                            }`}
                          >
                            {cart.status.replace("_", " ")}
                          </span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {selectedItems.length > 0 && (
            <div className="text-center mt-4 mb-5">
              <button className="btn btn-danger" onClick={handleRemoveFromCart}>
                Remove from Cart
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
