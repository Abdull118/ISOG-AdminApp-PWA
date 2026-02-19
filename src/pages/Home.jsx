import React, { useEffect, useState } from 'react';
import '../App.css';
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
      const response = await fetch('https://isog-prayer-times-server.vercel.app/api/prayers');
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

    const prayerData = {
      fajr,
      dhuhr,
      asr,
      maghrib,
      isha,
    };

    axios
      .post('https://isog-prayer-times-server.vercel.app/api/savePrayers', prayerData)
      .then((response) => {
        if (response.status === 200) {
          console.log('Prayer data saved!');
          setIsPrayersSaved(true);
        } else {
          console.log('Failed to save prayer data.');
        }
      })
      .catch((error) => {
        console.log('Error occurred while saving prayer data:', error);
      });
  };

  useEffect(() => {
    getPrayerTimes();
  }, []);

  return (
    <main className="page page--home">
      <section className="homeShell">
        <header className="homeTop">
          <div className="brandRow">
            <img src="/isog2.png" alt="ISOG logo" className="brandLogo" />
            <div className="brandTextWrap">
              <p className="appChip">ISOG Prayer Admin</p>
              <h1 className="homeTitle">Prayer Times</h1>
            </div>
          </div>
        </header>

        <div className="panel panel--home">
          <div className="start">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
          <div className="prayerTitle">Update the prayer timings</div>

          <form className="prayerForm">
            <input placeholder="Fajr" value={fajr} onChange={(e) => setFajr(e.target.value)} className="prayerInput" />
            <input placeholder="Dhuhr" value={dhuhr} onChange={(e) => setDhuhr(e.target.value)} className="prayerInput" />
            <input placeholder="Asr" value={asr} onChange={(e) => setAsr(e.target.value)} className="prayerInput" />
            <input placeholder="Maghrib" value={maghrib} onChange={(e) => setMaghrib(e.target.value)} className="prayerInput" />
            <input placeholder="Isha" value={isha} onChange={(e) => setIsha(e.target.value)} className="prayerInput" />

            <button className="primaryButton" onClick={handleSavePrayers}>
              Save Prayers
            </button>
          </form>
        </div>
      </section>

      {isPrayersSaved ? (
        <div className="confirmationOverlay">
          <div className="confirmationContainer">
            <div className="confirmationText">Prayers Saved</div>
            <button className="secondaryButton" onClick={() => setIsPrayersSaved(false)}>
              Close
            </button>
          </div>
        </div>
      ) : null}
    </main>
  );
};

export default Home;
