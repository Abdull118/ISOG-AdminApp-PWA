import React, { useEffect, useState } from 'react';
import './Admin.css';

const Admin = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [newAnnouncement, setNewAnnouncement] = useState('');

  const getAnnouncements = async () => {
    try {
      const response = await fetch('https://isog-prayer-times-server.vercel.app/api/announcements');
      const data = await response.json();
      setAnnouncements(data.annoucements);
    } catch (error) {
      console.log(error);
    }
  };

  const saveAnnouncement = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://isog-prayer-times-server.vercel.app/api/postAnnouncements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ annoucements: [...announcements, newAnnouncement] }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setAnnouncements(data.annoucements || []);
      setNewAnnouncement('');
      console.log('Announcement saved successfully:', data);
    } catch (error) {
      console.log('Error saving announcement:', error);
    }
  };

  const deleteAnnouncement = async (index) => {
    try {
      const response = await fetch(`https://isog-prayer-times-server.vercel.app/api/announcement/${index}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log(`Announcement at index ${index} deleted successfully`);
      setAnnouncements((prevAnnouncements) => prevAnnouncements.filter((_, i) => i !== index));
    } catch (error) {
      console.log('Error deleting announcement:', error);
    }
  };

  useEffect(() => {
    getAnnouncements();
  }, [newAnnouncement]);

  return (
    <main className="page adminPage">
      <section className="adminShell">
        <header className="adminHeader">
          <div className="brandRow brandRow--compact">
            <img src="/isog2.png" alt="ISOG logo" className="brandLogo" />
            <div className="brandTextWrap">
              <p className="appChip">ISOG Prayer Admin</p>
              <h1 className="adminTitle">Announcements</h1>
            </div>
          </div>
          <p className="adminSubtitle">Push short updates.</p>
        </header>

        <section className="entryList" aria-label="Announcement list">
          {announcements
            ? announcements.map((announcement, index) => (
                <article className="entryCard" key={`${announcement}-${index}`}>
                  <p className="entryText">{announcement}</p>
                  <button className="iconButton" onClick={() => deleteAnnouncement(index)}>
                    X
                  </button>
                </article>
              ))
            : null}
        </section>

        <form className="adminForm">
          <textarea
            className="adminTextarea"
            placeholder="Enter New Announcement"
            onChange={(event) => {
              setNewAnnouncement(event.target.value);
            }}
            value={newAnnouncement}
          />
          <button className="primaryAction" onClick={saveAnnouncement}>
            Add Announcement
          </button>
        </form>
      </section>
    </main>
  );
};

export default Admin;
