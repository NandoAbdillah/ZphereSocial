import { useEffect, useRef, useState } from "react";
import axiosClient from "../axios-client";
import { notification } from "antd";

export default function UserProduct() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);
  const hasLoaded = useRef(false);
  const [total, setTotal] = useState(null);

  useEffect(() => {
    if (!hasLoaded.current) {
      loadItems();
      hasLoaded.current = true;
    }
  }, []);
  const showNotification = (type, messageText, description) => {
    notification[type]({
      message: messageText,
      description: description,
    });
  };

  const loadItems = async (page = 1) => {
    setLoading(true);
    try {
      const response = await axiosClient.get(`/product-item?page=${page}`);
      const newProducts = response.data.data;

      setProducts(newProducts);
      setLoading(false);
      setCurrentPage(page);
      setTotal(response.data.meta.total[0]);
      setHasMore(
        response.data.meta.current_page < response.data.meta.last_page
      );
    } catch (err) {
      setLoading(false);
      const response = err.response;
      if (response && response.status === 422) {
        setErrors(response.data.errors);
      }
    }
  };

  const unavailibling = (id) => {
    axiosClient
      .post("/unavailibling-item", { id: id })
      .then((response) => {
        showNotification(
          "success",
          "Shop Items",
          "successfully changed availibilty"
        );

        $(`#ModalAvailable${id}`).modal("hide");
        setProducts(
          products.map(
            (product) =>
              product.id === id
                ? { ...product, available: "0" } // spread existing product properties and change `available`
                : product // return the product unchanged if the id doesn't match
          )
        );
      })
      .catch((error) => {});
  };
  const availibling = (id) => {
    axiosClient
      .post("/availibling-item", { id: id })
      .then((response) => {
        showNotification(
          "success",
          "Shop Items",
          "successfully changed availibilty"
        );
        $(`#ModalUnavailable${id}`).modal("hide");
        setProducts(
          products.map(
            (product) =>
              product.id === id
                ? { ...product, available: "1" } // spread existing product properties and change `available`
                : product // return the product unchanged if the id doesn't match
          )
        );
      })
      .catch((error) => {});
  };
  const deleting = (id) => {
    axiosClient
      .post("/deleting-item", { id: id })
      .then((response) => {
        showNotification(
          "success",
          "Shop Items",
          "successfully deleted product"
        );
        $(`#ModalDeleted${id}`).modal("hide");
        // Hapus produk yang di-delete dari array products
        setProducts(
          products.filter((product) => product.id !== id) // Hanya menyisakan produk yang id-nya tidak sama dengan yang dihapus
        );
      })
      .catch((error) => {
        showNotification(
          "warning",
          "Shop Items",
          "You still have transaction with this product"
        );
      });
  };

  return (
    <div className="col-xl-12 col-xxl-12 col-lg-12">
      <div className="row">
        <div className="col-lg-12">
          <div className="card p-md-5 p-4 bg-primary-gradiant rounded-3 shadow-xss bg-pattern border-0 overflow-hidden">
            <div className="bg-pattern-div" />
            <h2 className="display2-size display2-md-size fw-700 text-white mb-0 mt-0">
              Your Product
              <span className="fw-700 ls-3 text-grey-200 font-xsssss mt-2 d-block">
                {total} PRODUCT FOUND
              </span>
            </h2>
          </div>
        </div>

        {products &&
          products.map((product) => (
            <>
              <div className="col-lg-4 col-md-6" key={product.id}>
                <div
                  className="card w-100 border-0 mt-4 position-relative"
                  style={{ overflow: "hidden" }}
                >
                  <div className="card-image w-100 p-0 text-center bg-greylight rounded-3 mb-2">
                    <a href="#">
                      <img
                        src={`${import.meta.env.VITE_ASSET_URL}${
                          JSON.parse(product.picture)[0]
                        }`}
                        alt="product-image"
                        className="mt-0 mb-0 p-5"
                        style={{
                          height: "20rem",
                          width: "20rem",
                          objectFit: "contain",
                        }}
                      />
                    </a>
                  </div>
                  <div className="card-body w-100 p-0 text-center">
                    <h2 className="mt-2 mb-1">
                      <a
                        href="single-product.html"
                        className="text-black fw-700 font-xsss lh-26"
                      >
                        {product.item}
                      </a>
                    </h2>
                    {/* Animasi Angka */}
                  </div>
                  {/* Button Edit & Delete */}
                  <div className="hover-buttons position-absolute top-2 right-5 d-none">
                    <a
                      href={`edit-user-product/${product.id}`}
                      className="btn btn-sm bg-current text-white mr-2"
                    >
                      <i className="feather-edit" />
                    </a>
                    {product.available == "1" ? (
                      <a
                        className="btn btn-sm bg-warning text-white mr-2"
                        data-bs-toggle="modal"
                        data-bs-target={`#ModalAvailable${product.id}`}
                      >
                        <i className="feather-slash" />
                      </a>
                    ) : (
                      <a
                        className="btn btn-sm bg-success text-white mr-2"
                        data-bs-toggle="modal"
                        data-bs-target={`#ModalUnavailable${product.id}`}
                      >
                        <i className="feather-play" />
                      </a>
                    )}
                    <a
                      className="btn btn-sm bg-danger text-white"
                      data-bs-toggle="modal"
                        data-bs-target={`#ModalDeleted${product.id}`}
                    >
                      <i className="feather-trash" />
                    </a>
                  </div>
                </div>
              </div>

              <div
                className="modal bottom fade"
                style={{ overflowY: "scroll" }}
                id={`${product.available == "1" ? `ModalAvailable${product.id}` : `ModalUnavailable${product.id}`}`}
                tabIndex={-1}
                role="dialog"
              >
                <div
                  className="modal-dialog modal-dialog-centered"
                  role="document"
                >
                  <div className="modal-content border-0">
                    <button
                      type="button"
                      className="close"
                      // data-dismiss="modal"
                      onClick={() => {
                        $(`#ModalAvailable${product.id}`).modal("hide");
                      }}
                    >
                      <i className="ti-close text-grey-500" />
                    </button>

                    <div className="modal-body p-3 d-flex align-items-center bg-none">
                      <div className="card shadow-none rounded-0 w-100 p-2 pt-3 border-0">
                        <div className="card-body rounded-0 text-left p-3">
                          {product.available == "1" ? (
                            <>
                              <h4 className="fw-700 display1-size display2-md-size mb-4">
                                {"Do you want to stop providing"} <br />
                                {"this product ?"}
                              </h4>
                            </>
                          ) : (
                            <>
                              <h4 className="fw-700 display1-size display2-md-size mb-4">
                                {"Do you want to available "} <br />
                                {"this product again ?"}
                              </h4>
                            </>
                          )}

                          <div className="form-group icon-input mb-3"></div>

                          <div className="form-group icon-input my-3 d-flex justify-content-end ">
                            <button
                              className="btn   bg-current fw-500 text-white font-xsss p-3  w100 text-center lh-20 rounded-xxl mx-1"
                              data-dismiss="modal"
                              onClick={() => {
                                product.available == "1"
                                  ? $(`#ModalAvailable${product.id}`).modal(
                                      "hide"
                                    )
                                  : $(`#ModalUnavailable${product.id}`).modal(
                                      "hide"
                                    );
                              }}
                            >
                              Cancel
                            </button>
                            <button
                              className="btn   bg-dark fw-500 text-white font-xsss p-3  w100 text-center lh-20 rounded-xxl mx-1"
                              onClick={
                                product.available == "1"
                                  ? () => unavailibling(product.id)
                                  : () => availibling(product.id)
                              }
                            >
                              Yes
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="modal bottom fade"
                style={{ overflowY: "scroll" }}
                id={`ModalDeleted${product.id}`}
                tabIndex={-1}
                role="dialog"
              >
                <div
                  className="modal-dialog modal-dialog-centered"
                  role="document"
                >
                  <div className="modal-content border-0">
                    <button
                      type="button"
                      className="close"
                      // data-dismiss="modal"
                      onClick={() => {
                        $(`#ModalDeleted${product.id}`).modal("hide");
                      }}
                    >
                      <i className="ti-close text-grey-500" />
                    </button>

                    <div className="modal-body p-3 d-flex align-items-center bg-none">
                      <div className="card shadow-none rounded-0 w-100 p-2 pt-3 border-0">
                        <div className="card-body rounded-0 text-left p-3">
                          <h4 className="fw-700 display1-size display2-md-size mb-4">
                            {"Do you want to delete"} <br />
                            {"this product ?"}
                          </h4>

                          <div className="form-group icon-input mb-3"></div>

                          <div className="form-group icon-input my-3 d-flex justify-content-end ">
                            <button
                              className="btn   bg-current fw-500 text-white font-xsss p-3  w100 text-center lh-20 rounded-xxl mx-1"
                              data-dismiss="modal"
                              onClick={() => {
                                $(`#ModalDeleted${product.id}`).modal("hide");
                              }}
                            >
                              Cancel
                            </button>
                            <button
                              className="btn   bg-dark fw-500 text-white font-xsss p-3  w100 text-center lh-20 rounded-xxl mx-1"
                              onClick={() => deleting(product.id)}
                            >
                              Yes
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ))}

        {/* <div className="col-lg-12 mt-3 mb-5 text-center">
          <a
            href="#"
            className="fw-700 text-white font-xssss text-uppercase ls-3 lh-32 rounded-3 mt-3 text-center d-inline-block p-2 bg-current w150"
          >
            Load More
          </a>
        </div> */}
      </div>
    </div>
  );
}
