import React, { useEffect, useState } from 'react'
import './Admin.css'
const Hadith = () => {
    const [hadiths, setHadiths] = useState([])
    const [newHadiths, setNewHadiths] = useState('')

    const [hadithBook, setHadithBook] = useState('--none--')
    const [bookNumber, setBookNumber] = useState('')
    const [hadithNumber, setHadithNumber] = useState('')
    
    const getHadiths = async() =>{
        try{
            const response = await fetch('https://isog-prayer-times-server.vercel.app/api/hadiths')
            const data = await response.json()
            setHadiths(data.hadith)
        }catch(error){
            console.log(error)
        }
    }

    const getHadithAPI = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/${hadithBook}/${hadithNumber}.json`);
            const data = await response.json();
            console.log(data.hadiths[0].text)
            setNewHadiths(data.hadiths[0].text + " (" + data.metadata.name + " " + data.hadiths[0].hadithnumber + ")")
        } catch (error) {
            console.log(error);
        }
    };
    

    const saveHadith = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://isog-prayer-times-server.vercel.app/api/postHadith', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ hadith: [...hadiths, newHadiths] }), // Update the body according to your server's expected format
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
            const response = await fetch(`https://isog-prayer-times-server.vercel.app/api/hadith/${index}`, {
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

    <div className='header'>Enter a Hadith or Look one up</div>

    {hadiths ? hadiths.map((hadiths, index) =>(
        <div className='announcements'>
            <div key={index}>{hadiths}</div>
            <button onClick={() => deleteHadith(index)}>X</button>
        </div>
    )): null}

    <form>
        <textarea type='text' placeholder='Enter New Hadith' onChange={(event) => {setNewHadiths(event.target.value)}} value={newHadiths}/>
        
    
        <select className='selector' onChange={(event) => setHadithBook(event.target.value)} value={hadithBook}>
            <option value="--none--">Select Hadith Book</option>
            <option value="eng-bukhari">Sahih al Bukhari</option>
            <option value="eng-muslim">Sahih Muslim</option>
            <option value="eng-nasai">Sunan an Nasai</option>
            <option value="eng-abudawud">Sunan Abu Dawud</option>
            <option value="eng-tirmidhi">Jami At Tirmidhi</option>
            <option value="eng-ibnmajah">Sunan Ibn Majah</option>
            <option value="eng-malik">Muwatta Malik</option>
            <option value="eng-dehlawi">Forty Hadith of Shah Waliullah Dehlawi (Only 1 book)</option>
            <option value="eng-nawawi">Forty Hadith of an-Nawawi (Only 1 book)</option>
            <option value="eng-qudsi">Forty Hadith Qudsi (Only 1 book)</option>
        </select>

        {hadithBook !== '--none--' 
        ?
        <>
            <input 
            placeholder='Hadith Number' 
            onChange={(event) => setHadithNumber(event.target.value)}
            value={hadithNumber}
            className='inputFieldHadithNumber'
            />
            
            <button onClick={getHadithAPI} >Search Hadith</button>
        </>
        : 
        null}

        <button onClick={saveHadith}>Add Hadith</button>

    </form>
    </div>
  )
}

export default Hadith