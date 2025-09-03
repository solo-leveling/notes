import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import NoteCard from '../../components/Cards/NoteCard'
import { MdAdd } from 'react-icons/md'
import AddEditNote from './AddEditNote'
import  Modal  from 'react-modal'

const Home = () => {
    const [openAddEditModal, setAddEditModal] = useState({
        isShown: false,
        type: "add",
        data: null
    })

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
            <button className='w-14 h-14 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-6 bottom-6'
                onClick={() => {
                setAddEditModal({isShown:true, type:"add", data:null})
            }}>
                <MdAdd className='text-[32px] text-white'/>
            </button>
            <Modal
                isOpen={openAddEditModal.isShown}
                onRequestClose={() => { }}
                style={{
                    overlay :{
                        backgroundColor : "rgba(0, 0, 0, 0.2)",
                    }
                }}
                contentLabel=""
                className="w-[40%] max-h-[95%] bg-white rounded-md mx-auto mt-12 p-5 overflow-y-auto"
            >
                
                <AddEditNote
                    type={openAddEditModal.type}
                    noteData={openAddEditModal.data}
                    onClose={() => {
                    setAddEditModal({isShown:false, type:"add", data:null })
            }}/>
            </Modal>

        </>
    )
}

export default Home