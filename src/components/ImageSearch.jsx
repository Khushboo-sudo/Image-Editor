import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchImages } from '../api';
import './ImageSearch.css'; 

const ImageSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const navigate = useNavigate(); 

  const handleSearch = async (e) => {
    e.preventDefault();
    if (query.trim()) {
      const images = await searchImages(query);
      setResults(images.slice(0, 10)); 
    } else {
      setResults([]); 
    }
  };

  const handleSelectImage = (url) => {
    
    navigate('/editor', { state: { imageUrl: url } });
  };

  return (
    <div className="image-search">
      <header className="header">
        <h1>Khushboo</h1>
        <p>khushboover9416@gmail.com</p>
      </header>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for images"
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>
      <div className="results">
        {results.map((image) => (
          <div key={image.id} className="result-item">
            <img src={image.urls.thumb} alt={image.alt_description} className="result-image" />
            <button 
              onClick={() => handleSelectImage(image.urls.regular)}
              className="add-caption-button"
            >
              Add Caption
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSearch;
