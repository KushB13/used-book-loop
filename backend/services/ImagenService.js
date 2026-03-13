export const generateBookCover = async (title, author) => {
  console.log(`Generating cover for: ${title}`);
  await new Promise(r => setTimeout(r, 1500));
  return `https://placehold.co/400x600/0D4D4D/white?text=${encodeURIComponent(title)}`;
};
