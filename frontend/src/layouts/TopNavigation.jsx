import { useEffect, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../axios-client";
import moment from "moment";

export default function TopNavigation() {
  const { user } = useStateContext();
  const [notifications, setNotifications] = useState([]);
  const [hasMoreNotifcation, setHasMoreNotification] = useState(false);
  const [account, setAccount] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    axiosClient
      .get("/notifications")
      .then((response) => {
        const data = response.data.data;
        if (data.length > 5) {
          setNotifications(data.slice(0, 5));
          setHasMoreNotification(true);
        } else {
          setNotifications(data);
        }
      })
      .catch((error) => {});
  }, []);

  useEffect(() => {
    axiosClient
      .get("/zpherepay-account")
      .then((response) => {
        const accountStatus = response.data.data[0];
        setAccount(accountStatus);
      })
      .catch((error) => {
      });
  }, [navigate]);

  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  return (
    <div className="nav-header bg-white shadow-xs border-0">
      <div className="nav-top">
        <a href="/home">
          <i className="feather-zap text-success display1-size me-2 ms-0" />
          <span className="d-inline-block fredoka-font ls-3 fw-600 text-current font-xxl logo-text mb-0">
            Zphere
          </span>{" "}
        </a>
        <a href="#" className="mob-menu ms-auto me-2 chat-active-btn">
          <i className="feather-message-circle text-grey-900 font-sm btn-round-md bg-greylight" />
        </a>
        <a href="default-video.html" className="mob-menu me-2">
          <i className="feather-video text-grey-900 font-sm btn-round-md bg-greylight" />
        </a>
        <a href="#" className="me-2 menu-search-icon mob-menu">
          <i className="feather-search text-grey-900 font-sm btn-round-md bg-greylight" />
        </a>
        <button className="nav-menu me-0 ms-2" />
      </div>
      <form action="#" className="float-left header-search">
        <div className="form-group mb-0 icon-input">
          <i className="feather-search font-sm text-grey-400" />
          <input
            type="text"
            placeholder="Start typing to search.."
            className="bg-grey border-0 lh-32 pt-2 pb-2 ps-5 pe-3 font-xssss fw-500 rounded-xl w350 theme-dark-bg"
          />
        </div>
      </form>
      <a
        href="/home"
        className="p-2 text-center ms-3 menu-icon center-menu-icon"
      >
        <i
          className={`${window.location.pathname === "/home" || window.location.pathname === "/" ? "alert-primary text-current" : "text-grey-500 bg-greylight"} font-lg  btn-round-lg theme-dark-bg feather-home pt-plus-10`}
        />
      </a>

      <a
        href="/videos"
        className="p-2 text-center ms-0 menu-icon center-menu-icon"
      >
        <i
          className={`${window.location.pathname === "/videos" ? "alert-primary text-current" : "text-grey-500 bg-greylight"} feather-video font-lg  btn-round-lg theme-dark-bg  pt-plus-10 `}
        />
      </a>

      <a
        href="/people"
        className="p-2 text-center ms-0 menu-icon center-menu-icon"
      >
        <i
          className={`${window.location.pathname === "/people" ? "alert-primary text-current" : "text-grey-500 bg-greylight"} font-lg  btn-round-lg theme-dark-bg feather-zap pt-plus-10`}
        />
      </a>

      {/* <a
                href={`/friends/${user.uuid}`}
                className="p-2 text-center ms-0 menu-icon center-menu-icon "
            >
                <i className={`${window.location.pathname.match(/^\/friends\/[0-9a-fA-F-]{36}$/)? 'alert-primary text-current' : 'text-grey-500 bg-greylight'} feather-users font-lg  btn-round-lg theme-dark-bg  pt-plus-10 `} />
            </a> */}

      <a
        href="/shops"
        className="p-2 text-center ms-0 menu-icon center-menu-icon"
      >
        <i
          className={`${window.location.pathname === "/shops" ? "alert-primary text-current" : "text-grey-500 bg-greylight"} font-lg  btn-round-lg theme-dark-bg feather-shopping-bag pt-plus-10`}
        />
      </a>
      {/* <a
        href="/libraries"
        className="p-2 text-center ms-0 menu-icon center-menu-icon"
      >
        <i
          className={`${window.location.pathname === "/libraries" ? "alert-primary text-current" : "text-grey-500 bg-greylight"} font-lg  btn-round-lg theme-dark-bg feather-book-open pt-plus-10`}
        />
      </a> */}
      <a
        href="#"
        className="p-2 text-center ms-auto menu-icon"
        id="dropdownMenu3"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <span className="dot-count bg-warning" />
        <i className="feather-bell font-xl text-current" />
      </a>
      <div
        className="dropdown-menu dropdown-menu-end p-4 rounded-3 border-0 shadow-lg w300"
        aria-labelledby="dropdownMenu3"
      >
        <h4 className="fw-700 font-xss mb-4">Notification</h4>
        {notifications &&
          notifications.map((notif) => (
            <div
              className="card bg-transparent-card w-100 border-0 ps-5 mb-3"
              key={notif.id}
            >
              <a href={notif.url}>
                <img
                  src={`${import.meta.env.VITE_ASSET_URL}${notif.user.profile}`}
                  alt="user"
                  className="position-absolute left-0 rounded-circle"
                  style={{ height: "2.3rem", width: "2.3rem" }}
                />
                <h5 className="font-xsss text-grey-900 mb-1 mt-0 fw-700 d-block">
                  {notif.user.first_name} {notif.user.last_name}
                  <span className="text-grey-400 font-xsssss fw-600 float-right mt-1">
                    {moment(notif.created_at).fromNow()}
                  </span>
                </h5>
                <h6 className="text-grey-500 fw-500 font-xssss lh-4">
                  {notif.message}
                </h6>
              </a>
            </div>
          ))}

        {hasMoreNotifcation && (
          <a href= "/notifications" className="col-12 btn btn-info rounded-xl mont-font font-xssss">
            See All
          </a>
        )}
      </div>
      <a
        href="#"
        className="p-2 text-center ms-3 menu-icon"
        id="zpherepayDropdown"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <i className="ti-wallet font-xl text-current" />
      </a>

      <div
        className="dropdown-menu dropdown-menu-end p-4 rounded-3 border-0 shadow-lg "
        aria-labelledby="zpherepayDropdown"
      >
        {account ? (
          <div className="row">
            {/* Kartu Saldo & Nomor Telepon */}
            
                <div className="card-body text-center p-5">
                  <div className="row">
                    <div className="col-6 ">
                      <img
                        src={`${import.meta.env.VITE_ASSET_URL}${
                          account.user_detail.profile
                        }`}
                        alt="icon"
                        className="w40 float-left d-inline-block rounded-circle"
                        style={{ height: "2.5rem" }}
                      />
                    </div>
                    <div className="col-6 text-right ">
                      <img
                        src="images/purchase_qr.svg"
                        alt="icon"
                        className="w40 float-right d-inline-block me-2"
                      />
                    </div>
                  </div>
                  <h6 className="phone-number mt-2">{account.telp}</h6>
                  <h5 className="text-muted mt-4 mb-3">Saldo</h5>
                  <h2 className="balance-amount zpherepay-text mt-2 font-xs">
                    {rupiah(account.saldo)}
                  </h2>
                  
                  <a href="/zpherepay-topup">
                    <button className="btn zpherepay-background btn-block btn-lg mt-5 text-white font-xss">
                      <i className="feather-credit-card mr-2"></i> Top Up Saldo
                    </button>
                  </a>
                </div>
              </div>
            
        ) : (
          <h1>Akun Zpherepay belum di buat</h1>
        )}
      </div>

      <div className="p-2 text-center ms-3 position-relative dropdown-menu-icon menu-icon cursor-pointer">
        <i className="feather-settings animation-spin d-inline-block font-xl text-current" />
        <div className="dropdown-menu-settings switchcolor-wrap">
          <h4 className="fw-700 font-sm mb-4">Settings</h4>
          <h6 className="font-xssss text-grey-500 fw-700 mb-3 d-block">
            Choose Color Theme
          </h6>
          <ul>
            <li>
              <label className="item-radio item-content">
                <input type="radio" name="color-radio" defaultValue="red" />
                <i className="ti-check" />
                <span
                  className="circle-color bg-red"
                  style={{ backgroundColor: "#ff3b30" }}
                />
              </label>
            </li>
            <li>
              <label className="item-radio item-content">
                <input type="radio" name="color-radio" defaultValue="green" />
                <i className="ti-check" />
                <span
                  className="circle-color bg-green"
                  style={{ backgroundColor: "#4cd964" }}
                />
              </label>
            </li>
            <li>
              <label className="item-radio item-content">
                <input
                  type="radio"
                  name="color-radio"
                  defaultValue="blue"
                  defaultChecked
                />
                <i className="ti-check" />
                <span
                  className="circle-color bg-blue"
                  style={{ backgroundColor: "#132977" }}
                />
              </label>
            </li>
            <li>
              <label className="item-radio item-content">
                <input type="radio" name="color-radio" defaultValue="pink" />
                <i className="ti-check" />
                <span
                  className="circle-color bg-pink"
                  style={{ backgroundColor: "#ff2d55" }}
                />
              </label>
            </li>
            <li>
              <label className="item-radio item-content">
                <input type="radio" name="color-radio" defaultValue="yellow" />
                <i className="ti-check" />
                <span
                  className="circle-color bg-yellow"
                  style={{ backgroundColor: "#ffcc00" }}
                />
              </label>
            </li>
            <li>
              <label className="item-radio item-content">
                <input type="radio" name="color-radio" defaultValue="orange" />
                <i className="ti-check" />
                <span
                  className="circle-color bg-orange"
                  style={{ backgroundColor: "#ff9500" }}
                />
              </label>
            </li>
            <li>
              <label className="item-radio item-content">
                <input type="radio" name="color-radio" defaultValue="gray" />
                <i className="ti-check" />
                <span
                  className="circle-color bg-gray"
                  style={{ backgroundColor: "#8e8e93" }}
                />
              </label>
            </li>
            <li>
              <label className="item-radio item-content">
                <input type="radio" name="color-radio" defaultValue="brown" />
                <i className="ti-check" />
                <span
                  className="circle-color bg-brown"
                  style={{ backgroundColor: "#D2691E" }}
                />
              </label>
            </li>
            <li>
              <label className="item-radio item-content">
                <input
                  type="radio"
                  name="color-radio"
                  defaultValue="darkgreen"
                />
                <i className="ti-check" />
                <span
                  className="circle-color bg-darkgreen"
                  style={{ backgroundColor: "#228B22" }}
                />
              </label>
            </li>
            <li>
              <label className="item-radio item-content">
                <input
                  type="radio"
                  name="color-radio"
                  defaultValue="deeppink"
                />
                <i className="ti-check" />
                <span
                  className="circle-color bg-deeppink"
                  style={{ backgroundColor: "#FFC0CB" }}
                />
              </label>
            </li>
            <li>
              <label className="item-radio item-content">
                <input
                  type="radio"
                  name="color-radio"
                  defaultValue="cadetblue"
                />
                <i className="ti-check" />
                <span
                  className="circle-color bg-cadetblue"
                  style={{ backgroundColor: "#5f9ea0" }}
                />
              </label>
            </li>
            <li>
              <label className="item-radio item-content">
                <input
                  type="radio"
                  name="color-radio"
                  defaultValue="darkorchid"
                />
                <i className="ti-check" />
                <span
                  className="circle-color bg-darkorchid"
                  style={{ backgroundColor: "#9932cc" }}
                />
              </label>
            </li>
          </ul>
          <div className="card bg-transparent-card border-0 d-block mt-3">
            <h4 className="d-inline font-xssss mont-font fw-700">
              Header Background
            </h4>
            <div className="d-inline float-right mt-1">
              <label className="toggle toggle-menu-color">
                <input type="checkbox" />
                <span className="toggle-icon" />
              </label>
            </div>
          </div>
          <div className="card bg-transparent-card border-0 d-block mt-3">
            <h4 className="d-inline font-xssss mont-font fw-700">
              Menu Position
            </h4>
            <div className="d-inline float-right mt-1">
              <label className="toggle toggle-menu">
                <input type="checkbox" />
                <span className="toggle-icon" />
              </label>
            </div>
          </div>
          <div className="card bg-transparent-card border-0 d-block mt-3">
            <h4 className="d-inline font-xssss mont-font fw-700">Dark Mode</h4>
            <div className="d-inline float-right mt-1">
              <label className="toggle toggle-dark">
                <input type="checkbox" />
                <span className="toggle-icon" />
              </label>
            </div>
          </div>
        </div>
      </div>
      <a href={`/user/${user.uuid}`} className="p-0 ms-3 menu-icon">
        <img
          src={`${import.meta.env.VITE_ASSET_URL}/${user.profile}`}
          alt="user"
          className="shadow-sm rounded-circle w40"
          style={{ height: "40px" }}
        />
      </a>
    </div>
  );
}
