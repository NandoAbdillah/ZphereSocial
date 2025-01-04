import { useEffect } from "react";
import { useState } from "react";
import axiosClient from "../axios-client";
import moment from "moment";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [filteredByTimeToday, setFilteredByTimeToday] = useState([]);
  const [filteredByTimeYesterday, setFilteredByTimeYesterday] = useState([]);
  const [filteredByTimeLong, setFilteredByTimeLong] = useState([]);
  const [filteredByType, setFilteredByType] = useState([]);

  useEffect(() => {
    axiosClient
      .get("/notifications")
      .then((response) => {
        const data = response.data.data;
        setNotifications(data);
      })
      .catch((error) => {});
  }, []);

  // Fungsi untuk memfilter berdasarkan waktu
  const filterByTime = () => {
    const now = moment();

    const todayNotifications = notifications.filter((notification) => {
      const createdAt = moment(notification.created_at);
      return createdAt.isSame(now, "day");
    });

    const yesterdayNotifications = notifications.filter((notification) => {
      const yesterday = moment().subtract(1, "day");
      const createdAt = moment(notification.created_at);
      return createdAt.isSame(yesterday, "day");
    });

    const longTimeAgoNotifications = notifications.filter((notification) => {
      const twoDaysAgo = moment().subtract(2, "days");
      const createdAt = moment(notification.created_at);
      return createdAt.isBefore(twoDaysAgo, "day");
    });

    setFilteredByTimeToday(todayNotifications);
    setFilteredByTimeYesterday(yesterdayNotifications);
    setFilteredByTimeLong(longTimeAgoNotifications);
  };

  // Fungsi untuk memfilter berdasarkan tipe
  const filterByType = (type) => {
    const filtered = notifications.filter((notification) => {
      if (type === "posts") {
        return notification.context.includes("post");
      } else if (type === "friends") {
        return notification.type === "friends";
      } else if (type === "groups") {
        return notification.context.includes("group");
      } else if (type === "pays") {
        return notification.context.includes("pay");
      }
      return true;
    });
    setFilteredByType(filtered);
  };

  // Contoh pemanggilan filter
  useEffect(() => {
    filterByTime(); // Filter berdasarkan waktu
    filterByType("posts"); // Filter notifikasi tipe posts
  }, [notifications]);

  return (
    <div className="row">
      <div className="col-xl-12">
        <div className="chat-wrapper p-3 w-100 position-relative scroll-bar bg-white theme-dark-bg">
          <h2 className="fw-700 mb-4 mt-2 font-md text-grey-900 d-flex align-items-center">
            Notification
            <span className="circle-count bg-warning text-white font-xsssss rounded-3 ms-2 ls-3 fw-600 p-2  mt-0">
              23
            </span>
            <a href="#" className="ms-auto btn-round-sm bg-greylight rounded-3">
              <i className="feather-hard-drive font-xss text-grey-500" />
            </a>
            <a href="#" className="ms-2 btn-round-sm bg-greylight rounded-3">
              <i className="feather-alert-circle font-xss text-grey-500" />
            </a>
            <a href="#" className="ms-2 btn-round-sm bg-greylight rounded-3">
              <i className="feather-trash-2 font-xss text-grey-500" />
            </a>
          </h2>

          <ul className="notification-box">
          <h4 className="fw-600 mb-4 mt-2 font-xssss text-grey-500 d-flex align-items-center mt-4">
              Today
            </h4>
            {filteredByTimeToday.map((today) => (
              <li key={today.id}>
                <a
                  href="#"
                  className="d-flex align-items-center p-3 rounded-3 notification-green-hover theme-light-bg"
                >
                  <img
                    src={`${import.meta.env.VITE_ASSET_URL}${today.user.profile}`}
                    alt="user"
                    className="w45 me-3 rounded-circle"
                  />
                  <i className={`text-white me-2 font-xssss notification-react 
                    ${today.type == 'posts' ? "feather-heart bg-mini-gradiant" : today.type === 'groups' ? "feather-users bg-primary-gradiant" : today.type == 'shops' ? "feather-shopping-bag bg-red-gradiant" : today.type == 'friends' ? "feather-star bg-mini-gradiant" : "feather-inbox bg-primary-gradiant" } `} />
                  <h6 className="font-xssss text-grey-900 text-grey-900 mb-0 mt-0 fw-500 lh-20">
                    <strong>{today.user.first_name}{" "}{today.user.last_name}</strong> {"     "}
                    <strong>{today.message}</strong> 
                    <span className="d-block text-grey-500 font-xssss fw-600 mb-0 mt-0 0l-auto">
                      {" "}
                    {moment(today.created_at).fromNow()}
                    </span>{" "}
                  </h6>
                  <i className="ti-more-alt text-grey-500 font-xs ms-auto" />
                </a>
              </li>
            ))}

            <h4 className="fw-600 mb-4 mt-2 font-xssss text-grey-500 d-flex align-items-center mt-4">
              Yesterday
            </h4>
            {filteredByTimeYesterday.map((today) => (
              <li key={today.id}>
                <a
                  href="#"
                  className="d-flex align-items-center p-3 rounded-3 notification-green-hover theme-light-bg"
                >
                  <img
                    src={`${import.meta.env.VITE_ASSET_URL}${today.user.profile}`}
                    alt="user"
                    className="w45 me-3 rounded-circle"
                  />
                  <i className={`text-white me-2 font-xssss notification-react 
                    ${today.type == 'posts' ? "feather-heart bg-mini-gradiant" : today.type === 'groups' ? "feather-users bg-primary-gradiant" : today.type == 'shops' ? "feather-shopping-bag bg-red-gradiant" : today.type == 'friends' ? "feather-star bg-mini-gradiant" : "feather-inbox bg-primary-gradiant" } `} />
                  <h6 className="font-xssss text-grey-900 text-grey-900 mb-0 mt-0 fw-500 lh-20">
                    <strong>{today.user.first_name}{" "}{today.user.last_name}</strong> {"     "}
                    <strong>{today.message}</strong> 
                    <span className="d-block text-grey-500 font-xssss fw-600 mb-0 mt-0 0l-auto">
                      {" "}
                    {moment(today.created_at).fromNow()}
                    </span>{" "}
                  </h6>
                  <i className="ti-more-alt text-grey-500 font-xs ms-auto" />
                </a>
              </li>
            ))}
            <h4 className="fw-600 mb-4 mt-2 font-xssss text-grey-500 d-flex align-items-center mt-4">
              Long time a go
            </h4>
            {filteredByTimeLong.map((today) => (
              <li key={today.id}>
                <a
                  href="#"
                  className="d-flex align-items-center p-3 rounded-3 notification-green-hover theme-light-bg"
                >
                  <img
                    src={`${import.meta.env.VITE_ASSET_URL}${today.user.profile}`}
                    alt="user"
                    className="w45 me-3 rounded-circle"
                  />
                  <i className={`text-white me-2 font-xssss notification-react 
                    ${today.type == 'posts' ? "feather-heart bg-mini-gradiant" : today.type === 'groups' ? "feather-users bg-primary-gradiant" : today.type == 'shops' ? "feather-shopping-bag bg-red-gradiant" : today.type == 'friends' ? "feather-star bg-mini-gradiant" : "feather-inbox bg-primary-gradiant" } `} />
                  <h6 className="font-xssss text-grey-900 text-grey-900 mb-0 mt-0 fw-500 lh-20">
                    <strong>{today.user.first_name}{" "}{today.user.last_name}</strong> {"     "}
                    <strong>{today.message}</strong> 
                    <span className="d-block text-grey-500 font-xssss fw-600 mb-0 mt-0 0l-auto">
                      {" "}
                    {moment(today.created_at).fromNow()}
                    </span>{" "}
                  </h6>
                  <i className="ti-more-alt text-grey-500 font-xs ms-auto" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
