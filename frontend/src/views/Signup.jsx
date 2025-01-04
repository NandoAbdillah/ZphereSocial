import { useEffect, createRef, useState } from "react";
import Loader from "../components/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";
import axios from "axios";
import React from "react";
import styled from "styled-components";

export default function Signup() {
  const firstNameRef = createRef();
  const lastNameRef = createRef();
  const userNameRef = createRef();
  const emailRef = createRef();
  const passwordRef = createRef();
  const passwordConfirmationRef = createRef();
  const genderRef = createRef();
  const profileRef = createRef();
  const dateOfBirthRef = createRef();
  const thumbnailRef = createRef();
  const NIKRef = createRef();
  const [showPassword, setShowPassword] = useState(false);

  const { setUser, setToken } = useStateContext();
  const [errors, setErrors] = useState(null);
  const [errorsy, setErrorsy] = useState(null);
  const navigate = useNavigate();

  const onSubmit = (ev) => {
    ev.preventDefault();
    
    // Reset errors before validation
    setErrorsy(null);
  
    // Validasi NIK
    if (!validateNik(NIKRef.current.value)) {
      setErrorsy("NIK must be 16 digit numbers");
    }
  
    // Validasi usia
    if (validateAge(dateOfBirthRef.current.value) < 15) {
      setErrorsy("Age must be 15 above to register");
    }
  
    if (errorsy) {
      return; // Stop if there are errors
    }
  
    // Lanjutkan ke pengiriman data jika tidak ada error
    const payload = {
      first_name: firstNameRef.current.value,
      last_name: lastNameRef.current.value,
      username: userNameRef.current.value,
      email: emailRef.current.value,
      nik: NIKRef.current.value,
      dob: dateOfBirthRef.current.value,
      profile: profileRef.current.files[0],
      thumbnail: thumbnailRef.current.files[0],
      gender: genderRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    };
  
    axiosClient
      .post("/signup", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(({ data }) => {
        alert(
          "Registration successful! Please check your email to verify your account."
        );
        navigate("/verification", {
          state: { username: userNameRef.current.value },
        });
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      });
  };
  

  const validateNik = (nik) => {
    const nikRegex = /^[0-9]{16}$/;
    return nikRegex.test(nik);
  };

  // Fungsi validasi usia (minimal 15 tahun)
  // Fungsi validasi usia (minimal 15 tahun)
  const validateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();

    // Periksa apakah bulan/tanggal sudah lewat tahun ini, jika belum kurangi 1 dari usia
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    console.log(age);
    return age;
  };

  useEffect(() => {
    if (location.pathname.includes("/verify-email-success")) {
      alert("Your email has been successfully verified. Please log in.");
    }
  }, [location]);

  const [profileFileName, setProfileFileName] = useState("Belum ada file");
  const [thumbnailFileName, setThumbnailFileName] = useState("Belum ada file");

  const handleProfileChange = (e) => {
    setProfileFileName(e.target.files[0]?.name || "Belum ada file");
  };

  const handleThumbnailChange = (e) => {
    setThumbnailFileName(e.target.files[0]?.name || "Belum ada file");
  };

  return (
    <div>
      <Loader />
      <div className="main-wrap">
        <div className="nav-header bg-transparent shadow-none border-0">
          <div className=" w-100">
            <a href="index.html">
              <i className="feather-zap text-success display1-size me-2 ms-0" />
              <span className="d-inline-block fredoka-font ls-3 fw-600 text-current font-xxl logo-text mb-0">
                Zphere
              </span>
            </a>
          </div>
        </div>
        <div className="row">
          <div
            className="col-xl-5 d-none d-xl-block p-0 vh-100 bg-image-cover bg-no-repeat"
            style={{
              backgroundImage: "url(images/login-bg-2.jpg)",
            }}
          />
          <div className="overflow-scroll col-xl-7 vh-100 align-items-center d-flex bg-white rounded-3">
            <div className="card shadow-none border-0 ms-auto me-auto login-card">
              <div className="card-body rounded-0 text-left">
                <form
                  onSubmit={onSubmit}
                  // encType="multipart/form-data"
                >
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <h2 className="fw-700 display1-size display2-md-size my-4">
                    Create <br />
                    your account
                  </h2>

                  {errors && (
                    <div className="alert">
                      {Object.keys(errors).map((key) => (
                        <p key={key}>{errors[key][0]}</p>
                      ))}
                    </div>
                  )}
                  {errorsy && (
                    <div className="alert">
                      <p>{errorsy}</p>
                    </div>
                  )}

                  <div className="form-group icon-input mb-3">
                    <i className="font-sm ti-user text-grey-500 pe-0" />
                    <input
                      type="text"
                      className="style2-input ps-5 form-control text-grey-900 font-xsss fw-600"
                      placeholder="Your First Name"
                      ref={firstNameRef}
                      required
                    />
                  </div>

                  <div className="form-group icon-input mb-3">
                    <i className="font-sm ti-user text-grey-500 pe-0" />
                    <input
                      type="text"
                      className="style2-input ps-5 form-control text-grey-900 font-xsss fw-600"
                      placeholder="Your Last Name"
                      ref={lastNameRef}
                      required
                    />
                  </div>

                  <div className="form-group icon-input mb-3">
                    <i className="font-sm ti-user text-grey-500 pe-0" />
                    <input
                      type="text"
                      className="style2-input ps-5 form-control text-grey-900 font-xsss fw-600"
                      placeholder="Your Username"
                      ref={userNameRef}
                      required
                    />
                  </div>

                  <div className="form-group icon-input mb-3">
                    <i className="font-sm ti-email text-grey-500 pe-0" />
                    <input
                      type="text"
                      maxLength={16}
                      className="style2-input ps-5 form-control text-grey-900 font-xsss fw-600"
                      placeholder="Your NIK"
                      ref={NIKRef}
                      onInput={(e) =>
                        (e.target.value = e.target.value.replace(/[^0-9]/g, ""))
                      } // Membatasi hanya angka
                      required
                    />
                  </div>

                  <div className="form-group icon-input mb-3">
                    <i className="font-sm ti-email text-grey-500 pe-0" />
                    <input
                      type="email"
                      className="style2-input ps-5 form-control text-grey-900 font-xsss fw-600"
                      placeholder="Your Email Address"
                      ref={emailRef}
                      required
                    />
                  </div>

                  <div className="form-group icon-input mb-3">
                    <input
                      type={showPassword ? "text" : "password"} // Toggle antara "password" dan "text"
                      className="style2-input ps-5 form-control text-grey-900 font-xss ls-3"
                      placeholder="Password"
                      ref={passwordRef}
                      required
                    />
                    <i className="font-sm ti-lock text-grey-500 pe-0" />
                    <a
                      onClick={() => setShowPassword(!showPassword)}
                      className="cursor-pointer"
                      style={{
                        position: "absolute",
                        right: "4rem",
                        top: "2px",
                      }}
                    >
                      {showPassword ? (
                        <i className="font-sm feather-eye-off " /> // Jika password terlihat, gunakan feather-eye-off
                      ) : (
                        <i className="font-sm feather-eye" /> // Jika password tersembunyi, gunakan feather-eye
                      )}
                    </a>
                  </div>

                  <div className="form-group icon-input mb-3">
                    <input
                      type={showPassword ? "text" : "password"} // Toggle antara "password" dan "text"
                      className="style2-input ps-5 form-control text-grey-900 font-xss ls-3"
                      placeholder="Confirm Password"
                      ref={passwordConfirmationRef}
                      required
                    />
                    <i className="font-sm ti-lock text-grey-500 pe-0" />
                    <a
                      onClick={() => setShowPassword(!showPassword)}
                      className="cursor-pointer"
                      style={{
                        position: "absolute",
                        right: "4rem",
                        top: "2px",
                      }}
                    >
                      {showPassword ? (
                        <i className="font-sm feather-eye-off " /> // Jika password terlihat, gunakan feather-eye-off
                      ) : (
                        <i className="font-sm feather-eye" /> // Jika password tersembunyi, gunakan feather-eye
                      )}
                    </a>
                  </div>

                  <div>
                    <div
                      className="form-group mb-3"
                      style={{ position: "relative" }}
                    >
                      <div
                        className="custom-file"
                        style={{
                          position: "relative",
                          display: "block",
                          cursor: "pointer",
                        }}
                      >
                        <input
                          id="profile"
                          className="custom-file-input"
                          type="file"
                          name="profile"
                          onChange={handleProfileChange}
                          style={{
                            opacity: 0,
                            width: "100%",
                            height: "100%",
                            position: "absolute",
                            zIndex: 1,
                            cursor: "pointer",
                          }}
                          ref={profileRef}
                        />
                        <label
                          htmlFor="profile"
                          className="custom-file-label d-flex justify-content-center align-items-center"
                          style={{
                            borderRadius: "10px",
                            border: "2px dashed #6c757d",
                            padding: "15px",
                            textAlign: "center",
                            backgroundColor: "#f8f9fa",
                            color: "#495057",
                            fontWeight: "bold",
                            cursor: "pointer",
                            width: "100%",
                            transition: "all 0.5s ease",
                            transform: "scale(1)",
                          }}
                          onMouseOver={(e) =>
                            (e.currentTarget.style.transform =
                              "scale(1.05) rotate(2deg)")
                          }
                          onMouseOut={(e) =>
                            (e.currentTarget.style.transform =
                              "scale(1) rotate(0)")
                          }
                        >
                          <i
                            className="feather-upload"
                            size={20}
                            style={{ marginRight: "10px" }}
                          />
                          Upload Foto Profil
                        </label>
                      </div>
                      <small className="text-muted mt-2 d-block">
                        File: {profileFileName}
                      </small>
                    </div>

                    {/* Input file untuk Thumbnail */}
                    <div
                      className="form-group mb-3"
                      style={{ position: "relative" }}
                    >
                      <div
                        className="custom-file"
                        style={{
                          position: "relative",
                          display: "block",
                          cursor: "pointer",
                        }}
                      >
                        <input
                          id="thumbnail"
                          className="custom-file-input"
                          type="file"
                          name="thumbnail"
                          onChange={handleThumbnailChange}
                          style={{
                            opacity: 0,
                            width: "100%",
                            height: "100%",
                            position: "absolute",
                            zIndex: 1,
                            cursor: "pointer",
                          }}
                          ref={thumbnailRef}
                        />
                        <label
                          htmlFor="thumbnail"
                          className="custom-file-label d-flex justify-content-center align-items-center"
                          style={{
                            borderRadius: "10px",
                            border: "2px dashed #6c757d",
                            padding: "15px",
                            textAlign: "center",
                            backgroundColor: "#f8f9fa",
                            color: "#495057",
                            fontWeight: "bold",
                            cursor: "pointer",
                            width: "100%",
                            transition: "all 0.5s ease",
                            transform: "scale(1)",
                          }}
                          onMouseOver={(e) =>
                            (e.currentTarget.style.transform =
                              "scale(1.05) rotate(2deg)")
                          }
                          onMouseOut={(e) =>
                            (e.currentTarget.style.transform =
                              "scale(1) rotate(0)")
                          }
                        >
                          <i
                            className="feather-upload"
                            size={20}
                            style={{ marginRight: "10px" }}
                          />
                          Upload Thumbnail
                        </label>
                      </div>
                      <small className="text-muted mt-2 d-block">
                        File: {thumbnailFileName}
                      </small>
                    </div>

                    <label htmlFor="">Gender</label>
                    <br />

                    <div className="form-check form-check-inline mb-2">
                      <select
                        className="form-select"
                        name="gender"
                        id="gender"
                        ref={genderRef}
                      >
                        <option value="male"> Male</option>

                        <option value="female">Female</option>
                      </select>
                    </div>

                    <br />
                    <label htmlFor="">Birthday Date</label>
                    <br />

                    <div className="form-check form-check-inline mb-2">
                      <input
                        type="date"
                        className="style2-input ps-5 form-control text-grey-900 font-xsss fw-600"
                        placeholder="Your First Name"
                        ref={dateOfBirthRef}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-check text-left mb-3">
                    <input
                      type="checkbox"
                      className="form-check-input mt-2"
                      id="exampleCheck2"
                    />
                    <label
                      className="form-check-label font-xsss text-grey-500"
                      htmlFor="exampleCheck2"
                    >
                      Accept Term and Conditions
                    </label>
                    <a href="/forgot-password" className="fw-600 font-xsss text-grey-700 mt-1 float-right">Forgot your Password?</a>
                  </div>

                  <div className="col-sm-12 p-0 text-left">
                    <div className="form-group mb-1">
                      <Button />
                      {/* <ZphereLoader/> */}
                    </div>
                    <h6 className="text-grey-500 font-xsss fw-500 mt-0 mb-0 lh-32">
                      Already have account{" "}
                      <a className="fw-700 ms-1">
                        <Link to="/login">Login</Link>
                      </a>
                    </h6>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const Button = () => {
  return (
    <StyledWrapper>
      <button
        className="button btn form-control text-center fw-600 border-0 p-0"
        type="submit"
      >
        <span className="font-xsss">Register Now</span>
        <span></span>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .button {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    padding: 15px 20px;
    background-color: #212121;
    border: none;
    font: inherit;
    color: #e8e8e8;
    font-size: 20px;
    font-weight: 600;
    border-radius: 50px;
    cursor: pointer;
    overflow: hidden;
    transition: all 0.3s ease cubic-bezier(0.23, 1, 0.32, 1);
  }

  .button span {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
  }

  .button::before {
    position: absolute;
    content: "";
    width: 100%;
    height: 100%;
    translate: 0 105%;
    background-color: #384ef8;
    transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .button svg {
    width: 32px;
    height: 32px;
    fill: #f53844;
    transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .button:hover {
    animation: shake 0.2s linear 1;
  }

  .button:hover::before {
    translate: 0 0;
  }

  .button:hover svg {
    fill: #e8e8e8;
  }

  @keyframes shake {
    0% {
      rotate: 0deg;
    }

    33% {
      rotate: 10deg;
    }

    66% {
      rotate: -10deg;
    }

    100% {
      rotate: 10deg;
    }
  }
`;
