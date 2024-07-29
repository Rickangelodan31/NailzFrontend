// AddFriends.js
import React, { useState, useContext } from 'react';
import { SessionContext } from '../contexts/SessionContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const AddFriends = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const { token } = useContext(SessionContext);

  const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    };
  };

  const handleSearch = debounce(async () => {
    try {
      // Only fetch data if the query is not empty
      if (query.trim() !== '') {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/friends/search?query=${query}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setResults(data);
        } else {
          console.log('Error:', response);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, 300); // Debounce time in milliseconds
  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setQuery(inputValue);
    
    // Call handleSearch only if the input value is not empty
    if (inputValue.trim() !== '') {
      handleSearch();
    } else {
      // Clear the results if the input value becomes empty
      setResults([]);
    }
  };
  
  const handleSendRequest = async (userId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/friends/request`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ userId }),
        }
      );
      if (response.ok) {
        console.log('Friend request sent');
      } else {
        console.log('Error:', response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="search-icon-container">
      <div className="search-bar">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search for friends"
        />
        <button onClick={handleSearch}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>
      <ul>
        {results.map((user) => (
          <li key={user._id}>
            {user.username} ({user.email})
            <button onClick={() => handleSendRequest(user._id)}>Add Friend</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddFriends;