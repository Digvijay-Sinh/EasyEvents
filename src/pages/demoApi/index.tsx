import React, { useState } from "react";
// import SearchBox from "./SearchBox";
import Maps from "./Maps";
import { LatLngExpression } from "leaflet";
import SearchBox from "./SearchBar";

function DemoApi() {
  const [selectPosition, setSelectPosition] = useState<LatLngExpression | null>(
    null
  );
  const position: LatLngExpression = [51.505, -0.09];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100vw",
        height: "100vh",
      }}
    >
      <div style={{ width: "50vw", height: "100%" }}>
        <Maps selectPosition={selectPosition || position} />
      </div>
      <div style={{ width: "50vw" }}>
        <SearchBox setSelectPosition={setSelectPosition} />
      </div>
    </div>
  );
}

export default DemoApi;
