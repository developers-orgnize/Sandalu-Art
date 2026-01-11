import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, X } from 'lucide-react';

// Artwork data matching GalleryRoom
const artworksData = [
  { id: 'etude-i', title: 'étude I', image: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800&h=1000&fit=crop&q=80', description: 'A study in form and light, exploring the boundaries between abstract and representational art.', year: '2024', medium: 'Digital Photography' },
  { id: 'portrait', title: 'portrait', image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&h=1000&fit=crop&q=80', description: 'An intimate exploration of human expression, captured in a moment of quiet reflection.', year: '2024', medium: 'Digital Photography' },
  { id: 'nature-morte', title: 'nature morte', image: 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=800&h=1000&fit=crop&q=80', description: 'Still life reimagined through a contemporary lens, finding beauty in everyday objects.', year: '2023', medium: 'Digital Photography' },
  { id: 'composition', title: 'composition', image: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=800&h=1000&fit=crop&q=80', description: 'A carefully arranged study of color, shape, and spatial relationships.', year: '2023', medium: 'Digital Photography' },
  { id: 'etude-ii', title: 'étude II', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1000&fit=crop&q=80', description: 'The second in a series exploring texture and dimension in everyday scenes.', year: '2024', medium: 'Digital Photography' },
  { id: 'abstraction', title: 'abstraction', image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=1000&fit=crop&q=80', description: 'Pure visual poetry, where form dissolves into emotion and color speaks louder than words.', year: '2023', medium: 'Digital Photography' },
  { id: 'melancolie', title: 'mélancolie', image: 'https://images.unsplash.com/photo-1582201942988-13e60e4556ee?w=800&h=1000&fit=crop&q=80', description: 'A meditation on solitude and the beauty found in moments of quiet introspection.', year: '2024', medium: 'Digital Photography' },
  { id: 'reverie', title: 'rêverie', image: 'https://images.unsplash.com/photo-1569172122301-bc5008bc09c5?w=800&h=1000&fit=crop&q=80', description: 'Dreams captured in light and shadow, inviting viewers into a world of imagination.', year: '2023', medium: 'Digital Photography' },
  { id: 'info', title: 'About the Artist', image: '', description: 'I am Thushan Ekanayaka, a dedicated and innovative design and creativity ICT graduate at the Faculty of Technology, University of Sri Jayewardenepura.', year: '', medium: '', isInfo: true },
];

const ArtworkDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const artwork = artworksData.find(a => a.id === id);
  
  if (!artwork) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white">Artwork not found</p>
      </div>
    );
  }

  const handleBack = () => {
    navigate('/gallery');
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Close button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        onClick={handleBack}
        className="fixed top-8 right-8 z-50 p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors"
      >
        <X size={24} />
      </motion.button>

      {/* Back button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        onClick={handleBack}
        className="fixed top-8 left-8 z-50 flex items-center gap-2 p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors"
      >
        <ArrowLeft size={20} />
        <span className="pr-2 text-sm">Back to Gallery</span>
      </motion.button>

      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Image Section */}
        {artwork.image && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="lg:w-2/3 h-[50vh] lg:h-screen flex items-center justify-center p-8 lg:p-16"
          >
            <img
              src={artwork.image}
              alt={artwork.title}
              className="max-h-full max-w-full object-contain shadow-2xl"
            />
          </motion.div>
        )}

        {/* Details Section */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`${artwork.image ? 'lg:w-1/3' : 'w-full'} flex items-center justify-center p-8 lg:p-16 bg-gradient-to-b lg:bg-gradient-to-l from-neutral-900 to-black`}
        >
          <div className="max-w-md">
            {artwork.isInfo ? (
              <>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-sm tracking-[0.3em] text-neutral-400 mb-4"
                >
                  SOFTWARE ENGINEER & PHOTOGRAPHER
                </motion.p>
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-4xl lg:text-5xl font-light mb-8"
                >
                  Thushan Ekanayaka
                </motion.h1>
              </>
            ) : (
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-4xl lg:text-6xl font-light mb-6 capitalize"
              >
                {artwork.title}
              </motion.h1>
            )}
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-neutral-300 text-lg leading-relaxed mb-8"
            >
              {artwork.description}
            </motion.p>

            {!artwork.isInfo && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="space-y-4 border-t border-neutral-800 pt-8"
              >
                {artwork.year && (
                  <div>
                    <p className="text-sm text-neutral-500 uppercase tracking-wider">Year</p>
                    <p className="text-white">{artwork.year}</p>
                  </div>
                )}
                {artwork.medium && (
                  <div>
                    <p className="text-sm text-neutral-500 uppercase tracking-wider">Medium</p>
                    <p className="text-white">{artwork.medium}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-neutral-500 uppercase tracking-wider">Artist</p>
                  <p className="text-white">Thushan Ekanayaka</p>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ArtworkDetail;
