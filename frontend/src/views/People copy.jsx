import React, { useEffect, useState, useRef } from "react";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

const People = () => {
    const { user: authUser } = useStateContext(); // Mengambil user dari context
    const authUserId = authUser?.id; // Mendapatkan ID pengguna yang sedang diautentikasi
    const [users, setUsers] = useState([]);
    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [friends, setFriends] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const hasLoaded = useRef(false);

    useEffect(() => {
        if (!hasLoaded.current) {
            loadUsers();
            hasLoaded.current = true; // Set to true after the first call
        }
    }, []);

    useEffect(() => {
        if (users.length > 0) {
            console.log(users);
            users.forEach((user) => {
                fetchFriendStatus(user.id);
            });
        }
    }, [users]);

    const loadUsers = async (page = 1) => {
        setLoading(true);
        try {
            const response = await axiosClient.get(`/peoples?page=${page}`);
            const newUsers = response.data.data || [];

            // Filter out duplicates
            const uniqueUsers = newUsers.filter(
                (newUser) => !users.some((user) => user.uuid === newUser.uuid)
            );

            setUsers((prevUsers) => [...prevUsers, ...uniqueUsers]);
            setLoading(false);
            setCurrentPage(page);
            console.log(currentPage);
            setHasMore(
                response.data.meta.current_page < response.data.meta.last_page
            );
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
                fetchFriendStatus(user_id);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const acceptFriend = (friend_id) => {
        axiosClient
            .post(`/friends/${friend_id}/accept`)
            .then(() => {
                fetchFriendStatus(friend_id);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const removeFriend = (friend_id) => {
        axiosClient
            .post(`/friends/${friend_id}/remove`)
            .then(() => {
                fetchFriendStatus(friend_id);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const fetchFriendStatus = (user_id) => {
        axiosClient
            .get(`/friends/${user_id}/status`)
            .then((response) => {
                setFriends((prevFriends) => ({
                    ...prevFriends,
                    [user_id]: {
                        role: response.data.role,
                        status: response.data.status,
                    },
                }));
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const fetchUsers = (searchQuery = "") => {
        setUsers([]);
        setLoading(true);
        axiosClient
            .get("/search-user", {
                params: { search: searchQuery },
            })
            .then((response) => {
                setUsers(null);
                setUsers(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching groups:", error);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchUsers(search);
    }, [search]);

    return (
        <div className="row feed-body">
            <div className="col-xl-12">
                <div className="card shadow-xss w-100 d-block d-flex border-0 p-4 mb-3">
                    <div className="card-body d-flex align-items-center p-0">
                        <h2 className="fw-700 mb-0 mt-0 font-md text-grey-900">
                            Friends
                        </h2>
                        <div className="search-form-2 ms-auto">
                            <i className="ti-search font-xss" />
                            <input
                                type="text"
                                value={search}
                                onChange={handleSearch}
                                className="form-control text-grey-500 mb-0 bg-greylight theme-dark-bg border-0"
                                placeholder="Search here."
                            />
                        </div>
                        <a
                            href="#"
                            className="btn-round-md ms-2 bg-greylight theme-dark-bg rounded-3"
                        >
                            <i className="feather-filter font-xss text-grey-500" />
                        </a>
                    </div>
                </div>

                <div className="row ps-2 pe-2">
                    {users &&
                    users.length > 0 &&
                    friends &&
                    Object.keys(friends).length > 0 ? (
                        users.map((user_) => (
                            <div
                                className="col-md-3 col-sm-4 pe-2 ps-2"
                                key={user_.id}
                            >
                                {friends[user_.id] && (
                                    <div className="card d-block border-0 shadow-xss rounded-3 overflow-hidden mb-3">
                                        <div className="card-body d-block w-100 ps-3 pe-3 pb-4 text-center">
                                            <figure className="avatar ms-auto me-auto mb-0 position-relative w65 z-index-1">
                                                <a href={`/user/${user_.uuid}`}>
                                                    <img
                                                        src={`${
                                                            import.meta.env
                                                                .VITE_ASSET_URL
                                                        }/${user_.profile}`}
                                                        alt="image"
                                                        className="float-right p-0 bg-white rounded-circle w-100 shadow-xss"
                                                        height={"65px"}
                                                    />
                                                </a>
                                            </figure>
                                            <div className="clearfix" />
                                            <h4 className="fw-700 font-xsss mt-3 mb-1">
                                                {user_.first_name}{" "}
                                                {user_.last_name}
                                            </h4>
                                            <p className="fw-500 font-xsssss text-grey-500 mt-0 mb-3">
                                                @{user_.username}
                                            </p>
                                            {friends[user_.id] &&
                                                (friends[user_.id].role ===
                                                    "receiver" &&
                                                friends[user_.id].status ===
                                                    "pending" ? (
                                                    <button
                                                        onClick={() =>
                                                            acceptFriend(
                                                                user_.id
                                                            )
                                                        }
                                                        className="mt-0 btn pt-2 pb-2 ps-3 pe-3 lh-24 ms-1 ls-3 d-inline-block rounded-xl bg-warning font-xsssss fw-700 ls-lg text-white"
                                                    >
                                                        ACCEPT
                                                    </button>
                                                ) : friends[user_.id].role ===
                                                      "sender" &&
                                                  friends[user_.id].status ==
                                                      "pending" ? (
                                                    <button
                                                        onClick={() =>
                                                            removeFriend(
                                                                user_.id
                                                            )
                                                        }
                                                        className="mt-0 btn pt-2 pb-2 ps-3 pe-3 lh-24 ms-1 ls-3 d-inline-block rounded-xl bg-danger font-xsssss fw-700 ls-lg text-white"
                                                    >
                                                        CANCEL
                                                    </button>
                                                ) : friends[user_.id].status ===
                                                  "rejected" ? (
                                                    <button
                                                        onClick={() =>
                                                            addFriend(user_.id)
                                                        }
                                                        className="mt-0 btn pt-2 pb-2 ps-3 pe-3 lh-24 ms-1 ls-3 d-inline-block rounded-xl bg-success font-xsssss fw-700 ls-lg text-white"
                                                    >
                                                        ADD FRIEND
                                                    </button>
                                                ) : friends[user_.id].status ===
                                                  "accepted" ? (
                                                    <button
                                                        onClick={() =>
                                                            addFriend(user_.id)
                                                        }
                                                        className="mt-0 btn pt-2 pb-2 ps-3 pe-3 lh-24 ms-1 ls-3 d-inline-block rounded-xl bg-info font-xsssss fw-700 ls-lg text-white"
                                                    >
                                                        FRIEND
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() =>
                                                            addFriend(user_.id)
                                                        }
                                                        className="mt-0 btn pt-2 pb-2 ps-3 pe-3 lh-24 ms-1 ls-3 d-inline-block rounded-xl bg-success font-xsssss fw-700 ls-lg text-white"
                                                    >
                                                        ADD FRIEND
                                                    </button>
                                                ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        //    <h1>Getting User</h1>
                        <div className="preloader-wrapped"></div>
                        
                    )}

                    {loading && <h1>Loading...</h1>}
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
