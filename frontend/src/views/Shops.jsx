import { useEffect, useRef, useState } from "react";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";
import CubeLoader from "../components/CubeLoader";

export default function Shops() {
  const { user: authUser } = useStateContext();
  const [items, setItems] = useState([]);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [mostPurchases, setMostPurchases] = useState([]);
  const hasLoaded = useRef(false);

  // Muat data awal saat komponen pertama kali dimuat
  useEffect(() => {
    if (!hasLoaded.current) {
      loadItems();
      hasLoaded.current = true;
    }
  }, []);

  // Fungsi untuk memuat item dari API
  const loadItems = async (page = 1) => {
    setLoading(true);
    try {
      const response = await axiosClient.get(`/shop-items?page=${page}`);
      const newItems = response.data.data || [];

      // Gabungkan item baru dengan yang lama, hindari duplikasi dengan id
      const uniqueItems = [...items, ...newItems].filter(
        (item, index, self) => index === self.findIndex((i) => i.id === item.id)
      );

      setItems(uniqueItems); // Set hanya dengan item yang unik
      setLoading(false);
      setCurrentPage(page);

      setHasMore(
        response.data.meta.current_page < response.data.meta.last_page
      );
    } catch (err) {
      setLoading(true);
      const response = err.response;
      if (response && response.status === 422) {
        setErrors(response.data.errors);
      }
    }
  };

  // Fungsi untuk menangani pencarian
  const fetchItems = (searchQuery = "") => {
    setLoading(true);
    setItems([]); // Kosongkan item sebelum pencarian baru
    axiosClient
      .get("/search-items", {
        params: { search: searchQuery },
      })
      .then((response) => {
        setItems(response.data.data); // Set hasil pencarian
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching items:", error);
        setLoading(true);
      });
  };

  // Mengatur logika pencarian saat input berubah
  useEffect(() => {
    // setLoading(true);
    if (isInputFocused && search) {
      fetchItems(search);
    } else if (isInputFocused && !search) {
      // Reset data jika pencarian kosong dan input masih fokus
      setItems([]); // Kosongkan item
      setCurrentPage(1); // Reset halaman
      setHasMore(true); // Reset pagination
      loadItems(1); // Mulai ulang dari halaman pertama
    }
  }, [search, isInputFocused]);

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      loadItems(currentPage + 1);
    }
  };

  const fetchMostPurchases = () => {
    axiosClient
      .get("/most-purchases")
      .then((response) => {
        setMostPurchases(response.data.data || []);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    fetchMostPurchases();
  }, []);

  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  return (
    <div className="col-xl-12">
      <div className="row">
        <div className="col-lg-12">
          <div className="banner-wrapper bg-greylight overflow-hidden rounded-3">
            <div className="banner-slider owl-carousel owl-theme dot-style2 owl-nav-link link-style3 overflow-hidden">
              <div className="owl-items style1 d-flex align-items-center bg-lightblue">
                {mostPurchases.length != 0 && (
                  <div className="row">
                    <div
                      className="col-lg-6 p-lg-5 ps-5 pe-5 pt-4"
                      style={{
                        paddingRight: "20px !important",
                      }}
                    >
                      <div className="card w-100 border-0 ps-lg-5 ps-0 bg-transparent bg-transparent-card">
                        <h4 className="font-xssss text-danger ls-3 fw-700 ms-0 mt-4 mb-3">
                          TRENDING
                        </h4>
                        <h2 className="fw-300 display2-size display2-md-size lh-2 text-grey-900">
                          Best Seller <br />
                          {mostPurchases[0].item}
                          <br />
                          <b className="fw-700">Collection</b>
                        </h2>
                        <p className="fw-500 text-grey-500 lh-26 font-xssss pe-lg-5">
                          {mostPurchases[0].description}
                        </p>
                        <a
                          href={`/single-product/${mostPurchases[0].id}`}
                          className="fw-700 text-white rounded-xl bg-primary-gradiant font-xsssss text-uppercase ls-3 lh-30 mt-0 text-center d-inline-block p-2 w150"
                        >
                          Shop Now
                        </a>
                      </div>
                    </div>
                    <div className="col-lg-6 p-lg-5 ps-5 pe-5 pt-4">
                      <img
                        src={`${import.meta.env.VITE_ASSET_URL}${
                          JSON.parse(mostPurchases[0].picture)[0]
                        }`}
                        alt="image"
                        className="img-fluid p-md-5 p-4"
                      />
                    </div>
                  </div>
                )}
              </div>
              <div className="owl-items style1 d-flex align-items-center bg-cyan">
                {mostPurchases.length != 0 && (
                  <div className="row">
                    <div
                      className="col-lg-6 p-lg-5 ps-5 pe-5 pt-4"
                      style={{
                        paddingRight: "20px !important",
                      }}
                    >
                      <div className="card w-100 border-0 ps-lg-5 ps-0 bg-transparent bg-transparent-card">
                        <h4 className="font-xssss text-white ls-3 fw-700 ms-0 mt-4 mb-3">
                          TRENDING
                        </h4>
                        <h2 className="fw-300 display2-size display2-md-size lh-2 text-white">
                          New Arrival <br />
                          {mostPurchases[1].item}
                          <br />
                          <b className="fw-700">Collection</b>
                        </h2>
                        <p className="fw-500 text-grey-100 lh-26 font-xssss pe-lg-5">
                          {mostPurchases[1].description}
                        </p>
                        <a
                          href={`/single-product/${mostPurchases[1].id}`}
                          className="fw-700 text-grey-900 rounded-xl bg-white font-xsssss text-uppercase ls-3 lh-30 mt-0 text-center d-inline-block p-2 w150"
                        >
                          Shop Now
                        </a>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <img
                        src={`${import.meta.env.VITE_ASSET_URL}${
                          JSON.parse(mostPurchases[1].picture)[0]
                        }`}
                        alt="image"
                        className="img-fluid p-md-5 p-4"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-12 mt-3 d-flex">
          <h4 className="float-left font-xssss fw-700 text-grey-500 text-uppercase ls-3 mt-2 pt-1">
            32 Product found
          </h4>
          <div className="search-form-2 ms-auto me-3">
            <i className="ti-search font-xss" />
            <input
              type="text"
              value={search}
              onChange={handleSearch}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              className="form-control text-grey-500 mb-0 bg-greylight theme-dark-bg border-0 float-right sort rounded-xl"
              placeholder="Search here."
            />
          </div>
          {/* <select className="searchCat float-right sort">
            {" "}
            <option value="">Default Sorting</option>
            <option value={151781441596}>Fashion</option>
            <option value={139119624252}>- Men</option>
            <option value={139118313532}>- Women</option>
            <option value={139360141372}>Electronics</option>
            <option value={152401903676}>Home &amp; Garden</option>
            <option value={138866720828}>- Decor</option>
            <option value={138866917436}>- Lighting</option>
          </select> */}
        </div>

        {!loading ? (
          items.map((item) => (
            <div className="col-lg-4 col-md-6" key={item.id}>
              <div className="card w-100 border-0 mt-4">
                <div className="card-image w-100 p-0 text-center bg-greylight rounded-3 mb-2">
                  <a href={`/single-product/${item.id}`}>
                    <img
                      src={`${import.meta.env.VITE_ASSET_URL}${
                        JSON.parse(item.picture)[0]
                      }`}
                      alt="product-image"
                      className="w-100 mt-0 mb-0 p-5"
                      style={{
                        height: "20rem",
                        width: "20rem",
                        objectFit: "contain",
                      }}
                    />
                  </a>
                </div>
                <div className="card-body w-100 p-0 text-center">
                  <div className="star w-100 d-block text-left mt-0 text-center">
                    {item.stars !== 0 ? (
                      <>
                        {Array.from({ length: item.stars }, (_, index) => (
                          <img
                            src="../../public/images/star.png"
                            alt="star"
                            className="w15"
                            key={index}
                          />
                        ))}
                        {Array.from({ length: 5 - item.stars }, (_, index) => (
                          <img
                            src="../../public/images/star-disable.png"
                            alt="star"
                            className="w15"
                            key={index}
                          />
                        ))}
                      </>
                    ) : (
                      <>
                        {Array.from({ length: 5 - item.stars }, (_, index) => (
                          <img
                            src="../../public/images/star-disable.png"
                            alt="star"
                            className="w15"
                            key={index}
                          />
                        ))}
                      </>
                    )}
                  </div>
                  <h2 className="mt-1 mb-1">
                    <a
                      href="single-product.html"
                      className="text-black fw-700 font-xsss lh-26"
                    >
                      {item.item}
                    </a>
                  </h2>
                  <h6 className="font-xsss fw-600 text-grey-500 ls-2">
                    {rupiah(item.price)}
                  </h6>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-lg-12 col-md-12 ">
            <CubeLoader />
          </div>
        )}

        <div className="col-lg-12 mt-3 mb-5 text-center">
          {hasMore && !loading && (
            <button
              onClick={handleLoadMore}
              className="btn fw-700 text-white font-xssss text-uppercase ls-3 lh-32 rounded-3 mt-3 text-center d-inline-block p-2 bg-current w150"
            >
              Load More
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
