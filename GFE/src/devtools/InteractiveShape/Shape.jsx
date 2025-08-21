import React, { useMemo, useState, useEffect, useRef } from "react";
import "./Shape.css";

const Shape = ({ data }) => {
  const boxes = useMemo(() => {
    return data.flat(Infinity);
  }, [data]);
  const countNoVisibelBoxes = useMemo(() => {
    return boxes.reduce((acc, box) => {
      if (box == 1) acc++;
      return acc;
    }, 0);
  }, [boxes]);
  const timeRef = useRef(null);
  //   We need to maintain the order of insertion hence we can have array, Objects, Map, Set data structures
  // Ideal for this scenario would be set since we have O(1) for lookup also
  const [selected, setSelected] = useState(new Set());
  const [unMounting, setUnMounting] = useState(false);

  const handleClick = (e) => {
    const { target } = e;
    const index = target.getAttribute("data-index");
    const status = target.getAttribute("data-status");
    if (status === "hidden" || index == null || unMounting) return;

    setSelected((prev) => {
      return new Set(prev.add(index));
    });
  };

  const unMount = () => {
    const keys = Array.from(selected.keys());
    const removeKeys = () => {
      //   console.log("removing keys", keys);
      setUnMounting(true);
      if (keys.length) {
        const curKey = keys.shift();
        setSelected((prev) => {
          const updatedKeys = new Set(prev);
          updatedKeys.delete(curKey);
          return updatedKeys;
        });
        timeRef.current = setTimeout(removeKeys, 500);
      } else {
        setUnMounting(false);
        clearTimeout(timeRef.current);
      }
    };
    timeRef.current = setTimeout(removeKeys, 100);
  };
  useEffect(() => {
    if (selected.size >= countNoVisibelBoxes) {
      // unMount
      unMount();
    }
  }, [selected]);

  return (
    <div className="boxescontainer" onClick={handleClick}>
      {boxes.map((box, index) => {
        const status = box === 1 ? "visible" : "hidden";
        const isSelected = selected.has(index.toString());
        return (
          <div
            className={`box ${status} ${isSelected ? "selected" : ""}`}
            key={`${box}-${index}`}
            data-index={index}
            data-status={status}
          ></div>
        );
      })}
    </div>
  );
};

export default Shape;
