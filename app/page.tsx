import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import MarqueeSection from './components/MarqueeSection'
import ProductsSection from './components/ProductsSection'
import StatsSection from './components/StatsSection'
import SustainabilitySection from './components/SustainabilitySection'
import CTASection from './components/CTASection'
import Footer from './components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <MarqueeSection />
      <ProductsSection />
      <StatsSection />
      <SustainabilitySection />
      <CTASection />
      <Footer />
    </>
  )
}
