import { useStateContext } from "../contexts/ContextProvider";

export default function LeftNavigation() {
    const { user, token, setUser, setToken,updateUser, notification } = useStateContext();

    return (
        <nav className="navigation scroll-bar">
            <div className="container ps-0 pe-0">
                <div className="nav-content">
                    <div className="nav-wrap bg-white bg-transparent-card rounded-xxl shadow-xss pt-3 pb-1 mb-2 mt-2">
                        <div className="nav-caption fw-600 font-xssss text-grey-500">
                            <span>New </span>Feeds
                        </div>
                        <ul className="mb-1 top-content">
                            <li className="logo d-none d-xl-block d-lg-block" />
                            <li>
                                <a
                                    href="/home"
                                    className="nav-content-bttn open-font"
                                >
                                    <i className="feather-tv btn-round-md bg-blue-gradiant me-3" />
                                    <span>Newsfeed</span>
                                </a>
                            </li>

                            
                            <li>
                                <a
                                    href="/groups"
                                    className="nav-content-bttn open-font"
                                >
                                    <i className="feather-zap btn-round-md bg-mini-gradiant me-3" />
                                    <span>Popular Groups</span>
                                </a>
                            </li>


                            <li>
                                <a
                                    href={`/user/${user.uuid}`}
                                    className="nav-content-bttn open-font"
                                >
                                    <i className="feather-user btn-round-md bg-red-gradiant me-3" />
                                    <span>User Profile </span>
                                </a>
                            </li>

                            <li>
                                <a
                                    href="/zphereshop"
                                    className="nav-content-bttn open-font cursor-pointer"
                                >
                                    <i className="feather-shopping-cart btn-round-md bg-youtube me-3" />
                                    <span >ZphereShop</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    
                    <div className="nav-wrap bg-white bg-transparent-card rounded-xxl shadow-xss pt-3 pb-1">
                        <div className="nav-caption fw-600 font-xssss text-grey-500">
                            <span /> Account
                        </div>
                        <ul className="mb-1">
                            <li className="logo d-none d-xl-block d-lg-block" />
                            <li>
                                <a
                                    href="/settings"
                                    className="nav-content-bttn open-font h-auto pt-2 pb-2"
                                >
                                    <i className="font-sm feather-settings me-3 text-grey-500" />
                                    <span>Settings</span>
                                </a>
                            </li>
                            
                            <li>
                                <a
                                    href="/zpherepay"
                                    className="nav-content-bttn open-font h-auto pt-2 pb-2"
                                >
                                    <i className="font-sm ti-wallet me-3 text-grey-500" />
                                    <span>ZpherePay</span>
                                    {/* <span className="circle-count bg-warning mt-0">
                                        23
                                    </span> */}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}
