import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import TopNavigation from "../layouts/TopNavigation";
import LeftNavigation from "../layouts/LeftNavigation";
import Loader from "./Loader";


export default function DefaultLayout() {
    const { user, token, setUser, setToken, notification } = useStateContext();

    if (!token) {
        return <Navigate to="/login" />;
    }

    if (user.role === 'admin') {
        return <Navigate to="/admin" />;
    }


    return (
        <div id="DefaultLayout">
            <Loader />
            <aside>
                <LeftNavigation />
            </aside>

            <div className="content">
                <header>
                    <TopNavigation />
                </header>

                <main>
                    <div className="main-content right-chat-active">
                        <div className="middle-sidebar-bottom">
                            <div className="middle-sidebar-left">
                                {/* loader wrapper */}
                                <div className="preloader-wrap p-3">
                                    <div className="box shimmer">
                                        <div className="lines">
                                            <div className="line s_shimmer" />
                                            <div className="line s_shimmer" />
                                            <div className="line s_shimmer" />
                                            <div className="line s_shimmer" />
                                        </div>
                                    </div>
                                    <div className="box shimmer mb-3">
                                        <div className="lines">
                                            <div className="line s_shimmer" />
                                            <div className="line s_shimmer" />
                                            <div className="line s_shimmer" />
                                            <div className="line s_shimmer" />
                                        </div>
                                    </div>
                                    <div className="box shimmer">
                                        <div className="lines">
                                            <div className="line s_shimmer" />
                                            <div className="line s_shimmer" />
                                            <div className="line s_shimmer" />
                                            <div className="line s_shimmer" />
                                        </div>
                                    </div>
                                </div>
                                {/* loader wrapper */}

                                

                                <div className="row feed-body" >
                                        
                                        <Outlet />
 
                                </div>

                                <div className="row">
                                    <div className="col-xl-8 col-xxl-9 col-lg-8"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
