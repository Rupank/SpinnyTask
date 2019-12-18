import React, { useRef } from 'react'
import '../App.css'

export default function SearchBar(props) {
    const { handleSearch } = props;
    const searchRef = useRef(null);
    const handleSearchInput = () => {
        let inputValue = searchRef.current.value;
        if (inputValue) {
            handleSearch(inputValue);
        }
    }
    return (
        <div className="searchBar">
            <input type="text" placeholder="Type and hit go" ref={searchRef} />
            <button className="search-button" onClick={handleSearchInput}>Go</button>
        </div>
    )
}


