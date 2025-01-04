import { useLocation } from "react-router-dom";
import axiosClient from "../axios-client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ZpherePayPin() {
  const location = useLocation();
  const { telp } = location.state || {};

  const [status, setStatus] = useState(false);

  const navigate = useNavigate();
  const [code, setCode] = useState(new Array(6).fill(""));

  const [pin, setPin] = useState(null);
  const [verificationPin, setVerificationPin] = useState(null);

  const handleChange = (element, index) => {
    const value = element.value.replace(/[^0-9]/g, ""); // Hanya menerima angka
    const updatedCode = [...code];

    // Perbarui nilai di index saat ini
    updatedCode[index] = value;

    setCode(updatedCode);

    // Pindah ke kotak berikutnya jika input tidak kosong
    if (value && element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleSubmitPin = (e) => {
    const token = code.join("");
    if (!status) {
      setPin(token);
      setCode(new Array(6).fill(""));
      setStatus(true);
    } else {
      if (token === pin) {
        verifiedPin(token); // Kirim token langsung ke verifiedPin
      } else {
        setCode(new Array(6).fill(""));
        setStatus(false);
      }
    }
  };

  const verifiedPin = (token) => {
    // Terima token sebagai parameter
    console.log("Verification Pin:", token);

    axiosClient
      .post(`/verify-pin`, { pin: token })
      .then(({ data }) => {
        navigate("/zpherepay");
      })
      .catch((err) => {
        console.error(err);
        alert("Pin yang anda masukkan salah");
      });
  };

  return (
    <div className="middle-sidebar-bottom mt-5">
      <div className="middle-sidebar-left">
        <div className="col-xl-10 mb-4 mx-auto card shadow-xss">
          <div className="row">
            <div className="col-lg-12 mb-3">
              <div className="card p-lg-5 p-4 bg-primary-gradiant rounded-3 shadow-xss bg-pattern border-0 overflow-hidden ">
                <div className="bg-pattern-div"></div>
                <h2 className="display2-size display2-md-size fw-700 text-white mb-0 mt-0">
                  Make ZpherePay Pin
                </h2>
              </div>
            </div>
          </div>

          <div className="row ">
            <div className="col-xl-8 col-lg-8 mx-auto">
              <div className="page-title mt-3">
                <h3 className="text-center text-info mx-auto">
                  {!status ? (
                    <>
                      Please enter the 6-digit PIN ! <br />
                      Zpherepay pin is very private! Do not share the pin with
                      others and do not forget to remember it
                    </>
                  ) : (
                    <>
                      Please enter the 6-digit Confirmation PIN ! <br />
                      Zpherepay pin is very private!
                    </>
                  )}
                </h3>

                <div className="mb-5 mt-5">
                  <div className="row mx-auto">
                    <div className="col-12">
                      {/* {errors.length > 0 &&
                                                    errors.map((error, index) => (
                                                        <div
                                                            className="alert alert-danger"
                                                            role="alert"
                                                            key={index}
                                                        >
                                                            {error}
                                                        </div>
                                                    ))} */}
                    </div>

                    <div className="col-lg-12 mb-3">
                      <div className="otp-input-container d-flex justify-content-center">
                        {code.map((digit, idx) => (
                          <input
                            key={idx}
                            type="text"
                            maxLength="1"
                            value={digit}
                            onChange={(e) => handleChange(e.target, idx)}
                            onFocus={(e) => e.target.select()}
                            className="otp-input form-control mx-1 text-center"
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="row justify-content-end mt-3">
                    <div className="col-auto mb-3">
                      <button
                        className="btn bg-current font-xsss text-white p-2"
                        onClick={handleSubmitPin}
                      >
                        {!status ? "provide" : "set"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
