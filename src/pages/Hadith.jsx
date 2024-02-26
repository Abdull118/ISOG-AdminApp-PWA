import React, { useEffect, useState } from 'react'
import './Admin.css'
const Hadith = () => {
    const [hadiths, setHadiths] = useState([])
    const [newHadiths, setNewHadiths] = useState('')
    
    const getHadiths = async() =>{
        try{
            const response = await fetch('https://sparkling-jade-cowboy-boots.cyclic.app/hadiths')
            const data = await response.json()
            setHadiths(data.hadith)
        }catch(error){
            console.log(error)
        }
    }

    const saveHadith = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://sparkling-jade-cowboy-boots.cyclic.app/postHadith', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ hadiths: [...hadiths, newHadiths] }), // Update the body according to your server's expected format
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const data = await response.json()
            setHadiths(data.hadith || []) // Update the Hadith state
            setNewHadiths('') // Reset the input field after successful save
            console.log('Hadith saved successfully:', data)
        } catch (error) {
            console.log('Error saving hadith:', error)
        }
    }

    const deleteHadith = async (index) => {
        try {
            const response = await fetch(`https://sparkling-jade-cowboy-boots.cyclic.app/hadith/${index}`, {
                method: 'DELETE',
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            console.log(`Hadith at index ${index} deleted successfully`)
            // Update the local state to reflect the change
            setHadiths(prevHadiths => prevHadiths.filter((_, i) => i !== index))
        } catch (error) {
            console.log('Error deleting hadith:', error)
        }
    }

    

    useEffect(()=>{
        getHadiths()
    }, [newHadiths])

  return (
<div className='announcementsContainer'>
    <div>
        Hadiths
    </div>

    {hadiths ? hadiths.map((hadiths, index) =>(
        <div className='announcements'>
            <div key={index}>{hadiths}</div>
            <button onClick={() => deleteHadith(index)}>X</button>
        </div>
    )): null}

    <form>
        <textarea type='text' placeholder='Enter New Hadith' onChange={(event) => {setNewHadiths(event.target.value)}} value={newHadiths}/>
        <button onClick={saveHadith}>Add Hadith</button>
    </form>

    
    </div>
  )
}

export default Hadith