import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import NoteCard from '../../components/Cards/NoteCard'
import { MdAdd } from 'react-icons/md'
import { BiLoaderCircle } from 'react-icons/bi';
import AddEditNote from './AddEditNote'
import Toast from '../../components/ToastMessage/toast'
import Modal from 'react-modal'
import axiosInstance from '../../utils/axiosInstance'
import { data, useNavigate } from 'react-router-dom'
import EmptyCard from '../../components/EmptyCard/EmptyCard'
import AddNoteImage from '../../assets/images/add-notes.svg'
import NoDataImg from '../../assets/images/no-data.svg'

const Home = () => {
    const [showToastMsg, setShowToastMsg] = useState({
        isShown: false,
        message: '',
        type: 'add'
    })
    const [openAddEditModal, setAddEditModal] = useState({
        isShown: false,
        type: "add",
        data: null
    })
    const [userInfo, setUserInfo] = useState(null)
    const [getNotes, setAllNotes] = useState(null)
    const [isSearch, setIsSearch] = useState(false)
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()

    //handle edit note
    const handleEditNote = (noteDetail) => {
        setAddEditModal({isShown: true, type:"edit", data:noteDetail})
    }

    const showToastMessage = (message, type) => {
        setShowToastMsg({
            isShown: true,
            message,
            type
        })
    }

    const handleCloseToast = () => {
        setShowToastMsg({
            isShown: false,
            message: ""
        })
    }

    //handle delete note
    const handleDeleteNote = async (data) => {
        try {
            const noteId = data._id
            const response = await axiosInstance.delete("/delete-note/"+ noteId )
            if (response.data && response.data.data) {
                showToastMessage("Note deleted successfully", 'delete')
                getAllNotes();
                onClose()    
            }
        } catch (e) {
                if (error.response && error.response.data && error.response.data.message) {
                    setError(error.response.data.message)
                } else {
                    setError("An unexpected error occurred. Please try again.")
                }
        } 
    }

    //get user info
    const getUserInfo = async () => {
        try {
            const response = await axiosInstance.get("/get-user")
            if (response.data && response.data.user) {
                setUserInfo(response.data.user)
            }
        } catch (e) {
            if (e.response.status === 401) {
                localStorage.clear();
                navigate("/login")
            }
        } 
    }

    //get All notes
    const getAllNotes = async () => {
        try {
            const response = await axiosInstance.get("/all-notes")
            if (response.data && response.data.data) {
                setAllNotes(response.data.data)
            }else {
                setAllNotes([]); // empty if nothing
            }
        } catch (e) {
            console.log("Unexpected error occurred.Please try again.")
        } finally {
            setLoading(false);
        }
    }

    const onSearchNote = async (query) => {
        try {
            const response = await axiosInstance.get("/search-note", {
                params: { query },
            });
            console.log(response.data.notes)
            if (response.data && response.data.notes) {
                setIsSearch(true)
                setAllNotes(response.data.notes)                
            }
        } catch (e) {
                console.log("Unexpected error occurred.Please try again.")
        }
    }

    const handleClearSearch = async () => {
        setIsSearch(true)
        getAllNotes()
    }

    const isPinned = async (noteData) => {
        const noteId = noteData._id
        try {
            const response = await axiosInstance.put("/edit-pin/" + noteId, {
                isPinned : !noteData.isPinned
            })
            if (response.data && response.data.data) {
                showToastMessage("Note updated successfully")
                getAllNotes();    
            }
        } catch (e) {
                console.log(e)
        }
    }


    useEffect(() => {
        getAllNotes()
        getUserInfo()
        return () => {}
    }, [])
    

    return (
        <>
            <Navbar userInfo={userInfo} onSearchNote={ onSearchNote } handleClearSearch={handleClearSearch} />
            <div className='container mx-auto px-10 py-10'>
                {loading ? (
                <div className="flex items-center justify-center h-100 ">
                <BiLoaderCircle className="animate-spin" size={50} />
                <p className="ml-2 text-xl font-semibold text-gray-700">Loading...</p>
            </div>
                    ) :getNotes && getNotes.length > 0 ?
                <div className='grid grid-cols-3 gap-4'>
                    {getNotes.map((item, index) => (
                        <NoteCard
                            key={item._id}
                            title={item.title}
                            date={item.createOn}
                            content={item.content}
                            tags={item.tags}
                            isPinned={item.isPinned}
                            onEdit={() => handleEditNote(item)}
                            onDelete={() => handleDeleteNote(item)}
                            OnPinNote={() => {isPinned(item)}}
                        />
                    ))}
                </div> : <EmptyCard    
                imgSrc={isSearch ? NoDataImg : AddNoteImage}
                message={isSearch ? `Oops! No data found.` : `Start Creating Your First Note.`}
                />}
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
                    }}
                    getAllNotes={getAllNotes}
                    showToastMessage = {showToastMessage}
                />
            </Modal>
            <Toast
                isShown = {showToastMsg.isShown}
                message = {showToastMsg.message}   
                type = {showToastMsg.type}
                onClose = {handleCloseToast}
            />

        </>
    )
}

export default Home