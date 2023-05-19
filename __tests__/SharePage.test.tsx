import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { msgError, msgSuccess } from '@/common/msg';
import { shareVideo } from '@/common/shareVideo';
import Share from '@/pages/share';

jest.mock('@/common/msg', () => ({
    msgError: jest.fn(),
    msgSuccess: jest.fn(),
}));

jest.mock('@/common/shareVideo', () => ({
    shareVideo: jest.fn(async () => Promise.resolve())
}));

describe('Share Page', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders the Share Page', () => {
        render(<Share />);
        const inputElement = screen.getByPlaceholderText('Youtube URL');
        const buttonElement = screen.getByRole('button', { name: /share/i });

        expect(inputElement).toBeInTheDocument();
        expect(buttonElement).toBeInTheDocument();
    });

    test('handles successful video sharing', async () => {
        render(<Share />);
        const inputElement = screen.getByPlaceholderText('Youtube URL');
        const buttonElement = screen.getByRole('button', { name: /share/i });

        fireEvent.change(inputElement, { target: { value: 'https://www.youtube.com/watch?v=abcd1234' } });
        fireEvent.click(buttonElement);

        expect(shareVideo).toHaveBeenCalledWith('https://www.youtube.com/watch?v=abcd1234');

        await waitFor(() => {
            expect(msgSuccess).toHaveBeenCalledWith('shared successfully');
            expect(inputElement.value).toBe('');
        });
    });

    test('handles failed video sharing', async () => {
        const errorMessage = 'Sharing failed';
        shareVideo.mockRejectedValueOnce(new Error(errorMessage));

        render(<Share />);
        const inputElement = screen.getByPlaceholderText('Youtube URL');
        const buttonElement = screen.getByRole('button', { name: /share/i });

        fireEvent.change(inputElement, { target: { value: 'https://www.youtube.com/watch?v=abcd1234' } });
        fireEvent.click(buttonElement);

        expect(shareVideo).toHaveBeenCalledWith('https://www.youtube.com/watch?v=abcd1234');

        await waitFor(() => {
            expect(msgError).toHaveBeenCalledWith(errorMessage);
        });

        expect(screen.queryByLabelText('loading')).not.toBeInTheDocument();
    });
});