import React, { useEffect, useState } from 'react'
import './Admin.css'
const Admin = () => {
    const [announcements, setAnnouncements] = useState([])
    const [newAnnouncement, setNewAnnouncement] = useState('')
    
    const getAnnouncements = async() =>{
        try{
            const response = await fetch('https://isog-prayer-times-server.vercel.app/api/announcements')
            const data = await response.json()
            setAnnouncements(data.annoucements)
        }catch(error){
            console.log(error)
        }
    }

    const saveAnnouncement = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://isog-prayer-times-server.vercel.app/api/postAnnouncements', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ annoucements: [...announcements, newAnnouncement] }), // Update the body according to your server's expected format
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const data = await response.json()
            setAnnouncements(data.annoucements || []) // Update the announcements state
            setNewAnnouncement('') // Reset the input field after successful save
            console.log('Announcement saved successfully:', data)
        } catch (error) {
            console.log('Error saving announcement:', error)
        }
    }

    const deleteAnnouncement = async (index) => {
        try {
            const response = await fetch(`https://isog-prayer-times-server.vercel.app/api/announcement/${index}`, {
                method: 'DELETE',
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            console.log(`Announcement at index ${index} deleted successfully`)
            // Update the local state to reflect the change
            setAnnouncements(prevAnnouncements => prevAnnouncements.filter((_, i) => i !== index))
        } catch (error) {
            console.log('Error deleting announcement:', error)
        }
    }

    

    useEffect(()=>{
        getAnnouncements()
    }, [newAnnouncement])

  return (
<div className='announcementsContainer'>
    <div>
        Announcements
    </div>

    {announcements ? announcements.map((announcements, index) =>(
        <div className='announcements'>
            <div key={index}>{announcements}</div>
            <button onClick={() => deleteAnnouncement(index)}>X</button>
        </div>
    )): null}

    <form>
        <textarea type='text' placeholder='Enter New Announcement' onChange={(event) => {setNewAnnouncement(event.target.value)}} value={newAnnouncement}/>
        <button onClick={saveAnnouncement}>Add Announcement</button>
    </form>

    
    </div>
  )
}

export default Admin