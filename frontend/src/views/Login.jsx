import { useState, createRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";
import styled from "styled-components";
import ReCAPTCHA from "react-google-recaptcha";

export default function Login() {
  const userNameRef = createRef();
  const passwordRef = createRef();
  const { setUser, setToken } = useStateContext();
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const [verifiedByCaptcha, setVerifiedByCaptcha] = useState(false);

  // State untuk mengontrol apakah password terlihat atau tidak
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (ev) => {
    ev.preventDefault();

    if (verifiedByCaptcha) {
      const payload = {
        username: userNameRef.current.value,
        password: passwordRef.current.value,
      };
      axiosClient
        .post("/login", payload)
        .then(({ data }) => {
          setUser(data.user);
          setToken(data.token);
          
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setMessage(response.data.message);
          } else if (response && response.status === 401) {
            navigate("/verification", {
              state: { username: userNameRef.current.value },
            });
          } else if(response && response.status == 500) {
            setMessage('Your account has been banned by admin');
          }
        });
    } else {
      alert("You're not yet verificated by Captcha");
    }
  };

  const alertClick = () => {
    $(".alert").alert("close");
  };

  const captchaOnChange = () => {
    setVerifiedByCaptcha(true);
  };

  return (
    <>
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
            style={{ backgroundImage: "url(images/login-bg.jpg)" }}
          />
          <div className="col-xl-7 vh-100 align-items-center d-flex bg-white rounded-3 overflow-hidden">
            <div className="card shadow-none border-0 ms-auto me-auto login-card">
              <div className="card-body rounded-0 text-left">
                <h2 className="fw-700 display1-size display2-md-size mb-3">
                  Login into <br />
                  your account
                </h2>
                <form onSubmit={onSubmit}>
                  {message && (
                    <div
                      className="alert alert-warning alert-dismissible fade show"
                      role="alert"
                    >
                      <strong style={{ marginRight: "8rem" }}>
                        Something Wrong !{" "}
                      </strong>{" "}
                      <span
                        aria-hidden="true"
                        onClick={alertClick}
                        className="cursor-pointer"
                      >
                        x
                      </span>{" "}
                      <br />
                      {message}
                      <button
                        type="button"
                        className="close"
                        data-dismiss="alert"
                        aria-label="Close"
                      ></button>
                    </div>
                  )}
                  <div className="form-group icon-input mb-3">
                    <i className="font-sm feather-user text-grey-500 pe-0" />
                    <input
                      type="text"
                      className="style2-input ps-5 form-control text-grey-900 font-xsss fw-600"
                      placeholder="Your Username"
                      ref={userNameRef}
                    />
                  </div>
                  <div
                    className="form-group icon-input mb-3"
                    
                  >
                    <i className="font-sm ti-lock text-grey-500 pe-0" />

                    <input
                      type={showPassword ? "text" : "password"} // Toggle antara "password" dan "text"
                      className="style2-input ps-5 form-control text-grey-900 font-xss ls-3"
                      placeholder="Password"
                      ref={passwordRef}
                    />
                    <a
                      onClick={() => setShowPassword(!showPassword)}
                      className="cursor-pointer"
                    style={{ position: "absolute", right: "4rem", top: "2px" }}
                    >
                      {showPassword ? (
                        <i className="font-sm feather-eye-off " /> // Jika password terlihat, gunakan feather-eye-off
                      ) : (
                        <i className="font-sm feather-eye" /> // Jika password tersembunyi, gunakan feather-eye
                      )}
                    </a>
                  </div>

                  <ReCAPTCHA
                    sitekey="6LdhEzsqAAAAAHRAxnbF_5Axy2ag6NCrmSaZE81f"
                    onChange={captchaOnChange}
                  ></ReCAPTCHA>

                  <div className="form-check text-left mb-3 mt-3">
                    <input
                      type="checkbox"
                      className="form-check-input mt-2"
                      id="exampleCheck5"
                    />
                    <label
                      className="form-check-label font-xsss text-grey-500"
                      htmlFor="exampleCheck5"
                    >
                      Remember me
                    </label>
                    
                  </div>
                  <div className="form-group mb-1">
                    <Button />
                  </div>
                </form>
                <div className="col-sm-12 p-0 text-left">
                  <h6 className="text-grey-500 font-xsss fw-500 mt-0 mb-0 lh-32">
                    Dont have account{" "}
                    <a className="fw-700 ms-1">
                      <Link to="/signup">SignUp</Link>
                    </a>
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const Button = () => {
  return (
    <StyledWrapper>
      <button
        className="button btn form-control text-center fw-600 border-0 p-0"
        type="submit"
      >
        <span className="font-xsss">Login</span>
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
  transition: all 0.3s ease cubic-bezier(0.23, 1, 0.320, 1);
}

.button span {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
}

.button::before {
  position: absolute;
  content: '';
  width: 100%;
  height: 100%;
  translate: 0 105%;
  background-color: #384EF8;
  transition: all 0.3s cubic-bezier(0.23, 1, 0.320, 1);
}

.button svg {
  width: 32px;
  height: 32px;
  fill: #F53844;
  transition: all 0.3s cubic-bezier(0.23, 1, 0.320, 1);
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
