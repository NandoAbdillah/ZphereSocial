import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { useParams } from "react-router-dom";

export default function Friends() {
    const [friends, setFriends] = useState([]);
    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(true);
    const { uuid } = useParams();

    useEffect(() => {
        axiosClient
            .get("/friends", { params: { uuid: uuid } })
            .then((response) => {
                setFriends(response.data.data || []);
                setLoading(false);
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                }
            });
    }, []);

    return (
        <div className="row">
            <div className="col-xl-12">
                <div className="card shadow-xss w-100 d-block d-flex border-0 p-4 mb-3">
                    <div className="card-body d-flex align-items-center p-0">
                        <h2 className="fw-700 mb-0 mt-0 font-md text-grey-900">
                            Friends
                        </h2>
                        <div className="search-form-2 ms-auto">
                            <i className="ti-search font-xss" />
                            <input
                                type="text"
                                className="form-control text-grey-500 mb-0 bg-greylight theme-dark-bg border-0"
                                placeholder="Search here."
                            />
                        </div>
                        <a
                            href="#"
                            className="btn-round-md ms-2 bg-greylight theme-dark-bg rounded-3"
                        >
                            <i className="feather-filter font-xss text-grey-500" />
                        </a>
                    </div>
                </div>
                <div className="row ps-2 pe-1">
                    {friends &&
                        friends.map((friend) => (
                            <div
                                className="col-md-4 col-sm-6 pe-2 ps-2"
                                key={friend.id}
                            >
                                <div className="card d-block border-0 shadow-xss rounded-3 overflow-hidden mb-3">
                                    <div className="card-body d-block w-100 p-4 text-center">
                                        <figure className="avatar ms-auto me-auto mb-0 position-relative w90 z-index-1">
                                            <img
                                                src={`${
                                                    import.meta.env
                                                        .VITE_ASSET_URL
                                                }${friend.profile}`}
                                                alt="image"
                                                className="float-right p-1 bg-white rounded-circle w-100"
                                                style={{ 
                                                    objectFit : 'cover',
                                                    height : '5.5rem'
                                                 }}
                                            />
                                        </figure>
                                        <div className="clearfix" />
                                        <h4 className="fw-700 font-xss mt-3 mb-0">
                                            {friend.first_name}{" "}
                                            {friend.last_name}
                                        </h4>
                                        <p className="fw-500 font-xssss text-grey-500 mt-0 mb-3">
                                            {friend.email}
                                        </p>
                                        <ul className="d-flex align-items-center justify-content-center mt-1">
                                            <li className="m-2">
                                                <h4 className="fw-700 font-sm">
                                                    {friend.posts_count}
                                                    <span className="font-xsssss fw-500 mt-1 text-grey-500 d-block">
                                                        Posts
                                                    </span>
                                                </h4>
                                            </li>
                                            <li className="m-2">
                                                <h4 className="fw-700 font-sm">
                                                    {friend.friends_count}
                                                    <span className="font-xsssss fw-500 mt-1 text-grey-500 d-block">
                                                        Friends
                                                    </span>
                                                </h4>
                                            </li>
                                            <li className="m-2">
                                                <h4 className="fw-700 font-sm">
                                                    {friend.likes_count}
                                                    <span className="font-xsssss fw-500 mt-1 text-grey-500 d-block">
                                                        Likes
                                                    </span>
                                                </h4>
                                            </li>
                                        </ul>
                                        
                                        <a
                                            href={`/user/${friend.uuid}`}
                                            className="mt-4 p-0 btn p-2 lh-24 w100 ms-1 ls-3 d-inline-block rounded-xl bg-current font-xsssss fw-700 ls-lg text-white"
                                        >
                                           PROFILE
                                           <i className="feather-arrow-up-right"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}
