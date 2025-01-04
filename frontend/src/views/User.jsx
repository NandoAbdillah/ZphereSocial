import { useEffect, useState, useRef, createRef } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../axios-client";
import moment from "moment";
import VideoJS from "../scripts/VideoJS";
import videojs from "video.js";
import { useStateContext } from "../contexts/ContextProvider";
import CreatePost from "../assets/CreatePost";
import { notification } from "antd";

export default function User() {
  const { uuid } = useParams();
  const { user } = useStateContext();
  const [userPost, setUserPost] = useState({});
  const [userProduct, setUserProduct] = useState([]);
  const [videos, setVideos] = useState({});
  const [books, setBooks] = useState([]);

  const [error, setErrors] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Tambahkan state untuk loading
  const [like, setLikes] = useState({});
  const [comments, setComments] = useState({});

  const commentRef = useRef();
  const [isFriend, setIsFriend] = useState({});
  const contentRef = createRef();
  const [contentText, setContentText] = useState("");

  const [expandedPosts, setExpandedPosts] = useState({}); // Menyimpan state per post
  const maxLength = 100;

  const toggleExpand = (postId) => {
    setExpandedPosts((prevState) => ({
      ...prevState,
      [postId]: !prevState[postId], // Toggle ekspansi hanya untuk post dengan postId ini
    }));
  };

  // Tab :
  const [toggleTab, setToggleTab] = useState("about");

  //   user product

  useEffect(() => {
    axiosClient
      .get("/user-product", { params: { uuid: uuid } })
      .then((response) => {
        setUserProduct(response.data.data || []);
      })
      .catch((error) => {
        alert("tidak dapat mengambil user produk");
      });
  }, []);

  useEffect(() => {
    axiosClient
      .get("/user-profile", { params: { uuid: uuid } })
      .then((response) => {
        const data = response.data.data || {};
        setUserPost(data);
        filteredVideos(data.posts);
        setIsLoading(false); // Setelah data berhasil diambil, set loading menjadi false
      })
      .catch((err) => {
        if (err.response && err.response.status === 422) {
          setErrors(err.response.data.errors);
        } else {
          console.error("Error fetching single singlePost:", err);
          setErrors("Failed to fetch data");
        }
        setIsLoading(false); // Set loading menjadi false saat terjadi error
      });
  }, []);

  const filteredVideos = (posts) => {
    // Pastikan `posts` adalah array
    setVideos(
      posts.filter(
        (post) => post.media.length > 0 && post.media[0].file_type === "video"
      )
    );

    console.log("Filtered Videos:", videos); // Debug untuk melihat hasil filter
  };

  const handleLike = async (postId) => {
    try {
      await axiosClient.post("/like", { post_id: postId });
      // Re-fetch the data from the API
      const response = await axiosClient.get("/user-profile", {
        params: { uuid: uuid },
      });
      const updatedPosts = response.data.data.posts.map((post) => {
        if (post.id === postId) {
          return { ...post, liked: true };
        }
        return post;
      });
      setUserPost({ ...response.data.data, posts: updatedPosts });
    } catch (error) {
      console.error("Error liking the post:", error);
    }
  };
  const handleDislike = async (postId) => {
    try {
      await axiosClient.post("/dislike", { post_id: postId });
      // Re-fetch the data from the API
      const response = await axiosClient.get("/user-profile", {
        params: { uuid: uuid },
      });
      const updatedPosts = response.data.data.posts.map((post) => {
        if (post.id === postId) {
          return { ...post, liked: false };
        }
        return post;
      });
      setUserPost({ ...response.data.data, posts: updatedPosts });
    } catch (error) {
      console.error("Error disliking the post:", error);
    }
  };

  useEffect(() => {
    console.log("User post updated:", userPost);
  }, [userPost]);

  useEffect(() => {
    if (Object.keys(userPost).length !== 0) {
      fetchFriendStatus(userPost.id);
    }
  }, [userPost]);

  const playerRef = createRef(null);

  const videoJsOptions = {
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: "images/v-2.mp4",
        type: "video/mp4",
      },
    ],
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on("waiting", () => {
      videojs.log("player is waiting");
    });

    player.on("dispose", () => {
      videojs.log("player will dispose");
    });
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
        setIsFriend((prevFriends) => ({
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

  const handleSavePost = (postId) => {
    const payload = {
      post_id: postId,
    };
    const updatedPosts = userPost.posts.map((post) =>
      post.id === postId ? { ...post, saved: true } : post
    );

    setUserPost((prevState) => ({
      ...prevState,
      posts: updatedPosts,
    }));
    axiosClient
      .post("/save-post", payload)
      .then(({ data }) => {})
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      });
  };

  const handleRemovePost = (postId) => {
    const payload = {
      post_id: postId,
    };

    const updatedPosts = userPost.posts.map((post) =>
      post.id === postId ? { ...post, saved: false } : post
    );

    setUserPost((prevState) => ({
      ...prevState,
      posts: updatedPosts,
    }));
    axiosClient
      .post("/remove-post", payload)
      .then(({ data }) => {})
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      });
  };

  const cancelPost = () => {
    const modalBackdrop = document.querySelector(".modal-backdrop");
    modalBackdrop.remove();
    // setStories(null);
    // navigate("/home");
  };

  const editPost = (postId) => {
    const payload = {
      id: postId,
      content: contentText,
    };

    axiosClient
      .post("/edit-post", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        openNotificationWithIcon("success", response.data.message);
        const modalBackdrop = document.querySelector(".modal-backdrop");
        modalBackdrop.remove();
      })
      .catch((err) => {
        const response = err.response;
        if (response) {
          if (response.status === 403 || response.status === 422) {
            setErrors(response.data.message);
            openNotificationWithIcon("warning", response.data.message);
          } else {
            openNotificationWithIcon("error", "An unexpected error occurred");
          }
        }
      });
  };

  const deletePost = (postId) => {
    axiosClient
      .post("/delete-post", { post_id: postId })
      .then((response) => {
        openNotificationWithIcon("success", response.data.message);
      })
      .catch((err) => {
        const response = err.response;
        if (response) {
          if (response.status === 403 || response.status === 422) {
            setErrors(response.data.message);
            openNotificationWithIcon("warning", response.data.message);
          } else {
            openNotificationWithIcon("error", "An unexpected error occurred");
          }
        }
      });
  };

  const handleCaptionChange = (ev) => {
    setContentText(ev.target.value);
  };

  const openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: message,
    });
  };

  useEffect(() => {
    axiosClient
      .get("/user-books", { params: { userUuid: uuid } })
      .then((response) => {
        setBooks(response.data.data);
      })
      .catch((error) => {});
  }, []);

  const handleCommentSubmit = (postId, e) => {
    e.preventDefault();
    // Ambil komentar untuk post tertentu dari state comments
    const commentText = comments[postId];

    if (!commentText) {
      return; // Tidak kirim komentar jika input kosong
    }

    const payload = {
      post_id: postId,
      comment: commentText,
    };

    // Kosongkan input setelah komentar dikirim
    setComments((prevComments) => ({
      ...prevComments,
      [postId]: "", // Kosongkan input untuk post ini
    }));

    // setUserPost(
    //   userPost.posts.map((post) =>
    //     post.id === postId
    //       ? { ...post, comments: post.comments + 1 } // perbaikan di sini
    //       : post
    //   )
    // );

    const updatedPosts = userPost.posts.map((post) => {
      if (post.id === postId) {
        return { ...post, comments: post.comments + 1 };
      }
      return post;
    });
    setUserPost({ ...userPost, posts: updatedPosts });

    // Kirim request ke server dengan axios
    axiosClient
      .post("/create-comment", payload)
      .then(({ data }) => {
        console.log("Comment submitted:", data);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      });
  };

  const handleCommentChange = (postId, ev) => {
    const newComment = ev.target.value;
    setComments((prevComments) => ({
      ...prevComments,
      [postId]: newComment, // Simpan komentar untuk post berdasarkan postId
    }));
  };

  return (
    <div className="middle-sidebar-bottom">
      <div className="middle-sidebar-left">
        {Object.keys(userPost).length !== 0 && (
          <div className="row">
            <div className="col-xl-12">
              <div className="card w-100 shadow-xss rounded-xxl border-0 mb-3 mt-3 overflow-hidden">
                <div
                  className="card-body position-relative h240 bg-image-cover bg-image-center"
                  style={{
                    backgroundImage: `url(${
                      userPost.thumbnial != null
                        ? `${import.meta.env.VITE_ASSET_URL}${
                            userPost.thumbnial
                          }`
                        : "/images/bb-9.jpg"
                    })`,
                  }}
                ></div>
                <div className="card-body d-block pt-4 text-center position-relative">
                  <figure className="avatar mt--6 position-relative w75 z-index-1 w100 z-index-1 ms-auto me-auto">
                    <img
                      src={
                        user.profile
                          ? `${import.meta.env.VITE_ASSET_URL}${
                              userPost.profile
                            }`
                          : "/images/pt-1.jpg"
                      }
                      alt="image"
                      className="p-1 bg-white rounded-xl w-100"
                    />
                  </figure>
                  <h4 className="font-xs ls-1 fw-700 text-grey-900">
                    {`${userPost.first_name} ${userPost.last_name}`}
                    <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">{`@${userPost.username}`}</span>
                  </h4>
                  <div
                    className="d-flex align-items-center justify-content-center me-2"
                    style={{
                      position: "absolute",
                      left: "1.5rem",
                      bottom: "1.2rem",
                    }}
                  >
                    <h5 className="text-center d-none d-lg-block text-grey-500 fw-600 ms-2 me-2">
                      <b
                        className="text-grey-900 mb-1 fw-700  ls-3 text-dark d-block"
                        style={{
                          fontSize: "1.5rem",
                        }}
                      >
                        {userPost.posts.length ?? "0"}
                      </b>

                      {"  Posts"}
                    </h5>
                    <h5 className="text-center d-none d-lg-block text-grey-500 fw-600 ms-2 me-2">
                      <a
                        href={`/friends/${userPost.uuid}`}
                        className="text-grey-500 "
                      >
                        <span>
                          <b
                            className="text-grey-900 mb-1 fw-700 d-block ls-3 text-dark"
                            style={{
                              fontSize: "1.5rem",
                            }}
                          >
                            {userPost.friends_count ?? "0"}
                          </b>
                        </span>
                        {"  Friends"}
                      </a>
                    </h5>
                    <h5 className="text-center d-none d-lg-block text-grey-500 fw-600 ms-2 me-2">
                      <span>
                        <b
                          className="text-grey-900 mb-1 fw-700 d-block ls-3 text-dark"
                          style={{
                            fontSize: "1.5rem",
                          }}
                        >
                          {userPost.likes_count ?? "0"}
                        </b>
                      </span>
                      {"  Likes"}
                    </h5>
                  </div>
                  <div
                    className="d-flex align-items-center justify-content-center me-2"
                    style={{
                      position: "absolute",
                      right: "15px",
                      bottom: "30px",
                    }}
                  >
                    {user.id === userPost.id ? (
                      <a
                        href="/account-information"
                        className="btn bg-info d-none d-lg-block p-3 z-index-1 rounded-3 text-white font-xsssss text-uppercase fw-700 ls-3"
                      >
                        EDIT
                      </a>
                    ) : (
                      isFriend[userPost.id] &&
                      (isFriend[userPost.id].role === "receiver" &&
                      isFriend[userPost.id].status === "pending" ? (
                        <button
                          onClick={() => acceptFriend(userPost.id)}
                          className="btn bg-warning d-none d-lg-block p-3 z-index-1 rounded-3 text-white font-xsssss text-uppercase fw-700 ls-3"
                        >
                          ACCEPT
                        </button>
                      ) : isFriend[userPost.id].role === "sender" &&
                        isFriend[userPost.id].status == "pending" ? (
                        <button
                          onClick={() => removeFriend(userPost.id)}
                          className="btn bg-danger d-none d-lg-block p-3 z-index-1 rounded-3 text-white font-xsssss text-uppercase fw-700 ls-3"
                        >
                          CANCEL
                        </button>
                      ) : isFriend[userPost.id].status === "rejected" ? (
                        <button
                          onClick={() => addFriend(userPost.id)}
                          className="btn bg-success d-none d-lg-block p-3 z-index-1 rounded-3 text-white font-xsssss text-uppercase fw-700 ls-3"
                        >
                          ADD FRIEND
                        </button>
                      ) : isFriend[userPost.id].status === "accepted" ? (
                        <button
                          onClick={() => addFriend(userPost.id)}
                          className="btn bg-info d-none d-lg-block p-3 z-index-1 rounded-3 text-white font-xsssss text-uppercase fw-700 ls-3"
                        >
                          FRIEND
                        </button>
                      ) : (
                        <button
                          onClick={() => addFriend(userPost.id)}
                          className="btn bg-success d-none d-lg-block p-3 z-index-1 rounded-3 text-white font-xsssss text-uppercase fw-700 ls-3"
                        >
                          ADD FRIEND
                        </button>
                      ))
                    )}

                    <a
                      href="#"
                      className="d-none d-lg-block bg-greylight btn-round-lg ms-2 rounded-3 text-grey-700"
                    >
                      <i className="font-md feather-mail"></i>
                    </a>
                    <a
                      href="#"
                      id="dropdownMenu8"
                      className="d-none d-lg-block btn-round-lg ms-2 rounded-3 text-grey-700 bg-greylight"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i className="font-md ti-more">
                        {/* Icon more-vertical */}
                      </i>
                    </a>
                  </div>
                </div>
                <div className="card-body d-block w-100 shadow-none mb-0 p-0 border-top-xs">
                  <ul
                    className="nav nav-tabs h55 d-flex product-info-tab border-bottom-0 ps-4"
                    id="pills-tab"
                    role="tablist"
                  >
                    <li
                      className={`cursor-pointer list-inline-item me-5 ${
                        toggleTab == "about" ? "active" : ""
                      }`}
                    >
                      <a
                        className={`cursor-pointer fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block ${
                          toggleTab == "about" ? "active" : ""
                        } `}
                        onClick={() => setToggleTab("about")}
                      >
                        About
                      </a>
                    </li>
                    <li
                      className={`cursor-pointer list-inline-item me-5 ${
                        toggleTab == "video" ? "active" : ""
                      }`}
                    >
                      <a
                        className={`cursor-pointer fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block ${
                          toggleTab == "video" ? "active" : ""
                        } `}
                        onClick={() => setToggleTab("video")}
                      >
                        Video
                      </a>
                    </li>
                    <li
                      className={`cursor-pointer list-inline-item me-5 ${
                        toggleTab == "shop" ? "active" : ""
                      }`}
                    >
                      <a
                        className={`cursor-pointer fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block ${
                          toggleTab == "shop" ? "active" : ""
                        } `}
                        onClick={() => setToggleTab("shop")}
                      >
                        Shops
                      </a>
                    </li>
                    <li
                      className={`cursor-pointer list-inline-item me-5 ${
                        toggleTab == "books" ? "active" : ""
                      }`}
                    >
                      <a
                        className={`cursor-pointer fw-700 font-xssss text-grey-500 pt-3 pb-3 ls-1 d-inline-block ${
                          toggleTab == "books" ? "active" : ""
                        } `}
                        onClick={() => setToggleTab("books")}
                      >
                        Books
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-xxl-3 col-lg-4 pe-0">
              <div className="card w-100 shadow-xss rounded-xxl border-0 mb-3 mt-3">
                <div className="card-body d-block p-4">
                  <h4 className="fw-700 mb-3 font-xsss text-grey-900">About</h4>
                  <p className="fw-500 text-grey-500 lh-24 font-xssss mb-0">
                    {userPost.description ? (
                      <>
                        <br />
                        <p>{userPost.description}</p>
                      </>
                    ) : (
                      <>
                        No Description{"      "}
                        {user.id === userPost.id ? (
                          <a href="/account-information">Create one ↗️</a>
                        ) : (
                          ""
                        )}
                      </>
                    )}
                  </p>
                </div>

                <div className="card-body d-flex pt-0">
                  <i className="feather-map-pin text-grey-500 me-3 font-lg" />
                  <h4 className="fw-700 text-grey-900 font-xssss mt-1">
                    Location <br />
                    {userPost.location ? (
                      userPost.location
                    ) : user.id === userPost.id ? (
                      <>
                        <a href="/account-information">
                          Set a location 🌎{"      "}
                        </a>
                      </>
                    ) : (
                      <>No Location</>
                    )}
                  </h4>
                </div>
                <div className="card-body d-flex pt-0">
                  <i className="feather-users text-grey-500 me-3 font-lg" />
                  <h4 className="fw-700 text-grey-900 font-xssss mt-1">
                    Group
                  </h4>
                </div>
              </div>
              <div className="card w-100 shadow-xss rounded-xxl border-0 mb-3">
                <div className="card-body d-flex align-items-center  p-4">
                  <h4 className="fw-700 mb-0 font-xssss text-grey-900">
                    Stories
                  </h4>
                  <a
                    href="#"
                    className="fw-600 ms-auto font-xssss text-primary"
                  >
                    See all
                  </a>
                </div>
                <div className="card-body d-block pt-0 pb-2">
                  <div className="row">
                    {userPost.story_archived &&
                      userPost.story_archived.slice(0, 4).map((story) => (
                        <div className="col-6 mb-2 pe-1" key={story.id}>
                          <a
                            href={`${import.meta.env.VITE_ASSET_URL}${
                              JSON.parse(story.story)[0]
                            }`}
                            data-lightbox="roadtrip"
                          >
                            <img
                              src={`${import.meta.env.VITE_ASSET_URL}${
                                JSON.parse(story.story)[0]
                              }`}
                              alt="image"
                              className="img-fluid rounded-3 w-100"
                              style={{
                                height: "15rem",
                                objectFit: "cover",
                              }}
                            />
                          </a>
                        </div>
                      ))}
                  </div>
                </div>
                <div className="card-body d-block w-100 pt-0">
                  <a
                    href="#"
                    className="p-2 lh-28 w-100 d-block bg-grey text-grey-800 text-center font-xssss fw-700 rounded-xl"
                  >
                    <i className="feather-external-link font-xss me-2" /> More
                  </a>
                </div>
              </div>
              <div className="card w-100 shadow-xss rounded-xxl border-0 mb-3">
                <div className="card-body d-flex align-items-center  p-4">
                  <h4 className="fw-700 mb-0 font-xssss text-grey-900">
                    Market
                  </h4>
                  <a
                    href="#"
                    className="fw-600 ms-auto font-xssss text-primary"
                  >
                    See all
                  </a>
                </div>
                <div className="card-body d-block pt-0 pb-2">
                  <div className="row"></div>
                </div>
                <div className="card-body d-block w-100 pt-0">
                  <a
                    href="#"
                    className="p-2 lh-28 w-100 d-block bg-grey text-grey-800 text-center font-xssss fw-700 rounded-xl"
                  >
                    <i className="feather-external-link font-xss me-2" /> More
                  </a>
                </div>
              </div>
            </div>

            {toggleTab == "about" ? (
              <div className="col-xl-8 col-xxl-9 col-lg-8">
                <div className="mt-3">
                  {userPost.id == user.id ? <CreatePost /> : ""}
                </div>

                {userPost.posts.map((post) => (
                  <div key={post.id}>
                    <div className="card w-100 shadow-xss rounded-xxl border-0 p-4 mb-3">
                      <div className="card-body p-0 d-flex">
                        <figure className="avatar me-3">
                          <img
                            src={`${import.meta.env.VITE_ASSET_URL}/${
                              userPost.profile
                            }`}
                            alt="image"
                            className="shadow-sm rounded-circle w45 "
                            style={{ height: "45px" }}
                          />
                        </figure>
                        <h4 className="fw-700 text-grey-900 font-xssss mt-1">
                          {userPost.first_name} {userPost.last_name}
                          <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">
                            {moment(post.created_at).fromNow()}
                          </span>
                        </h4>
                        <a
                          href="#"
                          className="ms-auto"
                          id="dropdownMenu2"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <i className="ti-more-alt text-grey-900 btn-round-md bg-greylight font-xss" />
                        </a>
                        <div
                          className="dropdown-menu dropdown-menu-end p-4 rounded-xxl border-0 shadow-lg"
                          aria-labelledby="dropdownMenu2"
                        >
                          <div className="card-body p-0 d-flex">
                            {post.saved == true ? (
                              <a
                                className="d-flex"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleRemovePost(post.id);
                                }}
                              >
                                <i className="feather-bookmark  font-xsss  me-2 btn-round-xs text-white bg-current" />
                                <h4 className="fw-600 text-grey-900 font-xssss mt-0 me-4">
                                  Remove Save Post{" "}
                                  <span className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">
                                    Remove this post from your saved items
                                  </span>
                                </h4>
                              </a>
                            ) : (
                              <a
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleSavePost(post.id);
                                }}
                                className="d-flex"
                              >
                                <i className="feather-bookmark text-grey-500 me-3 font-lg" />
                                <h4 className="fw-600 text-grey-900 font-xssss mt-0 me-4">
                                  Save Post{" "}
                                  <span className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">
                                    Add this to your saved items
                                  </span>
                                </h4>
                              </a>
                            )}
                          </div>
                          {userPost.id === user.id ? (
                            <div>
                              <div className="card-body p-0 d-flex">
                                <a
                                  onClick={(e) => {
                                    e.preventDefault();
                                    deletePost(post.id);
                                  }}
                                  className="d-flex"
                                >
                                  <i className="feather-trash text-grey-500 me-3 font-lg" />
                                  <h4 className="fw-600 text-grey-900 font-xssss mt-0 me-4">
                                    Delete Post
                                    <span className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">
                                      Delete this post
                                    </span>
                                  </h4>
                                </a>
                              </div>
                              <div className="card-body p-0 d-flex">
                                <a
                                  href="#"
                                  className="d-flex"
                                  data-bs-toggle="modal"
                                  data-bs-target={`#Edit${post.id}`}
                                >
                                  <i className="feather-edit-3 text-grey-500 me-3 font-lg" />
                                  <h4 className="fw-600 text-grey-900 font-xssss mt-0 me-4">
                                    Edit Post
                                    <span className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">
                                      Edit Content Post
                                    </span>
                                  </h4>
                                </a>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      <div className="card-body p-0 me-lg-5">
                        <p className="fw-500 text-grey-500 lh-26 font-xssss w-100">
                          {expandedPosts[post.id] ||
                          post.content.length <= maxLength
                            ? post.content
                            : `${post.content.substring(0, maxLength)}...`}
                          {post.content.length > maxLength && (
                            <a
                              href="#"
                              className="fw-600 text-primary ms-2"
                              onClick={(e) => {
                                e.preventDefault();
                                toggleExpand(post.id);
                              }}
                            >
                              {expandedPosts[post.id] ? "See less" : "See more"}
                            </a>
                          )}
                        </p>
                      </div>
                      <div className="card-body d-block p-0">
                        {post.media.length > 0 &&
                          post.media[0].file_type === "image" &&
                          JSON.parse(post.media[0].file).length === 5 && (
                            <div className="row image-gallery">
                              {JSON.parse(post.media[0].file).map(
                                (media, index) => (
                                  <div
                                    key={index}
                                    className={
                                      JSON.parse(post.media[0].file).length ===
                                      1
                                        ? "col-12"
                                        : JSON.parse(post.media[0].file)
                                              .length === 2 ||
                                            index == 0 ||
                                            index == 1
                                          ? "col-xs-6 col-sm-6 p-1"
                                          : "col-xs-4 col-sm-4 p-1"
                                    }
                                  >
                                    <a
                                      href={`${
                                        import.meta.env.VITE_ASSET_URL
                                      }/${media}`}
                                      data-lightbox="roadtrip"
                                      className={
                                        index === 4
                                          ? "position-relative d-block"
                                          : ""
                                      }
                                    >
                                      <img
                                        src={`${
                                          import.meta.env.VITE_ASSET_URL
                                        }/${media}`}
                                        className={
                                          index > 4
                                            ? "d-none"
                                            : "rounded-3 w-100"
                                        }
                                        alt="image"
                                        style={
                                          JSON.parse(post.media[0].file)
                                            .length !== 1
                                            ? {
                                                height: "150px",
                                                objectFit: "cover",
                                              }
                                            : {}
                                        }
                                      />
                                      {JSON.parse(post.media[0].file).length !=
                                        5 &&
                                        index === 4 && (
                                          <span className="img-count font-sm text-white ls-3 fw-600">
                                            <b>
                                              +
                                              {JSON.parse(post.media[0].file)
                                                .length - 5}
                                            </b>
                                          </span>
                                        )}
                                    </a>
                                  </div>
                                )
                              )}
                            </div>
                          )}

                        {post.media.length > 0 &&
                          post.media[0].file_type === "image" &&
                          JSON.parse(post.media[0].file).length != 5 && (
                            <div className="row image-gallery">
                              {JSON.parse(post.media[0].file).map(
                                (media, index) => (
                                  <div
                                    key={index}
                                    className={
                                      JSON.parse(post.media[0].file).length ===
                                      1
                                        ? "col-12"
                                        : JSON.parse(post.media[0].file)
                                              .length === 2
                                          ? "col-xs-6 col-sm-6 p-1"
                                          : "col-xs-4 col-sm-4 p-1"
                                    }
                                  >
                                    <a
                                      href={`${
                                        import.meta.env.VITE_ASSET_URL
                                      }/${media}`}
                                      data-lightbox="roadtrip"
                                      className={
                                        index === 2
                                          ? "position-relative d-block"
                                          : ""
                                      }
                                    >
                                      <img
                                        src={`${
                                          import.meta.env.VITE_ASSET_URL
                                        }/${media}`}
                                        className={
                                          index > 2
                                            ? "d-none"
                                            : "rounded-3 w-100"
                                        }
                                        alt="image"
                                        style={
                                          JSON.parse(post.media[0].file)
                                            .length !== 1
                                            ? {
                                                height: "150px",
                                                objectFit: "cover",
                                              }
                                            : {}
                                        }
                                      />
                                      {JSON.parse(post.media[0].file).length !=
                                        3 &&
                                        index === 2 && (
                                          <span className="img-count font-sm text-white ls-3 fw-600">
                                            <b>
                                              +
                                              {JSON.parse(post.media[0].file)
                                                .length - 3}
                                            </b>
                                          </span>
                                        )}
                                    </a>
                                  </div>
                                )
                              )}
                            </div>
                          )}

                        {post.media.length > 0 &&
                          post.media[0].file_type === "video" && (
                            <div className="card-body p-0 mb-3 rounded-3 overflow-hidden">
                              <div className="player bg-transparent shadow-none">
                                <VideoJS
                                  options={{
                                    ...videoJsOptions,
                                    sources: [
                                      {
                                        src: `${
                                          import.meta.env.VITE_ASSET_URL
                                        }${post.media[0].file}`,
                                        type: "video/mp4",
                                      },
                                    ],
                                  }}
                                  onReady={handlePlayerReady}
                                />
                              </div>
                            </div>
                          )}

                        {post.media.length > 0 &&
                          post.media[0].file_type === "audio" && (
                            <section>
                              <div className="audio-player">
                                <div className="thumb">
                                  <img src="images/Parallax.png" alt="" />
                                </div>
                                <div className="info">
                                  <div className="detail">
                                    <div className="title">
                                      <span id="current">0:00</span> /
                                      <span id="duration">0:00</span>
                                    </div>
                                    <div className="control">
                                      <i
                                        className="fi-rr-play"
                                        id="playPause"
                                      ></i>
                                    </div>
                                  </div>
                                  <div id="wave"></div>
                                </div>
                              </div>
                            </section>
                          )}
                      </div>

                      <div className="card-body d-flex p-0 mt-3">
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            post.liked
                              ? handleDislike(post.id)
                              : handleLike(post.id);
                          }}
                          className="emoji-bttn d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss me-2"
                        >
                          <i
                            className={`feather-thumbs-up ${
                              post.liked
                                ? "text-white bg-primary-gradiant"
                                : "text-current"
                            } me-2 btn-round-xs font-xss`}
                          />
                          {post.likes} Like
                        </a>

                        <a
                          href={`/single-post/${post.uuid}`}
                          className="d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss"
                        >
                          <i className="feather-message-circle text-dark text-grey-900 btn-round-sm font-lg" />

                          <span className="d-none-xss">
                            {post.comments} Comment
                          </span>
                        </a>
                        <a
                          href="#"
                          id="dropdownMenu21"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                          className="ms-auto d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss"
                        >
                          <i className="feather-share-2 text-grey-900 text-dark btn-round-sm font-lg" />
                          <span className="d-none-xs">Share</span>
                        </a>
                        <div
                          className="dropdown-menu dropdown-menu-end p-4 rounded-xxl border-0 shadow-lg"
                          aria-labelledby="dropdownMenu21"
                        >
                          <h4 className="fw-700 font-xss text-grey-900 d-flex align-items-center">
                            Share{" "}
                            <i className="feather-x ms-auto font-xssss btn-round-xs bg-greylight text-grey-900 me-2" />
                          </h4>
                          <div className="card-body p-0 d-flex">
                            <ul className="d-flex align-items-center justify-content-between mt-2">
                              <li className="me-1">
                                <a
                                  href="https://facebook.com/"
                                  target="_blank"
                                  className="btn-round-lg bg-facebook"
                                >
                                  <i className="font-xs ti-facebook text-white" />
                                </a>
                              </li>
                              <li className="me-1">
                                <a
                                  href="https://instagram.com/"
                                  target="_blank"
                                  className="btn-round-lg bg-instagram"
                                >
                                  <i className="font-xs ti-instagram text-white" />
                                </a>
                              </li>
                              <li className="me-1">
                                <a
                                  href="https://x.com/"
                                  target="_blank"
                                  className="btn-round-lg bg-twiiter"
                                >
                                  <i className="font-xs ti-twitter-alt text-white" />
                                </a>
                              </li>
                            </ul>
                          </div>

                          <h4 className="fw-700 font-xssss mt-4 text-grey-500 d-flex align-items-center mb-3">
                            Copy Link
                          </h4>
                          <i
                            className="feather-copy position-absolute right-35 mt-3 font-xs text-grey-500 cursor-pointer"
                            onClick={() => {
                              // Mengambil nilai input dan menyalin ke clipboard
                              const input =
                                document.querySelector("#copyInput");
                              navigator.clipboard.writeText(input.value);
                              openNotificationWithIcon(
                                "success",
                                "Link copied to clipboard!"
                              ); // Menampilkan pesan konfirmasi
                            }}
                          />
                          <input
                            id="copyInput"
                            type="text"
                            defaultValue={`http://localhost:3000/single-post/${post.uuid}`}
                            className="bg-grey text-grey-500 font-xssss border-0 lh-32 p-2 font-xssss fw-600 rounded-3 w-100 theme-dark-bg"
                          />
                        </div>
                      </div>
                      <div className="mt-3 ">
                        <form
                          className="d-flex gap-2"
                          onSubmit={(e) => handleCommentSubmit(post.id, e)}
                        >
                          <input
                            type="text"
                            name="comment"
                            className="bg-grey text-grey-500 font-xssss border-0 lh-32 p-2 font-xssss fw-600 rounded-pill w-100 theme-dark-bg ps-3"
                            placeholder="Write your comment here..."
                            value={comments[post.id] || ""} // Ambil komentar untuk post ini
                            onChange={(e) => handleCommentChange(post.id, e)} // Perubahan input hanya untuk post ini
                            required
                          />

                          <button
                            style={{
                              outline: "none",
                              border: "none",
                              borderRadius: "43px",
                            }}
                            className="outline-none ms-auto border-none bg-none"
                            type="submit"
                          >
                            <i className="feather-arrow-up btn-round-md bg-greylight fs-2 text-current"></i>
                          </button>
                        </form>
                      </div>
                    </div>

                    <div
                      className="modal bottom fade"
                      style={{ overflowY: "scroll" }}
                      id={`Edit${post.id}`}
                      tabIndex={-1}
                      role="dialog"
                    >
                      <div
                        className="modal-dialog modal-dialog-centered"
                        role="document"
                      >
                        <div className="modal-content border-0">
                          <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                          >
                            <i className="ti-close text-grey-500" />
                          </button>

                          <div className="modal-body p-3 d-flex align-items-center bg-none">
                            <div className="card shadow-none rounded-0 w-100 p-2 pt-3 border-0">
                              <div className="card-body rounded-0 text-left p-3">
                                <h2 className="fw-700 display1-size display2-md-size mb-4">
                                  Edit <br />
                                  your post
                                </h2>

                                <div className="form-group icon-input mb-3">
                                  <i className="font-sm feather-type text-grey-500 pe-0"></i>
                                  <input
                                    type="text"
                                    className="style2-input ps-5 form-control text-grey-900 font-xsss fw-600"
                                    placeholder="write caption"
                                    defaultValue={post.content}
                                    ref={contentRef}
                                    onChange={handleCaptionChange}
                                  />
                                </div>

                                <div className="form-group icon-input my-3 d-flex justify-content-end ">
                                  <button
                                    className="btn   bg-current fw-500 text-white font-xsss p-3  w100 text-center lh-20 rounded-xxl mx-1"
                                    data-dismiss="modal"
                                    onClick={cancelPost}
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    className="btn   bg-dark fw-500 text-white font-xsss p-3  w100 text-center lh-20 rounded-xxl mx-1"
                                    onClick={() => editPost(post.id)}
                                  >
                                    Edit Post
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : toggleTab == "video" ? (
              <div className="col-xl-8 col-xxl-9 col-lg-8">
                {videos &&
                  videos.map((video) => (
                    <div key={video.id}>
                      <div className="card w-100 shadow-xss rounded-xxl border-0 p-4 mb-3">
                        <div className="card-body p-0 d-flex">
                          <figure className="avatar me-3">
                            <a href={`/user/${userPost.uuid}`}>
                              <img
                                src={`${
                                  import.meta.env.VITE_ASSET_URL
                                }/${userPost.profile}`}
                                alt="image"
                                className="shadow-sm rounded-circle w45 "
                                style={{ height: "45px" }}
                              />
                            </a>
                          </figure>
                          <h4 className="fw-700 text-grey-900 font-xssss mt-1">
                            {video.is_page_video || video.is_group_video ? (
                              <>
                                <a href={`/user/${userPost.uuid}`}>
                                  @{userPost.username}
                                </a>
                                {video.is_group_video && (
                                  <>
                                    {" videoed on "}
                                    <a
                                      href={`/group/${video.group_detail.uuid}/${video.group_detail.id}`}
                                    >
                                      {video.group_detail.name}
                                    </a>
                                  </>
                                )}
                                {/* {video.is_page_video && (
                                                    <>
                                                        videoed on{" "}
                                                        <a
                                                            href={`/group/${video.page.uuid}`}
                                                        >
                                                            {video.page.name}
                                                        </a>
                                                    </>
                                                )} */}
                              </>
                            ) : (
                              <>
                                {userPost.first_name} {userPost.last_name}
                              </>
                            )}
                            <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">
                              {moment(video.created_at).fromNow()}
                            </span>
                          </h4>
                          <a
                            href="#"
                            className="ms-auto"
                            id="dropdownMenu2"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <i className="ti-more-alt text-grey-900 btn-round-md bg-greylight font-xss" />
                          </a>
                          <div
                            className="dropdown-menu dropdown-menu-end p-4 rounded-xxl border-0 shadow-lg"
                            aria-labelledby="dropdownMenu2"
                          >
                            <div className="card-body p-0 d-flex">
                              {video.saved == true ? (
                                <a
                                  className="d-flex"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    // handleRemovevideo(
                                    //     video.id
                                    // );
                                  }}
                                >
                                  <i className="feather-bookmark  font-xsss  me-2 btn-round-xs text-white bg-current" />
                                  <h4 className="fw-600 text-grey-900 font-xssss mt-0 me-4">
                                    Remove Save video{" "}
                                    <span className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">
                                      Remove this video from your saved items
                                    </span>
                                  </h4>
                                </a>
                              ) : (
                                <a
                                  onClick={(e) => {
                                    e.preventDefault();
                                    // handleSavevideo(video.id);
                                  }}
                                  className="d-flex"
                                >
                                  <i className="feather-bookmark text-grey-500 me-3 font-lg" />
                                  <h4 className="fw-600 text-grey-900 font-xssss mt-0 me-4">
                                    Save video{" "}
                                    <span className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">
                                      Add this to your saved items
                                    </span>
                                  </h4>
                                </a>
                              )}
                            </div>
                            {userPost.id === user.id ? (
                              <div>
                                <div className="card-body p-0 d-flex">
                                  <a
                                    onClick={(e) => {
                                      e.preventDefault();
                                      // deletevideo(video.id)
                                    }}
                                    className="d-flex"
                                  >
                                    <i className="feather-trash text-grey-500 me-3 font-lg" />
                                    <h4 className="fw-600 text-grey-900 font-xssss mt-0 me-4">
                                      Delete video
                                      <span className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">
                                        Delete this video
                                      </span>
                                    </h4>
                                  </a>
                                </div>
                                <div className="card-body p-0 d-flex">
                                  <a
                                    href="#"
                                    className="d-flex"
                                    data-bs-toggle="modal"
                                    data-bs-target={`#Edit${video.id}`}
                                  >
                                    <i className="feather-edit-3 text-grey-500 me-3 font-lg" />
                                    <h4 className="fw-600 text-grey-900 font-xssss mt-0 me-4">
                                      Edit video
                                      <span className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">
                                        Edit Content video
                                      </span>
                                    </h4>
                                  </a>
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="card-body p-0 me-lg-5">
                          <p className="fw-500 text-grey-500 lh-26 font-xssss w-100">
                            {video.content}
                            <a href="#" className="fw-600 text-primary ms-2">
                              See more
                            </a>
                          </p>
                        </div>
                        <div className="card-body d-block p-0">
                          {video.media.length > 0 &&
                            video.media[0].file_type === "video" && (
                              <div className="card-body p-0 mb-3 rounded-3 overflow-hidden">
                                <div className="player bg-transparent shadow-none">
                                  <VideoJS
                                    options={{
                                      ...videoJsOptions,
                                      sources: [
                                        {
                                          src: `${
                                            import.meta.env.VITE_ASSET_URL
                                          }${video.media[0].file}`,
                                          type: "video/mp4",
                                        },
                                      ],
                                    }}
                                    onReady={handlePlayerReady}
                                  />
                                </div>
                              </div>
                            )}
                        </div>

                        <div className="card-body d-flex p-0 mt-3">
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              video.liked
                                ? handleDislike(video.id)
                                : handleLike(video.id);
                            }}
                            className="emoji-bttn d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss me-2"
                          >
                            <i
                              className={`feather-thumbs-up ${
                                video.liked
                                  ? "text-white bg-primary-gradiant"
                                  : "text-current"
                              } me-2 btn-round-xs font-xss`}
                            />
                            {video.likes} Like
                          </a>

                          <a
                            href={`/single-post/${video.uuid}`}
                            className="d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss"
                          >
                            <i className="feather-message-circle text-dark text-grey-900 btn-round-sm font-xs" />

                            <span className="d-none-xss">
                              {video.comments} Comment
                            </span>
                          </a>
                          <a
                            href="#"
                            id="dropdownMenu21"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            className="ms-auto d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss"
                          >
                            <i className="feather-share-2 text-grey-900 text-dark btn-round-sm font-lg" />
                            <span className="d-none-xs">Share</span>
                          </a>
                          <div
                            className="dropdown-menu dropdown-menu-end p-4 rounded-xxl border-0 shadow-lg"
                            aria-labelledby="dropdownMenu21"
                          >
                            <h4 className="fw-700 font-xss text-grey-900 d-flex align-items-center">
                              Share{" "}
                              <i className="feather-x ms-auto font-xssss btn-round-xs bg-greylight text-grey-900 me-2" />
                            </h4>
                            <div className="card-body p-0 d-flex">
                              <ul className="d-flex align-items-center justify-content-between mt-2">
                                <li className="me-1">
                                  <a
                                    href="https://facebook.com/"
                                    target="_blank"
                                    className="btn-round-lg bg-facebook"
                                  >
                                    <i className="font-xs ti-facebook text-white" />
                                  </a>
                                </li>
                                <li className="me-1">
                                  <a
                                    href="https://instagram.com/"
                                    target="_blank"
                                    className="btn-round-lg bg-instagram"
                                  >
                                    <i className="font-xs ti-instagram text-white" />
                                  </a>
                                </li>
                                <li className="me-1">
                                  <a
                                    href="https://x.com/"
                                    target="_blank"
                                    className="btn-round-lg bg-twiiter"
                                  >
                                    <i className="font-xs ti-twitter-alt text-white" />
                                  </a>
                                </li>
                              </ul>
                            </div>

                            <h4 className="fw-700 font-xssss mt-4 text-grey-500 d-flex align-items-center mb-3">
                              Copy Link
                            </h4>
                            <i
                              className="feather-copy position-absolute right-35 mt-3 font-xs text-grey-500 cursor-pointer"
                              onClick={() => {
                                // Mengambil nilai input dan menyalin ke clipboard
                                const input =
                                  document.querySelector("#copyInput");
                                navigator.clipboard.writeText(input.value);
                                openNotificationWithIcon(
                                  "success",
                                  "Link copied to clipboard!"
                                ); // Menampilkan pesan konfirmasi
                              }}
                            />
                            <input
                              id="copyInput"
                              type="text"
                              defaultValue={`http://localhost:3000/single-post/${video.uuid}`}
                              className="bg-grey text-grey-500 font-xssss border-0 lh-32 p-2 font-xssss fw-600 rounded-3 w-100 theme-dark-bg"
                            />
                          </div>
                        </div>
                        <div className="mt-3 ">
                          <form
                            className="d-flex gap-2"
                            onSubmit={(e) => handleCommentSubmit(video.id, e)}
                          >
                            <input
                              type="text"
                              name="comment"
                              className="bg-grey text-grey-500 font-xssss border-0 lh-32 p-2 font-xssss fw-600 rounded-pill w-100 theme-dark-bg ps-3"
                              placeholder="Write your comment here..."
                              value={comments[video.id] || ""} // Ambil komentar untuk post ini
                              onChange={(e) => handleCommentChange(video.id, e)} // Perubahan input hanya untuk post ini
                              required
                            />

                            <button
                              style={{
                                outline: "none",
                                border: "none",
                                borderRadius: "43px",
                              }}
                              className="outline-none ms-auto border-none bg-none"
                              type="submit"
                            >
                              <i className="feather-arrow-up btn-round-md bg-greylight fs-2 text-current"></i>
                            </button>
                          </form>
                        </div>
                      </div>

                      <div
                        className="modal bottom fade"
                        style={{ overflowY: "scroll" }}
                        id={`Edit${video.id}`}
                        tabIndex={-1}
                        role="dialog"
                      >
                        <div
                          className="modal-dialog modal-dialog-centered"
                          role="document"
                        >
                          <div className="modal-content border-0">
                            <button
                              type="button"
                              className="close"
                              data-dismiss="modal"
                            >
                              <i className="ti-close text-grey-500" />
                            </button>

                            <div className="modal-body p-3 d-flex align-items-center bg-none">
                              <div className="card shadow-none rounded-0 w-100 p-2 pt-3 border-0">
                                <div className="card-body rounded-0 text-left p-3">
                                  <h2 className="fw-700 display1-size display2-md-size mb-4">
                                    Edit <br />
                                    your video
                                  </h2>

                                  <div className="form-group icon-input mb-3">
                                    <i className="font-sm feather-type text-grey-500 pe-0"></i>
                                    <input
                                      type="text"
                                      className="style2-input ps-5 form-control text-grey-900 font-xsss fw-600"
                                      placeholder="write caption"
                                      defaultValue={video.content}
                                      ref={contentRef}
                                      onChange={handleCaptionChange}
                                    />
                                  </div>

                                  <div className="form-group icon-input my-3 d-flex justify-content-end ">
                                    <button
                                      className="btn   bg-current fw-500 text-white font-xsss p-3  w100 text-center lh-20 rounded-xxl mx-1"
                                      data-dismiss="modal"
                                      onClick={cancelPost}
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      className="btn   bg-dark fw-500 text-white font-xsss p-3  w100 text-center lh-20 rounded-xxl mx-1"
                                      onClick={() => editPost(video.id)}
                                    >
                                      Edit video
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            ) : toggleTab == "books" ? (
              <div className="col-xl-8 col-xxl-9 col-lg-8">
                <div className="row ps-2 pe-2">
                  {books.map((book) => (
                    <div
                      className="col-lg-6 col-md-6 col-sm-6 mb-3 pe-2 ps-2"
                      key={book.id}
                    >
                      <div className="card w-100 p-0 hover-card shadow-xss border-0 rounded-3 overflow-hidden me-1">
                        <span className="font-xsssss fw-700 ps-3 pe-3 lh-32 text-uppercase rounded-3 ls-2 bg-primary-gradiant d-inline-block text-white position-absolute mt-3 ms-3 z-index-1">
                          {book.genre}
                        </span>
                        <div className="card-image w-100 mb-3">
                          <a
                            href={`/read-book/${book.id}`}
                            className="position-relative d-block"
                          >
                            <img
                              src={`${import.meta.env.VITE_ASSET_URL}${
                                book.thumbnail
                              }`}
                              alt="image"
                              className="w-100"
                              style={{ height: "15rem", objectFit: "cover" }}
                            />
                          </a>
                        </div>
                        <div className="card-body pt-0">
                          <i className="feather-bookmark font-md text-grey-500 position-absolute right-0 me-3" />
                          <h4 className="fw-700 font-xss mt-0 lh-28 mb-0">
                            <a
                              href="default-hotel-details.html"
                              className="text-dark text-grey-900"
                            >
                              {/* Montana Hotel */}
                              {book.title}
                            </a>
                          </h4>
                          <h6 className="font-xsssss text-grey-500 fw-600 mt-0 mb-2">
                            {book.user_detail.first_name}{" "}
                            {book.user_detail.last_name}
                          </h6>

                          <div className="clearfix" />
                          <h5 className="mt-3 d-inline-block font-xssss fw-600 text-grey-500 me-2">
                            <i className="btn-round-sm bg-greylight feather-eye text-grey-500 me-1" />{" "}
                            {book.views}
                          </h5>
                          <h5 className="mt-3 d-inline-block font-xssss fw-600 text-grey-500 me-2">
                            <i className="btn-round-sm bg-greylight feather-thumbs-up text-grey-500 me-1" />{" "}
                            {book.likes}
                          </h5>
                          <h5 className="mt-3 d-inline-block font-xssss fw-600 text-grey-500">
                            <i className="btn-round-sm bg-greylight feather-star text-grey-500 me-1" />{" "}
                            {book.rating ?? 0}
                          </h5>
                          <div className="clearfix" />
                          <ul className="d-flex align-items-start justify-content-start mt-1">
                            <li className="m-1">
                              <img src="images/onfire.svg" alt="icon" />
                              <span className="font-xss ms-3">On Trending</span>
                            </li>
                          </ul>
                          <a
                            href={`/read-book/${book.id}`}
                            className="position-absolute bottom-15 mb-2 right-15"
                          >
                            <i className="btn-round-sm bg-primary-gradiant text-white font-sm feather-chevron-right" />
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="col-xl-8 col-xxl-9 col-lg-8">
                <div className="row px-3">
                  {userProduct &&
                    userProduct.map((item) => (
                      <div className="col-md-6" key={item.id}>
                        <div className="card w-100 border-0 mt-4">
                          <div className="card-image w-100 p-0 text-center bg-greylight rounded-3 mb-2">
                            <a href={`/single-product/${item.id}`}>
                              <img
                                src={`${import.meta.env.VITE_ASSET_URL}${
                                  JSON.parse(item.picture)[0]
                                }`}
                                alt="product-image"
                                className="w-100 mt-0 mb-0 p-5"
                                style={{
                                  height: "20rem",
                                  width: "20rem",
                                  objectFit: "contain",
                                }}
                              />
                            </a>
                          </div>
                          <div className="card-body w-100 p-0 text-center">
                            <h2 className="mt-1 mb-1">
                              <a
                                href="single-product.html"
                                className="text-black fw-700 font-xsss lh-26"
                              >
                                {item.item}
                              </a>
                            </h2>
                            <h6 className="font-xsss fw-600 text-grey-500 ls-2">
                              Rp {item.price}
                            </h6>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
