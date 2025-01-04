import { createRef, useEffect, useRef, useState } from "react";
import axiosClient from "../axios-client";
import { useParams } from "react-router-dom";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import NotFound from "./NotFound";
import { notification } from "antd";
import { useStateContext } from "../contexts/ContextProvider";
// import { months, weekdays } from "moment";

export default function CheckCheckout() {
  const [details, setDetails] = useState([]);
  const [myAccount, setMyAccount] = useState(null);
  const [customerAccount, setCustomerAccount] = useState([]);
  const [date, setDate] = useState(null);
  const [hour, setHour] = useState(null);

  const { user } = useStateContext();

  const [location, setLocation] = useState({});
  const { id } = useParams();

  const loadItems = () => {
    axiosClient
      .get("/purchase-detail-user", { params: { id: id } })
      .then((response) => {
        setDetails(response.data.data[0] || []);

        const created = new Date(response.data.data[0].created_at);
        const optionDate = {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        };

        setDate(created.toLocaleDateString("en-EN", optionDate));
        setHour(
          created.toLocaleTimeString("en-EN", {
            hour: "2-digit",
            minute: "2-digit",
          })
        );

        const locationParts =
          response.data.data[0].specific_location.split("_");
        setLocation(locationParts);

        console.log(locationParts);

        customerAccountShow(response.data.data[0].user_detail.id);
      })
      .catch((err) => {
        return <NotFound />;
      });
  };

  const customerAccountShow = (idCustomer) => {
    axiosClient
      .get("/zpherepay-customer-account", {
        params: { id: idCustomer },
      })
      .then((response) => {
        setCustomerAccount(response.data.data[0] || []);
      })
      .catch((err) => {
        loadItems();
      });
  };

  useEffect(() => {
    axiosClient
      .get("/zpherepay-account")
      .then((response) => {
        setMyAccount(response.data.data[0]);
      })
      .catch((error) => {});
    loadItems();
  }, []);

  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  const showNotification = (type, messageText, description) => {
    notification[type]({
      message: messageText,
      description: description,
    });
  };

  const [rating, setRating] = useState(0); // Menyimpan jumlah bintang yang dipilih
  const [hoverRating, setHoverRating] = useState(0); // Menyimpan bintang saat hover
  const reviewsRef = createRef();

  const confirmOrder = () => {
    const reviewMessage = reviewsRef.current.value;

    axiosClient
      .post("/arrived-confirmed-reviewed-by-user", {
        id: id,
        rating: rating,
        review: reviewMessage,
      })
      .then((response) => {
        showNotification(
          "success",
          "Order Complete",
          "Your order completed successfully"
        );
      })
      .catch((error) => {
        // alert("Error submitting review:", error);
      });

    // alert("Rating : "+ rating + " review : "+ reviewMessage);
  };

  const cancelOrder = () => {
    axiosClient
      .post("/cancel-order-by-user", { id: id })
      .then((response) => {
        loadItems();
      })
      .catch((error) => {});
  };

  return (
    <>
      {details.length != 0 && (
        <div className="middle-wrap">
          <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
            <div className="card-body p-4 w-100 bg-current border-0 d-flex rounded-3">
              <a href="default-settings.html" className="d-inline-block mt-2">
                <i className="ti-arrow-left font-sm text-white" />
              </a>
              <h4 className="font-xs text-white fw-600 ms-4 mb-0 mt-2">
                Payment Method
              </h4>
            </div>
            <div className="card-body p-lg-5 p-4 w-100 border-0">
              <div className="row">
                <div className="col-xl-6  col-lg-6">
                  <div className="order-details">
                    <h4 className="mont-font fw-600 font-md mb-5">
                      Order Details
                    </h4>

                    <div className="row">
                      <div className=" rounded-3">
                        <img
                          src={`${import.meta.env.VITE_ASSET_URL}${
                            JSON.parse(details.item_detail.picture)[0]
                          }`}
                          className="mx-2 my-3"
                          style={{ width: "20rem" }}
                          alt="icon"
                        />
                      </div>
                    </div>

                    <div className="table-content table-responsive mb-5 card border-0 bg-greyblue p-lg-5 p-4">
                      <table className="table order-table order-table-2 mb-0">
                        <thead>
                          <tr>
                            <th className="border-0">Product</th>
                            <th className="text-right border-0">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th className="text-grey-500 fw-500 font-xsss">
                              {details.item_detail.item}
                              <strong>
                                <span>✕</span>
                                {details.total_item}
                              </strong>
                            </th>
                            <td className="text-right text-grey-500 fw-500 font-xsss">
                              {rupiah(details.item_detail.price)}
                            </td>
                          </tr>
                        </tbody>
                        <tfoot>
                          <tr className="cart-subtotal">
                            <th>Subtotal</th>
                            <td className="text-right text-grey-700 font-xsss fw-700">
                              {rupiah(details.subtotal)}
                            </td>
                          </tr>
                          <tr className="shipping">
                            <th>Shipping</th>
                            <td className="text-right">
                              <span className="text-grey-700 font-xsss fw-700">
                                Flat Rate; {rupiah(details.shipping)}
                              </span>
                            </td>
                          </tr>
                          <tr className="order-total">
                            <th>Order Total</th>
                            <td className="text-right text-grey-700 font-xsss fw-700">
                              <span className="order-total-ammount">
                                {rupiah(details.total_pays)}
                              </span>
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>

                    {/* {!myAccount && (
                      <div className="alert alert-warning" role="alert">
                        <h1 className="alert-heading">
                          <strong>
                            Register ZpherePay Account to Place Order
                          </strong>
                        </h1>
                        <p>
                          {`You don't have created a ZpherePay account, unfortunately
                          your can't place this order`}
                        </p>
                        <hr />
                        <p className="mb-0">
                          <strong>Tips : </strong>
                          <a href="/zpherepay-register">Register</a> ZpherePay
                          account , then you will able to receive this order
                        </p>
                      </div>
                    )} */}

                    <div className="clearfix" />
                    <div className="card shadow-none border-0">
                      <div className="row">
                        {details.status == "processing_order" && (
                          <>
                            <div className="col-xl-6">
                              <button
                                data-bs-toggle="modal"
                                data-bs-target="#ModalPlaceOrder"
                                className=" btn w-100 p-3 mt-3 font-xsss text-center text-white bg-current rounded-3 text-uppercase fw-600 ls-3"
                              >
                                Order is being processed
                              </button>
                            </div>
                            <div className="col-xl-6">
                              <button
                                onClick={cancelOrder}
                                className=" btn w-100 p-3 mt-3 font-xsss text-center text-white bg-danger rounded-3 text-uppercase fw-600 ls-3"
                              >
                                Cancel Order
                              </button>
                            </div>
                          </>
                        )}

                        {details.status == "on_packed" && (
                          <>
                            <div className="col-xl-10">
                              <button className=" col-6 btn w-100 p-3 mt-3 font-xsss text-center text-white bg-current rounded-3 text-uppercase fw-600 ls-3">
                                Order is being packed
                              </button>
                            </div>
                          </>
                        )}

                        {details.status == "on_delivery" && (
                          <>
                            <div className="col-xl-10">
                              <button className=" col-6 btn w-100 p-3 mt-3 font-xsss text-center text-white bg-current rounded-3 text-uppercase fw-600 ls-3">
                                Order being delivered
                              </button>
                            </div>
                          </>
                        )}

                        {details.status == "order_arrived" &&
                          (details.arrived_confirmed == "0" ? (
                            <div className="col-xl-10">
                              <button
                                data-bs-toggle="modal"
                                data-bs-target="#ModalConfirmOrder"
                                className=" col-6 btn w-100 p-3 mt-3 font-xsss text-center text-white bg-warning rounded-3 text-uppercase fw-600 ls-3"
                              >
                                Confirm Order Arrived
                              </button>
                            </div>
                          ) : (
                            <div className="col-xl-10">
                              <button className=" col-6 btn w-100 p-3 mt-3 font-xsss text-center text-white bg-current rounded-3 text-uppercase fw-600 ls-3">
                                Order Completed
                              </button>
                            </div>
                          ))}

                        {details.status == "order_completed" && (
                          <>
                            <div className="col-xl-10">
                              <button className=" col-6 btn w-100 p-3 mt-3 font-xsss text-center text-white bg-success rounded-3 text-uppercase fw-600 ls-3">
                                Order Completed
                              </button>
                            </div>
                          </>
                        )}

                        {details.status == "rejected_by_owner" && (
                          <>
                            <div className="col-xl-10">
                              <button className=" col-6 btn w-100 p-3 mt-3 font-xsss text-center text-white bg-warning rounded-3 text-uppercase fw-600 ls-3">
                                Order Rejected By Owner
                              </button>
                            </div>
                          </>
                        )}

                        {details.status == "canceled_by_user" && (
                          <>
                            <div className="col-xl-10">
                              <button className=" col-6 btn w-100 p-3 mt-3 font-xsss text-center text-white bg-success rounded-3 text-uppercase fw-600 ls-3">
                                You Canceled The Order
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-6  col-lg-6">
                  <div className="rounded-xxl bg-greylight h-100 p-3">
                    <div className="col-lg-12 ps-0">
                      {/* <h4 class="mb-4 font-xs fw-700 mont-font mt-0">Add Card </h4> */}
                    </div>
                    <div className="col-lg-12">
                      <div className="item ms-auto me-auto mt-3 w-100 h150 bg-white rounded-xxl text-left shadow-lg ps-3 pt-2 align-items-end flex-column d-flex">
                        <div className="card border-0 bg-transparent-card shadow-none p-0 text-left w-100">
                          <div className="row">
                            <div className="col-6 ps-2">
                              <img
                                src={`${import.meta.env.VITE_ASSET_URL}${
                                  details.user_detail.profile
                                }`}
                                alt="icon"
                                className="w40 float-left d-inline-block rounded-circle"
                                style={{ height: "2.5rem" }}
                              />
                            </div>
                            <div className="col-6 text-right pe-4">
                              <img
                                src="../../public/images/purchase_qr.svg"
                                alt="icon"
                                className="w30 float-right d-inline-block mt-2 me-2"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="card border-0 bg-transparent-card shadow-none p-0 text-left w-100 mt-auto">
                          <h6 className="text-gret-900 font-xss fw-700 mont-font text-info">
                            {details.payment == "zpherepay"
                              ? rupiah(details.total_pays)
                              : ""}
                          </h6>
                          <h4 className="text-grey-900 font-sm fw-700 mont-font text-dark-color">
                            {/* **** **** **** 2234{" "} */}
                            {details.payment == "zpherepay"
                              ? customerAccount.telp
                              : rupiah(details.total_pays)}
                            <span className="d-block fw-500 text-grey-500 font-xssss mt-0 mb-3 text-dark-color">
                              {details.payment == "zpherepay"
                                ? "ZpherePay"
                                : "COD"}
                            </span>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12 mt-5">
                      <form>
                        <div className="form-group mb-1">
                          <label
                            className="text-dark-color text-grey-600 font-xssss mb-2 fw-600"
                            htmlFor="exampleInputPassword1"
                          >
                            Order Name
                          </label>
                          <div className="form-group icon-tab">
                            <input
                              type="text"
                              className="bg-white font-xsss border-0 rounded-3 form-control ps-4 bg-color-none border-bottom text-grey-900"
                              // placeholder="1234 1234 1234 1234"
                              value={details.order_name}
                              disabled="true"
                            />
                          </div>
                        </div>
                        <div className="form-group mb-1">
                          <label
                            className="text-dark-color text-grey-600 font-xssss mb-2 fw-600"
                            htmlFor="exampleInputPassword1"
                          >
                            Order Message
                          </label>
                          <div className="form-group icon-tab">
                            <textarea
                              className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                              rows={5}
                              disabled="true"
                              spellCheck="false"
                              value={details.messages}
                            />
                          </div>
                        </div>
                        {details.description && (
                          <div className="form-group mb-1">
                            <label
                              className="text-dark-color text-grey-600 font-xssss mb-2 fw-600"
                              htmlFor="exampleInputPassword1"
                            >
                              Owner Message
                            </label>
                            <div className="form-group icon-tab">
                              <textarea
                                className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                                rows={5}
                                disabled="true"
                                spellCheck="false"
                                value={details.description}
                              />
                            </div>
                          </div>
                        )}
                        <div className="row">
                          <div className="col-6">
                            <div className="form-group mb-1">
                              <label
                                className="text-dark-color text-grey-600 font-xssss mb-2 fw-600"
                                htmlFor="exampleInputPassword1"
                              >
                                Province
                              </label>
                              <div className="form-group icon-tab">
                                <input
                                  type="text"
                                  className="bg-white border-0 rounded-3 form-control ps-4 bg-color-none border-bottom text-grey-900"
                                  // placeholder={"03"}
                                  value={location[0]}
                                  disabled="true"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="form-group mb-1">
                              <label
                                className="text-dark-color text-grey-600 font-xssss mb-2 fw-600"
                                htmlFor="exampleInputPassword1"
                              >
                                City
                              </label>
                              <div className="form-group icon-tab">
                                <input
                                  type="text"
                                  className="bg-white border-0 rounded-3 form-control ps-4 bg-color-none border-bottom text-grey-900"
                                  // placeholder={2021}
                                  value={location[1]}
                                  disabled="true"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-6">
                            <div className="form-group mb-1">
                              <label
                                className="text-dark-color text-grey-600 font-xssss mb-2 fw-600"
                                htmlFor="exampleInputPassword1"
                              >
                                Regency
                              </label>
                              <div className="form-group icon-tab">
                                <input
                                  type="text"
                                  className="bg-white border-0 rounded-3 form-control ps-4 bg-color-none border-bottom text-grey-900"
                                  // placeholder={"03"}
                                  value={location[2]}
                                  disabled="true"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="form-group mb-1">
                              <label
                                className="text-dark-color text-grey-600 font-xssss mb-2 fw-600"
                                htmlFor="exampleInputPassword1"
                              >
                                Village
                              </label>
                              <div className="form-group icon-tab">
                                <input
                                  type="text"
                                  className="bg-white border-0 rounded-3 form-control ps-4 bg-color-none border-bottom text-grey-900"
                                  // placeholder={2021}
                                  value={location[3]}
                                  disabled="true"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-6">
                            <div className="form-group mb-1">
                              <label
                                className="text-dark-color text-grey-600 font-xssss mb-2 fw-600"
                                htmlFor="exampleInputPassword1"
                              >
                                Date
                              </label>
                              <div className="form-group icon-tab">
                                <input
                                  type="text"
                                  className="bg-white border-0 rounded-3 form-control ps-4 bg-color-none border-bottom text-grey-900"
                                  // placeholder={"03"}
                                  value={date}
                                  disabled="true"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="form-group mb-1">
                              <label
                                className="text-dark-color text-grey-600 font-xssss mb-2 fw-600"
                                htmlFor="exampleInputPassword1"
                              >
                                Hour
                              </label>
                              <div className="form-group icon-tab">
                                <input
                                  type="text"
                                  className="bg-white border-0 rounded-3 form-control ps-4 bg-color-none border-bottom text-grey-900"
                                  // placeholder={2021}
                                  value={hour}
                                  disabled="true"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="modal bottom fade"
            style={{ overflowY: "scroll" }}
            id="ModalConfirmOrder"
            tabIndex={-1}
            role="dialog"
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content border-0">
                <button type="button" className="close" data-dismiss="modal">
                  <i className="ti-close text-grey-500" />
                </button>

                <div className="modal-body p-3 d-flex align-items-center bg-none">
                  <div className="card shadow-none rounded-0 w-100 p-2 pt-3 border-0">
                    <div className="card-body rounded-0 text-left p-3">
                      <h2 className="fw-700 display1-size display2-md-size mb-4">
                        Send Review to Owner
                      </h2>

                      {/* Pemilihan Bintang */}
                      <div className="rating mb-3 mt-5">
                        {[...Array(5)].map((_, index) => {
                          const starValue = index + 1;
                          return (
                            <i
                              key={index}
                              className={`ti-star font-lg ${
                                starValue <= (hoverRating || rating)
                                  ? "text-warning"
                                  : "text-grey-500"
                              }`}
                              onMouseEnter={() => setHoverRating(starValue)}
                              onMouseLeave={() => setHoverRating(0)}
                              onClick={() => setRating(starValue)}
                              style={{ cursor: "pointer" }}
                            />
                          );
                        })}
                      </div>

                      {/* Inputan Pesan Review */}
                      <div className="form-group icon-input mb-3">
                        <i className="font-sm feather-type text-grey-500 pe-0 mt-2"></i>
                        <textarea
                          className="style2-input h100 bor-0 w-100 style2-input  p-2 ps-5 font-xsss text-grey-600 fw-500 border-light-md theme-dark-bg"
                          placeholder="Write your review"
                          ref={reviewsRef}
                          rows={10}
                        />
                      </div>

                      <div className="form-group icon-input my-3 d-flex justify-content-end ">
                        <button
                          className="btn bg-current fw-500 text-white font-xsss p-3 w100 text-center lh-20 rounded-xxl mx-1"
                          data-dismiss="modal"
                        >
                          Cancel
                        </button>
                        <button
                          className="btn bg-dark fw-500 text-white font-xsss p-3 w100 text-center lh-20 rounded-xxl mx-1"
                          onClick={() => {
                            $("#ModalConfirmOrder").modal("hide");
                            confirmOrder();
                          }}
                        >
                          Submit Review
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
