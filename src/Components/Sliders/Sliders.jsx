import React from "react";
import { useState, useEffect, useRef } from "react";
import "./Sliders.css";
const sources = [
  "https://wallpaperaccess.com/full/1280810.jpg",
  "https://images.hindustantimes.com/img/2021/10/30/1600x900/3202989c-39a1-11ec-a425-d38b2f908c7f_1635613679635.jpg",
  "https://i.cdn.newsbytesapp.com/images/l145_9801629689121.jpg",
  "https://dc-cdn.s3-ap-southeast-1.amazonaws.com/dc-Cover-ma22bi0od8rlouov5rkvpndvp3-20160208231946.Medi.jpeg",
];
const delay = 2500;
export const Sliders = () => {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === sources.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <div className="slideshow">
      <div
        className="slideshowSlider"
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
        {sources.map((ele, index) => (
          <div className="slide" key={index}>
            <img src={ele} alt={"discount" + Number(index + 1)} />
          </div>
        ))}
      </div>

      <div className="slideshowDots">
        {sources.map((_, idx) => (
          <div
            key={idx}
            className={`slideshowDot${index === idx ? " active" : ""}`}
            onClick={() => {
              setIndex(idx);
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};
