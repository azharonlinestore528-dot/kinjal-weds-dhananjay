import { useState } from 'react';
import { FloatingFloralLayer, type FloralIntensity } from './components/FloatingFloralLayer';
import { MiniatureCelebrations } from './components/MiniatureCelebrations';
import { LotusDivider } from './components/OrnamentalMotifs';
import { PalaceDoorHero } from './components/PalaceDoorHero';
import { PeacockSanctuary } from './components/PeacockSanctuary';
import { RoyalInvitationCard } from './components/RoyalInvitationCard';
import { RoyalKeepsakeStudio } from './components/RoyalKeepsakeStudio';
import { RoyalMandap3D } from './components/RoyalMandap3D';
import { ScratchRevealCard } from './components/ScratchRevealCard';
import { VenueAndRsvp } from './components/VenueAndRsvp';
import { weddingConfig } from './config/weddingConfig';

export default function App() {
  const [heroActive, setHeroActive] = useState(true);
  const [heroGlowActive, setHeroGlowActive] = useState(false);
  const [revealPopupOpen, setRevealPopupOpen] = useState(false);
  const [eventsFloralIntensity, setEventsFloralIntensity] = useState<FloralIntensity>('ambient');

  const computedIntensity: FloralIntensity =
    revealPopupOpen || eventsFloralIntensity === 'climax' || (heroActive && heroGlowActive)
      ? 'climax'
      : heroActive || eventsFloralIntensity === 'elevated'
      ? 'elevated'
      : 'ambient';

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF5EB] text-[#2B1418] relative">
      {/* Multi-flower falling atmosphere (roses, lotus, lily, marigold & floral flakes) */}
      <FloatingFloralLayer intensity={computedIntensity} />

      {/* 01-03. Full-Screen Edge-to-Edge Tap-to-Enter Palace Gate -> Complete Exit */}
      <PalaceDoorHero
        onEnterInvitation={() => scrollToSection('royal-invitation')}
        onHeroActiveChange={setHeroActive}
        onGlowChange={setHeroGlowActive}
      />

      {/* Clean 3-Zone Editorial Chapter Navigation Bar */}
      <header className="sticky top-0 z-20 bg-[#FAF5EB]/95 border-b border-[#C49A45]/45 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-8">
          <a
            href="#royal-invitation"
            className="font-calligraphy text-2xl sm:text-3xl text-[#7A1B2E] whitespace-nowrap shrink-0"
          >
            {weddingConfig.couple.bride} &amp; {weddingConfig.couple.groom}
          </a>

          <nav
            aria-label="Wedding Story Chapters"
            className="hidden md:flex items-center gap-6 text-xs tracking-[0.2em] uppercase font-semibold text-[#5C1222]"
          >
            <a
              href="#royal-invitation"
              className="hover:text-[#9F7624] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Invitation
            </a>
            <a
              href="#celebrations"
              className="hover:text-[#9F7624] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Events
            </a>
            <a
              href="#royal-peacock"
              className="hover:text-[#9F7624] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Peacock
            </a>
            <a
              href="#royal-mandap-3d"
              className="hover:text-[#9F7624] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              3D Mandap
            </a>
            <a
              href="#keepsake-studio"
              className="hover:text-[#9F7624] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Keepsake
            </a>
          </nav>

          <div className="shrink-0">
            <a
              href="#rsvp"
              className="px-4 py-2 rounded-full bg-[#7A1B2E] text-[#FAF5EB] text-xs font-semibold tracking-widest uppercase hover:bg-[#5C1222] transition-colors whitespace-nowrap shrink-0"
            >
              RSVP
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* 04. Luxury Antique Ivory Wedding Invitation Card + Live Countdown */}
        <RoyalInvitationCard />

        {/* 05. Interactive Burgundy Velvet & Gold Scratch Card + Reveal Popup */}
        <ScratchRevealCard onPopupOpenChange={setRevealPopupOpen} />

        {/* 06-08. Scroll-Driven Upward-Opening Bilingual Event Cards + Lunch + Royal Procession */}
        <MiniatureCelebrations
          onJumpToRsvp={() => scrollToSection('rsvp')}
          onFloralStateChange={setEventsFloralIntensity}
        />

        {/* 09. Static Royal Indian Peacock & Lotus Sanctuary above 3D Mandap */}
        <PeacockSanctuary />

        {/* 10. Three.js 3D Royal Palace Courtyard & Wedding Mandap */}
        <RoyalMandap3D />

        {/* 11. Silent Photo-to-Video Royal Keepsake Studio */}
        <RoyalKeepsakeStudio />

        {/* 12. Udaipur Wedding Venue & WhatsApp RSVP */}
        <VenueAndRsvp />
      </main>

      {/* Closing Invitation Footer */}
      <footer className="bg-[#21090F] text-[#FAF5EB] py-14 px-4 text-center border-t border-[#C49A45]/45">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#DFBA66]">
            With Warmest Blessings &amp; Love
          </p>
          <p className="font-calligraphy text-5xl sm:text-6xl text-[#FAF5EB] mt-3">
            {weddingConfig.couple.displayCalligraphy}
          </p>
          <LotusDivider tone="ivory" className="my-5" />
          <p className="text-base sm:text-lg text-[#F3E9D4]/90">
            {weddingConfig.invitation.date} · {weddingConfig.invitation.time}
          </p>
          <p className="text-sm sm:text-base text-[#F3E9D4]/75 mt-1">
            {weddingConfig.invitation.venueFull}
          </p>
        </div>
      </footer>
    </div>
  );
}
