import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function Settings() {
    const { user, token, setUser, setToken,updateUser, notification } = useStateContext();

    
    const onLogout = (ev) => {
        ev.preventDefault();

        axiosClient.post("/logout").then(() => {
            setUser({});
            setToken(null);
        });
    };
    return (
        <div className="card w-100 border-0 bg-white shadow-xs p-0 mb-4">
            <div className="card-body p-lg-5 p-4 w-100 border-0">
                <div className="row">
                    <div className="col-lg-12">
                        <h4 className="mb-4 font-xxl fw-700 mont-font mb-lg-5 mb-4 font-md-xs">
                            Settings
                        </h4>
                        <div className="nav-caption fw-600 font-xssss text-grey-500 mb-2">
                            General
                        </div>
                        <ul className="list-inline mb-4">
                            <li className="list-inline-item d-block border-bottom me-0">
                                <a
                                    href="/account-information"
                                    className="pt-2 pb-2 d-flex align-items-center"
                                >
                                    <i className="btn-round-md bg-primary-gradiant text-white feather-home font-md me-3" />{" "}
                                    <h4 className="fw-600 font-xsss mb-0 mt-0">
                                        Acount Information
                                    </h4>
                                    <i className="ti-angle-right font-xsss text-grey-500 ms-auto mt-3" />
                                </a>
                            </li>
                            <li className="list-inline-item d-block border-bottom me-0">
                                <a
                                    href="/bookmarks"
                                    className="pt-2 pb-2 d-flex align-items-center"
                                >
                                    <i className="btn-round-md bg-gold-gradiant text-white feather-bookmark font-md me-3" />{" "}
                                    <h4 className="fw-600 font-xsss mb-0 mt-0">
                                        Saved Posts
                                    </h4>
                                    <i className="ti-angle-right font-xsss text-grey-500 ms-auto mt-3" />
                                </a>
                            </li>
                            {/* <li className="list-inline-item d-block me-0">
                                <a
                                    href="social.html"
                                    className="pt-2 pb-2 d-flex align-items-center"
                                >
                                    <i className="btn-round-md bg-red-gradiant text-white feather-twitter font-md me-3" />{" "}
                                    <h4 className="fw-600 font-xsss mb-0 mt-0">
                                        Social Acount
                                    </h4>
                                    <i className="ti-angle-right font-xsss text-grey-500 ms-auto mt-3" />
                                </a>
                            </li> */}
                        </ul>
                        <div className="nav-caption fw-600 font-xsss text-grey-500 mb-2">
                            Acount
                        </div>
                        <ul className="list-inline mb-4">
                            <li className="list-inline-item d-block border-bottom me-0">
                                <a
                                    href="payment.html"
                                    className="pt-2 pb-2 d-flex align-items-center"
                                >
                                    <i className="btn-round-md bg-mini-gradiant text-white feather-credit-card font-md me-3" />{" "}
                                    <h4 className="fw-600 font-xsss mb-0 mt-0">
                                        My Cards
                                    </h4>
                                    <i className="ti-angle-right font-xsss text-grey-500 ms-auto mt-3" />
                                </a>
                            </li>
                          
                            <li className="list-inline-item d-block  me-0">
                                <a
                                    href="/change-password"
                                    className="pt-2 pb-2 d-flex align-items-center"
                                >
                                    <i className="btn-round-md bg-blue-gradiant text-white feather-inbox font-md me-3" />{" "}
                                    <h4 className="fw-600 font-xsss mb-0 mt-0">
                                        Password
                                    </h4>
                                    <i className="ti-angle-right font-xsss text-grey-500 ms-auto mt-3" />
                                </a>
                            </li>
                        </ul>
                        <div className="nav-caption fw-600 font-xsss text-grey-500 mb-2">
                            Other
                        </div>
                        <ul className="list-inline">
                            {/* <li className="list-inline-item d-block border-bottom me-0">
                                <a
                                    href="default-notification.html"
                                    className="pt-2 pb-2 d-flex align-items-center"
                                >
                                    <i className="btn-round-md bg-gold-gradiant text-white feather-bell font-md me-3" />{" "}
                                    <h4 className="fw-600 font-xsss mb-0 mt-0">
                                        Notification
                                    </h4>
                                    <i className="ti-angle-right font-xsss text-grey-500 ms-auto mt-3" />
                                </a>
                            </li> */}
                            <li className="list-inline-item d-block border-bottom me-0">
                                <a
                                    href="help-box.html"
                                    className="pt-2 pb-2 d-flex align-items-center"
                                >
                                    <i className="btn-round-md bg-primary-gradiant text-white feather-help-circle font-md me-3" />{" "}
                                    <h4 className="fw-600 font-xsss mb-0 mt-0">
                                        Help
                                    </h4>
                                    <i className="ti-angle-right font-xsss text-grey-500 ms-auto mt-3" />
                                </a>
                            </li>
                            <li className="list-inline-item d-block border-bottom me-0">
                                <a
                                    href="/deactivate-account"
                                    className="pt-2 pb-2 d-flex align-items-center"
                                >
                                    <i className="btn-round-md bg-mini-gradiant text-white feather-user-x font-md me-3" />{" "}
                                    <h4 className="fw-600 font-xsss mb-0 mt-0">
                                        Deactivate Account
                                    </h4>
                                    <i className="ti-angle-right font-xsss text-grey-500 ms-auto mt-3" />
                                </a>
                            </li>
                            <li className="list-inline-item d-block me-0 cursor-pointer">
                                <a
                                    onClick={onLogout}
                                    className="pt-2 pb-2 d-flex align-items-center"
                                >
                                    <i className="btn-round-md bg-red-gradiant text-white feather-lock font-md me-3" />{" "}
                                    <h4 className="fw-600 font-xsss mb-0 mt-0">
                                        Logout
                                    </h4>
                                    <i className="ti-angle-right font-xsss text-grey-500 ms-auto mt-3" />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
