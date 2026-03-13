import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { BookCard } from '../BookCard';

// Mock the backend service
vi.mock('../../../backend/database/SwapService', () => ({
  submitSwapRequest: vi.fn(() => Promise.resolve()),
}));

describe('BookCard Component', () => {
  const mockBook = {
    id: '1',
    title: 'Modern AI',
    author: 'Jane Doe',
    summary: 'A great book about AI',
    coverUrl: 'https://example.com/cover.jpg',
    ownerId: 'user1',
    ownerName: 'Jane Owner',
    price: '15.00'
  };

  it('renders book information correctly', () => {
    render(<BookCard book={mockBook} />);
    
    expect(screen.getByText('Modern AI')).toBeInTheDocument();
    expect(screen.getByText('by Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('$15.00')).toBeInTheDocument();
    expect(screen.getByAltText('Modern AI')).toHaveAttribute('src', mockBook.coverUrl);
  });

  it('shows "Yours" badge if the user is the owner', () => {
    render(<BookCard book={mockBook} currentUserId="user1" />);
    expect(screen.getByText('Yours')).toBeInTheDocument();
  });

  it('shows "Selling" badge if the user is not the owner', () => {
    render(<BookCard book={mockBook} currentUserId="user2" />);
    expect(screen.getByText('Selling')).toBeInTheDocument();
  });

  it('shows Request Swap button for discovery and not owned', () => {
    render(<BookCard book={mockBook} isDiscovery={true} currentUserId="user2" />);
    expect(screen.getByText('🤝 Request Swap')).toBeInTheDocument();
  });

  it('does not show Request Swap button if owned', () => {
    render(<BookCard book={mockBook} isDiscovery={true} currentUserId="user1" />);
    expect(screen.queryByText('🤝 Request Swap')).not.toBeInTheDocument();
  });
});
