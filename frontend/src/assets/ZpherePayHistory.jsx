import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import moment from "moment";
export default function ZpherePayHistory() {

  const [histories, setHistories] = useState([]);

  useEffect(()=> {
    axiosClient
    .get('/zpherepay-histories')
    .then((response)=> {
      setHistories(response.data)
    })
    .catch((error)=> {

    })
  }, [])

  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };


  return (
    <div className="transaction-history-section mt-5">
      <h1 className="text-center mb-4 font-lg"> <span><i className="feather-dollar-sign  bg-success text-white mx-3" style={{ fontSize : '3rem' }}></i></span>Transaction History</h1>
      <div className="card transaction-card shadow-sm border-0">
        <div className="card-body p-4">
          <div className="transaction-list">
            {/* Transaction Item */}
            {
              histories.map((history) => (
                <>
                <div className="mt-3 transaction-item mb-3 p-3 rounded-xxl bg-light position-relative transaction-hover" key={history.id}>
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <i className="feather icon-zap text-primary mr-3" style={{ fontSize: '24px' }}></i>
                  <div>
                    <h6 className="mb-0 mont-font font-xss">{history.context }</h6>
                    <p className="text-muted small">{moment(history.updated_at).format("DD MMM YYYY h:mm A")
                    }</p>
                  </div>
                </div>
                <h5 className={`${history.status === 'increase' ? 'text-success' : 'text-danger'} mb-0`}>{history.status === 'increase' ? '+' : '-'} {rupiah(history.balance)}</h5>
              </div>
            </div>
            {/* <hr /> */}
            </>
              ))
            }

          </div>
        </div>
      </div>

      {/* CSS */}
      <style jsx>{`
        .transaction-card {
          background-color: #ffffff;
          border-radius: 12px;
        }

        .transaction-item {
          transition: transform 0.3s, box-shadow 0.3s;
          cursor: pointer;
        }

        .transaction-hover:hover {
          transform: translateY(-5px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          background-color: #f8f9fa;
          border-radius : border-radius: 15px;
        }

        .transaction-hover:hover .icon-zap,
        .transaction-hover:hover .icon-dollar-sign,
        .transaction-hover:hover .icon-phone {
          color: #007bff;
        }

        .transaction-hover:hover h6,
        .transaction-hover:hover h5 {
          color: #007bff;
        }
      `}</style>
    </div>
  );
}
