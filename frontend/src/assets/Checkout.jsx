import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../axios-client";
import { useNavigate } from "react-router-dom";
import { message, notification } from "antd";

export default function Checkout() {
  const { id } = useParams();
  const [itemInfo, setItem] = useState([]);

  const [provinces, setProvinces] = useState([]);
  const [regencies, setRegencies] = useState([]);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [villages, setVillages] = useState([]);

  const [prov, setProv] = useState([]);
  const [reg, setReg] = useState([]);
  const [cit, setCit] = useState([]);
  const [dist, setDist] = useState([]);
  const [vill, setVill] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedRegency, setSelectedRegency] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedVillage, setSelectedVillage] = useState("");

  const navigate = useNavigate();
  const [account, setAccount] = useState(false);
  const [status, setStatus] = useState(true);

  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  useEffect(() => {
    axiosClient
      .get("/zpherepay-account")
      .then((response) => {
        const accountStatus = response.data.data[0];
        setAccount(accountStatus);
      })
      .catch((error) => {
        // navigate("/zpherepay-register"); // Redirect ke halaman zpherepay-register jika status false
        setStatus(!status);
      });
  }, [status]);

  useEffect(() => {
    axiosClient
      .get(`/checkout-item`, { params: { id: id } })
      .then((response) => {
        setTotal(
          response.data.data[0].item_detail.price * response.data.data[0].items
        );
        setShipping(
          response.data.data[0].item_detail.price *
            response.data.data[0].items *
            0.3
        );
        setOrderTotal(
          response.data.data[0].item_detail.price *
            response.data.data[0].items +
            response.data.data[0].item_detail.price *
              response.data.data[0].items *
              0.3
        );
        setItem(response.data.data[0]);
      })
      .catch((err) => {
        const errors = err.errors;
      });
  }, []);

  useEffect(() => {
    getProvince();
    getRegencies();
    getDistricts();
    getVillages();
  }, []);

  const getProvince = () => {
    axiosClient
      .get("/provinces")
      .then((response) => {
        setProvinces(response.data);
        setProv(response.data);
      })
      .catch((error) => {});
  };

  const getRegencies = () => {
    axiosClient
      .get("/regencies")
      .then((response) => {
        setRegencies(response.data);
      })
      .catch((error) => {});
  };

  const getDistricts = () => {
    axiosClient
      .get("/districts")
      .then((response) => {
        setDistricts(response.data);
      })
      .catch((error) => {});
  };

  const getVillages = () => {
    axiosClient
      .get("/villages")
      .then((response) => {
        setVillages(response.data);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    if (selectedProvince) {
      const filteredRegencies = regencies.filter(
        (regency) => regency.province_id === parseInt(selectedProvince)
      );
      setCit(filteredRegencies);
      setSelectedRegency("");
      setSelectedDistrict("");
      setSelectedVillage("");
    }
  }, [selectedProvince, regencies]);

  useEffect(() => {
    if (selectedRegency) {
      const filteredDistricts = districts.filter(
        (district) => district.regency_id === parseInt(selectedRegency)
      );
      setDist(filteredDistricts);
    }
  }, [selectedRegency, districts]);

  useEffect(() => {
    if (selectedDistrict) {
      const filteredVillages = villages.filter(
        (village) => village.districts_id === parseInt(selectedDistrict)
      );
      setVill(filteredVillages);
    }
  }, [selectedDistrict, villages]);

  useEffect(() => {
    if (selectedVillage) {
      console.log(selectedVillage);
    }
  }, [villages]);

  const [total, setTotal] = useState(null);
  const [shipping, setShipping] = useState(null);
  const [orderTotal, setOrderTotal] = useState(null);
  const [payment, setPayment] = useState(null);

  const orderNameRef = useRef();
  const postalCodeRef = useRef();
  // const paymentRef = useRef();
  const messagesRef = useRef();

  const [location, setLocation] = useState("");

  const handleVerifyPin = (e) => {
    const token = code.join("");
    axiosClient
      .post("/zpherepay-check-pin", { pin: token })
      .then((response) => {
        handleSubmit();
      })
      .catch((err) => {
        setCode(new Array(6).fill(""));
        alert("pin tidak sesuai, Inputkan ulang !");
      });
  };

  const showNotification = (type, messageText, description) => {
    notification[type]({
      message: messageText,
      description: description,
    });
  };
  const handleSubmit = (e) => {
    // e.preventDefault();

    const payload = {
      owner_id: itemInfo.item_detail.user_id,
      item_id: itemInfo.item_detail.id,
      cart_id: id,
      subtotal: total,
      shipping: shipping,
      total_pays: orderTotal,
      order_total: orderTotal,
      order_name: orderNameRef.current.value,
      postal_code: postalCodeRef.current.value,
      messages: messagesRef.current.value,
      payment: payment,
      specific_location: location,
      total_item: itemInfo.items,
    };

    axiosClient
      .post("/checkout-purchase", payload)
      .then((response) => {
        showNotification("success", "Checkout", "Successfully checkout item.");
        const modalBackdrop = document.querySelector(".modal-backdrop");
        if (modalBackdrop) {
          modalBackdrop.remove();
        }
        navigate("/checkout-items");
      })
      .catch((error) => {
        alert("gagal");
      });
  };

  const [selectedProvinceName, setSelectedProvinceName] = useState("");
  const [selectedRegencyName, setSelectedRegencyName] = useState("");
  const [selectedDistrictName, setSelectedDistrictName] = useState("");
  const [selectedVillageName, setSelectedVillageName] = useState("");

  const handleLocationChanged = () => {
    setLocation(
      `${selectedProvinceName}_${selectedRegencyName}_${selectedDistrictName}_${selectedVillageName}`
    );
  };

  useEffect(() => {
    handleLocationChanged();
  }, [
    selectedProvinceName,
    selectedRegencyName,
    selectedDistrictName,
    selectedVillageName,
  ]);

  const [code, setCode] = useState(new Array(6).fill(""));

  const handleChange = (element, index) => {
    const value = element.value.replace(/[^0-9]/g, ""); // Hanya menerima angka
    const updatedCode = [...code];

    // Perbarui nilai di index saat ini
    updatedCode[index] = value;

    setCode(updatedCode);

    // Pindah ke kotak berikutnya jika input tidak kosong
    if (value && element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  return (
    <>
      {Object.keys(itemInfo).length !== 0 && (
        <div className="col-xl-12 mb-4">
          <div className="row">
            <div className="col-lg-12 mb-3">
              <div className="card p-lg-5 p-4 bg-primary-gradiant rounded-3 shadow-xss bg-pattern border-0 overflow-hidden">
                <div className="bg-pattern-div" />
                <h2 className="display2-size display2-md-size fw-700 text-white mb-0 mt-0">
                  Checkout
                </h2>
              </div>
            </div>
          </div>
          <form encType="multipart/form-data" className="mb-5">
            <div className="row">
              <div className="col-sm-12">
                <div className="card bg-greyblue border-0 p-4 mb-5">
                  <p className="mb-0 mont-font font-xssss text-uppercase fw-600 text-grey-500">
                    <i className="fa fa-exclamation-circle" /> Attention !{" "}
                    <a
                      className="expand-btn text-grey-500 fw-700"
                      href="#coupon_info"
                    >
                      Some data will be taken from your account information to
                      strengthen payment security
                    </a>
                  </p>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6">
                <div className="page-title">
                  <h4 className="mont-font fw-600 font-md mb-lg-5 mb-4">
                    Billing address
                  </h4>

                  <div className="row">
                    <div className="col-lg-6 mb-3">
                      <div className="form-gorup">
                        <label className="mont-font fw-600 font-xssss">
                          Order Name
                        </label>
                        <input
                          type="text"
                          name="comment-name"
                          className="form-control"
                          ref={orderNameRef}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 mb-3">
                      <div className="form-gorup">
                        <label className="mont-font fw-600 font-xssss">
                          Postal Code
                        </label>
                        <input
                          type="number"
                          name="postal-code"
                          className="form-control"
                          ref={postalCodeRef}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6 mb-3">
                      <div className="form-group">
                        <label className="mont-font fw-600 font-xsss">
                          Province
                        </label>

                        <select
                          name="province"
                          id="province"
                          className="form-select"
                          value={selectedProvince}
                          onChange={(e) => {
                            setSelectedProvince(e.target.value);
                            const selectedName =
                              prov.find(
                                (province) => province.id == e.target.value
                              )?.province || "";
                            setSelectedProvinceName(selectedName);
                          }}
                        >
                          {prov.map((province) => (
                            <option key={province.id} value={province.id}>
                              {province.province}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="col-lg-6 mb-3">
                      <div className="form-group">
                        <label className="mont-font fw-600 font-xsss">
                          Regency
                        </label>

                        <select
                          name="regency"
                          id="regency"
                          className="form-select"
                          value={selectedRegency}
                          onChange={(e) => {
                            setSelectedRegency(e.target.value);
                            const selectedName =
                              cit.find((city) => city.id == e.target.value)
                                ?.regency || "";
                            setSelectedRegencyName(selectedName);
                          }}
                          disabled={!selectedProvince}
                        >
                          {cit.map((city) => (
                            <option key={city.id} value={city.id}>
                              {city.regency}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6 mb-3">
                      <div className="form-group">
                        <label className="mont-font fw-600 font-xsss">
                          District
                        </label>

                        <select
                          name="district"
                          id="district"
                          className="form-select"
                          value={selectedDistrict}
                          onChange={(e) => {
                            setSelectedDistrict(e.target.value);
                            const selectedName =
                              dist.find(
                                (district) => district.id == e.target.value
                              )?.districts || "";
                            setSelectedDistrictName(selectedName);
                          }}
                          disabled={!selectedRegency}
                        >
                          {dist.map((district) => (
                            <option key={district.id} value={district.id}>
                              {district.districts}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="col-lg-6 mb-3">
                      <div className="form-group">
                        <label className="mont-font fw-600 font-xsss">
                          Village
                        </label>

                        <select
                          name="village"
                          id="village"
                          className="form-select"
                          disabled={!selectedDistrict}
                          value={selectedVillage}
                          onChange={(e) => {
                            setSelectedVillage(e.target.value);
                            const selectedName =
                              vill.find(
                                (village) => village.id == e.target.value
                              )?.village || "";
                            setSelectedVillageName(selectedName);
                          }}
                        >
                          {vill.map((village) => (
                            <option
                              key={`${village.id}-${village.village}`}
                              value={village.id}
                            >
                              {village.village}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-lg-12 mb-3">
                      <div className="form-gorup">
                        <label className="mont-font fw-600 font-xssss">
                          Message for seller or delivery person
                        </label>
                        <textarea
                          className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                          rows={5}
                          placeholder="Write your message..."
                          spellCheck="false"
                          defaultValue={""}
                          ref={messagesRef}
                        />
                      </div>
                    </div>
                  </div>
                  <h4 className="mont-font fw-600 font-md mb-3 mt-2">
                    Payment Method
                  </h4>
                  <div className="checkout-payment card border-0 mb-3 bg-greyblue p-lg-5 p-4">
                    <div className="payment-group mb-4">
                      <div className="payment-radio">
                        <input
                          type="radio"
                          defaultValue="bank"
                          name="payment-method"
                          id="bank"
                          onChange={(e) => {
                            if (e.target.checked) {
                              setPayment("zpherepay");
                            }
                          }}
                        />
                        <label
                          className="payment-label fw-600 font-xsss text-grey-900 ms-2"
                          htmlFor="cheque"
                        >
                          ZpherePay
                        </label>
                      </div>
                      <div
                        className="payment-info"
                        data-method="bank"
                        style={{}}
                      >
                        <p className="font-xssss lh-24 text-grey-500 ps-4">
                          Make your payment directly into our bank account.
                          Please use your Order ID as the payment reference.
                          Your order will not be shipped until the funds have
                          cleared in our account.
                        </p>
                      </div>
                    </div>

                    <div className="payment-group mb-0">
                      <div className="payment-radio">
                        <input
                          type="radio"
                          defaultValue="cash"
                          name="payment-method"
                          id="cash"
                          defaultChecked=""
                          onChange={(e) => {
                            if (e.target.checked) {
                              setPayment("cod");
                            }
                          }}
                        />
                        <label
                          className="payment-label fw-600 font-xsss text-grey-900 ms-2"
                          htmlFor="cash"
                        >
                          Cash on Delivery
                        </label>
                      </div>
                      <div
                        className="payment-info cash hide-in-default"
                        data-method="cash"
                        style={{ display: "none" }}
                      >
                        <p className="font-xssss lh-24 text-grey-500 ps-4">
                          Pay with cash upon delivery.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-5 offset-xl-1 col-lg-6">
                <div className="order-details">
                  <h4 className="mont-font fw-600 font-md mb-5">
                    Order Details
                  </h4>
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
                            {itemInfo.item_detail.item}
                            <strong>
                              <span>✕</span>
                              {itemInfo.items}
                            </strong>
                          </th>
                          <td className="text-right text-grey-500 fw-500 font-xsss">
                            {rupiah(itemInfo.item_detail.price)}
                          </td>
                        </tr>
                      </tbody>
                      <tfoot>
                        <tr className="cart-subtotal">
                          <th>Subtotal</th>
                          <td className="text-right text-grey-700 font-xsss fw-700">
                            {rupiah(total)}
                          </td>
                        </tr>
                        <tr className="shipping">
                          <th>Shipping</th>
                          <td className="text-right">
                            <span className="text-grey-700 font-xsss fw-700">
                              Flat Rate; {rupiah(shipping)}
                            </span>
                          </td>
                        </tr>
                        <tr className="order-total">
                          <th>Order Total</th>
                          <td className="text-right text-grey-700 font-xsss fw-700">
                            <span className="order-total-ammount">
                              {rupiah(orderTotal)}
                            </span>
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>

                  <div className="clearfix" />
                  <div className="card shadow-none border-0">
                    <button
                      // type="submit"
                      onClick={(e) => {
                        e.preventDefault();
                        payment === "zpherepay" ? "" : handleSubmit();
                      }}
                      data-bs-toggle={payment === "zpherepay" ? "modal" : ""}
                      data-bs-target={
                        payment === "zpherepay" ? "#Modallogin" : ""
                      }
                      className="btn w-100 p-3 mt-3 font-xsss text-center text-white bg-current rounded-3 text-uppercase fw-600 ls-3"
                    >
                      Order Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>

          {/* Modal */}
          <div
            className="modal bottom fade"
            style={{ overflowY: "scroll" }}
            id="Modallogin"
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
                      <h2 className="fw-700 display1-size display2-md-size mb-5">
                        ZpherePay
                      </h2>
                      <div className="form-group icon-input mb-3"></div>
                      {!account && (
                        // Register
                        <>
                          <div className="alert alert-danger" role="alert">
                            <h3 className="alert-heading">
                              <strong>Ooops!</strong>
                            </h3>
                            <p>
                              {
                                " Aww yeah, you cannot use Zpherepay payment because you didn't register yet "
                              }
                            </p>
                            <hr />
                            <h3 className="alert-heading">
                              <strong>Tips</strong>
                            </h3>
                            <p>Make and Register ZpherePay account !</p>
                          </div>

                          <div className="form-group icon-input my-3 d-flex justify-content-end mt-5">
                            {/* <button
                              className="btn   bg-current fw-500 text-white font-xsss p-3  w100 text-center lh-20 rounded-xxl mx-1"
                              data-dismiss="modal"
                            >
                              Cancel
                            </button> */}
                            <a
                              href="/zpherepay"
                              className="btn   bg-dark fw-500 text-white font-xsss p-3  w100 text-center lh-20 rounded-xxl mx-1"
                              type="submit"
                            >
                              Register
                            </a>
                          </div>
                        </>
                      )}

                      {account.status == 0 && <h1>Activate Account</h1>}

                      {account.status == 1 && account.saldo >= orderTotal && (
                        <>
                          <h1>Enter Pin</h1>
                          <div className="col-lg-12 mb-3">
                            <div className="otp-input-container d-flex justify-content-center">
                              {code.map((digit, idx) => (
                                <input
                                  key={idx}
                                  type="text"
                                  maxLength="1"
                                  value={digit}
                                  onChange={(e) => handleChange(e.target, idx)}
                                  onFocus={(e) => e.target.select()}
                                  className="otp-input form-control mx-1 text-center"
                                />
                              ))}
                            </div>
                          </div>
                          <div className="form-group icon-input my-3 d-flex justify-content-end mt-5">
                            <a
                              onClick={handleVerifyPin}
                              className="btn   bg-dark fw-500 text-white font-xsss p-3  w100 text-center lh-20 rounded-xxl mx-1"
                            >
                              Provide & Checkout !
                            </a>
                          </div>
                        </>
                      )}

                      {account.status == 1 && account.saldo < orderTotal && (
                        <h1>Top Up First</h1>
                      )}

                      {/* <div className="form-group icon-input mb-3">
                        <i className="font-sm feather-type text-grey-500 pe-0"></i>
                        <input
                          type="text"
                          className="style2-input ps-5 form-control text-grey-900 font-xsss fw-600"
                          placeholder="write caption"
                        />
                      </div> */}
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
