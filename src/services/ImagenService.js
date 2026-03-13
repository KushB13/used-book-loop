const IMAGEN_API_KEY = import.meta.env.VITE_IMAGEN_API_KEY;

export const generateBookCover = async (title, author) => {
  if (!IMAGEN_API_KEY || IMAGEN_API_KEY === 'your_imagen_key') {
    console.warn("Imagen API Key missing, using mock data");
    await new Promise(r => setTimeout(r, 1500));
    return `https://placehold.co/400x600/0D4D4D/white?text=${encodeURIComponent(title)}`;
  }

  // Placeholder for real implementation
  console.log(`Generating real cover for: ${title}`);
  return `https://placehold.co/400x600/4F46E5/white?text=LIVE+IMAGEN+COVER`;
};
