import { useEffect, useState, useRef, createRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";
import { notification } from "antd";

export default function AccountInformationEdit() {
    // const { uuid } = useParams();
    const { user } = useStateContext();
    const [userPost, setUserPost] = useState({});
    const [isLoading, setIsLoading] = useState(true); // Tambahkan state untuk loading
    const [error, setErrors] = useState(null);
    const { setUser, setToken } = useStateContext();
    const navigate = useNavigate();
  

    const firstNameRef = createRef();
    const lastNameRef = createRef();
    const userNameRef = createRef();
    const emailRef = createRef();
    const locationRef = createRef();
    const addressRef = createRef();
    const genderRef = createRef();
    const relationshipRef = createRef();
    const profileRef = createRef();
    const thumbnialRef = createRef();

    useEffect(() => {
        axiosClient
            .get("/user-profile", { params: { uuid: user.uuid } })
            .then((response) => {
                setUserPost(response.data.data || {});

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

            
    }, [user]);



    const onSubmit = (ev) => {
        ev.preventDefault();

        const payload = {
            id : user.id,
            first_name: firstNameRef.current.value,
            last_name: lastNameRef.current.value,
            username: userNameRef.current.value,
            email: emailRef.current.value,
            location : locationRef.current.value,
            address : addressRef.current.value,
            gender: genderRef.current.value,
            relationship : relationshipRef.current.value,
           
        };

        if (profileRef.current.files && profileRef.current.files[0]) {
            payload.profile = profileRef.current.files[0];
        }
    
        if (thumbnialRef.current.files && thumbnialRef.current.files[0]) {
            payload.thumbnial = thumbnialRef.current.files[0];
        }
    

        axiosClient
            .post("/update-user", payload, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then(({ data }) => {
                const result = data.data;
                // console.log(result);
                setUser(result);
                navigate("/account-information");
                openNotification("success", "Account Information", "Successfully changed your information");
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                }
            });
    };

    const openNotification = (type, message, description) => {
        notification[type]({
            message: message,
            description : description,
        });
    };

    return (
        <div>
            {Object.keys(userPost).length !== 0 && (
                <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                    <div className="card-body p-4 w-100 bg-current border-0 d-flex rounded-3">
                        <a
                            href="/settings"
                            className="d-inline-block mt-2"
                        >
                            <i className="ti-arrow-left font-sm text-white" />
                        </a>
                        <h4 className="font-xs text-white fw-600 ms-4 mb-0 mt-2">
                            Account Details
                        </h4>
                    </div>
                    <div className="card-body p-lg-5 p-4 w-100 border-0 " 
                    >
                        <div className="row justify-content-center">
                            <div className="col-lg-12 text-center">
                                <div
                                    className="card-body position-relative h240 bg-image-cover bg-image-center rounded-xl"
                                    style={{
                                        backgroundImage: `url(${
                                            userPost.thumbnial
                                                ? (`${
                                                      import.meta.env
                                                          .VITE_ASSET_URL
                                                  }${userPost.thumbnial}`)
                                                : "images/bb-9.jpg"
                                        })`,
                                    }}
                                />

                                <div className="card-body d-block pt-4 text-center">
                                    <figure className="avatar mt--6 position-relative w100 z-index-1 w100 z-index-1 ms-auto me-auto">
                                        <img
                                            src={
                                                userPost.profile != null &&
                                                `${
                                                    import.meta.env
                                                        .VITE_ASSET_URL
                                                }${userPost.profile}`
                                            }
                                            alt="image"
                                            className="p-1 bg-white rounded-xl w-100"
                                        />
                                    </figure>
                                    <h4 className="font-xs ls-1 fw-700 text-grey-900">
                                        {userPost.first_name}{" "}
                                        {userPost.last_name}
                                        <span className="d-block font-xssss fw-500 mt-1 lh-3 text-grey-500">
                                            @{userPost.username}
                                        </span>
                                    </h4>
                                </div>

                                {/* <a href="#" class="p-3 alert-primary text-primary font-xsss fw-500 mt-2 rounded-3">Upload New Photo</a> */}
                            </div>
                        </div>
                        <form action="#" onSubmit={onSubmit}>
                            <div className="row">
                                <div className="col-lg-6 mb-3">
                                    <div className="form-group">
                                        <label className="mont-font fw-600 font-xsss">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            ref={firstNameRef}
                                            defaultValue={userPost.first_name}
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-6 mb-3">
                                    <div className="form-group">
                                        <label className="mont-font fw-600 font-xsss">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            ref={lastNameRef}
                                            defaultValue={userPost.last_name}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-6 mb-3">
                                    <div className="form-group">
                                        <label className="mont-font fw-600 font-xsss">
                                            Username
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            ref={userNameRef}
                                            defaultValue={userPost.username}
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-6 mb-3">
                                    <div className="form-group">
                                        <label className="mont-font fw-600 font-xsss">
                                            Email
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            ref={emailRef}
                                            defaultValue={userPost.email}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12 mb-3">
                                    <div className="form-group">
                                        <label className="mont-font fw-600 font-xsss">
                                            Country
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            ref={locationRef}
                                            defaultValue={userPost.location}
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-12 mb-3">
                                    <div className="form-group">
                                        <label className="mont-font fw-600 font-xsss">
                                            Address
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            ref={addressRef}
                                            defaultValue={userPost.address}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-6 mb-3">
                                    <div className="form-group">
                                        <label className="mont-font fw-600 font-xsss">
                                            Gender
                                        </label>
                                        {/* <input type="text" className="form-control" />
                                         */}

                                        <select
                                            name="gender"
                                            id="gender"
                                            className="form-select"
                                            ref={genderRef}
                                        >
                                            <option
                                                value="male"
                                                selected={
                                                    userPost.gender === "male"
                                                }
                                            >
                                                Male
                                            </option>

                                            <option
                                                value="female"
                                                selected={
                                                    userPost.gender === "female"
                                                }
                                            >
                                                Female
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-lg-6 mb-3">
                                    <div className="form-group">
                                        <label className="mont-font fw-600 font-xsss">
                                            Relationship
                                        </label>

                                        <select
                                            name="relationship"
                                            id="relationship"
                                            className="form-select"
                                            ref={relationshipRef}
                                        >
                                            <option
                                                value="single"
                                                selected={
                                                    userPost.relationship ===
                                                    "single"
                                                }
                                            >
                                                Single
                                            </option>

                                            <option
                                                value="dating"
                                                selected={
                                                    userPost.relationship ===
                                                    "dating"
                                                }
                                            >
                                                Dating
                                            </option>

                                            <option
                                                value="married"
                                                selected={
                                                    userPost.relationship ===
                                                    "married"
                                                }
                                            >
                                                Married
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-lg-6 mb-3">
                                    <div className="card mt-3 border-0">
                                        <div className="card-body d-flex justify-content-between align-items-end p-0">
                                            <div className="form-group mb-0 w-100">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Profile
                                                </label>
                                                <input
                                                    type="file"
                                                    name="profile"
                                                    id="profile"
                                                    className="profile"
                                                    ref={profileRef}
                                                    style={{opacity: '0', position: 'absolute',width:'100%',height: '100%', zIndex:'5'}}
                                                />
                                                <label
                                                    htmlFor="file"
                                                    className="rounded-3 text-center bg-white btn-tertiary js-labelFile p-4 w-100 border-dashed"
                                                >
                                                    <i className="ti-cloud-down font-xl me-3 d-block" />
                                                    <span className="js-fileName">
                                                        Drag and drop or click
                                                        to replace
                                                    </span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 mb-3">
                                    <div className="card mt-3 border-0">
                                        <div className="card-body d-flex justify-content-between align-items-end p-0">
                                            <div className="form-group mb-0 w-100">
                                                <label className="mont-font fw-600 font-xsss">
                                                    Thumbnail
                                                </label>
                                                <input
                                                    type="file"
                                                    name="thumbnail"
                                                    id="thumbnail"
                                                    className="thumbnail"
                                                    ref={thumbnialRef}
                                                    style={{opacity: '0', position: 'absolute',width:'100%',height: '100%', zIndex:'5'}}
                                                />
                                                <label
                                                    htmlFor="file"
                                                    className="rounded-3 text-center bg-white btn-tertiary js-labelFile p-4 w-100 border-dashed"
                                                >
                                                    <i className="ti-cloud-down font-xl me-3 d-block" />
                                                    <span className="js-fileName">
                                                        Drag and drop or click
                                                        to replace
                                                    </span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12 mb-3">
                                    <label className="mont-font fw-600 font-xsss">
                                        Description
                                    </label>
                                    <textarea
                                        className="form-control mb-0 p-3 h100 bg-greylight lh-16"
                                        rows={5}
                                        placeholder="Write your message..."
                                        spellCheck="false"
                                        defaultValue={
                                            userPost.description ??
                                            "No Description"
                                        }
                                    />
                                </div>
                                <div className="col-lg-12 ">
                                    <button
                                        
                                        type="submit"
                                        className="btn bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-3 d-inline-block me-2"
                                    >
                                        Save
                                    </button>
                                    <a
                                        href="/settings"
                                        className="btn bg-danger text-center text-white font-xsss fw-600 p-3 w175 rounded-3 d-inline-block"
                                    >
                                        Cancel
                                    </a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
