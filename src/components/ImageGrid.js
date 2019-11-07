import React from "react";

const ImageGrid = ({ slice, idx }) => {
  return (
    <div className="image-grid" key={`slice-image-grid_${idx}`}>
      <div className="image-grid-title">
        {/* <h2>{slice.primary.title.text}</h2> */}
        <p>
          Some companies I've had the pleasure to build digital interfaces for
        </p>
      </div>
      <div className="row align-items-center justify-content-center">
        {slice.items.map((item, i) => {
          return (
            <div className="col text-center" key={`image-grid-item_${i}`}>
              <img
                className="client-logo"
                src={item.image.url}
                alt={item.image.copyright}
                width={100}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default ImageGrid;
