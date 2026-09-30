import { supabase } from "@/lib/supabase";
import { Youtube } from "lucide-react";

export default async function YouTubeSection() {
  const { data: videos } = await supabase.from('youtube_videos').select('*').order('created_at', { ascending: false }).limit(6);

  const displayVideos = videos && videos.length > 0 ? videos : [
    {
      id: 'placeholder',
      title: 'Upload your first YouTube video from the Admin Portal',
      youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      thumbnail_url: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop',
    }
  ];

  const getEmbedUrl = (url: string) => {
    let videoId = "";
    if (url.includes("v=")) {
      videoId = url.split("v=")[1]?.split("&")[0];
    } else if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1]?.split("?")[0];
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
  };

  return (
    <section className="bg-navy py-16 border-t border-gray-800">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-3 flex items-center justify-center gap-2">
            <Youtube className="w-5 h-5 text-red-500" />
            Featured Content
          </h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-white">Latest Video Lectures</h3>
        </div>

        <div className="flex flex-wrap justify-center items-stretch gap-8">
          {displayVideos.map((video: any) => {
            const embedUrl = getEmbedUrl(video.youtube_url);
            
            return (
              <div 
                key={video.id} 
                className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.33rem)] max-w-lg group relative block rounded-2xl overflow-hidden shadow-lg border border-gray-800 bg-gray-900 transition-transform duration-300 hover:-translate-y-2 hover:shadow-primary/20 flex flex-col"
              >
                <div className="aspect-video relative bg-black w-full">
                  {embedUrl ? (
                    <iframe 
                      className="w-full h-full absolute top-0 left-0"
                      src={embedUrl} 
                      title={video.title} 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <img 
                      src={video.thumbnail_url} 
                      alt={video.title} 
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="p-5">
                  <h4 className="text-lg font-bold text-white line-clamp-2 transition-colors">
                    {video.title}
                  </h4>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
