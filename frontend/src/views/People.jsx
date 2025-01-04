import React, { useEffect, useState, useRef } from "react";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";
import { notification } from "antd";
import CubeLoader from "../components/CubeLoader";


const People = () => {
  const { user: authUser } = useStateContext(); // Mengambil user dari context
  const authUserId = authUser?.id; // Mendapatkan ID pengguna yang sedang diautentikasi
  const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const hasLoaded = useRef(false);

  const showNotification = (type, messageText, description) => {
    notification[type]({
      message: messageText,
      description: description,
    });
  };

  useEffect(() => {
    if (!hasLoaded.current) {
      loadUsers();
      hasLoaded.current = true; // Set to true after the first call
    }
  }, []);

  const loadUsers = async (page = 1) => {
    setLoading(true);
    try {
      const response = await axiosClient.get(`/peoples?page=${page}`);
      const newUsers = response.data.data || [];
  
      // Gabungkan data baru dengan yang lama, hindari duplikasi dengan key UUID
      const uniqueUsers = [...users, ...newUsers].filter(
        (user, index, self) => index === self.findIndex((u) => u.uuid === user.uuid)
      );
  
      setUsers(uniqueUsers); // Update hanya dengan data yang unik
      setLoading(false);
      setCurrentPage(page);
      setHasMore(response.data.meta.current_page < response.data.meta.last_page);
    } catch (err) {
      setLoading(false);
      const response = err.response;
      if (response && response.status === 422) {
        setErrors(response.data.errors);
      }
    }
  };
  

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      loadUsers(currentPage + 1);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const addFriend = (user_id) => {
    axiosClient
      .post(`/friends/${user_id}/add`)
      .then(() => {
        // fetchFriendStatus(user_id);
        const updatedUsers = users.map((user) =>
          user.id === user_id
            ? {
                ...user,
                status: { role: "sender", status: "pending" },
              }
            : user
        );

        setUsers(updatedUsers);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const acceptFriend = (friend_id) => {
    axiosClient
      .post(`/friends/${friend_id}/accept`)
      .then(() => {
        const updatedUsers = users.map((user) =>
          user.id === friend_id
            ? {
                ...user,
                status: { ...user.status, status: "accepted" },
              }
            : user
        );

        setUsers(updatedUsers);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const removeFriend = (friend_id) => {
    axiosClient
      .post(`/friends/${friend_id}/remove`)
      .then(() => {
        const updatedUsers = users.map((user) =>
          user.id === friend_id
            ? { ...user, status: { role: null, status: null } }
            : user
        );

        setUsers(updatedUsers);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchUsers = (searchQuery = "") => {
    setUsers([]); // Clear users for new search
    setLoading(true);
    axiosClient
      .get("/search-user", {
        params: { search: searchQuery },
      })
      .then((response) => {
        setUsers(response.data.data); // Set the result directly
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (isInputFocused && search) {
      // Saat pencarian memiliki kata, fetchUsers sesuai dengan input
      fetchUsers(search);
    } else if (isInputFocused && !search) {
      // Saat pencarian kosong tapi masih fokus, reset data lalu loadUsers
      setUsers([]); // Clear users
      setCurrentPage(1); // Reset page to 1
      setHasMore(true); // Reset pagination flag
      loadUsers(1); // Load from the first page again
    }
  }, [search, isInputFocused]);
  

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  return (
    <div className="row feed-body">
      <div className="col-xl-12">
        <div className="card shadow-xss w-100 d-block d-flex border-0 p-4 mb-3">
          <div className="card-body d-flex align-items-center p-0">
            <h2 className="fw-700 mb-0 mt-0 font-md text-grey-900">Users</h2>
            <div className="search-form-2 ms-auto">
              <i className="ti-search font-xss" />
              <input
                type="text"
                value={search}
                onChange={handleSearch}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                className="form-control text-grey-500 mb-0 bg-greylight theme-dark-bg border-0"
                placeholder="Search here."
              />
            </div>
          </div>
        </div>

        <div className="row ps-2 pe-2">
          {users && users.length > 0 ? (
            users.map((user_) => (
              <div className="col-md-3 col-sm-4 pe-2 ps-2" key={user_.id}>
                <div className="card d-block border-0 shadow-xss rounded-3 overflow-hidden mb-3">
                  <div className="card-body d-block w-100 ps-3 pe-3 pb-4 text-center">
                    <figure className="avatar ms-auto me-auto mb-0 position-relative w65 z-index-1">
                      <a href={`/user/${user_.uuid}`}>
                        <img
                          src={`${
                            import.meta.env.VITE_ASSET_URL
                          }/${user_.profile}`}
                          alt="image"
                          className="float-right p-0 bg-white rounded-circle w-100 shadow-xss"
                          height={"65px"}
                        />
                      </a>
                    </figure>
                    <div className="clearfix" />
                    <h4 className="fw-700 font-xsss mt-3 mb-1">
                      {user_.first_name} {user_.last_name}
                    </h4>
                    <p className="fw-500 font-xsssss text-grey-500 mt-0 mb-3">
                      @{user_.username}
                    </p>
                    {user_.status.role === "receiver" &&
                    user_.status.status === "pending" ? (
                      <button
                        onClick={() => acceptFriend(user_.id)}
                        className="mt-0 btn pt-2 pb-2 ps-3 pe-3 lh-24 ms-1 ls-3 d-inline-block rounded-xl bg-warning font-xsssss fw-700 ls-lg text-white"
                      >
                        ACCEPT
                      </button>
                    ) : user_.status.role === "sender" &&
                      user_.status.status == "pending" ? (
                      <button
                        onClick={() => removeFriend(user_.id)}
                        className="mt-0 btn pt-2 pb-2 ps-3 pe-3 lh-24 ms-1 ls-3 d-inline-block rounded-xl bg-danger font-xsssss fw-700 ls-lg text-white"
                      >
                        CANCEL
                      </button>
                    ) : user_.status.status === "rejected" ? (
                      <button
                        onClick={() => addFriend(user_.id)}
                        className="mt-0 btn pt-2 pb-2 ps-3 pe-3 lh-24 ms-1 ls-3 d-inline-block rounded-xl bg-success font-xsssss fw-700 ls-lg text-white"
                      >
                        ADD FRIEND
                      </button>
                    ) : user_.status.status === "accepted" ? (
                      <button
                        onClick={() =>
                          showNotification(
                            "info",
                            "Friend",
                            "You already be friends"
                          )
                        }
                        className="mt-0 btn pt-2 pb-2 ps-3 pe-3 lh-24 ms-1 ls-3 d-inline-block rounded-xl bg-info font-xsssss fw-700 ls-lg text-white"
                      >
                        FRIEND
                      </button>
                    ) : (
                      <button
                        onClick={() => addFriend(user_.id)}
                        className="mt-0 btn pt-2 pb-2 ps-3 pe-3 lh-24 ms-1 ls-3 d-inline-block rounded-xl bg-success font-xsssss fw-700 ls-lg text-white"
                      >
                        ADD FRIEND
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            // <CubeLoader/>
            <></>
          )}

          {loading && <CubeLoader/>}
          {!loading && hasMore && (
            <div className="card w-100 text-center shadow-xss rounded-xxl border-0 p-4 mb-3 mt-3">
              <div
                className="snippet mt-2 ms-auto me-auto"
                data-title=".dot-typing"
              >
                <div className="stage mx-auto">
                  <div
                    className="dot-typing"
                    style={{ marginLeft: "-4rem" }}
                  ></div>
                  <button
                    onClick={handleLoadMore}
                    className="position-absolute btn "
                    style={{
                      marginTop: "-1.5rem",
                      marginLeft: "-3rem",
                    }}
                  >
                    LOAD MORE
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default People;
