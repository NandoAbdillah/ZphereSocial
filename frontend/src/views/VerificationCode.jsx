import { useLocation } from "react-router-dom";
import axiosClient from "../axios-client";
import { useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";

export default function VerificationCode() {
    const location = useLocation();
    const { username } = location.state || {};
    const { setUser, setToken } = useStateContext();
    const navigate = useNavigate();
    const [code, setCode] = useState(new Array(6).fill(""));


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
    

    const resendingVerificationCode = () => {
        axiosClient
            .post("/resend-verification-code", { username : username })
            .then(() => {
                alert("Kode verifikasi telah dikirim ulang ke email Anda.");
            })
            .catch((err) => {
                console.error(err);
                alert("Terjadi kesalahan saat mengirim ulang kode verifikasi.");
            });
    };

    const provideVerificationCode = () => {
        const token = code.join("");
        axiosClient
            .get(`/verify-email/${token}`)
            .then(({data}) => {
                setUser(data.user);
                setToken(data.token);

                navigate('/');
            })
            .catch((err) => {
                console.error(err);
                alert(
                    "Kode OTP yang Anda masukkan salah atau terjadi kesalahan."
                );
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
                                    Verify Your Email
                                </h2>
                            </div>
                        </div>
                    </div>

                    <div className="row ">
                        <div className="col-xl-8 col-lg-8 mx-auto">
                            <div className="page-title mt-3">
                                <h3 className="text-center text-info mx-auto">
                                    Thanks for signing up! <br />
                                    Please enter the 6-digit OTP sent to your
                                    Email
                                </h3>

                                <div
                                    className="mb-5 mt-5"
                                >
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
                                                        onChange={(e) =>
                                                            handleChange(
                                                                e.target,
                                                                idx
                                                            )
                                                        }
                                                        onFocus={(e) =>
                                                            e.target.select()
                                                        }
                                                        className="otp-input form-control mx-1 text-center"
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row ">
                                        <div className="col-lg-6 mb-3 mx-auto">
                                            <div className="form-group">
                                                <button
                                                    type="button"
                                                    className="btn text-secondary mt-3"
                                                    onClick={
                                                        resendingVerificationCode
                                                    }
                                                >
                                                    Resend Verification Email
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row justify-content-end mt-3">
                                        <div className="col-auto mb-3">
                                            <button
                                                className="btn bg-current font-xsss text-white p-2"
                                                onClick={provideVerificationCode}
                                            >
                                                Provide
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
