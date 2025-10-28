import HeroSection from '../components/HeroSection'
import Features from '../components/Features'
import HowItWorks from '../components/HowItWorks'
import AboutTeam from '../components/Aboutteam'
import Footer from '../components/layout/Footer'

export default function HomePage() {
  return (
    <div>
      <div id="hero">
        <HeroSection />
      </div>
      <div id="Features">
        <Features />
      </div>
      <div id="HowItWorks">
        <HowItWorks />
      </div>
      <div id="AboutTeam">
        <AboutTeam />
      </div>
      <Footer />
    </div>
  )
}
