import { useState, useEffect } from "react";
import styled from "styled-components";
const Preloader = () => {
  return <ZphereLoader/>;
};

const Loader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate an async operation like fetching data
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return <div className="app">{loading ? <Preloader /> : ""}</div>;
};

const ZphereLoader = () => {
  return (
    <div className="zpherepreloader">
      <StyledLoader>
        <svg height="0" width="0" viewBox="0 0 64 64" className="absolute">
          <defs xmlns="http://www.w3.org/2000/svg">
            <linearGradient
              gradientUnits="userSpaceOnUse"
              y2="2"
              x2="0"
              y1="62"
              x1="0"
              id="b"
            >
              <stop stopColor="#973BED"></stop>
              <stop stopColor="#007CFF" offset="1"></stop>
            </linearGradient>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              y2="0"
              x2="0"
              y1="64"
              x1="0"
              id="c"
            >
              <stop stopColor="#FFC800"></stop>
              <stop stopColor="#F0F" offset="1"></stop>
              <animateTransform
                repeatCount="indefinite"
                dur="8s"
                values="0 32 32;-270 32 32;-1080 32 32"
                type="rotate"
                attributeName="gradientTransform"
              ></animateTransform>
            </linearGradient>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              y2="2"
              x2="0"
              y1="62"
              x1="0"
              id="d"
            >
              <stop stopColor="#00E0ED"></stop>
              <stop stopColor="#00DA72" offset="1"></stop>
            </linearGradient>
          </defs>
        </svg>

        {/* Huruf Z */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 64 64"
          height="64"
          width="64"
          className="inline-block"
        >
          <path
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="8"
            stroke="url(#b)"
            d="M 10,10 L 54,10 L 10,54 L 54,54"
            className="dash"
            id="z"
            pathLength="360"
          ></path>
        </svg>
        <div className="w-2"></div>

        {/* Huruf P dengan garis tegak kiri */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 64 64"
          height="64"
          width="64"
          className="inline-block"
        >
          <path
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="8"
            stroke="url(#c)"
            d="M 10 10 V 54 M 10 10 H 32 A 12 12 0 1 1 32 34 H 10 Z"
            className="dash"
            id="p"
            pathLength="360"
          ></path>
        </svg>
        <div className="w-1"></div>

        {/* Huruf H */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 64 64"
          height="64"
          width="64"
          className="inline-block"
        >
          <path
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="8"
            stroke="url(#d)"
            d="M 10,10 V 54 M 54,10 V 54 M 10,32 H 54"
            className="dash"
            id="h"
            pathLength="360"
          ></path>
        </svg>
        <div className="w-2"></div>

        {/* Huruf E */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 64 64"
          height="64"
          width="64"
          className="inline-block"
        >
          <path
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="8"
            stroke="url(#b)"
            d="M 54,10 H 10 V 54 H 54 M 10,32 H 40"
            className="dash"
            id="e"
            pathLength="360"
          ></path>
        </svg>
        <div className="w-2"></div>

        {/* Huruf R dengan garis tegak kiri */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 64 64"
          height="64"
          width="64"
          className="inline-block"
        >
          <path
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="8"
            stroke="url(#c)"
            d="M 10 10 V 54 M 10 10 H 32 A 12 12 0 1 1 32 34 H 10 Z M 32 34 L 54 54"
            className="dash"
            id="r"
            pathLength="360"
          ></path>
        </svg>
        <div className="w-2"></div>

        {/* Huruf E */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 64 64"
          height="64"
          width="64"
          className="inline-block"
        >
          <path
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="8"
            stroke="url(#d)"
            d="M 54,10 H 10 V 54 H 54 M 10,32 H 40"
            className="dash"
            id="e"
            pathLength="360"
          ></path>
        </svg>
      </StyledLoader>
    </div>
  );
};

const StyledLoader = styled.div`
  display: flex;
  margin: 0.25em 0;

  .absolute {
    position: absolute;
  }

  .inline-block {
    display: inline-block;
  }

  .w-2 {
    width: 0.5em;
  }

  .dash {
    animation: dashArray 2s ease-in-out infinite, dashOffset 2s linear infinite;
  }

  .spin {
    animation: spinDashArray 2s ease-in-out infinite,
      spin 8s ease-in-out infinite, dashOffset 2s linear infinite;
    transform-origin: center;
  }

  @keyframes dashArray {
    0% {
      stroke-dasharray: 0 1 359 0;
    }
    50% {
      stroke-dasharray: 0 359 1 0;
    }
    100% {
      stroke-dasharray: 359 1 0 0;
    }
  }

  @keyframes spinDashArray {
    0% {
      stroke-dasharray: 270 90;
    }
    50% {
      stroke-dasharray: 0 360;
    }
    100% {
      stroke-dasharray: 270 90;
    }
  }

  @keyframes dashOffset {
    0% {
      stroke-dashoffset: 365;
    }
    100% {
      stroke-dashoffset: 5;
    }
  }

  @keyframes spin {
    0% {
      rotate: 0deg;
    }
    12.5%,
    25% {
      rotate: 270deg;
    }
    37.5%,
    50% {
      rotate: 540deg;
    }
    62.5%,
    75% {
      rotate: 810deg;
    }
    87.5%,
    100% {
      rotate: 1080deg;
    }
  }
`;

export default Loader;
