import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Brings from './components/Brings'
import Work from './components/Projects'
import Capabilities from './components/Skills'
import About from './components/About'
import Log from './components/Learning'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0d] text-[#f2f2f0]">
      <Navbar />
      <main>
        <Hero />
        <Brings />
        <Work />
        <Capabilities />
        <About />
        <Log />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
