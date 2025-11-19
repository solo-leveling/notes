import React, { useState } from 'react'
import ProfileInfo from "../Cards/ProfileInfo"
import { useNavigate } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar';

const Navbar = ( { userInfo, onSearchNote, handleClearSearch } ) => {
    const navigate = useNavigate();
    const [ querySearch, setQuerySearch] = useState("");

    const onLogout = () => {
        localStorage.clear()
        navigate('/login')
    }

    const handleSearch = () => {
        if (querySearch) {
            onSearchNote(querySearch)
        }
    }
    const clearSearch = () => {
        setQuerySearch("")
        handleClearSearch()
    }

    return (
        <>
            <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
                <h2 className='text-xl font-medium text-black py-2'>Notes</h2>
                <SearchBar
                value={querySearch}
                    onChange={({ target }) => {
                        setQuerySearch(target.value);
                    }}
                    userInfo={userInfo}
                    handleSearch={handleSearch}
                    clearSearch={clearSearch}
                />
                <ProfileInfo userInfo={userInfo} onLogout={ onLogout } />
            </div>
        </>
    )
}

export default Navbar