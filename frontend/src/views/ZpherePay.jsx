import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axiosClient from "../axios-client";

export default function ZpherePay() {
  const [account, setAccount] = useState(false);
  const navigate = useNavigate(); // Inisialisasi useNavigate

  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  useEffect(() => {
    axiosClient
      .get("/zpherepay-account")
      .then((response) => {
        const accountStatus = response.data.data[0];
        setAccount(accountStatus);

        // if (!accountStatus) {

        // }
      })
      .catch((error) => {
        navigate("/zpherepay-register"); // Redirect ke halaman zpherepay-register jika status false
      });
  }, [navigate]); // Tambahkan navigate ke dalam dependency array

  // Hanya render konten jika status adalah true
  if (!account) {
    return null; // Atau bisa tambahkan spinner/loading indicator di sini jika diperlukan
  }

  return (
    <div className="zpherepay-container">
      {/* Render konten yang sama seperti sebelumnya */}
      {/* Header */}
      <div className="row">
        <div className="col-md-4 text-center p-4 ">
          <img
            className="avatar"
            style={{ width: "5rem", fill: "blue" }}
            src="images/wallet.png"
            alt="Wallet"
          />
          <h1 className="mb-0 mt-2 text-green-600">
            Zphere<span>Pay</span>
          </h1>
          <p className="font xssssss">Manage your finances</p>
        </div>

        <div className="col-md-8 ml-3">
          <div className="card action-card mb-4">
            <div className="card-body">
              <h5 className="text-center mb-3">Quick Actions</h5>
              <div className="row zphere-action text-center px-5 mt-1">
                <div className="col-4 mb-1">
                  <a href="coming-soon" className="text-decoration-none">
                  <button className="btn btn-outline-primary btn-action">
                    <i className="feather-send"></i>
                    <br />
                  </button>
                  <p className="zpherepay-text text-center">Send</p>
                  </a>
                </div>

                <div className="col-4 mb-1">
                  <a href="coming-soon" className="text-decoration-none">
                  <button className="btn btn-outline-primary btn-action">
                    <i className="feather-gift"></i>
                    <br />
                  </button>
                  <p>Rewards</p>
                  </a>
                </div>
                {/* <div className="col-3 mb-1">
                  <button className="btn btn-outline-primary btn-action">
                    <a></a>
                    <i className="feather-settings"></i>
                    <br />
                  </button>
                  <p>Settings</p>
                </div> */}
                <div className="col-4 mb-1">
                  <a href="/zpherepay-history" className="text-decoration-none">
                  <button className="btn btn-outline-primary btn-action">
                    <i className="feather-clock"></i>
                    <br />
                  </button>
                  <p>History</p>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section Utama */}
      <div className="zpherepay-main-section mt-4">
        {account.status === "0" && (
          <div className="row mb-5">
            <div className="col-md-8 mx-auto ">
              <div className="alert alert-success" role="alert">
                <h1 className="alert-heading">
                  <strong>Well done!</strong>
                </h1>
                <p>
                  You have created a ZpherePay account, unfortunately your
                  account is not yet active because it has not been verified by
                  our system, so the account cannot be used for any transactions
                  in Zphere
                </p>
                <hr />
                <p className="mb-0">
                  <strong>Tips : </strong>To activate and verify your account,
                  you must top up your balance with a minimum of Rp 20.000,00.
                  Thanks for join ZpherePay
                </p>
              </div>
            </div>
          </div>
        )}
        <div className="row">
          {/* Kartu Saldo & Nomor Telepon */}
          <div className="col-md-8 mx-auto">
            <div className="card balance-card mb-4">
              <div className="card-body text-center p-5">
                <div className="row">
                  <div className="col-6 ps-2">
                    <img
                      src={`${import.meta.env.VITE_ASSET_URL}${
                        account.user_detail.profile
                      }`}
                      alt="icon"
                      className="w60 float-left d-inline-block rounded-circle"
                      style={{ height: "3.8rem" }}
                    />
                  </div>
                  <div className="col-6 text-right pe-4">
                    <img
                      src="images/purchase_qr.svg"
                      alt="icon"
                      className="w60 float-right d-inline-block mt-2 me-2"
                    />
                  </div>
                </div>
                <h4 className="phone-number">{account.telp}</h4>
                <h5 className="text-muted mt-4 mb-3">Saldo</h5>
                <h2 className="balance-amount zpherepay-text mt-2">
                  {rupiah(account.saldo)}
                </h2>
                <a href="/zpherepay-topup">
                <button
                 className="btn zpherepay-background btn-block btn-lg mt-5 text-white font-xss">
                  <i className="feather-credit-card mr-2"></i> Top Up Saldo
                </button>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Fitur Tambahan */}
        <div className="additional-features mt-5">
          <h4 className="text-center mb-4">Fitur Tambahan</h4>
          <div className="row">
            <div className="col-md-4">
              <div className="card feature-card mb-4">
                <div className="card-body text-center">
                  <i className="feather-trending-up feature-icon"></i>
                  <h5 className="feature-title">Investasi</h5>
                  <p className="feature-description">
                    Mulai investasi untuk masa depan Anda.
                  </p>
                  <button className="btn btn-primary btn-block">
                    Lihat Detail
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card feature-card mb-4">
                <div className="card-body text-center">
                  <i className="feather-shield feature-icon"></i>
                  <h5 className="feature-title">Asuransi</h5>
                  <p className="feature-description">
                    Lindungi diri dan keluarga Anda dengan asuransi.
                  </p>
                  <button className="btn btn-primary btn-block">
                    Lihat Detail
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card feature-card mb-4">
                <div className="card-body text-center">
                  <i className="feather-award feature-icon"></i>
                  <h5 className="feature-title">Rewards</h5>
                  <p className="feature-description">
                    Kumpulkan poin dan tukarkan dengan hadiah menarik.
                  </p>
                  <button className="btn btn-primary btn-block">
                    Lihat Detail
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
