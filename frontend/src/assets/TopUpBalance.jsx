import { createRef, useState } from "react";
import axiosClient from "../axios-client";
import { useEffect } from "react";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";

export default function TopUpBalance() {
  const [verifyFirst, setVerifyFirst] = useState(false);
  const [code, setCode] = useState(new Array(6).fill(""));
  const [account, setAccount] = useState(false);
  const saldoRange = [
    20000.0, 50000.0, 75000.0, 100000.0, 200000.0, 500000.0, 1000000.0,
    2000000.0, 
  ];
  const [balance, setBalance] = useState(saldoRange[0]);
  const [agen, setAgen] = useState('indomaret');
  const [statusVerify, setStatusVerify] = useState(false);
  const [agenToken, setAgenToken] = useState(null);

  const [uuid, setUuid] = useState(null);
  const userCodeRef = createRef();

  const handleChange = (element, index) => {
    const value = element.value.replace(/[^0-9]/g, ""); // Hanya menerima angka
    const updatedCode = [...code];

    // Perbarui nilai di index saat ini
    updatedCode[index] = value;

    setCode(updatedCode);

    // Pindah ke kotak berikutnya jika input tidak kosong
    if (value && element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleSubmitPin = (e) => {
    e.preventDefault();
    // console.log(code);
    const token = code.join("");
    axiosClient
      .post("/zpherepay-check-pin", { pin: token })
      .then((response) => {
        setVerifyFirst(!verifyFirst);
      })
      .catch((err) => {
        alert("pin tidak sesuai");
      });
  };

  useEffect(() => {
    axiosClient
      .get("/zpherepay-account")
      .then((response) => {
        const accountStatus = response.data.data[0];
        setAccount(accountStatus);
      })
      .catch((error) => {
        // Redirect ke halaman zpherepay-register jika status false
      });
  }, []);

  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };


  const navigate = useNavigate();
  const showNotification = (type, message, description) => {
    notification[type]({
      message : message,
      description : description,
    })
  }

  const sendVerifyCode = (e) => {
    const payload = {
      id: account.id,
      balance: balance,
      agen: agen,
    };

    // alert(JSON.stringify(payload, 2, 0));
    axiosClient
      .post("send-topup-verification", payload)
      .then((response) => {
        const uuidResponse = response.data.uuid;
        setUuid(uuidResponse);
        setStatusVerify(!statusVerify);
        showNotification("info", "Verification Code" , "Succesfully sending verification code to your WhatsApp, then input the code to get agen code");
      })
      .catch((error) => {
        alert("gagal");
      });
  };

  const sendAgenToken = () => {
    const payload = {
      id: account.id,
      uuid: uuid,
      code: userCodeRef.current.value,
    };
    // alert(JSON.stringify(payload, 2, 0));
    axiosClient
      .post("/send-agen-token-verification", payload)
      .then((response) => {
        setAgenToken(response.data.agen_token);
        showNotification("success", "Agen Code" , "Succesfully get agen code, go to the agen then give money according to the nominal and agen code");
        // navigate('/zpherepay');

      })
      .catch((error) => {
        alert("gagal");
      });
  };

  return (
    <div className="middle-sidebar-bottom mt-5">
      <div className="middle-sidebar-left">
        <div className="col-xl-10 mb-4 mx-auto card shadow-xss">
          <div className="row">
            <div className="col-lg-12 mb-3">
              <div className="card p-lg-5 p-4 bg-primary-gradiant rounded-3 shadow-xss bg-pattern border-0 overflow-hidden ">
                <div className="bg-pattern-div"></div>
                <h2 className="display2-size display2-md-size fw-700 text-white mb-0 mt-0">
                  Balance Top Up
                </h2>
              </div>
            </div>
          </div>

          {!verifyFirst ? (
            <div className="row ">
              <div className="col-xl-8 col-lg-8 mx-auto">
                <div className="page-title mt-3">
                  <h3 className="text-center text-info mx-auto">
                    Enter your ZpherePay Pin to provide its you
                  </h3>

                  <div className="mb-5 mt-5">
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

                      <div className="col-lg-12 mb-3">
                        <div className="otp-input-container d-flex justify-content-center">
                          {code.map((digit, idx) => (
                            <input
                              key={idx}
                              type="text"
                              maxLength="1"
                              value={digit}
                              onChange={(e) => handleChange(e.target, idx)}
                              onFocus={(e) => e.target.select()}
                              className="otp-input form-control mx-1 text-center"
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="row justify-content-end mt-3">
                      <div className="col-auto mb-3">
                        <button
                          className="btn bg-current font-xsss text-white p-3 mont-font font-xs"
                          onClick={handleSubmitPin}
                        >
                          Provide Pin
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="mb-5">
              <div className="row px-5 py-3">
                <div className="row mt-3">
                  <div className="col-12 alert alert-info" role="alert">
                    <h1 className="alert-heading">
                      <strong>Instructions !</strong>
                    </h1>
                    {/* <p>
                      When you 
                    </p> */}
                    <ol>
                      <li>1. Set the balance and agent</li>
                      <li>
                        2. Make sure that the number you link is an active
                        number
                      </li>
                      <li>
                        3. Click the topup button, we will send you a code to
                        verify you via WA message
                      </li>
                      <li>
                        4. Then type the verification code you have received to
                        get the agent code
                      </li>
                      <li>5. Come to the agent and provide the topup code</li>
                      <li>
                        6. You will be asked to pay according to the balance you
                        entered, of course without admin fees
                      </li>
                      <li>
                        7. Our system will verify the transaction and your
                        balance will be filled
                      </li>
                    </ol>

                    <hr />
                    <h3 className="alert-heading">
                      {" "}
                      <strong>Tips </strong>
                    </h3>
                    <p className="mb-0">
                      User verification code is only valid for 5 minutes, agent
                      code is valid for 24 hours after the verification process
                      is complete.
                    </p>
                  </div>
                </div>
              </div>
              <div className="row p-3 ">
                <div className="col-xl-5 offset-xl-1 col-lg-6">
                  <div className="order-details">
                    {/* <h4 className="mont-font fw-600 font-md mb-5">
                    Order Details
                  </h4> */}
                    <div className="table-content table-responsive mb-5 card border-0 bg-greyblue p-lg-5 p-4 mt-3">
                      <h1 className="text-grey-500 fw-500 font-xss text-center mb-3">
                        Topup Payment Receipt
                      </h1>
                      <table className="table order-table order-table-2 mb-0">
                        <thead>
                          <tr>
                            <th className="border-0">Type</th>
                            <th className="text-right border-0">Cash</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th className="text-grey-500 fw-500 font-xsss">
                              Top Up
                              <strong></strong>
                            </th>
                            <td className="text-right text-grey-500 fw-500 font-xsss">
                              {rupiah(balance)}
                            </td>
                          </tr>
                        </tbody>
                        <tfoot>
                          <tr className="cart-subtotal">
                            <th>Number</th>
                            <td className="text-right text-grey-700 font-xsss fw-700">
                              {account.telp}
                            </td>
                          </tr>
                          <tr className="shipping">
                            <th>Level</th>
                            <td className="text-right">
                              <span className="text-grey-700 font-xsss fw-700">
                                {account.level.toUpperCase()}
                              </span>
                            </td>
                          </tr>
                          <tr className="order-total">
                            <th>Status</th>
                            <td className="text-right text-grey-700 font-xsss fw-700">
                              <span className="order-total-ammount">
                                {account.status === "0" ? "inactive" : "active"}
                              </span>
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>

                    <div className="clearfix" />
                    <div className="card shadow-none border-0 ">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          !statusVerify ? sendVerifyCode() : sendAgenToken();
                        }}
                        className="btn w-100 p-3 mt-3 font-xsss text-center text-white bg-current rounded-3 text-uppercase fw-600 ls-3"
                      >
                        {!statusVerify ? "Verify First" : "Get Agen Code"}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="col-xl-5 offset-xl-1 col-lg-6">
                  <div className="row">
                    <div className="col-lg-10 mb-3">
                      <div className="form-group">
                        <label className="mont-font fw-600 font-xsss">
                          Balance
                        </label>

                        <select
                          name="balance"
                          id="balance"
                          className="form-select"
                          defaultValue={saldoRange[0]}
                          onChange={(e) => {
                            setBalance(e.target.value);
                          }}
                          disabled={statusVerify}
                        >
                          {saldoRange.map((item, index) => (
                            <option key={index} value={item}>
                              {rupiah(item)}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-10 mb-3">
                      <div className="form-group">
                        <label className="mont-font fw-600 font-xsss mb-2">
                          Agent
                        </label>
                          <br/>
                        {
                          agen === 'indomaret' ? (
                            <img src="images/indomaret.svg" style={{ width : '10rem', marginTop: '-5rem'  }} className="ms-5"></img>
                          ) : (
                            <img src="images/alfamart.svg" style={{ width : '10rem', marginTop: '-5rem'   }} className="ms-5"></img>

                          )
                        }
                        <select
                          name="regency"
                          id="regency"
                          className="form-select"
                          onChange={(e) => {
                            setAgen(e.target.value);
                          }}
                          disabled={statusVerify}
                          style={{ marginTop : '-2rem' }}
                        >
                          <option value={"indomaret"}><img src="../../public/images/"></img>Indomaret</option>
                          <option value={"alfamart"}><img src="images/alfamrt.svg"></img>Alfamart</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  {statusVerify && (
                    <div className="row mt-3">
                      <div className="col-lg-10 mb-3">
                        <div className="form-gorup">
                          <label className="mont-font fw-600 font-xsss">
                            Verification Code
                            <br />
                            <span className="mont-font fw-600 font-xsssss">
                              * Verification code will be sent to your Whatsapp
                              after clicking button
                            </span>
                          </label>
                          <input
                            type="text"
                            name="comment-name"
                            className="form-control"
                            placeholder="verification code"
                            maxLength={6}
                            ref={userCodeRef}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  {agenToken !== null && (
                    <div className="row mt-3 p-3">
                      <div
                        className="col-lg-10 alert alert-warning alert-dismissible fade show"
                        role="alert"
                      >
                        <div className="row">
                          <h5 className="mont-font font-xss col-8">
                            <strong>Verification Code</strong>
                          </h5>
                          <div className="col-4 text-right">
                            <a
                              type="button"
                              className="close text-right"
                              data-dismiss="alert"
                              aria-label="Close"
                            >
                              <span aria-hidden="true">&times;</span>
                            </a>
                          </div>
                        </div>

                        <div className="row mt-3 text-center">
                          <h1>{agenToken}</h1>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
