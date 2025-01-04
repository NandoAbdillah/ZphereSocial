import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import moment from "moment";

export default function ShoppingCart() {
  const [carts, setCarts] = useState([]);
  // const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    axiosClient
      .get("/user-cart")
      .then((response) => {
        setCarts(response.data.data || []);
      })
      .catch((err) => {});
  }, []);

  // const [counter, setCounter] = useState(1);
  const decrement = (cartId, itemId, items, itemStock) => {
    const stock = itemStock;

    if (items != 1) {
      const counter = items - 1;
      setCarts(
        carts.map((cart) =>
          cart.id === cartId ? { ...cart, items: counter } : cart
        )
      );

      axiosClient.post('/update-cart', {id : cartId , counter : counter})
      .then((response) => {})
      .catch((error) =>{})
    }
  };

  const increment = (cartId, itemId, items, itemStock) => {
    const stock = itemStock;

    if (stock > items) {
      const counter = items + 1;

      setCarts(
        carts.map((cart) =>
          cart.id === cartId ? { ...cart, items: counter } : cart
        )
      );
      axiosClient.post('/update-cart', {id : cartId , counter : counter})
      .then((response) => {})
      .catch((error) =>{})
    }
  };

  // const handleCheckboxChange = (id) => {
  //   setSelectedItems((prevSelectedItems) =>
  //     prevSelectedItems.includes(id)
  //       ? prevSelectedItems.filter((itemId) => itemId !== id)
  //       : [...prevSelectedItems, id]
  //   );
  // };

  // const handleRemoveFromCart = (selectedItems) => {
  //   axiosClient
  //     .post("/remove-from-cart", { idItem: selectedItems })
  //     .then(() => {
  //       // Handle success (e.g., reload cart items)
  //       setCarts(carts.filter((cart) => !selectedItems.includes(cart.id)));
  //     })
  //     .catch((err) => {
  //       // Handle error
  //     });
  // };
  const handleRemoveFromCart = (item_id, cart_id) => {
    axiosClient
      .post("/remove-from-cart", { idItem: item_id })
      .then(() => {
        setCarts(carts.filter((cart) => cart.id !== cart_id));
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
              Cart{" "}
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
                  <th className="border-0 p-4">&nbsp;</th>
                  <th className="border-0 p-4">&nbsp;</th>
                  <th className="border-0 p-4">&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {carts &&
                  carts.map((cart) => (
                    <>
                      <tr>
                        <td className="product-thumbnail text-left ps-0">
                          <img
                            src={`${import.meta.env.VITE_ASSET_URL}${
                              JSON.parse(cart.item_detail.picture)[0]
                            }`}
                            alt="Product Thumnail"
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
                          <div className="quantity me-3">
                            <input
                              type="number"
                              className="quantity-input"
                              name="qty"
                              id="qty"
                              // defaultValue={1}
                              value={cart.items}
                              min={1}
                            />
                            <div
                              className="dec qtybutton"
                              onClick={() =>
                                decrement(
                                  cart.id,
                                  cart.item_detail.id,
                                  cart.items,
                                  cart.item_detail.stock
                                )
                              }
                            >
                              -
                            </div>
                            <div
                              className="inc qtybutton"
                              onClick={() =>
                                increment(
                                  cart.id,
                                  cart.item_detail.id,
                                  cart.items,
                                  cart.item_detail.stock
                                )
                              }
                            >
                              +
                            </div>
                          </div>
                        </td>
                        <td className="product-total-price">
                          <span className="product-price-wrapper">
                            <span className="money fmont">
                              <strong>
                                {rupiah(cart.item_detail.price * cart.items)}
                              </strong>
                            </span>
                          </span>
                        </td>
                        <td className="product-share text-right">
                          <a
                            href={`/single-product/${cart.item_detail.id}`}
                            data-toggle="tooltip"
                            data-html="true"
                            title="Check Product"
                          >
                            <i className="ti-share font-xs text-grey-500" />
                          </a>
                        </td>
                        <td className="product-share text-right">
                          <a
                            href={`/checkout/${cart.id}`}
                            data-toggle="tooltip"
                            data-html="true"
                            title="Checkout"
                          >
                            <i className="ti-shopping-cart font-xs text-grey-500" />
                          </a>
                        </td>
                        <td className="product-remove text-right">
                          <a
                            onClick={() => handleRemoveFromCart(cart.item_detail.id, cart.id)}
                            data-toggle="tooltip"
                            data-html="true"
                            title="Delete"
                          >
                            <i className="ti-trash font-xs text-grey-500 cursor-pointer" />
                          </a>
                        </td>
                      </tr>
                    </>
                  ))}
              </tbody>
            </table>
          </div>

{           /*<a
            href="#"
            className="update-cart bg-dark float-right text-white fw-600 text-uppercase font-xssss border-dark border rounded-3 border-size-md d-inline-block w175 p-3 text-center ls-3"
          >
            Cart
          </a> */}
        </div>
        {/* <div className="col-lg-4">
          <div className="checkout-payment card border-0 mb-3 bg-greyblue p-4">
            <div className="cart-totals">
              <h4 className="mont-font fw-600 font-md mb-5">Cart totals</h4>
              <div className="table-content table-responsive">
                <table className="table order-table">
                  <tbody>
                    <tr>
                      <td className="font-xsss pt-2 fw-600">Subtotal</td>
                      <td className="font-xssss fw-700 text-grey-600 pt-2 text-right">
                        $196.00
                      </td>
                    </tr>
                    <tr>
                      <td className="font-xsss pt-2 fw-600">Shipping</td>
                      <td className="font-xssss fw-700 text-grey-600 pt-2 text-right">
                        <span>Flat rate: $20.00</span>
                      </td>
                    </tr>
                    <tr className="order-total">
                      <td className="font-xsss pt-2 fw-600">Total</td>
                      <td className="font-xssss fw-700 text-grey-600 pt-2 text-right">
                        <span className="product-price-wrapper">
                          <span className="money fmont">$226.00</span>
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <a
            href="#"
            className="bg-dark float-right text-white fw-600 text-uppercase font-xsss border-dark border rounded-3 border-size-md d-inline-block w-100 p-3 text-center ls-3"
          >
            Proceed To Checkout
          </a>
        </div> */}
      </div>
    </div>
  );
}
