import React from "react";
import Shape from "./Shape";

const BOXDATA = [
  [1, 1, 1],
  [1, 0, 0],
  [1, 1, 1],
];
const index = () => {
  return (
    <div>
      <h1>Interactive Shape Component</h1>
      <Shape data={BOXDATA} />
    </div>
  );
};

export default index;
