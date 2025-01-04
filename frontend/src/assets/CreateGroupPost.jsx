import { createRef, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";
import { useNavigate, useParams } from "react-router-dom";


export default function CreateGroupPost() {
    const { user } = useStateContext();

    const {uuid, id} = useParams();

    const contentRef = createRef();
    const imageRef = createRef();
    const videoRef = createRef();
    const audioRef = createRef();

    const [errors, setErrors] = useState(null);

    const [images, setImages] = useState([]);
    const [video, setVideo] = useState(null);
    const [audio, setAudio] = useState(null);

    const navigate = useNavigate();

    const onSubmit = (ev) => {
        ev.preventDefault();

        const payload = {
            content: contentRef.current.value,
            // image: Array.isArray(imageRef.current.files)
            // ? imageRef.current.files
            // : [imageRef.current.files[0]],
            image: imageRef.current.files,
            video: videoRef.current.files[0],
            audio: audioRef.current.files[0],
            is_group_post : 1,
            group_id : id,
        };

        console.log(payload);

        axiosClient
            .post("/create-post", payload, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then(() => {
                ev.target.reset();

                setImages(null);
                setVideo(null);
                setAudio(null);
        
                navigate("/");
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                }
            });
    };

    const handleImageChange = (ev) => {
        const selectedImages = Array.from(ev.target.files);
        setImages(selectedImages);
    };
    const handleVideoChange = (ev) => {
        const selectedVideo = ev.target.files[0];
        setVideo(selectedVideo);
    };
    const handleAudioChange = (ev) => {
        const selectedAudio = ev.target.files[0];
        setAudio(selectedAudio);
    };
    

    return (
        
        

        <form
            onSubmit={onSubmit}
            className="card w-100 shadow-xss rounded-xxl border-0 ps-4 pt-4 pe-4 pb-3 mb-3 mt-3"
        >
            
            {errors && (
                <div className="alert">
                    {Object.keys(errors).map((key) => (
                        <p key={key}>{errors[key][0]}</p>
                    ))}
                </div>
            )}

            <div className="card-body p-0">
                <a
                    href="#"
                    className=" font-xssss fw-600 text-grey-500 card-body p-0 d-flex align-items-center"
                >
                    <i className="btn-round-sm font-xs text-primary feather-edit-3 me-2 bg-greylight" />
                    Create Post
                </a>
            </div>
            <div className="card-body p-0 mt-3 position-relative">
                <figure className="avatar position-absolute ms-2 mt-1 top-5">
                    <img
                        src={`${import.meta.env.VITE_ASSET_URL}/${
                            user.profile
                        }`}
                        alt="image"
                        style={{ height: "30px" }}
                        className="shadow-sm rounded-circle w30"
                    />
                </figure>
                <textarea
                    name="message"
                    className="h100 bor-0 w-100 rounded-xxl p-2 ps-5 font-xssss text-grey-500 fw-500 border-light-md theme-dark-bg"
                    cols={30}
                    rows={10}
                    placeholder="What's on your mind?"
                    defaultValue={""}
                    ref={contentRef}
                />
            </div>
            <div className="card-body d-flex p-0 mt-0">
                <a
                    href="#"
                    className="d-flex align-items-center font-xssss fw-600 ls-1 text-grey-700 text-dark pe-4 upload-btn-wrapper"
                >
                    <i className="font-md text-danger feather-video me-2" />
                    <span className="d-none-xs">
                        {" "}
                        Video
                        <input
                            type="file"
                            id="file"
                            accept="video/*"
                            ref={videoRef}

                            onChange={handleVideoChange}
                        />
                    </span>
                </a>
                <a
                    href="#"
                    className="d-flex align-items-center font-xssss fw-600 ls-1 text-grey-700 text-dark pe-4 upload-btn-wrapper"
                >
                    <i className="font-md text-success feather-image me-2" />
                    <span className="d-none-xs">
                        Photo
                        <input
                            type="file"
                            id="file"
                            accept="image/*"
                            multiple
                            ref={imageRef}
                            onChange={handleImageChange}
                        />
                    </span>
                </a>
                {/* <a
                    href="#"
                    className="d-flex align-items-center font-xssss fw-600 ls-1 text-grey-700 text-dark pe-4 upload-btn-wrapper"
                >
                    <i className="font-md text-warning feather-music me-2" />
                    <span className="d-none-xs">
                        Music
                        <input
                            type="file"
                            id="file"
                            accept="audio/*"
                            ref={audioRef}
                            onChange={handleAudioChange}
                        />
                    </span>
                </a> */}
                <a className="ms-auto">
                    <button
                        style={{
                            outline: "none",
                            border: "none",
                            borderRadius: 43,
                        }}
                        type="submit"
                        className="outline-none ms-auto border-none bg-none"
                    >
                        <i className="feather-send text-grey-900 btn-round-md bg-greylight font-xss" />
                    </button>
                </a>
            </div>

            {images && 
            images.map((image, index) => (
                <img
                    key={index}
                    src={URL.createObjectURL(image)}
                    alt=""
                    className="bor-0 rounded-xxl w-100 mx-2 my-2"
                />
            ))}

            {   video &&
                <video controls alt="" className="bor-0 rounded-xxl w-100">
                    <source src={URL.createObjectURL(video)}></source>
                </video>
            }

            {   audio &&
                <audio controls alt="" className="w-100">
                    <source src={URL.createObjectURL(audio)}></source>
                </audio>
            }
        </form>
    );
}
