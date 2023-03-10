import "./App.css";
import React, { useState, useEffect } from "react";
import config from "./config";
import PreviewImage from "./PreviewImage";
// import mockAPI from "./mockAPI"; // Mock API

const apiKey = config.API_KEY;

function App() {
  const [img, setImg] = useState("");
  const [res, setRes] = useState([]);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchRequest = async () => {
    if (img) {
      setLoading(true);
      const data = await fetch(
        `https://api.unsplash.com/search/photos?page=&query=${img}&client_id=${apiKey}&per_page=20`
      );
      const dataJ = await data.json();
      const result = dataJ.results;
      console.log(result);
      setRes(result);
      setLoading(false);
      // setRes(mockAPI); // Mock API
    }
  };

  const fetchRandomPhotos = async () => {
    setLoading(true);
    const data = await fetch(
      `https://api.unsplash.com/photos/random?count=20&client_id=${apiKey}`
    );
    const dataJ = await data.json();
    const result = dataJ;
    setRes(result);
    setLoading(false);
    // setRes(mockAPI); // Mock API
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
      {loading ? (
        <div className="no-image-container">
          <h2 className="no-images-copy-loading">Loading...</h2>
        </div>
      ) : res.length === 0 ? (
        <div className="no-image-container">
          <h2 className="no-images-copy">No images found</h2>
          <p className="try-new-search-copy">
            Try searching for <b>trees</b> or <b>cats</b>
          </p>
        </div>
      ) : (
        <div className="img-container">
          {res.map((val) => {
            return (
              <div className="img-profile-container">
                <img
                  className="img-thumbnail"
                  src={val.urls.small}
                  alt={val.alt_description}
                  width="100%"
                  height="100%"
                  onClick={() =>
                    openPreview(val.urls.regular, val.alt_description)
                  }
                />
                <div className="author-info">
                  <div className="author-profile-name">
                    <img
                      className="author-profile-picture"
                      src={val.user.profile_image.small}
                      alt={val.user.name}
                    />
                    <a
                      className="author-name"
                      href={val.user.links.html}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {val.user.name}
                    </a>
                    <a
                      href={val.urls.regular}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa fa-arrow-down" aria-hidden="true"></i>
                    </a>
                  </div>
                </div>
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
