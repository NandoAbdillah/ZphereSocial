import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../axios-client";

export default function ForgotPassword() {

    const [currentEmail, setcurrentEmail] = useState('');
    const [otpEmail, setotpEmail] = useState('');
    const [confirmotpEmail, setConfirmotpEmail] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const payload = {
            current_password : currentEmail, 
            new_password : otpEmail, 
            confirm_new_password : confirmotpEmail
        };

        if (otpEmail !== confirmotpEmail) 
        {
            setError("New Password and Confirm Password do not match");
        }

        try {

            const response = await axiosClient.post('/forgot-password' ,payload);

            console.log(response.data.message);
            navigate('/home');
        } catch (err) {
            setError(err.response.data.message);
        }
    }

    return (
        <div className="middle-wrap">
            <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
                <div className="card-body p-4 w-100 bg-current border-0 d-flex rounded-3">
                    <a
                        href="/settings"
                        className="d-inline-block mt-2"
                    >
                        <i className="ti-arrow-left font-sm text-white" />
                    </a>
                    <h4 className="font-xs text-white fw-600 ms-4 mb-0 mt-2">
                        Change Password
                    </h4>
                </div>
                <div className="card-body p-lg-5 p-4 w-100 border-0">
                    {error && 
                    <h3 style={{ color: 'red' }}>
                        {error}
                    </h3>
                    }
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-lg-12 mb-3">
                                <div className="form-gorup">
                                    <label className="mont-font fw-600 font-xssss">
                                        Current Password
                                    </label>
                                    <input
                                        type="email"
                                        value={currentEmail}
                                        className="form-control"
                                        placeholder="Your Email"
                                        onChange={(e)=> setcurrentEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-12 mb-3">
                                <div className="form-gorup">
                                    <label className="mont-font fw-600 font-xssss">
                                        Code Sent To Your Email
                                    </label>
                                    <input
                                        type="number"
                                        value={otpEmail}
                                        className="form-control"
                                        onChange={(e)=> setotpEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12 mb-3">
                                <div className="form-gorup">
                                    <label className="mont-font fw-600 font-xssss">
                                        Confirm Change Password
                                    </label>
                                    <input
                                        type="password"
                                        value={confirmotpEmail}
                                        className="form-control"
                                        onChange={(e)=> setConfirmotpEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12 mb-0">
                                <button
                                    
                                    className="btn bg-current text-center text-white font-xsss fw-600 p-3 w175 rounded-3 d-inline-block"
                                    type="submit"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            {/* <div class="card w-100 border-0 p-2"></div> */}
        </div>
    );
}
