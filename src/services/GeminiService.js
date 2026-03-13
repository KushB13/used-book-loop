const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export const generateBookMetadata = async (title, author) => {
  if (!GEMINI_API_KEY || GEMINI_API_KEY === 'your_gemini_key') {
    console.warn("Gemini API Key missing, using mock data");
    await new Promise(r => setTimeout(r, 1000));
    return {
      summary: `[MOCK] An evocative exploration of themes centered around "${title}". This work by ${author} delves into the human condition with remarkable depth and precision.`,
      genre: "Contemporary Literature"
    };
  }

  // Placeholder for real implementation
  console.log(`Generating real metadata for: ${title} by ${author}`);
  // const response = await fetch(...)
  return { summary: "Live Gemini summary coming soon...", genre: "Detected Genre" };
};
