import { describe, it, expect, vi, beforeEach } from 'vitest';
import { searchBooks, getBookByISBN } from '../GoogleBooksService';

global.fetch = vi.fn();

describe('GoogleBooksService', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('searchBooks returns formatted books on success', async () => {
    const mockResponse = {
      items: [
        {
          id: '1',
          volumeInfo: {
            title: 'Test Book',
            authors: ['Author A', 'Author B'],
            description: 'A test book summary',
            categories: ['Fiction'],
            imageLinks: { thumbnail: 'http://test.com/image.jpg' },
            industryIdentifiers: [{ identifier: '1234567890' }]
          }
        }
      ]
    };

    fetch.mockResolvedValueOnce({
      json: async () => mockResponse,
    });

    const results = await searchBooks('test query');

    expect(results).toHaveLength(1);
    expect(results[0]).toEqual({
      id: '1',
      title: 'Test Book',
      author: 'Author A, Author B',
      summary: 'A test book summary',
      genre: 'Fiction',
      coverUrl: 'https://test.com/image.jpg',
      isbn: '1234567890'
    });
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('q=test%20query'));
  });

  it('searchBooks returns empty array when no items found', async () => {
    fetch.mockResolvedValueOnce({
      json: async () => ({}),
    });

    const results = await searchBooks('empty query');
    expect(results).toEqual([]);
  });

  it('searchBooks returns empty array on fetch error', async () => {
    fetch.mockRejectedValueOnce(new Error('Network error'));

    const results = await searchBooks('fail query');
    expect(results).toEqual([]);
  });

  it('getBookByISBN calls searchBooks with isbn prefix', async () => {
    fetch.mockResolvedValueOnce({
        json: async () => ({ items: [] }),
    });
    await getBookByISBN('12345');
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('q=isbn%3A12345'));
  });
});
