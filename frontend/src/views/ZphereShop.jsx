import { useEffect, useState } from "react";
import axiosClient from "../axios-client";

export default function ZphereShop() {
  const [cart, setCart] = useState([]);
  const [checkout, setCheckout] = useState([]);
  const [product, setProduct] = useState([]);
  const [incoming, setIncoming] = useState([]);
  const [delivery, setDelivery] = useState([]);

  useEffect(() => {
    axiosClient
      .get("/cart")
      .then((response) => {
        setCart(response.data.data || []);
      })
      .catch((err) => {});
  }, []);

  useEffect(() => {
    axiosClient
      .get("/product")
      .then((response) => {
        setProduct(response.data.data || []);
      })
      .catch((err) => {});
  }, []);

  useEffect(() => {
    axiosClient
      .get("/incoming-order-amount")
      .then((response) => {
        setIncoming(response.data.data || []);
      })
      .catch((err) => {});
  }, []);

  useEffect(() => {
    axiosClient
      .get("/delivery-amount")
      .then((response) => {
        setDelivery(response.data.data || []);
      })
      .catch((error) => {});
  }, []);

  // useEffect(() => {
  //     axiosClient
  //     .get("/review")
  //     .then((response)=> {

  //     })
  //     .catch((err)=> {

  //     })
  // }, []);

  useEffect(() => {
    axiosClient
      .get("/checkout-amount")
      .then((response) => {
        setCheckout(response.data.data || []);
      })
      .catch((err) => {});
  }, []);

  // useEffect(()=> {
  //     axiosClient
  //     .get("/delivery")
  //     .then((response)=> {

  //     })
  //     .catch((err)=> {

  //     })
  // }, []);

  return (
    <div className="col-xl-12 ">
      <div className="row">
        <div className="col-lg-12">
          <div className="card w-100 border-0 shadow-none p-5 rounded-xxl bg-lightblue2 mb-3">
            <div className="row">
              <div className="col-lg-6">
                <img src="images/bg-2.png" alt="image" className="w-100" />
              </div>
              <div className="col-lg-6 ps-lg-5">
                <h2 className="display1-size d-block mb-2 text-grey-900 fw-700">
                  {/* <span class="font-xssss fw-600 text-grey-500 d-block mb-2 ms-1">Welcome back</span>  */}
                  Create the product you want to sell on ZphereShop
                </h2>
                <p className="font-xssss fw-500 text-grey-500 lh-26">
                  ZphereShop makes it easy for you to sell your products online
                  on this platform quickly and conveniently, with full official
                  protection and privacy.
                </p>
                <a
                  href="/create-product"
                  className="btn w200 border-0 bg-primary-gradiant p-3 text-white fw-600 rounded-3 d-inline-block font-xssss"
                >
                  Create Product
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="row">
          <div className="col-lg-4 pe-2">
            <div
              className="card w-100 border-0 shadow-none p-4 rounded-xxl mb-3"
              style={{ backgroundColor: "#e5f6ff" }}
            >
              <a href="/user-product" className="card-body d-flex p-0">
                <i className="btn-round-lg d-inline-block me-3 bg-primary-gradiant feather-inbox font-md text-white pt-plus-10" />
                <h4 className="text-primary font-xl fw-700">
                  {product.length}
                  <span className="fw-500 mt-0 d-block text-grey-500 font-xssss">
                    product
                  </span>
                </h4>
              </a>
            </div>
          </div>
          <div className="col-lg-4 pe-2 ps-2">
            <div
              className="card w-100 border-0 shadow-none p-4 rounded-xxl mb-3"
              style={{ backgroundColor: "#f6f3ff" }}
            >
              <a href="/incoming-order" className="card-body d-flex p-0">
                <i className="btn-round-lg d-inline-block me-3 bg-secondary feather-package font-md text-white pt-plus-10" />
                <h4 className="text-secondary font-xl fw-700">
                  {incoming.length}
                  <span className="fw-500 mt-0 d-block text-grey-500 font-xssss">
                    incoming order
                  </span>
                </h4>
              </a>
            </div>
          </div>
          <div className="col-lg-4 pe-2 ps-2">
            <div
              className="card w-100 border-0 shadow-none p-4 rounded-xxl mb-3"
              style={{ backgroundColor: "#e2f6e9" }}
            >
              <div className="card-body d-flex p-0">
                <a href="/income" className="card-body d-flex p-0">
                <i className="btn-round-lg d-inline-block me-3 bg-success feather-dollar-sign font-md text-white pt-plus-10" />
                <h4 className="text-success font-xl fw-700">
                  {" 0 "}
                  <span className="fw-500 mt-0 d-block text-grey-500 font-xssss">
                    income
                  </span>
                </h4>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-4 ps-2">
            <div
              className="card w-100 border-0 shadow-none p-4 rounded-xxl mb-3"
              style={{ backgroundColor: "#F6E2E7" }}
            >
              <a href="/checkout-items" className="card-body d-flex p-0">
                <i className="btn-round-lg d-inline-block me-3 bg-danger feather-archive font-md text-white pt-plus-10" />
                <h4 className="text-danger font-xl fw-700">
                  {checkout.length}
                  <span className="fw-500 mt-0 d-block text-grey-500 font-xssss">
                    checkout item
                  </span>
                </h4>
              </a>
            </div>
          </div>

          <div className="col-lg-4 ps-2">
            <div
              className="card w-100 border-0 shadow-none p-4 rounded-xxl mb-3"
              style={{ backgroundColor: "#E2F6F1" }}
            >
              <a href="/order-complete" className="card-body d-flex p-0">
                <i
                  className="btn-round-lg d-inline-block me-3 feather-check-circle font-md text-white pt-plus-10"
                  style={{ backgroundColor: "#6FD6BD" }}
                />
                <h4 className="font-xl fw-700" style={{ color: "#6FD6BD" }}>
                  {`0`}
                  <span className="fw-500 mt-0 d-block text-grey-500 font-xssss">
                    order completed
                  </span>
                </h4>
              </a>
            </div>
          </div>
          <div className="col-lg-4 ps-2">
            <div
              className="card w-100 border-0 shadow-none p-4 rounded-xxl mb-3"
              style={{ backgroundColor: "#F6E2F4" }}
            >
              <a href="/shopping-cart" className="card-body d-flex p-0">
                <i
                  className="btn-round-lg d-inline-block me-3 feather-shopping-bag font-md text-white pt-plus-10"
                  style={{ backgroundColor: "#B87CB2" }}
                />
                <h4 className="font-xl fw-700" style={{ color: "#B87CB2" }}>
                  {`${cart.length}`}
                  <span className="fw-500 mt-0 d-block text-grey-500 font-xssss">
                    shopping cart
                  </span>
                </h4>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
