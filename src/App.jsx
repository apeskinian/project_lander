import './App.css'
import { POIProvider } from './context/usePOIS.jsx'
import Header from './components/Header.jsx'
import Map from './components/Map.jsx'
import Footer from './components/Footer.jsx'
import { useState } from 'react'

function App() {
  const [ openModal, setOpenModal ] = useState(true);

  function handleShowModal() {
    setOpenModal(true);
  }

  function handleCloseModal() {
    setOpenModal(false);
  }

  return (
    <>
      <POIProvider>
        <Header />
        <Map modalState={openModal} onClose={handleCloseModal} onOpen={handleShowModal}/>
        <Footer onOpen={handleShowModal}/>
      </POIProvider>
    </>
  )
}
export default App
