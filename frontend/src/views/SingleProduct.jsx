import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { useNavigate, useParams } from "react-router-dom";
import { notification } from "antd";
import NotFound from "./NotFound";
import { useStateContext } from "../contexts/ContextProvider";


export default function SingleProduct() {
    const { user } = useStateContext();
    const { id } = useParams();
    const [singleProduct, setSingleProduct] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [errors, setErrors] = useState(null);
    const [stars, setStars] = useState(0);
    const [counter, setCounter] = useState(1);
    const [cart, setCart] = useState(null);
    const navigate = useNavigate();

    const rupiah = (number) => {
        return new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
        }).format(number);
      };

    useEffect(() => {
        axiosClient
            .get("/single-product", { params: { id: id } })
            .then((response) => {
                setSingleProduct(response.data.data[0] || {});
                setStars(response.data.data[0]?.stars || 0);
                getShopStsatus(response.data.data[0]?.id || 0);
                setIsLoading(false);

                // console.log(stars)
            })
            .catch((err) => {
                if (err.response && err.response.status === 422) {
                    setErrors(err.response.data.errors);
                } else {
                    setErrors("Failed to fetch data");
                }
            });
    }, [stars]);

    useEffect(() => {
        // Initialize owl-carousel after pictures are loaded
        if (singleProduct.picture) {
            // Ensure jQuery is available before initializing Owl Carousel
            if (window.$) {
                $(".product-slider-3").owlCarousel({
                    items: 1,
                    loop: true,
                    nav: true,
                    dots: true,
                });
            }
        }
    }, [singleProduct.picture]);

    const decrement = () => {
        if (counter != 1) {
            setCounter(counter - 1);
        }
    };

    const increment = () => {
        if (singleProduct.stock > counter) {
            setCounter(counter + 1);
        }
    };

    const addToCart = (idItem) => {
        axiosClient
            .post("/add-to-cart", { idItem: idItem, items: counter })
            .then((response) => {
                openNotificationWithIcon("success", response.data.message);
            })
            .catch((err) => {
                const response = err.response;
                if (response) {
                    if (response.status === 403 || response.status === 422) {
                        setErrors(response.data.message);
                        openNotificationWithIcon(
                            "warning",
                            response.data.message
                        );
                    } else {
                        openNotificationWithIcon(
                            "error",
                            "An unexpected error occurred"
                        );
                    }
                }
            });

        getShopStsatus(singleProduct.id);
    };

    const removeFromCart = (idItem) => {
        axiosClient
            .post("/remove-from-cart", { idItem: idItem })
            .then((response) => {
                openNotificationWithIcon("success", "Successfully remove item for your cart");
            })
            .catch((err) => {
                const response = err.response;
                if (response) {
                    if (response.status === 403 || response.status === 422) {
                        setErrors(response.data.message);
                        // openNotificationWithIcon(
                        //     "succe",
                        //     "error"
                        // );
                    } else {
                        openNotificationWithIcon(
                            "error",
                            "An unexpected error occurred"
                        );
                    }
                }
            });

        getShopStsatus(singleProduct.id);
    };

    const openNotificationWithIcon = (type, message) => {
        notification[type]({
            message: message,
        });
    };

    const getShopStsatus = (id) => {
        axiosClient
            .get("/shopping-cart-status", { params: { idItem: id } })
            .then((response) => {
                
                setCart(response.data.status === true);

            })
            .catch((err) => {});
    };

    return (
        <>
            {Object.keys(singleProduct).length !== 0 && (
                <div className="col-xl-12 mt-3">
                    <div className="row">
                        <div className="col-lg-5 offset-lg-1 mb-4">
                            <div className="product-slider-3 owl-carousel owl-theme dot-none owl-nav-link edge-link">
                                {JSON.parse(singleProduct.picture).map(
                                    (picture, index) => (
                                        <div
                                            key={index}
                                            className="owl-items pt-lg--10 pb-lg--10 bg-white rounded-3"
                                        >
                                            <img
                                                src={`${
                                                    import.meta.env
                                                        .VITE_ASSET_URL
                                                }${picture}`}
                                                alt="icon"
                                            />
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                        <div className="col-lg-6  col-md-12 pad-top-lg-200 pad-bottom-lg-100 pad-top-100 pad-bottom-75 ps-md--5">
                            <h4 className="text-danger font-xssss fw-700 ls-2">
                                {singleProduct.user_detail.first_name}{" "}
                                {singleProduct.user_detail.last_name}
                            </h4>
                            <h2 className="fw-700 text-grey-900 display1-size lh-3 porduct-title display2-md-size">
                                {" "}
                                {singleProduct.item}
                            </h2>
                            <div className="star d-block w-100 text-left">
                                {stars !== 0 ? (
                                    <>
                                        {Array.from(
                                            { length: stars },
                                            (_, index) => (
                                                <img
                                                    src="../../public/images/star.png"
                                                    alt="star"
                                                    className="w15 float-left"
                                                    key={index}
                                                />
                                            )
                                        )}
                                        {Array.from(
                                            { length: 5 - stars },
                                            (_, index) => (
                                                <img
                                                    src="../../public/images/star-disable.png"
                                                    alt="star"
                                                    className="w15 float-left"
                                                    key={index}
                                                />
                                            )
                                        )}
                                    </>
                                ) : (
                                    <>
                                        {Array.from(
                                            { length: 5 - stars },
                                            (_, index) => (
                                                <img
                                                    src="../../public/images/star-disable.png"
                                                    alt="star"
                                                    className="w15 float-left"
                                                    key={index}
                                                />
                                            )
                                        )}
                                    </>
                                )}
                            </div>
                            <br />
                            <p className="review-link font-xssss fw-500 text-grey-500 lh-3">
                                {singleProduct.reviews} customer review
                            </p>
                            <div className="clearfix" />
                            <p className="font-xsss fw-400 text-grey-500 lh-30 pe-5 mt-3 me-5">
                                {singleProduct.description}
                            </p>
                            <h6 className="display2-size fw-700 text-current ls-2 mb-2">
                                <span className="font-xl"></span>
                                {rupiah(singleProduct.price)}
                                <span
                                    className="font-xs text-grey-500"
                                    style={{
                                        textDecoration: "line-through",
                                    }}
                                ></span>
                            </h6>

                            <div className="clearfix" />
                            <form action="#" className="form--action mt-4 mb-3">
                                <div className="product-action flex-row align-items-center">
                                    <div className="quantity me-3">
                                        <input
                                            type="number"
                                            className="quantity-input"
                                            name="qty"
                                            id="qty"
                                            // defaultValue={1}
                                            value={counter}
                                            min={1}
                                        />
                                        <div
                                            className="dec qtybutton"
                                            onClick={decrement}
                                        >
                                            -
                                        </div>
                                        <div
                                            className="inc qtybutton"
                                            onClick={increment}
                                        >
                                            +
                                        </div>
                                    </div>
                                    {cart == true  ? (
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                removeFromCart(
                                                    singleProduct.id
                                                );
                                            }}
                                            className="btn add-to-cart bg-dark text-white fw-700 ps-lg-5 pe-lg-5 text-uppercase font-xssss float-left border-dark border rounded-3 border-size-md d-inline-block mt-0 p-3 text-center ls-3"
                                        >
                                            Remove from cart
                                        </button>
                                    ) : (
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault()
                                                singleProduct.user_detail.id != user.id ?
                                                addToCart(singleProduct.id) : navigate(`/edit-user-product/${singleProduct.id}`)

                                            }
                                        }
                                            className="btn add-to-cart bg-dark text-white fw-700 ps-lg-5 pe-lg-5 text-uppercase font-xssss float-left border-dark border rounded-3 border-size-md d-inline-block mt-0 p-3 text-center ls-3"
                                        >
                                            {singleProduct.user_detail.id != user.id ? (
                                                'Add to cart'
                                            ): (
                                                'Edit'
                                            )}
                                        </button>
                                    )}
                                    {/* <a
                                        href="#"
                                        className="btn-round-xl alert-dark text-white d-inline-block mt-0 ms-4 float-left"
                                    >
                                        <i className="ti-heart font-sm" />
                                    </a> */}
                                </div>
                            </form>
                            <div className="clearfix" />
                            <ul className="product-feature-list mt-5">
                                <li className="w-50 lh-32 font-xsss text-grey-500 fw-500 float-left">
                                    <b className="text-grey-900">Category : </b>
                                    {singleProduct.category}
                                </li>

                                <li className="w-50 lh-32 font-xsss text-grey-500 fw-500 float-left">
                                    <b className="text-grey-900">Location : </b>
                                    {singleProduct.user_detail.location}
                                </li>

                                <li className="w-50 lh-32 font-xsss text-grey-500 fw-500 float-left">
                                    <b className="text-grey-900">Stock : </b>
                                    {singleProduct.stock}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            ) }
        </>
    );
}
