import "./App.css";
import React, { useState, useEffect } from "react";
import config from "./config";
import PreviewImage from "./PreviewImage";

const apiKey = config.API_KEY;

function App() {
  const [img, setImg] = useState("");
  const [res, setRes] = useState([]);
  const [preview, setPreview] = useState(null);

  const fetchRequest = async () => {
    if (img) {
      const data = await fetch(
        `https://api.unsplash.com/search/photos?page=1&query=${img}&client_id=${apiKey}`
      );
      const dataJ = await data.json();
      const result = dataJ.results;
      console.log(result);
      setRes(result);
    }
  };

  const fetchRandomPhotos = async () => {
    const data = await fetch(
      `https://api.unsplash.com/photos/random?count=10&client_id=${apiKey}`
    );
    const dataJ = await data.json();
    const result = dataJ;
    setRes(result);
  };

  useEffect(() => {
    fetchRandomPhotos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Submit = () => {
    fetchRequest();
    setImg("");
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      fetchRequest();
      setImg("");
    }
  };

  const openPreview = (src, alt) => {
    setPreview({
      src,
      alt,
    });
  };

  const closePreview = () => {
    setPreview(null);
  };

  return (
    <div className="App">
      <div className="header">
        <div className="title-full">
          <i
            className="fa fa-camera-retro"
            style={{ marginRight: "0.5rem" }}
          ></i>
          <h1 className="title">React Image Search</h1>
        </div>
        <div className="form">
          <input
            className="input"
            type="text"
            placeholder="Search Anything..."
            value={img}
            onChange={(e) => setImg(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button type="submit" onClick={Submit} className="btn">
            Search
          </button>
        </div>
      </div>
      {res.length === 0 ? (
        <div className="no-image-container">
          <h2 className="no-images-copy">No image found</h2>
          <p className="try-new-search-copy">Try searching for <b>tree</b> or <b>beach</b></p>
        </div>
      ) : (
        <div className="img-container">
          {res.map((val) => {
            return (
              <div className="img-inter">
                <img
                  className="img-thumbnail"
                  src={val.urls.small}
                  alt={val.alt_description}
                  width="20%"
                  height="20%"
                  onClick={() =>
                    openPreview(val.urls.regular, val.alt_description)
                  }
                />
              </div>
            );
          })}
        </div>
      )}
      {preview && (
        <PreviewImage
          src={preview.src}
          alt={preview.alt}
          onClose={closePreview}
        />
      )}
    </div>
  );
}


export default App;
