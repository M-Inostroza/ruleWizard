// SearchBox.js
import React, { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import db from '../firebase';
import '../css/SearchBox.css';

const SearchBox = () => {
  const [inputText, setInputText] = useState('');

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  console.log(db);
  useEffect(() => {
      onSnapshot(collection(db, 'wizard-base'), (snapshot) => {
          console.log(snapshot.docs.map(doc => doc.data()));
      }) 
    }
  )

  return (
    <div className='container'>
      <h1>What are you playing?</h1>
      <input
        type="text"
        placeholder="Type something..."
        value={inputText}
        onChange={handleInputChange}
      />
      <p>You typed: {inputText}</p>
    </div>
  );
};

export default SearchBox;
