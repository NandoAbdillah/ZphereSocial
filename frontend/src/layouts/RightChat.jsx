import { useState, useEffect, useRef } from "react";
import axiosClient from "../axios-client";
import Group from "../views/Group";
import { useStateContext } from "../contexts/ContextProvider";
import { notification } from "antd";

export default function RightChat() {
  const { user } = useStateContext();
  const [users, setUsers] = useState([]);
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [suggestedGroup, setSuggestedGroup] = useState([]);

  useEffect(() => {
    axiosClient
      .get("/friends-request")
      .then((response) => {
        setUsers(response.data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      });
  }, []);

  const hasLoaded = useRef(false);

  useEffect(() => {
    if (!hasLoaded.current) {
      loadFriends();
      hasLoaded.current = true; // Set to true after the first call
    }
  }, []);

  const loadFriends = async (page = 1) => {
    setLoading(true);
    try {
      const response = await axiosClient.get(`/friends-accepted?page=${page}`);
      const newFriends = response.data.data || [];

      // Filter out duplicates
      const uniqueFriends = newFriends.filter(
        (newFriends) => !friends.some((friend) => friend.id === newFriends.id)
      );

      setFriends((prevFriends) => [...prevFriends, ...uniqueFriends]);
      setLoading(false);
      setCurrentPage(page);
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
      loadFriends(currentPage + 1);
    }
    console.log(friends);
  };

  const openNotification = (type, message, description) => {
    notification[type]({
      message: message,
      description: description,
    });
  };

  const acceptFriend = (friend_id) => {
    axiosClient
      .post(`/friends/${friend_id}/accept`)
      .then(() => {
        requestConfirmed(friend_id);
        openNotification(
          "success",
          "Friend Request",
          "Successfully confirm friend request !"
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const requestConfirmed = (friend_id) => {
    setUsers((prevUsers) =>
      prevUsers.filter((user) => user.friend_detail.id !== friend_id)
    );
    loadFriends(1);
  };

  useEffect(() => {
    getSuggestedGroup();
  }, []);

  const getSuggestedGroup = () => {
    axiosClient
      .get(`/suggested-group`)
      .then((response) => {
        setSuggestedGroup(response.data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      });
  };

  return (
    <div
      className="col-xl-4 col-xxl-3 col-lg-4 ps-lg-0  "
      style={{ position: "realtive", top: "-10px" }}
    >
      {friends && users && suggestedGroup && (
        <>
        {users.length !== 0 && (
          <div className="card w-100 shadow-xss rounded-xxl border-0 mb-3">
            <div className="card-body d-flex align-items-center p-4">
              <h4 className="fw-700 mb-0 font-xssss text-grey-900">
                Friend Request
              </h4>
              <a
                href="default-member.html"
                className="fw-600 ms-auto font-xssss text-primary"
              >
                See all
              </a>
            </div>

            
              {users.map((user) => (
                <div key={user.id}>
                  <div className="card-body d-flex pt-4 ps-4 pe-4 pb-0 border-top-xs bor-0">
                    <figure className="avatar me-3">
                      <img
                        src={`${import.meta.env.VITE_ASSET_URL}${
                          user.friend_detail.profile
                        }`}
                        alt="image"
                        className="shadow-sm rounded-circle"
                        style={{ width: "3rem", height: "3rem" }}
                      />
                    </figure>
                    <h4 className="fw-700 text-grey-900 font-xssss mt-1">
                      {user.friend_detail.first_name}{" "}
                      {user.friend_detail.last_name}
                      <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">
                        {user.friend_detail.friends_count} friends
                      </span>
                    </h4>
                  </div>
                  <div className="card-body d-flex align-items-center pt-0 ps-4 pe-4 pb-4">
                    <button
                      className="btn p-2 lh-20 w100 bg-primary-gradiant me-2 text-white text-center font-xssss fw-600 ls-1 rounded-xl"
                      onClick={() => acceptFriend(user.user_id)}
                    >
                      Confirm
                    </button>
                    <a
                      href="#"
                      className="p-2 lh-20 w100 bg-grey text-grey-800 text-center font-xssss fw-600 ls-1 rounded-xl"
                    >
                      Delete
                    </a>
                  </div>
                </div>
              ))}
          </div> ) }

          {friends.length !== 0 && (
          <div className="card w-100 shadow-xss rounded-xxl border-0 p-0 ">
            <div className="card-body d-flex align-items-center p-4 mb-0">
              <h4 className="fw-700 mb-0 font-xssss text-grey-900">
                Confirm Friend
              </h4>
              <a
                href={`/friends/${user.uuid}`}
                className="fw-600 ms-auto font-xssss text-primary"
              >
                See all
              </a>
            </div>
            
              {friends.map((friend) => (
                <div
                  className="card-body bg-transparent-card d-flex p-3 bg-greylight ms-3 me-3 rounded-3 mb-3"
                  key={friend.id}
                >
                  <figure className="avatar me-2 mb-0">
                    <img
                      src={`${import.meta.env.VITE_ASSET_URL}${
                        friend.friend_detail.profile
                      }`}
                      alt="image"
                      className="shadow-sm rounded-circle"
                      style={{ width: "3rem", height: "3rem" }}
                    />
                  </figure>
                  <h4 className="fw-700 text-grey-900 font-xssss mt-2">
                    {friend.friend_detail.first_name}{" "}
                    {friend.friend_detail.last_name}
                    <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">
                      {friend.friend_detail.friends_count} mutual friends
                    </span>
                  </h4>
                  <a
                    href={`/user/${friend.friend_detail.uuid}`}
                    className="btn-round-sm bg-white text-grey-900 feather-chevron-right font-xss ms-auto mt-2"
                  />
                </div>
              ))}

            {!loading && hasMore && (
              <div className="card-body d-flex align-items-center pt-0 ps-4 pe-4 pb-4">
                <button
                  onClick={handleLoadMore}
                  className="btn p-2 lh-28 w-100 bg-grey text-grey-800 text-center font-xssss fw-700 rounded-xl"
                >
                  <i className="feather-external-link font-xss me-2" /> Load
                  More
                </button>
              </div>
            )}
          </div>
      )}

          <div className="card w-100 shadow-xss rounded-xxl border-0 mb-3 mt-3">
            <div className="card-body d-flex align-items-center p-4">
              <h4 className="fw-700 mb-0 font-xssss text-grey-900">
                Suggest Group
              </h4>
              <a
                href="/groups"
                className="fw-600 ms-auto font-xssss text-primary"
              >
                See all
              </a>
            </div>
            

            {suggestedGroup.length != 0 &&
              suggestedGroup.map((suggest) => (
                <div
                  className="pt-4  pb-0 overflow-hidden border-top-xs"
                  key={suggest.id}
                  
                >
                  <div className="card w250 d-block border-0 shadow-xss rounded-xxl overflow-hidden mb-3 mx-auto mt-3 ">
                    <div
                      className="card-body position-relative h100 bg-image-cover bg-image-center"
                      style={{ backgroundImage: `url(${
                        import.meta.env.VITE_ASSET_URL
                      }${suggest.thumbnail})`,
                      backgroundSize: "cover", // Ensure the image covers the container
                      backgroundPosition: "center", // Center the background image
                      backgroundRepeat: "no-repeat" }}
                    />
                    <div className="card-body d-block w-100 ps-4 pe-4 pb-4 text-center">
                      <figure className="avatar ms-auto me-auto mb-0 mt--6 position-relative w75 z-index-1">
                        <a href={`/group/${suggest.uuid}/${suggest.id}`}>
                        <img
                          src={`${import.meta.env.VITE_ASSET_URL}${
                            suggest.icon
                          }`}
                          alt="image"
                          className="float-right p-1 bg-white w-100 rounded-xxl"
                          style={{
                            width: "4.5rem",
                            height: "4.5rem",
                            objectFit: "cover",
                          }}
                        />
                        </a>
                      </figure>
                      <div className="clearfix" />
                      <h4 className="fw-700 font-xsss mt-2 mb-1">
                        {suggest.name}
                      </h4>
                      <p className="fw-500 font-xsssss text-grey-500 mt-0 mb-2">
                        Created by <span><a href={`/user/${suggest.admin.uuid}`}>@{suggest.admin.username}</a></span>
                      </p>
                      <a href={`/group/${suggest.uuid}/${suggest.id}`}>
                      <span className="live-tag mt-2 mb-0 bg-current p-2 z-index-1 rounded-3 text-white font-xsssss text-uppersace fw-700 ls-3 ">
                        SEE GROUP
                      </span>
                      </a>
                      <div className="clearfix mb-2" />
                    </div>

                    <div className="card-body dd-block pt-0 ps-4 pe-4 ">
                    <ul className="memberlist mt-1 mb-2 ms-0 d-block">
                      {suggest.groupMember.map((member) => (
                        <li className="w20" key={member.id}>
                          <a href="#">
                            <img
                              src={`${import.meta.env.VITE_ASSET_URL}${
                                member.user_detail.profile
                              }`}
                              alt="user"
                              className="d-inline-block rounded-xxl"
                              style={{
                                opacity: 1,
                                width: "2rem",
                                height: "2rem",
                              }}
                            />
                          </a>
                        </li>
                      ))}

                      {suggest.members - 9 > 0 ? (
                        <li className="last-member">
                          <a
                            href="#"
                            className="bg-greylight fw-600 text-grey-500 font-xssss w35 ls-3 text-center"
                            style={{
                              width: "2rem",
                              height: "2rem",
                            }}
                          >
                            +{suggest.members - 9}
                          </a>
                        </li>
                      ) : (
                        ""
                      )}

                      <li className="ps-3 w-auto ms-3">
                        <a
                          href={`/user/${suggest.admin.uuid}`}
                          className="fw-600 text-grey-500 font-xssss"
                        >
                          {suggest.members} Members apply
                        </a>
                      </li>
                    </ul>
                  </div>
                  </div>
                </div>
              ))}
          </div>

          {/* <div className="card w-100 shadow-xss rounded-xxl border-0 mb-3">
            <div className="card-body d-flex align-items-center  p-4">
              <h4 className="fw-700 mb-0 font-xssss text-grey-900">Event</h4>
              <a
                href="default-event.html"
                className="fw-600 ms-auto font-xssss text-primary"
              >
                See all
              </a>
            </div>
            <div className="card-body d-flex pt-0 ps-4 pe-4 pb-3 overflow-hidden">
              <div className="bg-success me-2 p-3 rounded-xxl">
                <h4 className="fw-700 font-lg ls-3 lh-1 text-white mb-0">
                  <span className="ls-1 d-block font-xsss text-white fw-600">
                    FEB
                  </span>
                  22
                </h4>
              </div>
              <h4 className="fw-700 text-grey-900 font-xssss mt-2">
                Meeting with clients{" "}
                <span className="d-block font-xsssss fw-500 mt-1 lh-4 text-grey-500">
                  41 madison ave, floor 24 new work, NY 10010
                </span>{" "}
              </h4>
            </div>
            <div className="card-body d-flex pt-0 ps-4 pe-4 pb-3 overflow-hidden">
              <div className="bg-warning me-2 p-3 rounded-xxl">
                <h4 className="fw-700 font-lg ls-3 lh-1 text-white mb-0">
                  <span className="ls-1 d-block font-xsss text-white fw-600">
                    APR
                  </span>
                  30
                </h4>
              </div>
              <h4 className="fw-700 text-grey-900 font-xssss mt-2">
                Developer Programe{" "}
                <span className="d-block font-xsssss fw-500 mt-1 lh-4 text-grey-500">
                  41 madison ave, floor 24 new work, NY 10010
                </span>{" "}
              </h4>
            </div>
            <div className="card-body d-flex pt-0 ps-4 pe-4 pb-3 overflow-hidden">
              <div className="bg-primary me-2 p-3 rounded-xxl">
                <h4 className="fw-700 font-lg ls-3 lh-1 text-white mb-0">
                  <span className="ls-1 d-block font-xsss text-white fw-600">
                    APR
                  </span>
                  23
                </h4>
              </div>
              <h4 className="fw-700 text-grey-900 font-xssss mt-2">
                Aniversary Event{" "}
                <span className="d-block font-xsssss fw-500 mt-1 lh-4 text-grey-500">
                  41 madison ave, floor 24 new work, NY 10010
                </span>{" "}
              </h4>
            </div>
          </div> */}
        </>
      )}
    </div>
  );
}
