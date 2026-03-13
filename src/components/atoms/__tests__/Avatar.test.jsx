import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import React from 'react';
import { Avatar } from '../Avatar';

describe('Avatar Component', () => {
  it('renders with an image when src is provided', () => {
    render(<Avatar src="https://example.com/photo.jpg" label="User Name" />);
    const img = screen.getByAltText('Avatar');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://example.com/photo.jpg');
  });

  it('renders with a fallback initial when src is empty', () => {
    render(<Avatar src="" label="John Doe" />);
    expect(screen.getByText('J')).toBeInTheDocument();
  });

  it('renders default icon when no src or label provided', () => {
    render(<Avatar />);
    expect(screen.getByText('👤')).toBeInTheDocument();
  });

  it('shows google badge when showGoogle is true', () => {
    render(<Avatar showGoogle={true} />);
    const googleBadge = screen.getByAltText('G');
    expect(googleBadge).toBeInTheDocument();
  });
});
