import './App.css'
import { POIProvider } from './context/usePOIS.jsx'
import Header from './components/Header.jsx'
import Map from './components/Map.jsx'
import Footer from './components/Footer.jsx'

function App() {
  return (
    <>
      <POIProvider>
        <Header />
        <Map />
        <Footer />
      </POIProvider>
    </>
  )
}
export default App
