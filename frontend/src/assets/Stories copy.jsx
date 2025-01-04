import { createRef, useEffect, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";
import { Form, useNavigate } from "react-router-dom";
import { notification } from "antd";

export default function StoriesCopy() {
    const storiesRef = createRef();
    const captionRef = createRef();

    const [refresh, setRefresh] = useState(false);

    const [errors, setErrors] = useState(null);

    const [stories, setStories] = useState(null);

    const [Stories, getStories] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        axiosClient
            .get("/stories")
            .then((response) => {
                getStories(response.data.data || []);
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                }
            });
    }, [refresh]);

    const openNotificationWithIcon = (type, message) => {
        notification[type]({
            message: message,
        });
    };

    useEffect(() => {
        // Initialize owl-carousel after stories are loaded
        if (Stories && Stories.length > 0) {
            Stories.forEach((story) => {
                $(`#user_${story.user.uuid} .owl-carousel`).owlCarousel({
                    items: 1,
                    loop: true,
                    nav: true,
                    dots: true,
                });
            });
        }
    }, [Stories]);

    const onSubmit = (ev) => {
        ev.preventDefault();

        const payload = {
            caption: captionRef.current.value,
            story: Array.isArray(storiesRef.current.files)
                ? storiesRef.current.files
                : [storiesRef.current.files[0]],
        };

        console.log(payload);

        axiosClient
            .post("/create-stories", payload, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                // response.data.message adalah tempat pesan sukses seharusnya berada
                ev.target.reset();
                setRefresh(!refresh); // Toggle state to trigger re-render
                setStories(null);
                openNotificationWithIcon("success", response.data.message);
                const modalBackdrop = document.querySelector(".modal-backdrop");
                modalBackdrop.remove();
                
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

    const handleStoriesChange = (ev) => {
        const selectedStories = Array.from(ev.target.files);
        setStories(selectedStories);
    };

    const cancelPost = () => {
        const modalBackdrop = document.querySelector(".modal-backdrop");
        modalBackdrop.remove();
        setStories(null);
        navigate("/home");
    };

    return (
        <>
            <div className="card col-xl-8 col-xxl-9 col-lg-8 shadow-none bg-transparent bg-transparent-card border-0 p-0 mb-0">
                <div
                    className="owl-carousel category-card owl-theme overflow-hidden nav-none"
                    style={{ display: "flex" }}
                >
                    <div className="item" style={{ marginRight: "2px" }}>
                        <div
                            data-bs-toggle="modal"
                            data-bs-target="#Modalstory"
                            className="card w125 h200 d-block border-0 shadow-none rounded-xxxl bg-dark overflow-hidden mb-3 mt-3 "
                        >
                            <div className="card-body d-block p-3 w-100 position-absolute bottom-0 text-center">
                                <a href="#" className="upload-btn-wrapper">
                                    <span className="btn-round-lg bg-white">
                                        <i className="feather-plus font-lg" />
                                    </span>
                                    {/* <div className="clearfix" /> */}
                                    <h4 className="fw-700 position-relative z-index-1 ls-1 font-xssss text-white mt-2 mb-1">
                                        Add Story
                                    </h4>
                                    <input
                                        type="file"
                                        name="stories"
                                        multiple
                                        accept="image/*, video/*"
                                        id="story"
                                        ref={storiesRef}
                                        onChange={handleStoriesChange}
                                    />
                                </a>
                            </div>

                            {stories && (
                                <div className="d-block position-absolute text-center border w-100  bg-current">
                                    <a
                                        href="#"
                                        className="mt-3 text-white"
                                        data-bs-toggle="modal"
                                        data-bs-target="#Modallogin"
                                    >
                                        Post
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>

                    {Stories &&
                        Stories.map((story) => (
                            <div
                                className="item"
                                key={story.user_id}
                                style={{
                                    margin: "0 3px 0 3px",
                                }}
                            >
                                <div
                                    data-bs-toggle="modal"
                                    data-bs-target={`#user_${story.user.uuid.toString()}`}
                                    className="card w125 h200 d-block border-0 shadow-xss rounded-xxxl bg-gradiant-bottom overflow-hidden cursor-pointer mb-3 mt-3"
                                    style={{
                                        backgroundImage: `url(${
                                            import.meta.env.VITE_ASSET_URL
                                        }${JSON.parse(story.story)[0]} )`,
                                        backgroundRepeat: "no-repeat",
                                        backgroundSize: "cover",
                                    }}
                                >
                                    <div className="card-body d-block p-3 w-100 position-absolute bottom-0 text-center">
                                        <a href="#">
                                            <figure className="avatar ms-auto me-auto mb-0 position-relative w50 z-index-1">
                                                <img
                                                    src={`${
                                                        import.meta.env
                                                            .VITE_ASSET_URL
                                                    }/${story.user.profile}`}
                                                    alt="image"
                                                    className="float-right p-0 bg-white rounded-circle w-100 shadow-xss"
                                                    style={{ height: "50px" }}
                                                />
                                            </figure>
                                            <div className="clearfix" />
                                            <h4 className="fw-600 position-relative z-index-1 ls-1 font-xssss text-white mt-2 mb-1">
                                                {story.user.first_name}{" "}
                                                {story.user.last_name}
                                            </h4>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>

            <form onSubmit={onSubmit}>
                {stories && (
                    <div
                        className="modal bottom fade"
                        style={{ overflowY: "scroll" }}
                        id="Modallogin"
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
                                                Post <br />
                                                your stories
                                            </h2>
                                            <div className="form-group icon-input mb-3">
                                                {stories.map((file, index) => {
                                                    const isImage =
                                                        file.type.startsWith(
                                                            "image"
                                                        );
                                                    const url =
                                                        URL.createObjectURL(
                                                            file
                                                        );

                                                    return (
                                                        <div
                                                            key={index}
                                                            className="my-2"
                                                        >
                                                            {isImage ? (
                                                                <img
                                                                    src={url}
                                                                    alt=""
                                                                    className="bor-0 rounded-xxl w-100 h-10"
                                                                />
                                                            ) : (
                                                                <video
                                                                    controls
                                                                    className="bor-0 rounded-xxl w-100 h-10"
                                                                >
                                                                    <source
                                                                        src={
                                                                            url
                                                                        }
                                                                        type={
                                                                            file.type
                                                                        }
                                                                    />
                                                                    Your browser
                                                                    does not
                                                                    support the
                                                                    video tag.
                                                                </video>
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>

                                            <div className="form-group icon-input mb-3">
                                                <i className="font-sm feather-type text-grey-500 pe-0"></i>
                                                <input
                                                    type="text"
                                                    className="style2-input ps-5 form-control text-grey-900 font-xsss fw-600"
                                                    placeholder="write caption"
                                                    ref={captionRef}
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
                                                    type="submit"
                                                >
                                                    Post Story
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </form>

            {/* Modal */}
            {Stories &&
                Stories.map((story) => (
                    <div
                        className="modal bottom side fade"
                        id={`user_${story.user.uuid}`}
                        tabIndex="-1"
                        role="dialog"
                        style={{ overflowY: "auto" }}
                        key={story.user_id}
                    >
                        <div
                            className="modal-dialog modal-dialog-centered"
                            role="document"
                        >
                            <div className="bg-transparent border-0 modal-content">
                                <button
                                    type="button"
                                    className="mt-0 close position-absolute top--30 right--10"
                                    data-dismiss="modal"
                                    aria-label="close"
                                >
                                    <i className="text-grey-900 font-xssss feather-x"></i>
                                </button>
                                <div
                                    className="p-0 modal-body"
                                    style={{
                                        // height: '500px',
                                        height: "200%",
                                    }}
                                >
                                    <div className="overflow-hidden border-0 card w-100 rounded-3 bg-gradiant-bottom bg-gradiant-top">
                                        <div className="owl-carousel owl-theme dot-style3 story-slider owl-dot-nav nav-none">
                                            {story.user.story.map(
                                                (single_story, index) => {
                                                    const stories =
                                                        JSON.parse(
                                                            single_story
                                                        );
                                                    return stories.length ===
                                                        1 ? (
                                                        <div
                                                            className="item"
                                                            key={index}
                                                            style={{
                                                                backgroundColor:
                                                                    "black",
                                                            }}
                                                        >
                                                            <img
                                                                src={`${
                                                                    import.meta
                                                                        .env
                                                                        .VITE_ASSET_URL
                                                                }${stories[0]}`}
                                                                alt="image"
                                                                style={{
                                                                    objectFit:
                                                                        "contain", // Menjaga gambar dalam proporsi y
                                                                    height: "500px",
                                                                }}
                                                            />
                                                            <h4
                                                                type="text"
                                                                className="p-3 text-white  w-100  pe-5  fw-500 text-center"
                                                                style={{
                                                                    position:
                                                                        "absolute",
                                                                    bottom: 80,
                                                                    backgroundColor:
                                                                        "rgba(0, 0, 0, 0.5)",
                                                                }}
                                                            >
                                                                {
                                                                    story.user
                                                                        .story_caption[
                                                                        index
                                                                    ]
                                                                }
                                                            </h4>
                                                        </div>
                                                    ) : (
                                                        stories.map(
                                                            (item, idx) => (
                                                                <div
                                                                    className="item"
                                                                    key={idx}
                                                                >
                                                                    <img
                                                                        src={`${
                                                                            import.meta
                                                                                .env
                                                                                .VITE_ASSET_URL
                                                                        }${item}`}
                                                                        alt="image"
                                                                        style={{
                                                                            objectFit:
                                                                                "cover",
                                                                        }}
                                                                    />
                                                                    <h3
                                                                        type="text"
                                                                        className="p-3 text-black  w-100  pe-5 font-xssss fw-500"
                                                                    >
                                                                        {
                                                                            story
                                                                                .user
                                                                                .story_caption[0]
                                                                        }
                                                                    </h3>
                                                                </div>
                                                            )
                                                        )
                                                    );
                                                }
                                            )}
                                        </div>
                                    </div>
                                    <div className="bottom-0 p-3 mt-3 mb-0 form-group position-absolute z-index-1 w-100">
                                        <input
                                            type="text"
                                            className="p-3 text-white bg-transparent style2-input w-100 border-light-md pe-5 font-xssss fw-500"
                                            placeholder="Write Comments"
                                            style={{
                                                height: "50px",
                                                width: "50px",
                                            }}
                                        />
                                        <span
                                            className="text-white font-md position-absolute"
                                            style={{
                                                bottom: "25px",
                                                right: "30px",
                                            }}
                                        >
                                            <i className="feather-arrow-up">
                                                {/* Add your send icon component here */}
                                            </i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
        </>
    );
}
