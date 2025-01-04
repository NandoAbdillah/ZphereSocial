import { useState } from "react";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function DeactivateAccount() {
  const [agreeTermCondition, setAgreeTermCondition] = useState(false);
  const { user, token, setUser, setToken, updateUser, notification } =
    useStateContext();

  const handleDeactivate = () => {
    if (agreeTermCondition) {
      alert("deactivaate");
      axiosClient
        .post("/deactivate-account")
        .then((response) => {
          alert("berhasil");
          setUser({});
          setToken(null);
        })
        .catch((error) => {
          alert("error");
        });
    } else {
      alert("agrre first");
    }
  };

  return (
    <div className="col=lg-12">
      <div className="row p-3">
        <div className="card d-block border-0 rounded-3 overflow-hidden p-4 shadow-xss mt-4 alert-danger">
          <h2 className="fw-700 font-sm mb-3 mt-1 ps-1 text-danger mb-4">
            Term & Conditions
          </h2>
          <h4 className="font-xssss fw-500 text-grey-600 mb-3 pl-35 position-relative lh-24">
            <i className="ti-info-alt font-xssss btn-round-xs bg-danger text-white position-absolute left-0 top-5" />
            Deleting an account means deleting all your posts and deleting your
            friends
          </h4>
          <h4 className="font-xssss fw-500 text-grey-600 mb-3 pl-35 position-relative lh-24">
            <i className="ti-info-alt font-xssss btn-round-xs bg-danger text-white position-absolute left-0 top-5" />
            If you have ever been involved in ZphereShop, there are several
            provisions if you want to delete your account, namely
          </h4>
          <h4 className="font-xssss fw-500 text-grey-600 mb-3 pl-35 position-relative lh-24">
            <i className="ti-info-alt font-xssss btn-round-xs bg-danger text-white position-absolute left-0 top-5" />
            No one is allowed to check out the products you sell
          </h4>
          <h4 className="font-xssss fw-500 text-grey-600 mb-3 pl-35 position-relative lh-24">
            <i className="ti-info-alt font-xssss btn-round-xs bg-danger text-white position-absolute left-0 top-5" />
            If there is, you must complete the transaction with the buyer or
            cancel all their orders
          </h4>
          <h4 className="font-xssss fw-500 text-grey-600 mb-3 pl-35 position-relative lh-24">
            <i className="ti-info-alt font-xssss btn-round-xs bg-danger text-white position-absolute left-0 top-5" />
            If you have ever been involved in Zpherepay, there are also several
            provisions if you want to delete your account, namely
          </h4>
          <h4 className="font-xssss fw-500 text-grey-600 mb-3 pl-35 position-relative lh-24">
            <i className="ti-info-alt font-xssss btn-round-xs bg-danger text-white position-absolute left-0 top-5" />
            Your balance must be IDR 0.00 to be able to delete your account,
            your transaction history will be archived on the server
          </h4>
        </div>
      </div>
      <div className="row mt-3 p-5">
        <div className="col-md-4">
          <div className="form-check text-left mb-3">
            <input
              type="checkbox"
              className="form-check-input mt-2"
              id="exampleCheck2"
              onChange={() => setAgreeTermCondition(!agreeTermCondition)}
            />
            <label
              className="form-check-label font-xsss text-grey-500"
              htmlFor="exampleCheck2"
            >
              Accept Term and Conditions
            </label>
            {/* <a href="#" class="fw-600 font-xsss text-grey-700 mt-1 float-right">Forgot your Password?</a> */}
          </div>
        </div>
        <div className="col-md-4">
          <a
            // href="/deactivate"
            onClick={handleDeactivate}
            className="btn w-100 p-3 mt-3 font-xsss text-center text-white bg-danger rounded-3 text-uppercase fw-600 ls-3"
          >
            Deactivate Account
          </a>
        </div>
      </div>
    </div>
  );
}
