import { useState, useEffect, useRef, createRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client";
import moment from "moment";
import VideoJS from "../scripts/VideoJS";
import videojs from "video.js";
import CreatePost from "../assets/CreatePost";
import RightChat from "../layouts/RightChat";
import { useStateContext } from "../contexts/ContextProvider";
import { notification } from "antd";

export default function Bookmarks() {
    const [bookmarks, setBookmarks] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Tambahkan state untuk loading
    const [comment, setComment] = useState(null);
    const [commentText, setCommentText] = useState("");
    const [error, setErrors] = useState(null);
    const commentRef = useRef();
    const { user } = useStateContext();
    const navigate = useNavigate();

    useEffect(() => {
        axiosClient
            .get("/bookmarks")
            .then((response) => {
                setBookmarks(response.data.data || {});
                setIsLoading(false); // Setelah data berhasil diambil, set loading menjadi false
                // console.log(singlePost);
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
    }, [bookmarks]);

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

    const handleCommentChange = (ev) => {
        setCommentText(ev.target.value);
    };

    const handleComment = (postId) => {
        const payload = {
            post_id: postId,
            comment: commentText,
        };

        document.querySelector("#commentFrame").value = "";
        console.log(payload);

        axiosClient
            .post("/create-comment", payload)
            .then(({ data }) => {})
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                }
            });
    };

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
            setBookmarks(
                bookmarks.map((book) =>
                    book.posts.id === postId
                        ? { ...book.posts, likes: post.likes + 1, liked: true }
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
            setBookmarks(
                bookmarks.map((book) =>
                    book.posts.id === postId
                        ? {
                              ...book.posts,
                              likes: book.posts.likes - 1,
                              liked: false,
                          }
                        : book.posts
                )
            );
        } catch (error) {
            console.error("Error disliking the post:", error);
        }
    };

    const handleRemovePost = (postId) => {
        const payload = {
            post_id: postId,
        };

        axiosClient
            .post("/remove-post", payload)
            .then(({ data }) => {
                navigate("/bookmarks");
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                }
            });

    };

    const deletePost = (postId) => {
        axiosClient
            .post("/delete-post", { post_id: postId })
            .then((response) => {
                openNotificationWithIcon("success", response.data.message);
                navigate("/");
            })
            .catch((err) => {
                const response = err.response;
                if (response) {
                    if (response.status === 403 || response.status === 422) {
                        setErrors(response.data.message);
                        openNotificationWithIcon(
                            "warning",
                            response.data.message
                        );
                    } else {
                        openNotificationWithIcon(
                            "error",
                            "An unexpected error occurred"
                        );
                    }
                }
            });
    };

    return (
        <div className="col-xl-10 col-xxl-9 col-lg-10 mx-auto">
            <div className="card-body p-4 w-100 bg-current border-0 d-flex rounded-3 mb-3">
                <a href="/settings" className="d-inline-block mt-2">
                    <i className="ti-arrow-left font-sm text-white" />
                </a>
                <h4 className="font-xs text-white fw-600 ms-4 mb-0 mt-2">
                    Bookmarks
                </h4>
            </div>
            {bookmarks &&
                bookmarks.map((book) => (
                    <div key={book.id}>
                        <div className="card w-100 shadow-xss rounded-xxl border-0 p-4 mb-3">
                            <div className="card-body p-0 d-flex">
                                <figure className="avatar me-3">
                                    <img
                                        src={`${
                                            import.meta.env.VITE_ASSET_URL
                                        }/${book.posts.user.profile}`}
                                        alt="image"
                                        className="shadow-sm rounded-circle w45 "
                                        style={{ height: "45px" }}
                                    />
                                </figure>
                                <h4 className="fw-700 text-grey-900 font-xssss mt-1">
                                    {book.posts.user.first_name}{" "}
                                    {book.posts.user.last_name}
                                    <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">
                                        {moment(
                                            book.posts.created_at
                                        ).fromNow()}
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
                                        {book.posts.saved == true ? (
                                            <a
                                                className="d-flex"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleRemovePost(
                                                        book.posts.id
                                                    );
                                                }}
                                            >
                                                <i className="feather-bookmark  font-xsss  me-2 btn-round-xs text-white bg-current" />
                                                <h4 className="fw-600 text-grey-900 font-xssss mt-0 me-4">
                                                    Remove Save Post{" "}
                                                    <span className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">
                                                        Remove this post from
                                                        your saved items
                                                    </span>
                                                </h4>
                                            </a>
                                        ) : (
                                            <a
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleSavePost(
                                                        book.posts.id
                                                    );
                                                }}
                                                className="d-flex"
                                            >
                                                <i className="feather-bookmark text-grey-500 me-3 font-lg" />
                                                <h4 className="fw-600 text-grey-900 font-xssss mt-0 me-4">
                                                    Save Post{" "}
                                                    <span className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">
                                                        Add this to your saved
                                                        items
                                                    </span>
                                                </h4>
                                            </a>
                                        )}
                                    </div>
                                    {user.id === book.posts.user.id ? (
                                        <div>
                                            <div className="card-body p-0 d-flex">
                                                <a
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        deletePost(
                                                            book.posts.id
                                                        );
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
                                                    data-bs-target={`#Edit${book.posts.id}`}
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
                                    {book.posts.content}
                                    <a
                                        href="#"
                                        className="fw-600 text-primary ms-2"
                                    >
                                        See more
                                    </a>
                                </p>
                            </div>
                            <div className="card-body d-block p-0">
                                {book.posts.media.length > 0 &&
                                    book.posts.media[0].file_type === "image" &&
                                    JSON.parse(book.posts.media[0].file)
                                        .length === 5 && (
                                        <div className="row image-gallery">
                                            {JSON.parse(
                                                book.posts.media[0].file
                                            ).map((media, index) => (
                                                <div
                                                    key={index}
                                                    className={
                                                        JSON.parse(
                                                            book.posts.media[0]
                                                                .file
                                                        ).length === 1
                                                            ? "col-12"
                                                            : JSON.parse(
                                                                  book.media[0]
                                                                      .file
                                                              ).length === 2 ||
                                                              index == 0 ||
                                                              index == 1
                                                            ? "col-xs-6 col-sm-6 p-1"
                                                            : "col-xs-4 col-sm-4 p-1"
                                                    }
                                                >
                                                    <a
                                                        href={`${
                                                            import.meta.env
                                                                .VITE_ASSET_URL
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
                                                                import.meta.env
                                                                    .VITE_ASSET_URL
                                                            }/${media}`}
                                                            className={
                                                                index > 4
                                                                    ? "d-none"
                                                                    : "rounded-3 w-100"
                                                            }
                                                            alt="image"
                                                            style={
                                                                JSON.parse(
                                                                    book.posts
                                                                        .media[0]
                                                                        .file
                                                                ).length !== 1
                                                                    ? {
                                                                          height: "150px",
                                                                          objectFit:
                                                                              "cover",
                                                                      }
                                                                    : {}
                                                            }
                                                        />
                                                        {JSON.parse(
                                                            book.posts.media[0]
                                                                .file
                                                        ).length != 5 &&
                                                            index === 4 && (
                                                                <span className="img-count font-sm text-white ls-3 fw-600">
                                                                    <b>
                                                                        +
                                                                        {JSON.parse(
                                                                            book
                                                                                .posts
                                                                                .media[0]
                                                                                .file
                                                                        )
                                                                            .length -
                                                                            5}
                                                                    </b>
                                                                </span>
                                                            )}
                                                    </a>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                {book.posts.media.length > 0 &&
                                    book.posts.media[0].file_type === "image" &&
                                    JSON.parse(book.posts.media[0].file)
                                        .length != 5 && (
                                        <div className="row image-gallery">
                                            {JSON.parse(
                                                book.posts.media[0].file
                                            ).map((media, index) => (
                                                <div
                                                    key={index}
                                                    className={
                                                        JSON.parse(
                                                            book.posts.media[0]
                                                                .file
                                                        ).length === 1
                                                            ? "col-12"
                                                            : JSON.parse(
                                                                  book.media[0]
                                                                      .file
                                                              ).length === 2
                                                            ? "col-xs-6 col-sm-6 p-1"
                                                            : "col-xs-4 col-sm-4 p-1"
                                                    }
                                                >
                                                    <a
                                                        href={`${
                                                            import.meta.env
                                                                .VITE_ASSET_URL
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
                                                                import.meta.env
                                                                    .VITE_ASSET_URL
                                                            }/${media}`}
                                                            className={
                                                                index > 2
                                                                    ? "d-none"
                                                                    : "rounded-3 w-100"
                                                            }
                                                            alt="image"
                                                            style={
                                                                JSON.parse(
                                                                    book.posts
                                                                        .media[0]
                                                                        .file
                                                                ).length !== 1
                                                                    ? {
                                                                          height: "150px",
                                                                          objectFit:
                                                                              "cover",
                                                                      }
                                                                    : {}
                                                            }
                                                        />
                                                        {JSON.parse(
                                                            book.posts.media[0]
                                                                .file
                                                        ).length != 3 &&
                                                            index === 2 && (
                                                                <span className="img-count font-sm text-white ls-3 fw-600">
                                                                    <b>
                                                                        +
                                                                        {JSON.parse(
                                                                            book
                                                                                .posts
                                                                                .media[0]
                                                                                .file
                                                                        )
                                                                            .length -
                                                                            3}
                                                                    </b>
                                                                </span>
                                                            )}
                                                    </a>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                {book.posts.media.length > 0 &&
                                    book.posts.media[0].file_type ===
                                        "video" && (
                                        <div className="card-body p-0 mb-3 rounded-3 overflow-hidden">
                                            <div className="player bg-transparent shadow-none">
                                                <VideoJS
                                                    options={{
                                                        ...videoJsOptions,
                                                        sources: [
                                                            {
                                                                src: `${
                                                                    import.meta
                                                                        .env
                                                                        .VITE_ASSET_URL
                                                                }${
                                                                    book.posts
                                                                        .media[0]
                                                                        .file
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

                                {book.posts.media.length > 0 &&
                                    book.posts.media[0].file_type ===
                                        "audio" && (
                                        <section>
                                            <div className="audio-player">
                                                <div className="thumb">
                                                    <img
                                                        src="images/Parallax.png"
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="info">
                                                    <div className="detail">
                                                        <div className="title">
                                                            <span id="current">
                                                                0:00
                                                            </span>{" "}
                                                            /
                                                            <span id="duration">
                                                                0:00
                                                            </span>
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
                                        book.posts.liked
                                            ? handleDislike(book.id)
                                            : handleLike(book.id);
                                    }}
                                    className="emoji-bttn d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss me-2"
                                >
                                    <i
                                        className={`feather-thumbs-up ${
                                            book.posts.liked
                                                ? "text-white bg-primary-gradiant"
                                                : "text-current"
                                        } me-2 btn-round-xs font-xss`}
                                    />
                                    {book.posts.likes} Like
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
                                    href={`/single-book/${book.posts.uuid}`}
                                    className="d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss"
                                >
                                    <i className="feather-message-circle text-dark text-grey-900 btn-round-sm font-lg" />

                                    <span className="d-none-xss">
                                        {book.posts.comments} Comment
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
                                                    href="#"
                                                    className="btn-round-lg bg-facebook"
                                                >
                                                    <i className="font-xs ti-facebook text-white" />
                                                </a>
                                            </li>
                                            <li className="me-1">
                                                <a
                                                    href="#"
                                                    className="btn-round-lg bg-twiiter"
                                                >
                                                    <i className="font-xs ti-twitter-alt text-white" />
                                                </a>
                                            </li>
                                            <li className="me-1">
                                                <a
                                                    href="#"
                                                    className="btn-round-lg bg-linkedin"
                                                >
                                                    <i className="font-xs ti-linkedin text-white" />
                                                </a>
                                            </li>
                                            <li className="me-1">
                                                <a
                                                    href="#"
                                                    className="btn-round-lg bg-instagram"
                                                >
                                                    <i className="font-xs ti-instagram text-white" />
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href="#"
                                                    className="btn-round-lg bg-pinterest"
                                                >
                                                    <i className="font-xs ti-pinterest text-white" />
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="card-body p-0 d-flex">
                                        <ul className="d-flex align-items-center justify-content-between mt-2">
                                            <li className="me-1">
                                                <a
                                                    href="#"
                                                    className="btn-round-lg bg-tumblr"
                                                >
                                                    <i className="font-xs ti-tumblr text-white" />
                                                </a>
                                            </li>
                                            <li className="me-1">
                                                <a
                                                    href="#"
                                                    className="btn-round-lg bg-youtube"
                                                >
                                                    <i className="font-xs ti-youtube text-white" />
                                                </a>
                                            </li>
                                            <li className="me-1">
                                                <a
                                                    href="#"
                                                    className="btn-round-lg bg-flicker"
                                                >
                                                    <i className="font-xs ti-flickr text-white" />
                                                </a>
                                            </li>
                                            <li className="me-1">
                                                <a
                                                    href="#"
                                                    className="btn-round-lg bg-black"
                                                >
                                                    <i className="font-xs ti-vimeo-alt text-white" />
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href="#"
                                                    className="btn-round-lg bg-whatsup"
                                                >
                                                    <i className="font-xs feather-phone text-white" />
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    <h4 className="fw-700 font-xssss mt-4 text-grey-500 d-flex align-items-center mb-3">
                                        Copy Link
                                    </h4>
                                    <i className="feather-copy position-absolute right-35 mt-3 font-xs text-grey-500" />
                                    <input
                                        type="text"
                                        defaultValue="https://socia.be/1rGxjoJKVF0"
                                        className="bg-grey text-grey-500 font-xssss border-0 lh-32 p-2 font-xssss fw-600 rounded-3 w-100 theme-dark-bg"
                                    />
                                </div>
                            </div>
                            <div className="mt-3 ">
                                <form className="d-flex gap-2">
                                    <input
                                        id="commentFrame"
                                        type="text"
                                        name="comment"
                                        className="bg-grey text-grey-500 font-xssss border-0 lh-32 p-2 font-xssss fw-600 rounded-3 w-100 theme-dark-bg"
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
                                            handleComment(book.posts.id);
                                        }}
                                        type="submit"
                                    >
                                        <i className="feather-arrow-up  btn-round-md bg-greylight fs-2 text-current"></i>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    );
}
