import { useEffect, useState } from "react";
import axiosClient from "../axios-client";

export default function Libraries() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axiosClient
      .get("/libraries-books")
      .then((response) => {
        setBooks(response.data.data);
      })
      .catch((error) => {});
  }, []);

  return (
    <div className="col-xl-10">
      <div
        className="card w-100 border-0 p-0 rounded-3 overflow-hidden bg-image-contain bg-image-center"
        style={{ backgroundImage: "url(images/help-bg.png)" }}
      >
        <div
          className="card-body p-md-5 p-4 text-center"
          style={{ backgroundColor: "rgba(0,85,255,0.8)" }}
        >
          <h2 className="fw-700 display2-size text-white display2-md-size lh-2">
            Welcome to the Zphere Libraries!
          </h2>
          <p className="font-xsss ps-lg-5 pe-lg-5 lh-28 text-grey-200">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla
            dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus
            mollis pharetra. Proin blandit ac massa sed rhoncus{" "}
          </p>
          <div className="form-group w-lg-75 mt-4 border-light border p-1 bg-white rounded-3 ms-auto me-auto">
            <div className="row">
              <div className="col-md-8">
                <div className="form-group icon-input mb-0">
                  <i className="ti-search font-xs text-grey-400" />
                  <input
                    type="text"
                    className="style1-input border-0 ps-5 font-xsss mb-0 text-grey-500 fw-500 bg-transparent"
                    placeholder="Search anythings.."
                  />
                </div>
              </div>
              <div className="col-md-4">
                <a
                  href="#"
                  className="w-100 d-block btn bg-current text-white font-xssss fw-600 ls-3 style1-input p-0 border-0 text-uppercase "
                >
                  Search
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-xl-12">
          <div className="row ps-2 pe-2">
            {books.map((book) => (
              <div
                className="col-lg-4 col-md-4 col-sm-4 mb-3 pe-2 ps-2"
                key={book.id}
              >
                <div className="card w-100 p-0 hover-card shadow-xss border-0 rounded-3 overflow-hidden me-1">
                  <span className="font-xsssss fw-700 ps-3 pe-3 lh-32 text-uppercase rounded-3 ls-2 bg-primary-gradiant d-inline-block text-white position-absolute mt-3 ms-3 z-index-1">
                    {book.genre}
                  </span>
                  <div className="card-image w-100 mb-3">
                    <a
                      href={`/read-book/${book.id}`}
                      className="position-relative d-block"
                    >
                      <img
                        src={`${import.meta.env.VITE_ASSET_URL}${
                          book.thumbnail
                        }`}
                        alt="image"
                        className="w-100"
                        style={{ height: "15rem", objectFit: "cover" }}
                      />
                    </a>
                  </div>
                  <div className="card-body pt-0">
                    <i className="feather-bookmark font-md text-grey-500 position-absolute right-0 me-3" />
                    <h4 className="fw-700 font-xss mt-0 lh-28 mb-0">
                      <a
                        href="default-hotel-details.html"
                        className="text-dark text-grey-900"
                      >
                        {/* Montana Hotel */}
                        {book.title}
                      </a>
                    </h4>
                    <h6 className="font-xsssss text-grey-500 fw-600 mt-0 mb-2">
                      {book.user_detail.first_name} {book.user_detail.last_name}
                    </h6>

                    <div className="clearfix" />
                    <h5 className="mt-3 d-inline-block font-xssss fw-600 text-grey-500 me-2">
                      <i className="btn-round-sm bg-greylight feather-eye text-grey-500 me-1" />{" "}
                      {book.views}
                    </h5>
                    <h5 className="mt-3 d-inline-block font-xssss fw-600 text-grey-500 me-2">
                      <i className="btn-round-sm bg-greylight feather-thumbs-up text-grey-500 me-1" />{" "}
                      {book.likes}
                    </h5>
                    <h5 className="mt-3 d-inline-block font-xssss fw-600 text-grey-500">
                      <i className="btn-round-sm bg-greylight feather-star text-grey-500 me-1" />{" "}
                      {book.rating ?? 0}
                    </h5>
                    <div className="clearfix" />
                    <ul className="d-flex align-items-start justify-content-start mt-1">
                      
                      <li className="m-1">
                        <img src="images/onfire.svg" alt="icon" />
                        <span className="font-xss ms-3">
                            On Trending
                        </span>
                      </li>
                      
                    </ul>
                    <a
                      href={`/read-book/${book.id}`}
                      className="position-absolute bottom-15 mb-2 right-15"
                    >
                      <i className="btn-round-sm bg-primary-gradiant text-white font-sm feather-chevron-right" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
