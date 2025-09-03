import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import NoteCard from '../../components/Cards/NoteCard'
import { MdAdd } from 'react-icons/md'

const Home = () => {
    return (
        <>
            <Navbar />
            <div className='container mx-auto px-10 py-10'>
                <div className='grid grid-cols-3 gap-4'>
                <NoteCard title="Part Time Job" date="2025/09/03" content="Ramen Shop" tags="#17:00" isPinned={true}
                onEdit={()=>{}} onDelete={()=>{}} OnPinNote={()=>{}}
                />
                </div>
            </div> 
            <button className='w-14 h-14 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-6 bottom-6'>
                <MdAdd className='text-[32px] text-white'/>
            </button>
        </>
    )
}

export default Home