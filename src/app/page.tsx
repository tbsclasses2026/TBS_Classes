import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import SubjectSection from '@/components/SubjectSection';
import CodingSection from '@/components/CodingSection';
import NotesSection from '@/components/NotesSection';
import FeaturedResources from '@/components/FeaturedResources';
import CommunitySection from '@/components/CommunitySection';

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <SubjectSection />
      <CodingSection />
      <NotesSection />
      <FeaturedResources />
      <CommunitySection />
    </>
  );
}
