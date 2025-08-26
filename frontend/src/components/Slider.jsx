import React, { useRef } from "react";

export default function ImageGridSlider({images}) {

  const sliderRef = useRef(null);
  let isDown = false;
  let startX;
  let scrollLeft;

  const handleMouseDown = e => {
    isDown = true;
    sliderRef.current.classList.add("cursor-grabbing");
    startX = e.pageX - sliderRef.current.offsetLeft;
    scrollLeft = sliderRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDown = false;
    sliderRef.current.classList.remove("cursor-grabbing");
  };

  const handleMouseUp = () => {
    isDown = false;
    sliderRef.current.classList.remove("cursor-grabbing");
  };

  const handleMouseMove = e => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // speed factor
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <>
      <style>{`
        /* Hide scrollbar but keep scroll functionality */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none; /* IE & Edge */
          scrollbar-width: none; /* Firefox */
        }
      `}</style>

      <div className="relative w-full max-w-7xl mx-auto">
        <div
          ref={sliderRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide cursor-grab select-none"
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {images.map((src, index) => (
            <div
              key={index}
              className="flex-none md:w-100  w-72 h-64  md:h-72 rounded-lg overflow-hidden"
            >
              <img
                src={src}
                alt={`Grid ${index}`}
                className="w-full h-72 object-cover pointer-events-none"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
