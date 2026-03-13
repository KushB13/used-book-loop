import { describe, it, expect, vi } from 'vitest';
import { generateBookMetadata } from '../GeminiService';

describe('GeminiService', () => {
  it('generateBookMetadata returns expected structure', async () => {
    const metadata = await generateBookMetadata('The Great Gatsby', 'F. Scott Fitzgerald');
    
    expect(metadata).toHaveProperty('summary');
    expect(metadata).toHaveProperty('genre');
    expect(metadata.summary).toContain('The Great Gatsby');
    expect(metadata.summary).toContain('F. Scott Fitzgerald');
    expect(metadata.genre).toBe('Contemporary Literature');
  });
});
