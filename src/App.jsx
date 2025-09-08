import './App.css';
import { POIProvider } from './context/usePOIS.jsx';
import Header from './components/Header.jsx';
import Map from './components/Map.jsx';
import Footer from './components/Footer.jsx';
import { useState } from 'react';

function App({ testMode = false }) {
  const hasSeenModal = localStorage.getItem('seenModal');
  const [openModal, setOpenModal] = useState(!hasSeenModal);

  function handleShowModal() {
    setOpenModal(true);
  }

  function handleCloseModal() {
    setOpenModal(false);
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
        <Header />
        <Map modalState={openModal} onClose={handleCloseModal} />
        <Footer onOpen={handleShowModal} />
      </POIProvider>
    </>
  );
}
export default App;
