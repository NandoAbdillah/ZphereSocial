export default function ComingSoon () {
  
    return (

    <div className="row">
      <div
        className="col-xl-6 d-none d-xl-block p-0 vh-100 bg-image-contain bg-image-center bg-no-repeat"
        style={{ backgroundImage: "url(images/coming-soon.png)" }}
      />
      <div className="col-xl-6 vh-100 align-items-center d-flex bg-white rounded-3 overflow-hidden">
        <div className="card shadow-none border-0 ps-lg--5 me-auto coming-soon-card">
          <div className="card-body rounded-0 text-left pt-md-5 mt-md-5 ps-0 pe-0">
            {/* <div className="timer w-100 mb-3 bg-grey-time">
              <div className="time-count">
                <span className="text-time">04</span>{" "}
                <span className="text-day">Day</span>
              </div>{" "}
              <div className="time-count">
                <span className="text-time">04</span>{" "}
                <span className="text-day">Hours</span>{" "}
              </div>{" "}
              <div className="time-count">
                <span className="text-time">39</span>{" "}
                <span className="text-day">Min</span>{" "}
              </div>{" "}
              <div className="time-count">
                <span className="text-time">13</span>{" "}
                <span className="text-day">Sec</span>{" "}
              </div>{" "}
            </div> */}
            <h2 className="fw-700 text-grey-900 display3-size display4-md-size lh-2">
              We're under <span className="text-primary">construction.</span>{" "}
              Check back for an update soon.
            </h2>
            
          </div>
        </div>
      </div>
    </div>
  
    );
}