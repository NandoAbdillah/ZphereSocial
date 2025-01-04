import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import moment from "moment";

export default function OrderComplete() {
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    axiosClient
      .get("/checkout-items")
      .then((response) => {
        // Filter hanya pesanan yang berstatus 'order_completed'
        const completedOrders = response.data.data.filter(
          (cart) => cart.status === "order_completed"
        );
        setCarts(completedOrders);
      })
      .catch((err) => {
        // Handle error
      });
  }, []);

  const handleRemoveFromCart = (selectedItem) => {
    axiosClient
      .post("/remove-from-cart", { idItem: selectedItem })
      .then(() => {
        setCarts(carts.filter((cart) => cart.id !== selectedItem));
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
    <div className="col-xl-12 cart-wrapper mb-4">
      <div className="row">
        <div className="col-lg-12 mb-3">
          <div className="card p-md-5 p-4 bg-primary-gradiant rounded-3 shadow-xss bg-pattern border-0 overflow-hidden">
            <div className="bg-pattern-div" />
            <h2 className="display2-size display2-md-size fw-700 text-white mb-0 mt-0">
              Order Complete{" "}
              <span className="fw-700 ls-3 text-grey-200 font-xsssss mt-2 d-block">
                {carts.length} PRODUCT FOUND
              </span>
            </h2>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12 mb-3">
          <div className="table-content table-responsive">
            <table className="table text-center">
              <thead className="bg-greyblue rounded-3">
                <tr>
                  <th className="border-0 p-4">&nbsp;</th>
                  <th className="border-0 p-4 text-left">Product</th>
                  <th className="border-0 p-4">Owner</th>
                  <th className="border-0 p-4">Price</th>
                  <th className="border-0 p-4">Quantity</th>
                  <th className="border-0 p-4">Total</th>
                  {/* <th className="border-0 p-4">&nbsp;</th>
                  <th className="border-0 p-4">&nbsp;</th> */}
                  {/* <th className="border-0 p-4">&nbsp;</th> */}
                  <th className="border-0 p-4">Check</th>
                </tr>
              </thead>
              <tbody>
                {carts &&
                  carts.map((cart) => (
                    <tr key={cart.id}>
                      <td className="product-thumbnail text-left ps-0">
                        <img
                          src={`${import.meta.env.VITE_ASSET_URL}${
                            JSON.parse(cart.item_detail.picture)[0]
                          }`}
                          alt="Product Thumbnail"
                          className="rounded-3"
                          style={{
                            height: "5rem",
                            width: "5rem",
                          }}
                        />
                      </td>
                      <td className="product-headline text-left wide-column">
                        <h3>
                          <a
                            href="#"
                            className="text-grey-900 fw-600 font-xsss"
                          >
                            {cart.item_detail.item}
                          </a>
                        </h3>
                      </td>

                      <td className="product-headline text-left wide-column">
                        <h3>
                          <a
                            href={`/user/${cart.item_detail.user_detail.uuid}`}
                            className=" fw-600 font-xsss"
                          >
                            @{cart.item_detail.user_detail.username}
                          </a>
                        </h3>
                      </td>

                      <td className="product-p">
                        <span className="product-price-wrapper">
                          <span className="money text-grey-500 fw-600 font-xsss">
                            {rupiah(cart.item_detail.price)}
                          </span>
                        </span>
                      </td>
                      <td className="product-quantity">
                      <span className="product-price-wrapper">
                          <span className="money text-grey-500 fw-600 font-xsss">
                          {cart.total_item}
                          </span>
                        </span>
                      </td>
                      <td className="product-total-price">
                        <span className="product-price-wrapper">
                          <span className="money fmont">
                            <strong>
                              {rupiah(cart.total_pays)}
                            </strong>
                          </span>
                        </span>
                      </td>
                      {/* <td className="product-share text-right">
                        <a
                          href={`/single-product/${cart.item_detail.id}`}
                          data-toggle="tooltip"
                          data-html="true"
                          title="Check Product"
                        >
                          <i className="ti-share font-xs text-grey-500" />
                        </a>
                      </td> */}
                      <td className="product-share text-right">
                        <a
                          href={`/checkout-details/${cart.id}`}
                          data-toggle="tooltip"
                          data-html="true"
                          title="Checkout"
                        >
                          <i className="ti-share font-xs text-grey-500" />
                        </a>
                      </td>
                      {/* <td className="product-remove text-right">
                        <a
                          onClick={() => handleRemoveFromCart(cart.id)}
                          data-toggle="tooltip"
                          data-html="true"
                          title="Delete"
                        >
                          <i className="ti-trash font-xs text-grey-500 cursor-pointer" />
                        </a>
                      </td> */}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
