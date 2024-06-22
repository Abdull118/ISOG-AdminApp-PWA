import React, { useEffect } from 'react'
import '../App.css'
import { useState } from 'react';
import axios from 'axios';

const Home = () => {
    const [fajr, setFajr] = useState('');
    const [dhuhr, setDhuhr] = useState('');
    const [asr, setAsr] = useState('');
    const [maghrib, setMaghrib] = useState('');
    const [isha, setIsha] = useState('');
    const [isPrayersSaved, setIsPrayersSaved] = useState(false);

    const getPrayerTimes = async () => {
      try {
        const response = await fetch(
          `https://isog-prayer-times-server.vercel.app/api/prayers`
        );
        const json = await response.json();
        setFajr(json.fajr);
        setDhuhr(json.dhuhr);
        setAsr(json.asr);
        setMaghrib(json.maghrib);
        setIsha(json.isha);
      } catch (e) {
        console.log(e);
      }
    };

    const handleSavePrayers = (e) => {
      e.preventDefault();
      // Create the request body
      const prayerData = {
        fajr,
        dhuhr,
        asr,
        maghrib,
        isha,
      };
    
      // Make the POST request to your server using Axios
      axios.post('https://isog-prayer-times-server.vercel.app/api/savePrayers', prayerData)
        .then((response) => {
          if (response.status === 200) {
            // Prayer data saved successfully
            console.log('Prayer data saved!');
            // Reset the form
            // setFajr('');
            // setDhuhr('');
            // setAsr('');
            // setMaghrib('');
            // setIsha('');
            setIsPrayersSaved(true);
          } else {
            console.log('Failed to save prayer data.');
          }
        })
        .catch((error) => {
          console.log('Error occurred while saving prayer data:', error);
        });
    };

    useEffect(()=>{
      getPrayerTimes()
    }, [])

  return (
    <div className="container">
      <div className="scrollContainer">
        <div className="container">
          <div className="start">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </div>

          <div className="prayerTitle">Add In the Prayer Times Below:</div>

          <form>
            <input
              placeholder="Fajr"
              value={fajr}
              onChange={(e) => setFajr(e.target.value)}
              className="prayerInput"
            />
            <input
              placeholder="Dhuhr"
              value={dhuhr}
              onChange={(e) => setDhuhr(e.target.value)}
              className="prayerInput"
            />
            <input
              placeholder="Asr"
              value={asr}
              onChange={(e) => setAsr(e.target.value)}
              className="prayerInput"
            />
            <input
              placeholder="Maghrib"
              value={maghrib}
              onChange={(e) => setMaghrib(e.target.value)}
              className="prayerInput"
            />
            <input
              placeholder="Isha"
              value={isha}
              onChange={(e) => setIsha(e.target.value)}
              className="prayerInput"
            />

            <button className="button" onClick={handleSavePrayers}>
              Save Prayers
            </button>
          </form>

          {isPrayersSaved ? (
            <div className="confirmationContainer">
              <div className="confirmationText">Prayers Saved!</div>
              <button className="button2" onClick={() => setIsPrayersSaved(false)}>
                Close
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default Home