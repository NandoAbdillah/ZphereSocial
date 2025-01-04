import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import moment from "moment";

export default function ShoppingCart() {
  const [carts, setCarts] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [income , setIncome] = useState(0);

  useEffect(() => {
    axiosClient
      .get("/completed-orders")
      .then((response) => {
        const data = response.data.data || [];
        setCarts(data);
  
        console.log("Data from API:", data); // Memeriksa data dari API
  
        // Menggunakan reduce untuk menjumlahkan semua subtotal
        const totalIncome = data.reduce((total, item) => {
          // Mengonversi subtotal dari string ke angka
          const subtotal = parseFloat(item?.subtotal) || 0; // Pastikan subtotal valid atau gunakan 0 jika tidak
          console.log("Subtotal:", subtotal); // Log setiap subtotal untuk debugging
          return total + subtotal;
        }, 0);
  
        console.log("Total Income:", totalIncome); // Log hasil total income
        setIncome(totalIncome); // Set total income
      })
      .catch((err) => {
        console.error("Error fetching completed orders:", err); // Log jika terjadi error
      });
  }, []);
  
  
  
  
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

  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  return (
    <>
      {carts && (
        <div className="col-lg-12">
          <div className="col-lg-12 mb-3">
            <div className="card p-md-5 p-4 bg-primary-gradiant rounded-3 shadow-xss bg-pattern border-0 overflow-hidden">
              <div className="bg-pattern-div"></div>
              <h2 className="display2-size display2-md-size fw-700 text-white mb-0 mt-0">
                Income
                <span className="fw-700 ls-3 text-grey-200 font-xsssss mt-2 d-block">
                  {carts.length} ITEM FOUND
                </span>
              </h2>
            </div>
          </div>

          <div className="col-lg-12">
            <div className="row">
              <div className="col-lg-6 pe-2">
                <div
                  className="card w-100 border-0 shadow-none p-4 rounded-xxl mb-3"
                  style={{ backgroundColor: "#e5f6ff" }}
                >
                  <a href="/user-product" className="card-body d-flex p-0">
                    <i className="btn-round-lg d-inline-block me-3 bg-primary-gradiant feather-inbox font-md text-white pt-plus-10" />
                    <h4 className="text-primary font-xl fw-700">
                      {carts.length ?? 0}
                      <span className="fw-500 mt-0 d-block text-grey-500 font-xssss">
                        product
                      </span>
                    </h4>
                  </a>
                </div>
              </div>
              
              <div className="col-lg-6 pe-2 ps-2">
                <div
                  className="card w-100 border-0 shadow-none p-4 rounded-xxl mb-3"
                  style={{ backgroundColor: "#e2f6e9" }}
                >
                  <div className="card-body d-flex p-0">
                    <a href="/income" className="card-body d-flex p-0">
                      <i className="btn-round-lg d-inline-block me-3 bg-success feather-dollar-sign font-md text-white pt-plus-10" />
                      <h4 className="text-success font-xl fw-700">
                        {rupiah(income)}
                        <span className="fw-500 mt-0 d-block text-grey-500 font-xssss">
                          income
                        </span>
                      </h4>
                    </a>
                  </div>
                </div>
              </div>
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
                    <th>Order Name</th>
                    <th>Item</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Payment</th>
                    <th>Message</th>
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
                            {cart.user_detail.first_name}{" "}
                            {cart.user_detail.last_name}
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
                        title={cart.messages}
                      >
                        {cart.messages}
                      </td>
                      <td>
                        <a href={`/purchase-details/${cart.id}`}>
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
