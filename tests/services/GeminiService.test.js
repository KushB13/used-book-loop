import { describe, it, expect } from 'vitest';
import { generateBookMetadata } from '../../src/services/GeminiService';

describe('GeminiService', () => {
  it('should generate book metadata', async () => {
    const metadata = await generateBookMetadata('The Great Gatsby', 'F. Scott Fitzgerald');
    expect(metadata).toHaveProperty('summary');
    expect(metadata).toHaveProperty('genre');
    expect(metadata.genre).toBe('Contemporary Literature');
  });
});
