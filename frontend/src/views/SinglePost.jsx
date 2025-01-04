import { useState, useEffect, useRef, createRef } from "react";
import { Navigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client";
import moment from "moment";
import VideoJS from "../scripts/VideoJS";
import videojs from "video.js";
import { useStateContext } from "../contexts/ContextProvider";
import { notification } from "antd";

export default function SinglesinglePost() {
  const { user } = useStateContext();
  const { uuid } = useParams();
  const [singlePost, setSinglePost] = useState({});
  const [error, setErrors] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Tambahkan state untuk loading
  const [comment, setComment] = useState(null);
  const commentRef = useRef();
  const contentRef = createRef();

  const [contentText, setContentText] = useState("");

  useEffect(() => {
    axiosClient
      .get("/single-post", { params: { uuid: uuid } })
      .then((response) => {
        setSinglePost(response.data.data[0] || {});
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
  }, [uuid, comment]);

  if (isLoading) {
    return <p>Loading...</p>; // Tampilkan pesan loading saat data masih dimuat
  }

  const handleLike = async (postId) => {
    try {
      await axiosClient.post("/like", { post_id: postId });
      setSinglePost(
        singlePost.id === postId
          ? {
              ...singlePost,
              likes: singlePost.likes + 1,
              liked: true,
            }
          : singlePost
      );
    } catch (error) {
      console.error("Error liking the post:", error);
    }
  };

  const handleDislike = async (postId) => {
    try {
      await axiosClient.post("/dislike", { post_id: postId });
      setSinglePost(
        singlePost.id === postId
          ? {
              ...singlePost,
              likes: singlePost.likes - 1,
              liked: false,
            }
          : singlePost
      );
    } catch (error) {
      console.error("Error disliking the post:", error);
    }
  };

  const playerRef = createRef(null);

  const openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: message,
    });
  };

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

  const handleCommentChange = (ev) => {
    setComment(ev.target.value);
    console.log(comment);
  };

  const handleComment = (postId) => {
    const payload = {
      post_id: postId,
      comment: comment,
    };

    document.querySelector("#commentFrame").value = "";
    console.log(payload);

    axiosClient
      .post("/create-comment", payload)
      .then(({ data }) => {
        setComment(" * ");
        setComment(null);
        openNotificationWithIcon("success", "Successfully create a comment");
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
    setSinglePost(
      singlePost.id === postId ? { ...singlePost, saved: true } : singlePost
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

    setSinglePost(
      singlePost.id === postId ? { ...singlePost, saved: false } : singlePost
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

  const deleteComment = (commentId) => {
    axiosClient
      .post("/delete-comment", { comment_id: commentId })
      .then(({ data }) => {
        setComment(" * ");
        setComment(null);
        openNotificationWithIcon("success", "Successfully delete a comment");
        setComment("")
        setComment(null);

      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      });
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

  const handleCaptionChange = (ev) => {
    setContentText(ev.target.value);
  };

  const cancelPost = () => {
    const modalBackdrop = document.querySelector(".modal-backdrop");
    modalBackdrop.remove();
    // setStories(null);
    // navigate("/home");
  };

  const deletePost = (postId) => {
    axiosClient
      .post("/delete-post", { post_id: postId })
      .then((response) => {
        // Navigate({to:'/home'});
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

  return (
    <div>
      {Object.keys(singlePost).length !== 0 && (
        <div key={singlePost.id}>
          <div className="card w-100 shadow-xss rounded-xxl border-0 p-4 mb-3">
            <div className="card-body p-0 d-flex">
              <figure className="avatar me-3">
                <img
                  src={`${import.meta.env.VITE_ASSET_URL}/${
                    singlePost.user.profile
                  }`}
                  alt="image"
                  className="shadow-sm rounded-circle w45 "
                  style={{ height: "45px" }}
                />
              </figure>
              <h4 className="fw-700 text-grey-900 font-xssss mt-1">
                {singlePost.user.first_name} {singlePost.user.last_name}
                <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">
                  {moment(singlePost.created_at).fromNow()}
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
                  {singlePost.saved == true ? (
                    <a
                      className="d-flex"
                      onClick={(e) => {
                        e.preventDefault();
                        handleRemovePost(singlePost.id);
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
                        handleSavePost(singlePost.id);
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
                {singlePost.user.id === user.id ? (
                  <div>
                    <div className="card-body p-0 d-flex">
                      <a
                        onClick={(e) => {
                          e.preventDefault();
                          deletePost(singlePost.id);
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
                        data-bs-target={`#Edit${singlePost.id}`}
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
                {singlePost.content}
                {/* <a
                                    href="#"
                                    className="fw-600 text-primary ms-2"
                                >
                                    See more
                                </a> */}
              </p>
            </div>
            <div className="card-body d-block p-0">
              {singlePost.media.length > 0 &&
                singlePost.media[0].file_type === "image" &&
                JSON.parse(singlePost.media[0].file).length === 5 && (
                  <div className="row image-gallery">
                    {JSON.parse(singlePost.media[0].file).map(
                      (media, index) => (
                        <div
                          key={index}
                          className={
                            JSON.parse(singlePost.media[0].file).length === 1
                              ? "col-12"
                              : JSON.parse(singlePost.media[0].file).length ===
                                    2 ||
                                  index == 0 ||
                                  index == 1
                                ? "col-xs-6 col-sm-6 p-1"
                                : "col-xs-4 col-sm-4 p-1"
                          }
                        >
                          <a
                            href={`${import.meta.env.VITE_ASSET_URL}/${media}`}
                            data-lightbox="roadtrip"
                            className={
                              index === 4 ? "position-relative d-block" : ""
                            }
                          >
                            <img
                              src={`${import.meta.env.VITE_ASSET_URL}/${media}`}
                              className={
                                index > 4 ? "d-none" : "rounded-3 w-100"
                              }
                              alt="image"
                              style={
                                JSON.parse(singlePost.media[0].file).length !==
                                1
                                  ? {
                                      height: "150px",
                                      objectFit: "cover",
                                    }
                                  : {}
                              }
                            />
                            {JSON.parse(singlePost.media[0].file).length != 5 &&
                              index === 4 && (
                                <span className="img-count font-sm text-white ls-3 fw-600">
                                  <b>
                                    +
                                    {JSON.parse(singlePost.media[0].file)
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

              {singlePost.media.length > 0 &&
                singlePost.media[0].file_type === "image" &&
                JSON.parse(singlePost.media[0].file).length != 5 && (
                  <div className="row image-gallery">
                    {JSON.parse(singlePost.media[0].file).map(
                      (media, index) => (
                        <div
                          key={index}
                          className={
                            JSON.parse(singlePost.media[0].file).length === 1
                              ? "col-12"
                              : JSON.parse(singlePost.media[0].file).length ===
                                  2
                                ? "col-xs-6 col-sm-6 p-1"
                                : "col-xs-4 col-sm-4 p-1"
                          }
                        >
                          <a
                            href={`${import.meta.env.VITE_ASSET_URL}/${media}`}
                            data-lightbox="roadtrip"
                            className={
                              index === 2 ? "position-relative d-block" : ""
                            }
                          >
                            <img
                              src={`${import.meta.env.VITE_ASSET_URL}/${media}`}
                              className={
                                index > 2 ? "d-none" : "rounded-3 w-100"
                              }
                              alt="image"
                              style={
                                JSON.parse(singlePost.media[0].file).length !==
                                1
                                  ? {
                                      height: "150px",
                                      objectFit: "cover",
                                    }
                                  : {}
                              }
                            />
                            {JSON.parse(singlePost.media[0].file).length != 3 &&
                              index === 2 && (
                                <span className="img-count font-sm text-white ls-3 fw-600">
                                  <b>
                                    +
                                    {JSON.parse(singlePost.media[0].file)
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

              {singlePost.media.length > 0 &&
                singlePost.media[0].file_type === "video" && (
                  <div className="card-body p-0 mb-3 rounded-3 overflow-hidden">
                    <div className="player bg-transparent shadow-none">
                      <VideoJS
                        options={{
                          ...videoJsOptions,
                          sources: [
                            {
                              src: `${import.meta.env.VITE_ASSET_URL}${
                                singlePost.media[0].file
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

              {singlePost.media.length > 0 &&
                singlePost.media[0].file_type === "audio" && (
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
                  singlePost.liked
                    ? handleDislike(singlePost.id)
                    : handleLike(singlePost.id);
                }}
                className="emoji-bttn d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss me-2"
              >
                <i
                  className={`feather-thumbs-up ${
                    singlePost.liked
                      ? "text-white bg-primary-gradiant"
                      : "text-current"
                  } me-2 btn-round-xs font-xss`}
                />
                {singlePost.likes} Like
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
                href={`/single-singlePost/${singlePost.uuid}`}
                className="d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss"
              >
                <i className="feather-message-circle text-dark text-grey-900 btn-round-sm font-lg" />

                <span className="d-none-xss">
                  {singlePost.comments} Comment
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
                    const input = document.querySelector("#copyInput");
                    navigator.clipboard.writeText(input.value);
                    openNotificationWithIcon("info", "Link copied to clipboard!"); // Menampilkan pesan konfirmasi
                  }}
                />
                <input
                  id="copyInput"
                  type="text"
                  defaultValue={`http://localhost:3000/single-post/${singlePost.uuid}`}
                  className="bg-grey text-grey-500 font-xssss border-0 lh-32 p-2 font-xssss fw-600 rounded-3 w-100 theme-dark-bg"
                />
              </div>
            </div>
            <div className="mt-3 "></div>
          </div>

          <div className="card w-100 text-center shadow-xss rounded-xxl border-0 p-4 mb-3 mt-3">
            <div className="theme-dark-bg">
              <a
                href="#"
                className="d-flex text-center fw-600 text-grey-900 text-dark lh-26 font-xssss"
              >
                <span className="d-none-xss text-center">
                  {singlePost.comments} Comment
                </span>
              </a>

              <form className="d-flex gap-2">
                <input
                  id="commentFrame"
                  type="text"
                  name="comment"
                  className="bg-grey text-grey-500 font-xssss border-0 lh-32 p-2 font-xssss fw-600 rounded-pill w-100 theme-dark-bg ps-3"
                  placeholder="write your comment here ..."
                  ref={commentRef}
                  onChange={handleCommentChange}
                  required
                />

                <button
                  style={{
                    outline: "none",
                    border: "none",
                    borderRadius: "43px",
                  }}
                  className="outline-none ms-auto border-none bg-none"
                  onClick={(e) => {
                    e.preventDefault();
                    handleComment(singlePost.id);
                  }}
                  type="submit"
                >
                  <i className="feather-arrow-up  btn-round-md bg-greylight fs-2 text-current"></i>
                </button>
              </form>

              <div className="card w-100 border-0 shadow-none right-scroll-bar">
                {singlePost.comment.map((comment) => (
                  <div
                    className="card-body border-top-xs pt-4 pb-3 pe-4 d-block ps-5"
                    key={comment.id}
                  >
                    <figure className="avatar position-absolute left-0 ms-2 mt-1">
                      <img
                        src={`${
                          import.meta.env.VITE_ASSET_URL
                        }/${comment.user.profile}`}
                        alt="image"
                        className="shadow-sm rounded-circle w35"
                        style={{ height: "35px" }}
                      />
                    </figure>
                    <div className="chat p-3 bg-greylight rounded-xxl d-block text-left theme-dark-bg">
                      <div className="d-flex">
                        <h4 className="fw-700 text-grey-900 font-xssss mt-0 mb-1">
                          {comment.user.first_name} {comment.user.last_name}
                          <a href="#" className="ms-auto">
                            <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">
                              {moment(comment.created_at).fromNow()}
                            </span>
                            <i className="float-right text-grey-800 font-xsss">
                              {/* Ganti dengan icon yang sesuai */}
                            </i>
                          </a>
                        </h4>
                        <a
                          href="#"
                          className="ms-auto"
                          id="dropdownMenuComment"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <i className="feather-more-vertical text-grey-900 btn-round-md bg-greylight font-xss" />
                        </a>
                        <div
                          className="dropdown-menu dropdown-menu-end p-4 rounded-xxl border-0 shadow-lg"
                          aria-labelledby="dropdownMenuComment"
                        >
                          {comment.user_id === user.id ? (
                            <div className="card-body p-0 d-flex">
                              <a
                                onClick={(e) => {
                                  e.preventDefault();
                                  deleteComment(comment.id);
                                }}
                                className="d-flex"
                              >
                                <i className="feather-trash text-grey-500 me-3 font-lg" />
                                <h4 className="fw-600 text-grey-900 font-xssss mt-0 me-4">
                                  Delete Comment
                                  <span className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">
                                    Delete this comment
                                  </span>
                                </h4>
                              </a>
                            </div>
                          ) : (
                            <div className="card-body p-0 d-flex">
                              <a
                                // onClick={(e) => {
                                //     e.preventDefault();
                                //     deletePost(
                                //         singlePost.id
                                //     );
                                // }}
                                className="d-flex"
                              >
                                <i className="feather-flag text-grey-500 me-3 font-lg" />
                                <h4 className="fw-600 text-grey-900 font-xssss mt-0 me-4">
                                  Report comment
                                  <span className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">
                                    Report this comment
                                  </span>
                                </h4>
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                      <p className="fw-700 text-grey-500 lh-20 w-100 mt-2 mb-0 fs-4">
                        {comment.comment}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            className="modal bottom fade"
            style={{ overflowY: "scroll" }}
            id={`Edit${singlePost.id}`}
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
                        Edit <br />
                        your post
                      </h2>

                      <div className="form-group icon-input mb-3">
                        <i className="font-sm feather-type text-grey-500 pe-0"></i>
                        <input
                          type="text"
                          className="style2-input ps-5 form-control text-grey-900 font-xsss fw-600"
                          placeholder="write caption"
                          defaultValue={singlePost.content}
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
                          onClick={() => editPost(singlePost.id)}
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
      )}
    </div>
  );
}
