import axiosClient from "../axios-client";
import { createRef, useEffect, useState } from "react";
import { notification } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import NotFound from "../views/NotFound";
import CubeLoader from "../components/CubeLoader";

export default function EditUserProduct() {
  const { id } = useParams();
  const itemRef = createRef();
  const stockRef = createRef();
  const priceRef = createRef();
  const descriptionRef = createRef();
  const categoryRef = createRef();
  const pictureRef = createRef();

  const [item, setItem] = useState({});
  const [picture, setPicture] = useState([]);
  const [errors, setErrors] = useState(false);
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(null);

  const navigate = useNavigate();

  const openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: message,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      id: item.id,
      item: itemRef.current.value,
      category: categoryRef.current.value,
      description: descriptionRef.current.value,
      price: priceRef.current.value,
      stock: stockRef.current.value,
    };

    console.log(payload);

    if (pictureRef.current.files) {
      payload.picture = pictureRef.current.files;
    }

    axiosClient
      .post("/update-product", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        e.target.reset();

        openNotificationWithIcon("success", response.data.message);
        navigate("/user-product");
      })
      .catch((err) => {
        const response = err.response;
        if (response) {
          if (response.status === 403 || response.status === 422) {
            setErrors(response.data.message);
            openNotificationWithIcon("warning", response.data.message);
          } else {
            openNotificationWithIcon("error", "An unexpected error occurred");
          }
        }
      });
  };

  const handlePictureChanged = (ev) => {
    const picture = Array.from(ev.target.files);
    setPicture(picture);
  };

  useEffect(() => {
    axiosClient
      .get("/edit-product", { params: { id: id } })
      .then((response) => {
        setItem(response.data.data[0] || {});
        setAllowed(response.data.permission);
        setLoading(!loading);
        setErrors(false);
      })
      .catch((err) => {
        const response = err.response;
        setErrors(true);
      });
  }, [id]);

  return (
    <>
      {!loading && allowed === "allowed" ? (
        <div className="middle-sidebar-bottom ">
          <div className="middle-sidebar-left">
            <div className="col-xl-10 mb-4 mx-auto card shadow-xss">
              <div className="row">
                <div className="col-lg-12 mb-3">
                  <div className="card p-lg-5 p-4 bg-primary-gradiant rounded-3 shadow-xss bg-pattern border-0 overflow-hidden ">
                    <div className="bg-pattern-div"></div>
                    <h2 className="display2-size display2-md-size fw-700 text-white mb-0 mt-0">
                      Edit Product
                    </h2>
                  </div>
                </div>
              </div>

              <div className="row ">
                <div className="col-xl-8 col-lg-8 mx-auto">
                  <div className="page-title mt-3">
                    <p className="text-center text-info mx-auto ">
                      Provide the required information in order to edit a
                      product
                    </p>
                    <form
                      onSubmit={handleSubmit}
                      encType="multipart/form-data"
                      className="mb-5"
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

                        <div className="col-lg-6 mb-3">
                          <div className="form-group">
                            <label className="mont-font fw-600 font-xssss">
                              Product Name
                            </label>
                            <input
                              type="text"
                              placeholder="enter product name"
                              ref={itemRef}
                              className="form-control"
                              defaultValue={item.item}
                            />
                          </div>
                        </div>

                        <div className="col-lg-6 mb-3">
                          <div className="form-group">
                            <label className="mont-font fw-600 font-xssss">
                              Stock
                            </label>
                            <input
                              type="number"
                              placeholder="enter stock quantity"
                              ref={stockRef}
                              className="form-control"
                              defaultValue={item.stock}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row mx-auto">
                        <div className="col-lg-6 mb-3">
                          <div className="form-group">
                            <label className="mont-font fw-600 font-xsss">
                              Category
                            </label>
                            {/* <input type="text" className="form-control" />
                             */}

                            <select
                              name="category"
                              id="category"
                              className="form-select"
                              ref={categoryRef}
                              defaultValue={item.category}
                            >
                              <option value="electronics">Electronics</option>
                              <option value="fashion">Fashion</option>
                              <option value="home_appliances">
                                Home Appliances
                              </option>
                              <option value="books">Books</option>
                              <option value="beauty_products">
                                Beauty Products
                              </option>
                              <option value="sports">Sports</option>
                              <option value="toys">Toys</option>
                              <option value="groceries">Groceries</option>
                              <option value="automotive">Automotive</option>
                              <option value="health_care">Health Care</option>
                            </select>
                          </div>
                        </div>

                        <div className="col-lg-6 mb-3">
                          <div className="">
                            <label className="mont-font fw-600 font-xssss">
                              Location <br />
                              *This location is based on your Account
                              Information on{" "}
                              <a href="/account-information">settings</a>
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="row mx-auto">
                        <div className="col-lg-12 mb-3">
                          <label className="mont-font fw-600 font-xssss">
                            Product Pictures
                          </label>
                          <div className="custom-file">
                            <input
                              type="file"
                              id="product_pictures"
                              onChange={handlePictureChanged}
                              ref={pictureRef}
                              accept="image/*"
                              multiple
                              className="custom-file-input"
                            />
                            <label htmlFor="icon" className="custom-file-label">
                              Product
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="row mx-auto">
                        <div className="col-12">
                          {picture &&
                            picture.map((image, index) => (
                              <img
                                key={index}
                                src={URL.createObjectURL(image)}
                                alt=""
                                className="bor-0 rounded-xxl w-100 mx-2 my-2"
                              />
                            ))}
                        </div>
                      </div>

                      <div className="row mx-auto">
                        <div className="col-lg-6 mb-3">
                          <div className="form-group">
                            <label className="mont-font fw-600 font-xssss">
                              Price <br />
                              *on IDR
                            </label>
                            <input
                              type="number"
                              placeholder="enter product name"
                              ref={priceRef}
                              className="form-control"
                              defaultValue={item.price}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 mb-3">
                          <div className="form-group">
                            <label
                              htmlFor="description"
                              className="mont-font fw-600 font-xssss"
                            >
                              Product Description <br />
                              *Describe your product
                            </label>
                            <textarea
                              name="description"
                              id="description"
                              className="form-control overflow-hidden"
                              rows="3"
                              placeholder="enter a product description"
                              ref={descriptionRef}
                              defaultValue={item.description}
                            ></textarea>
                          </div>
                        </div>
                      </div>

                      <div className="row mx-auto">
                        <div className="col-lg-12 mb-3">
                          <button
                            className="btn bg-current text-white"
                            type="submit"
                          >
                            Create Product
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : allowed === "denied" ? (
        <div className="alert alert-danger" role="alert">
          <h1 className="alert-heading">
            <strong>Edit Denied!</strong>
          </h1>
          <p>
            You have an active order transaction, this means you cannot edit the
            product information before you complete it.
          </p>
          <hr />
          <p className="mb-0">
            <strong>Tips : </strong>To be able to edit it you must complete all
            transactions or close product availability.
          </p>
        </div>
      ) : loading ? (
        <CubeLoader />
      ) : (
        <></>
      )}
    </>
  );
}
