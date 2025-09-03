import React, { useState } from 'react'
import ProfileInfo from "../Cards/ProfileInfo"
import { useNavigate } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar';

const Navbar = () => {
    const navigate = useNavigate;
    const [ querySearch, setQuerySearch] = useState("");

    const onLogout = () => {
        navigate('/login')
    }

    const handleSearch = () => {}
    const clearSearch = () => {
        setQuerySearch("")
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
                    handleSearch={handleSearch}
                    clearSearch={clearSearch}
                />
                <ProfileInfo onLogout={ onLogout } />
            </div>
        </>
    )
}

export default Navbar