import React, { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import db from '../firebase';
import '../css/SearchBox.css';

const SearchBox = () => {
  const [inputText, setInputText] = useState('');
  const [suggestions, setFilteredSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'wizard-base'), (snapshot) => {
      const newSuggestions = Array.from(
        new Set(
          snapshot.docs.flatMap((doc) => Object.keys(doc.data()))
        )
      ).map((key) => key.toLowerCase());

      setFilteredSuggestions(newSuggestions);
    });

    return () => unsubscribe();
  }, []);

  const handleInputChange = (e) => {
    const newText = e.target.value;
    setInputText(newText);
    setShowDropdown(newText && filteredSuggestions.length > 0);
  };

  const handleSuggestionClick = (suggestion) => {
    setInputText(suggestion);
    setShowDropdown(false);
  };

  const filteredSuggestions = suggestions.filter((suggestion) =>
    suggestion.toLowerCase().includes(inputText.toLowerCase())
  );

  return (
    <div className='container'>
      <h1>What are you playing?</h1>
      <input
        type="text"
        placeholder="Type something..."
        value={inputText}
        onChange={handleInputChange}
      />

      {showDropdown && (
        <div className="dropdown">
          {filteredSuggestions.map((suggestion) => (
            <div
              className="dropdown-item"
              key={suggestion}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBox;
