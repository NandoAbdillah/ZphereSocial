import { createRef } from "react";
import axiosClient from "../axios-client";
import { useLocation, useNavigate } from "react-router-dom";

export default function ZpherePayRegister() {


  
  const telpRef = createRef();
  const passwordRef = createRef();

  const navigate = useNavigate();

  
  const onRegister = (e) => {
    e.preventDefault();
    const payload = {
      telp: telpRef.current.value,
      password: passwordRef.current.value,
    };

    axiosClient
      .post("/zpherepay-register", payload)
      .then((response) => {
          navigate('/zpherepay-setpin', {state : {telp : payload.telp}})
      })
      .catch((err) => {});
  };

  return (
    <div>
      <div className="row">
        {/* <div
          className="col-xl-5 d-none d-xl-block p-0 vh-100 bg-image-cover bg-no-repeat"
          style={{ backgroundImage: "url(images/login-bg-2.jpg)" }}
        /> */}
        <div className="col-xl-10 vh-100 align-items-center d-flex bg-white rounded-3 overflow-hidden">
          <div className="card shadow-none border-0 ms-auto me-auto login-card">
            <form className="card-body rounded-0 text-left" onSubmit={onRegister}>
              <h2 className="fw-700 display1-size display2-md-size mb-4">
                Create ZpherePay <br />
                Account
              </h2>
              <div >
                <div className="form-group icon-input mb-3">
                  <i className="font-sm feather-phone text-grey-500 pe-0" />
                  <input
                    type="number"
                    className="style2-input ps-5 form-control text-grey-900 font-xsss fw-600"
                    placeholder="Your Telephone Number"
                    ref={telpRef}
                  />
                </div>
                <div className="form-group icon-input mb-3">
                  <input
                    type="Password"
                    className="style2-input ps-5 form-control text-grey-900 font-xss ls-3"
                    placeholder="Password"
                    ref={passwordRef}
                  />
                  <i className="font-sm ti-lock text-grey-500 pe-0" />
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
                  {/* <a href="#" class="fw-600 font-xsss text-grey-700 mt-1 float-right">Forgot your Password?</a> */}
                </div>
              </div>
              <div className="col-sm-12 p-0 text-left">
                <div className="form-group mb-1">
                  <button
                    type="submit"
                    className="btn form-control text-center style2-input text-white fw-600 bg-dark border-0 p-0 "
                  >
                    Register
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
