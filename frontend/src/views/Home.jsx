import React, { useEffect, useState, useRef, createRef } from "react";
import axiosClient from "../axios-client";
import VideoJS from "../scripts/VideoJS";
import videojs from "video.js";
import moment from "moment";
import CreatePost from "../assets/CreatePost";
import RightChat from "../layouts/RightChat";
import { useStateContext } from "../contexts/ContextProvider";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";
import StoriesCopy from "../assets/Stories copy";

const Home = () => {
  const { user } = useStateContext();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);
  const [like, setLikes] = useState({});
  const [comments, setComments] = useState({});
  const [commentText, setCommentText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [refresh, setRefresh] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const hasLoaded = useRef(false);
  const navigate = useNavigate();

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

  useEffect(() => {
    if (!hasLoaded.current) {
      loadPost();
      hasLoaded.current = true;
    }
  }, [refresh]);

  const loadPost = async (page = 1) => {
    setLoading(true);

    try {
      const response = await axiosClient.get(`/home?page=${page}`);
      const newPosts = response.data.data || [];

      const uniquePosts = newPosts.filter(
        (newPosts) => !posts.some((post) => post.uuid == newPosts.uuid)
      );

      setPosts((prevPosts) => [...prevPosts, ...uniquePosts]);
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

  if (!posts || posts.length === 0) {
    return (
      <>
        <div className="box shimmer">
          <div className="lines">
            <div className="line s_shimmer" />
            <div className="line s_shimmer" />
            <div className="line s_shimmer" />
            <div className="line s_shimmer" />
          </div>
        </div>
        <div className="box shimmer mb-3">
          <div className="lines">
            <div className="line s_shimmer" />
            <div className="line s_shimmer" />
            <div className="line s_shimmer" />
            <div className="line s_shimmer" />
          </div>
        </div>
        <div className="box shimmer">
          <div className="lines">
            <div className="line s_shimmer" />
            <div className="line s_shimmer" />
            <div className="line s_shimmer" />
            <div className="line s_shimmer" />
          </div>
        </div>
      </>
    );
  }

  const openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: message,
    });
  };

  const handleLike = async (postId) => {
    try {
      const response = await axiosClient.post("/like", {
        post_id: postId,
      });
      setPosts(
        posts.map((post) =>
          post.id === postId
            ? { ...post, likes: post.likes + 1, liked: true }
            : post
        )
      );
      openNotificationWithIcon("success", response.data.message);
    } catch (error) {
      console.error("Error liking the post:", error);
    }
  };

  const handleDislike = async (postId) => {
    try {
      await axiosClient.post("/dislike", { post_id: postId });
      setPosts(
        posts.map((post) =>
          post.id === postId
            ? { ...post, likes: post.likes - 1, liked: false }
            : post
        )
      );
    } catch (error) {
      console.error("Error disliking the post:", error);
    }
  };

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

  const handleCommentChange = (postId, ev) => {
    const newComment = ev.target.value;
    setComments((prevComments) => ({
      ...prevComments,
      [postId]: newComment, // Simpan komentar untuk post berdasarkan postId
    }));
  };

  const handleCaptionChange = (ev) => {
    setContentText(ev.target.value);
  };

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

    setPosts(
      posts.map((post) =>
        post.id === postId
          ? { ...post, comments: post.comments + 1 } // perbaikan di sini
          : post
      )
    );

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

  const handleSavePost = (postId) => {
    const payload = {
      post_id: postId,
    };
    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, saved: true } : post
      )
    );
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

    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, saved: false } : post
      )
    );
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

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      loadPost(currentPage + 1);
    }
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
        setPosts(posts.map((post) => post));
        openNotificationWithIcon("success", response.data.message);
        navigate("/");
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

  return (
    <div className="row feed-body">
      {/* loader wrapper */}
      <div className="preloader-wrap p-3">
        <div className="box shimmer">
          <div className="lines">
            <div className="line s_shimmer" />
            <div className="line s_shimmer" />
            <div className="line s_shimmer" />
            <div className="line s_shimmer" />
          </div>
        </div>
        <div className="box shimmer mb-3">
          <div className="lines">
            <div className="line s_shimmer" />
            <div className="line s_shimmer" />
            <div className="line s_shimmer" />
            <div className="line s_shimmer" />
          </div>
        </div>
        <div className="box shimmer">
          <div className="lines">
            <div className="line s_shimmer" />
            <div className="line s_shimmer" />
            <div className="line s_shimmer" />
            <div className="line s_shimmer" />
          </div>
        </div>
      </div>
      {/* loader wrapper */}
      <div className="col-xl-8 col-xxl-9 col-lg-8">
        {window.location.pathname === "/home" ||
        window.location.pathname == "/" ? (
          <StoriesCopy />
        ) : (
          ""
        )}
        <CreatePost />

        {posts &&
          posts.map((post) => (
            <div key={post.id}>
              <div className="card w-100 shadow-xss rounded-xxl border-0 p-4 mb-3">
                <div className="card-body p-0 d-flex">
                  <figure className="avatar me-3">
                    <a href={`/user/${post.user.uuid}`}>
                      <img
                        src={`${import.meta.env.VITE_ASSET_URL}/${
                          post.user.profile
                        }`}
                        alt="image"
                        className="shadow-sm rounded-circle w45 "
                        style={{ height: "45px" }}
                      />
                    </a>
                  </figure>
                  <h4 className="fw-700 text-grey-900 font-xssss mt-1">
                    {post.is_page_post || post.is_group_post ? (
                      <>
                        <a href={`/user/${post.user.uuid}`}>
                          @{post.user.username}
                        </a>
                        {post.is_group_post && (
                          <>
                            {" posted on "}
                            <a
                              href={`/group/${post.group_detail.uuid}/${post.group_detail.id}`}
                            >
                              {post.group_detail.name}
                            </a>
                          </>
                        )}
                        {/* {post.is_page_post && (
                                                    <>
                                                        posted on{" "}
                                                        <a
                                                            href={`/group/${post.page.uuid}`}
                                                        >
                                                            {post.page.name}
                                                        </a>
                                                    </>
                                                )} */}
                      </>
                    ) : (
                      <>
                        {post.user.first_name} {post.user.last_name}
                      </>
                    )}
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
                    {post.user.id === user.id ? (
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
                    {expandedPosts[post.id] || post.content.length <= maxLength
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
                        {JSON.parse(post.media[0].file).map((media, index) => (
                          <div
                            key={index}
                            className={
                              JSON.parse(post.media[0].file).length === 1
                                ? "col-12"
                                : JSON.parse(post.media[0].file).length === 2 ||
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
                                index === 4 ? "position-relative d-block" : ""
                              }
                            >
                              <img
                                src={`${
                                  import.meta.env.VITE_ASSET_URL
                                }/${media}`}
                                className={
                                  index > 4 ? "d-none" : "rounded-3 w-100"
                                }
                                alt="image"
                                style={
                                  JSON.parse(post.media[0].file).length !== 1
                                    ? {
                                        height: "150px",
                                        objectFit: "cover",
                                      }
                                    : {}
                                }
                              />
                              {JSON.parse(post.media[0].file).length != 5 &&
                                index === 4 && (
                                  <span className="img-count font-sm text-white ls-3 fw-600">
                                    <b>
                                      +
                                      {JSON.parse(post.media[0].file).length -
                                        5}
                                    </b>
                                  </span>
                                )}
                            </a>
                          </div>
                        ))}
                      </div>
                    )}

                  {post.media.length > 0 &&
                    post.media[0].file_type === "image" &&
                    JSON.parse(post.media[0].file).length != 5 && (
                      <div className="row image-gallery">
                        {JSON.parse(post.media[0].file).map((media, index) => (
                          <div
                            key={index}
                            className={
                              JSON.parse(post.media[0].file).length === 1
                                ? "col-12"
                                : JSON.parse(post.media[0].file).length === 2
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
                                index === 2 ? "position-relative d-block" : ""
                              }
                            >
                              <img
                                src={`${
                                  import.meta.env.VITE_ASSET_URL
                                }/${media}`}
                                className={
                                  index > 2 ? "d-none" : "rounded-3 w-100"
                                }
                                alt="image"
                                style={
                                  JSON.parse(post.media[0].file).length !== 1
                                    ? {
                                        height: "150px",
                                        objectFit: "cover",
                                      }
                                    : {}
                                }
                              />
                              {JSON.parse(post.media[0].file).length != 3 &&
                                index === 2 && (
                                  <span className="img-count font-sm text-white ls-3 fw-600">
                                    <b>
                                      +
                                      {JSON.parse(post.media[0].file).length -
                                        3}
                                    </b>
                                  </span>
                                )}
                            </a>
                          </div>
                        ))}
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
                                  src: `${import.meta.env.VITE_ASSET_URL}${
                                    post.media[0].file
                                  }`,
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
                                <i className="fi-rr-play" id="playPause"></i>
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
                      post.liked ? handleDislike(post.id) : handleLike(post.id);
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
                  <div className="emoji-wrap">
                    <ul className="emojis list-inline mb-0">
                      <li className="emoji list-inline-item">
                        <i className="em em---1" />{" "}
                      </li>
                      <li className="emoji list-inline-item">
                        <i className="em em-angry" />
                      </li>
                      <li className="emoji list-inline-item">
                        <i className="em em-anguished" />{" "}
                      </li>
                      <li className="emoji list-inline-item">
                        <i className="em em-astonished" />{" "}
                      </li>
                      <li className="emoji list-inline-item">
                        <i className="em em-blush" />
                      </li>
                      <li className="emoji list-inline-item">
                        <i className="em em-clap" />
                      </li>
                      <li className="emoji list-inline-item">
                        <i className="em em-cry" />
                      </li>
                      <li className="emoji list-inline-item">
                        <i className="em em-full_moon_with_face" />
                      </li>
                    </ul>
                  </div>
                  <a
                    href={`/single-post/${post.uuid}`}
                    className="d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss"
                  >
                    <i className="feather-message-circle text-dark text-grey-900 btn-round-sm font-xs" />

                    <span className="d-none-xss">{post.comments} Comment</span>
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
                        const input = document.querySelector("#copyInput");
                        navigator.clipboard.writeText(input.value);
                        openNotificationWithIcon("success" ,"Link copied to clipboard!"); // Menampilkan pesan konfirmasi
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

      <RightChat />
    </div>
  );
};

export default Home;
