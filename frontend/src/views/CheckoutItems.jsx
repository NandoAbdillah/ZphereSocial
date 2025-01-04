import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import moment from "moment";
import { Alert } from "antd";

export default function CheckoutItems() {
  const [carts, setCarts] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [search, setSearch] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [sortStatus, setSortStatus] = useState("");
  const [sortCategory, setSortCategory] = useState("");

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  useEffect(() => {
    axiosClient
      .get("/checkout-items")
      .then((response) => {
        setCarts(response.data.data || []);
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
        setCarts(carts.filter((cart) => !selectedItems.includes(cart.id)));
        setSelectedItems([]);
      })
      .catch((err) => {});
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  const handleSortStatusChange = (e) => {
    setSortStatus(e.target.value);
  };

  const handleSortCategoryChange = (e) => {
    setSortCategory(e.target.value);
  };

  // Filter carts by search, status, and category
  const filteredCarts = carts
    .filter((cart) => {
      const searchLower = search.toLowerCase();
      return (
        cart.item_detail.item.toLowerCase().includes(searchLower) ||
        cart.item_detail.category.toLowerCase().includes(searchLower) ||
        `${cart.item_detail.user_detail.first_name} ${cart.item_detail.user_detail.last_name}`
          .toLowerCase()
          .includes(searchLower)
      );
    })
    .filter((cart) => {
      if (!sortStatus) return true;
      return cart.status === sortStatus;
    })
    .filter((cart) => {
      if (!sortCategory) return true;
      return cart.item_detail.category === sortCategory;
    });

  return (
    <>
      {carts && (
        <div className="col-lg-12">
          <div className="col-lg-12 mb-3">
            <div className="card p-md-5 p-4 bg-primary-gradiant rounded-3 shadow-xss bg-pattern border-0 overflow-hidden">
              <div className="bg-pattern-div"></div>
              <h2 className="display2-size display2-md-size fw-700 text-white mb-0 mt-0">
                Checkout Orders
                <span className="fw-700 ls-3 text-grey-200 font-xsssss mt-2 d-block">
                  {filteredCarts.length} ITEM FOUND
                </span>
              </h2>
            </div>
          </div>

          <div className="col-lg-12 mt-3 d-flex mb-3">
            <div className="search-form-2 ms-auto">
              <i className="ti-search font-xss" />
              <input
                type="text"
                value={search}
                onChange={handleSearchChange}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                className="form-control text-grey-500 mb-0 bg-greylight theme-dark-bg border-0 float-right sort rounded-xl"
                placeholder="Search items."
              />
            </div>
            <select
              className="searchCat sort mx-2"
              onChange={handleSortCategoryChange}
            >
              <option value="">Sort by Category</option>
              <option value="electronics">Electronics</option>
              <option value="home_appliances">Home Appliances</option>
              <option value="fashion">Fashion</option>
            </select>

            <select
              className="searchCat sort me-auto"
              onChange={handleSortStatusChange}
            >
              <option value="">Sort by Status</option>
              <option value="processing_order">Processing Order</option>
              <option value="on_packed">On Packed</option>
              <option value="on_delivery">On Delivery</option>
              <option value="order_arrived">Order Arrived</option>
              <option value="rejected_by_owner">Rejected by Owner</option>
              <option value="canceled_by_user">Canceled by User</option>
              <option value="order_completed">Order Completed</option>
            </select>
          </div>

          <div className="col-lg-12">
            <div className="table-responsive">
              <table
                className="table table-striped table-hover table-bordered table-resizable"
                style={{ borderRadius: "10px", overflow: "hidden" }}
              >
                <thead className="thead-dark text-center">
                  <tr>
                    {/* <th>Select</th> */}
                    <th>Picture</th>
                    <th>Owner Name</th>
                    <th>Item</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total Price</th>
                    <th>Payment</th>
                    <th>Owner Message</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {filteredCarts.map((cart) => (
                    <tr key={cart.id}>
                      {/* <td>
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(cart.id)}
                          onChange={() => handleCheckboxChange(cart.id)}
                        />
                      </td> */}
                      <td>
                        <img
                          src={`${import.meta.env.VITE_ASSET_URL}${
                            JSON.parse(cart.item_detail.picture)[0]
                          }`}
                          style={{
                            height: "5rem",
                            width: "5rem",
                          }}
                        ></img>
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
                      <td>{cart.total_item}</td>
                      <td>{rupiah(cart.total_pays)}</td>
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
                                : cart.status === "canceled_by_user"
                                  ? "danger"
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
