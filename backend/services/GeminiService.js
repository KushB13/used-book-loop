export const generateBookMetadata = async (title, author) => {
  console.log(`Generating metadata for: ${title} by ${author}`);
  await new Promise(r => setTimeout(r, 1000));
  return {
    summary: `An evocative exploration of themes centered around "${title}". This work by ${author} delves into the human condition with remarkable depth and precision.`,
    genre: "Contemporary Literature"
  };
};
