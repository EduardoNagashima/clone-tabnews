import React from "react";

const HeartImage = ({ imageUrl }) => {
  return (
    <div style={{ position: "relative", width: "200px", height: "200px" }}>
      <img
        src={imageUrl}
        alt="Imagem"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: "50%",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100px",
          height: "100px",
          background: "red",
          clipPath: "url(#heartShape)",
        }}
      />
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          <clipPath id="heartShape">
            <path
              fill="#000000"
              d="M19.3,-16.7c2.8,6.9,8.3,12.3,15.2,14.9c7.4,2.7,15.9,1.5,23.2,-0.4c7.4,-1.9,14.3,-5.1,20.2,-9.6c6.2,-4.8,11,-11,13.7,-18.1c2.5,-7.1,2.9,-15.4,0.9,-22.8c-2.1,-7.4,-6.5,-13.8,-12.5,-18.9c-6,-5.1,-13.6,-8.9,-21.7,-10.1c-8.1,-1.3,-16.8,0.3,-24,4.3c-7.3,4,-13,10.4,-16.8,18.2c-3.7,7.7,-5.4,16.9,-2.8,25.4c2.7,8.5,10.2,16.2,19.3,18.3c9,2,19.5,-1.9,25.7,-9.5c6.3,-7.6,8.3,-18.1,4.6,-27.3c-3.8,-9.2,-13.2,-16.8,-23.1,-18.2c-9.8,-1.3,-20.2,4.1,-24.9,13c-4.7,8.8,-3.6,20,-0.1,29.3C7.2,-19.6,14.3,-23.4,19.3,-16.7Z"
            />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

function Anna() {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        color: "white",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        width: "100vw",
        background: "#4158D0",
        background:
          "linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)",
      }}
    >
      <h1>Te amo Anna:</h1>
      <HeartImage imageUrl={"https://r2.easyimg.io/ynz9uokw0/gato.jpg"} />
    </div>
  );
}

export default Anna;
