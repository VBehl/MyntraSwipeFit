import * as React from "react";
import { useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useAnimation,
} from "framer-motion";

export const Example = () => {
  const x = useMotionValue(0);
  const xInput = [-100, 0, 100];
  const background = useTransform(x, xInput, [
    "linear-gradient(180deg, #ff0000 0%, rgb(211, 9, 225) 100%)",
    "linear-gradient(180deg, #7700ff 0%, rgb(255, 105, 180) 100%)",
    "linear-gradient(180deg, rgb(230, 255, 0) 0%, rgb(3, 209, 0) 100%)",
  ]);
  const color = useTransform(x, xInput, [
    "rgb(211, 9, 225)",
    "rgb(68, 0, 255)",
    "rgb(3, 209, 0)",
  ]);
  const tickPath = useTransform(x, [10, 100], [0, 1]);
  const crossPathA = useTransform(x, [-10, -55], [0, 1]);
  const crossPathB = useTransform(x, [-50, -100], [0, 1]);

  // State to hold multiple image URLs
  const [backgroundImages, setBackgroundImages] = useState([
    "https://assets.myntassets.com/dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/17587470/2022/4/28/51112378-6f5f-43f0-a257-16f3fb5be4341651143779451-Difference-of-Opinion-Women-Orange-Typography-Printed-Pure-C-1.jpg",
    "https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dw34d84041/images/Titan/Catalog/1698KM02_1.jpg?sw=800&sh=800",
    "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTROy5vXUzGgb7yR9AfY3oHKeD4UOzlXy1PS24oQI-PTBCFrRySAAGqc-p5-T1xRgaPLzK4mDSZdiVXRlpTKyvBqEqNvE4L8_ThW-MdxHqbPsdmKhTTXBE-CQ",
    "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/9e807aad-42e9-46e5-8f08-34e141e718e5/nikecourt-legacy-shoes-PKg8wX.png",
    "https://accessorizelondon.in/cdn/shop/products/MA-69015903001_1.jpg?v=1696331115",
    "https://assets.myntassets.com/w_412,q_60,dpr_2,fl_progressive/assets/images/13064068/2022/12/6/616c4bed-c94f-463e-9d73-562a07429a4e1670328999270-Anouk-Women-Navy-Blue--Off-White-Woven-Design-Shoulder-Bag-w-1.jpg",
    "https://assets.myntassets.com/w_412,q_60,dpr_2,fl_progressive/assets/images/28886036/2024/4/12/2d2b6afa-f505-4412-82be-c416364f5b1e1712920814827Trousers1.jpg",
    "https://assets.myntassets.com/dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/19442094/2022/8/9/1785ded1-21b9-4c87-91d3-9333477a54aa1660019834236STREET9BlackDress1.jpg",
    "https://assets.myntassets.com/w_412,q_60,dpr_2,fl_progressive/assets/images/15577694/2022/9/15/cc9c8c9f-8e2d-4d6e-acbf-4578de676ff01663212614290-GNIST-Women-White-Block-Sandals-5341663212614028-1.jpg",
  ]);

  // State to track current index of backgroundImages array
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // State to store right-swiped images
  const [rightSwipedImages, setRightSwipedImages] = useState([]);

  // Function to handle swipes or interactions
  const handleSwipe = () => {
    // Logic to change background image after swipe
    const currentImage = backgroundImages[currentImageIndex];
    setCurrentImageIndex((prevIndex) =>
      prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
    );

    // Check if swipe direction is right (positive x value)
    if (x.get() > 50) {
      setRightSwipedImages((prevImages) => [...prevImages, currentImage]);
    }
  };

  // Function to handle "DONE" button click
  const handleDoneClick = () => {
    // Open a new blank page/tab with specified background color
    const newTab = window.open("", "_blank");
    newTab.document.body.style.backgroundColor = "#ffd1dc"; // Set light pink background color

    // Create and style heading for the new tab
    const heading = newTab.document.createElement("h1");
    heading.textContent = "Here is your look ! #MyntraSwipeFit";
    heading.style.textAlign = "center";
    heading.style.color = "#ff0080"; // Hot pink color
    newTab.document.body.appendChild(heading);

    // Container for displaying images
    const imagesContainer = newTab.document.createElement("div");
    imagesContainer.style.display = "flex";
    imagesContainer.style.justifyContent = "center";
    imagesContainer.style.flexWrap = "wrap";
    newTab.document.body.appendChild(imagesContainer);

    // Append right-swiped images to the new tab with consistent styling
    rightSwipedImages.forEach((imageUrl) => {
      const img = newTab.document.createElement("img");
      img.src = imageUrl;
      img.style.maxWidth = "250px"; // Ensure image fits within container width
      img.style.height = "300px"; // Maintain aspect ratio
      img.style.margin = "10px"; // Optional: Add margin for spacing between images
      imagesContainer.appendChild(img);
    });
  };

  return (
    <div>
      <h1 className="header">MyntraSwipeFit</h1>
      <div>
        <button className="done" onClick={handleDoneClick}>
          DONE
        </button>
      </div>
      <motion.div className="example-container" style={{ background }}>
        <motion.div
          className="box"
          style={{
            x,
            backgroundImage: `url(${backgroundImages[currentImageIndex]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleSwipe}
        >
          <svg className="progress-icon" viewBox="0 0 50 50">
            <motion.path
              fill="none"
              strokeWidth="2"
              stroke={color}
              d="M14,26 L 22,33 L 35,16"
              strokeDasharray="0 1"
              style={{ pathLength: tickPath }}
            />
            <motion.path
              fill="none"
              strokeWidth="2"
              stroke={color}
              d="M17,17 L33,33"
              strokeDasharray="none"
              style={{ pathLength: crossPathA }}
            />
            <motion.path
              fill="none"
              strokeWidth="2"
              stroke={color}
              d="M33,17 L17,33"
              strokeDasharray="0 1"
              style={{ pathLength: crossPathB }}
            />
          </svg>
        </motion.div>
      </motion.div>
      {/* Optional: Display right-swiped images */}
      {rightSwipedImages.length > 0 && (
        <div className="right-swiped-images">
          <h2>Right Swiped Images</h2>
          <div className="right-swiped-images-container">
            {rightSwipedImages.map((imageUrl, index) => (
              <div
                key={index}
                className="right-swiped-image"
                style={{
                  backgroundImage: `url(${imageUrl})`,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  maxWidth: "300px", // Set maximum width
                  height: "200px", // Set desired height
                  margin: "10px", // Optional: Add margin for spacing between images
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Example;
