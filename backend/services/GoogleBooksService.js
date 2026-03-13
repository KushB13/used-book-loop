/**
 * Google Books API Service
 * Used for book recognition and metadata fetching.
 */

export const searchBooks = async (query) => {
  if (!query) return [];
  try {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=5`);
    const data = await response.json();
    
    if (!data.items) return [];

    return data.items.map(item => {
      const info = item.volumeInfo;
      return {
        id: item.id,
        title: info.title,
        author: info.authors ? info.authors.join(', ') : 'Unknown Author',
        summary: info.description || '',
        genre: info.categories ? info.categories[0] : 'General',
        coverUrl: info.imageLinks ? info.imageLinks.thumbnail.replace('http:', 'https:') : '',
        isbn: info.industryIdentifiers ? info.industryIdentifiers[0].identifier : ''
      };
    });
  } catch (error) {
    console.error("Google Books API Error:", error);
    return [];
  }
};

export const getBookByISBN = async (isbn) => {
  return searchBooks(`isbn:${isbn}`);
};
