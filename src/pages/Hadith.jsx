import React, { useEffect, useState } from 'react';
import './Admin.css';

const Hadith = () => {
  const [hadiths, setHadiths] = useState([]);
  const [newHadiths, setNewHadiths] = useState('');

  const [hadithBook, setHadithBook] = useState('--none--');
  const [hadithNumber, setHadithNumber] = useState('');

  const getHadiths = async () => {
    try {
      const response = await fetch('https://isog-prayer-times-server.vercel.app/api/hadiths');
      const data = await response.json();
      setHadiths(data.hadith);
    } catch (error) {
      console.log(error);
    }
  };

  const getHadithAPI = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/${hadithBook}/${hadithNumber}.json`
      );
      const data = await response.json();
      console.log(data.hadiths[0].text);
      setNewHadiths(`${data.hadiths[0].text} (${data.metadata.name} ${data.hadiths[0].hadithnumber})`);
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
        body: JSON.stringify({ hadith: [...hadiths, newHadiths] }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setHadiths(data.hadith || []);
      setNewHadiths('');
      console.log('Hadith saved successfully:', data);
    } catch (error) {
      console.log('Error saving hadith:', error);
    }
  };

  const deleteHadith = async (index) => {
    try {
      const response = await fetch(`https://isog-prayer-times-server.vercel.app/api/hadith/${index}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log(`Hadith at index ${index} deleted successfully`);
      setHadiths((prevHadiths) => prevHadiths.filter((_, i) => i !== index));
    } catch (error) {
      console.log('Error deleting hadith:', error);
    }
  };

  useEffect(() => {
    getHadiths();
  }, [newHadiths]);

  return (
    <main className="page adminPage">
      <section className="adminShell">
        <header className="adminHeader">
          <div className="brandRow brandRow--compact">
            <img src="/isog2.png" alt="ISOG logo" className="brandLogo" />
            <div className="brandTextWrap">
              <p className="appChip">ISOG Prayer Admin</p>
              <h1 className="adminTitle">Hadith</h1>
            </div>
          </div>
          <p className="adminSubtitle">Add a custom hadith or search by collection and number.</p>
        </header>

        <section className="entryList" aria-label="Hadith list">
          {hadiths
            ? hadiths.map((hadith, index) => (
                <article className="entryCard" key={`${index}-${hadith.slice(0, 20)}`}>
                  <p className="entryText">{hadith}</p>
                  <button className="iconButton" onClick={() => deleteHadith(index)}>
                    X
                  </button>
                </article>
              ))
            : null}
        </section>

        <form className="adminForm">
          <textarea
            className="adminTextarea"
            placeholder="Enter New Hadith"
            onChange={(event) => {
              setNewHadiths(event.target.value);
            }}
            value={newHadiths}
          />

          <div className="lookupRow">
            <select className="selector" onChange={(event) => setHadithBook(event.target.value)} value={hadithBook}>
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

            {hadithBook !== '--none--' ? (
              <>
                <input
                  placeholder="Hadith Number"
                  onChange={(event) => setHadithNumber(event.target.value)}
                  value={hadithNumber}
                  className="inputFieldHadithNumber"
                />

                <button className="secondaryAction" onClick={getHadithAPI}>
                  Search Hadith
                </button>
              </>
            ) : null}
          </div>

          <button className="primaryAction" onClick={saveHadith}>
            Add Hadith
          </button>
        </form>
      </section>
    </main>
  );
};

export default Hadith;
