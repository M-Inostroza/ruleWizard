// // SearchBox.js
// import React, { useState, useEffect } from 'react';
// import { collection, onSnapshot } from 'firebase/firestore';
// import db from '../firebase';
// import '../css/SearchBox.css';

// const SearchBox = () => {
//   const [inputText, setInputText] = useState('');
//   const [suggestions, setFilteredSuggestions] = useState([]);

//   const handleInputChange = (e) => {
//     const newText = e.target.value;
//     setInputText(newText);

//     console.log(suggestions)

//     // Filter suggestions based on the input text
//     const filteredSuggestions = suggestions.filter((suggestion) =>
//       suggestion.includes(newText.toLowerCase())
//     );

//     // Set the filtered suggestions
//     setFilteredSuggestions(filteredSuggestions);
//   };

//   useEffect(() => {
//     const unsubscribe = onSnapshot(collection(db, 'wizard-base'), (snapshot) => {

//       // Extract keys from each document
//       const newSuggestions = snapshot.docs.map((doc) => Object.keys(doc.data()));
  
//       // Flatten the array of arrays into a single array of keys
//       const allKeys = [].concat(...newSuggestions);
  
//       // Filter unique keys and set the suggestions
//       setFilteredSuggestions(allKeys);
//     });
    
//     // Clean up the subscription when the component unmounts
//     return () => unsubscribe();
//   }, []);

//   return (
//     <div className='container'>
//       <h1>What are you playing?</h1>
//       <input
//         type="text"
//         placeholder="Type something..."
//         value={inputText}
//         onChange={handleInputChange}
//       />

//       {inputText && (
//         <div className="dropdown">
//           {suggestions.map((suggestion) => (
//             <div className="dropdown-item">
//               {suggestion}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
    
//   );
// };

// export default SearchBox;



import React, { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import db from '../firebase';
import '../css/SearchBox.css';

const SearchBox = () => {
  const [inputText, setInputText] = useState('');
  const [suggestions, setFilteredSuggestions] = useState([]);

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
  }, [db]);

  const handleInputChange = (e) => {
    const newText = e.target.value;
    setInputText(newText);
  };

  const filteredSuggestions = suggestions.filter((suggestion) =>
    suggestion.includes(inputText.toLowerCase())
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

      {inputText && (
        <div className="dropdown">
          {filteredSuggestions.map((suggestion) => (
            <div className="dropdown-item" key={suggestion}>
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBox;
