import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { HeroSection } from './sections/HeroSection'
import { ProblemSection } from './sections/ProblemSection'
import { ValuePropositionSection } from './sections/ValuePropositionSection'
import { PillarsSection } from './sections/PillarsSection'
import { OffersSection } from './sections/OffersSection'
import { MethodologySection } from './sections/MethodologySection'
import { DifferentialsSection } from './sections/DifferentialsSection'
import { AudienceSection } from './sections/AudienceSection'
import { FinalCTASection } from './sections/FinalCTASection'
import { ContactSection } from './sections/ContactSection'

function App() {
  return (
    <>
      <Header />
      <main id="main-content">
        <HeroSection />
        <ProblemSection />
        <ValuePropositionSection />
        <PillarsSection />
        <OffersSection />
        <MethodologySection />
        <DifferentialsSection />
        <AudienceSection />
        <FinalCTASection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}

export default App
