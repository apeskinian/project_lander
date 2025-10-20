import './App.css';
import { POIProvider } from './context/usePOIS.jsx';
import Header from './components/Header.jsx';
import Map from './components/Map.jsx';
import Footer from './components/Footer.jsx';
import { useState } from 'react';

function App({ testMode = false }) {
  const hasSeenModal = localStorage.getItem('seenModal');
  const [openModal, setOpenModal] = useState(!hasSeenModal);
  const [darkMode, setDarkMode] = useState(() => {
    const storedMode = localStorage.getItem('darkMode');
    return storedMode !== null ? storedMode === 'true' : false;
  });

  function handleShowModal() {
    setOpenModal(true);
  }

  function handleCloseModal() {
    setOpenModal(false);
  }

  function handleChangeMode() {
    setDarkMode(prevMode => {
      const newMode = !prevMode;
      localStorage.setItem('darkMode', newMode.toString());
      return newMode;
    });
  }


  if (testMode) {
    return (
      <>
        <button data-testid="open-btn" onClick={handleShowModal}>Open Modal</button>
        <button data-testid="close-btn" onClick={handleCloseModal}>Close Modal</button>
        <div data-testid="modal-state">{openModal ? 'Open' : 'Closed'}</div>
      </>
    );
  }

  return (
    <>
      <POIProvider>
        <Header darkMode={darkMode} changeMode={handleChangeMode}/>
        <Map modalState={openModal} darkMode={darkMode} onClose={handleCloseModal} />
        <Footer darkMode={darkMode} onOpen={handleShowModal} />
      </POIProvider>
    </>
  );
}
export default App;
