import React from "react";

function OutfitCard(props) {
  const { outfit } = props;

  return (
    <div
      style={{
        color: "white",
        display: "flex",
        height: "400px",
        paddingTop: "10px",
        borderRadius: "10px",
        flexDirection: "column",
        backgroundColor: "black",
        justifyContent: "space-between",
        border: "2px solid #333",
        margin: "10px",
      }}
    >
      <div>
        <img
          src={outfit.image}
          width="90%"
          height="200px"
          style={{ borderRadius: "10px", objectFit: "cover" }}
          alt={outfit.name}
        />
      </div>
      <div style={{ paddingLeft: "10px", paddingRight: "10px" }}>
        <h4 style={{ margin: "5px 0", color: "#fff" }}>{outfit.name}</h4>
        <p style={{ margin: "5px 0", color: "#ccc", fontSize: "14px" }}>
          {outfit.description}
        </p>
        <p style={{ margin: "5px 0", color: "#4CAF50", fontWeight: "bold" }}>
          ${outfit.price}
        </p>
      </div>

      <div style={{ padding: "10px" }}>
        <button
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: "5px",
            cursor: "pointer",
            width: "100%",
          }}
          onClick={() => window.open(outfit.link, "_blank")}
        >
          View Outfit
        </button>
      </div>
    </div>
  );
}

export default OutfitCard;
