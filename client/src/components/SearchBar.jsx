// SearchBar.jsx
import React from 'react';

const SearchBar = ({ searchTerm, onSearchChange }) => {
    return (
        <div className="container-fluid">
            <form class="d-flex" role="search">
                <input
                    type="text"
                    placeholder="Buscar elemento..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </form>
        </div>

    );
};

export default SearchBar;