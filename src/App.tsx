import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Sponsors from './components/Sponsors';
import Tracks from './components/Tracks';
import Dates from './components/Dates';
import Committee from './components/Committee';
import Gallery from './components/Gallery';
import Speakers from './components/Speakers';
import Venue from './components/Venue';
import Footer from './components/Footer';
import Registration from './components/Registration';

function App() {
  return (
    <div className="relative text-pale-cream min-h-screen">
      <Navbar />
      {/* SECTION 1: HERO */}
      <Hero />

      {/* Content sections connected by SVG curves/waves */}
      <div className="relative w-full overflow-hidden">
        <About />
        <Tracks />
        <Dates />
        <Committee />
        <Registration />
        <Speakers />
        <Sponsors />
        <Gallery />
        <Venue />
        <Footer />
      </div>
    </div>
  );
}

export default App;
