// SearchBar.jsx
import React, { useState } from 'react';
import "../styles/search.css"

const SearchBar = ({ suggestions }) => {
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const handleChange = (event) => {
        const inputValue = event.target.value;
        setInputValue(inputValue);

        // Filter suggestions based on input value
        const filteredSuggestions = suggestions.filter(suggestion =>
            suggestion.toLowerCase().includes(inputValue.toLowerCase())
        );
        setFilteredSuggestions(filteredSuggestions);
    };

    const handleSelect = (value) => {
        setInputValue(value);
        setFilteredSuggestions([]);
    };

    return (
        <div className="autocomplete-container">
            <input
                className="autocomplete-input"
                type="text"
                value={inputValue}
                onChange={handleChange}
                placeholder="Escribe para buscar..."
                name="search"
            />
            <ul className="autocomplete-suggestions">
                {filteredSuggestions.map((suggestion, index) => (
                    <li key={index} className="autocomplete-suggestion" onClick={() => handleSelect(suggestion)}>
                        {suggestion}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchBar;