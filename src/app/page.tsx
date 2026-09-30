import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import YouTubeSection from '@/components/YouTubeSection';
import CodingSection from '@/components/CodingSection';
import FeaturedResources from '@/components/FeaturedResources';
import CommunitySection from '@/components/CommunitySection';

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <YouTubeSection />
      <CodingSection />
      <FeaturedResources />
      <CommunitySection />
    </>
  );
}
