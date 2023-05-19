import { render, screen } from '@testing-library/react';
import VideoItem from '@/components/VideoItem';
import '@testing-library/jest-dom/extend-expect';

// Mock the useYoutubeVideoData hook
jest.mock('../src/hooks/useYoutubeVideoData', () => ({
    __esModule: true,
    default: jest.fn(() => ({
        data: {
            title: 'Test Title',
            description: 'Test Description',
        },
    })),
}));

describe('VideoItem', () => {
    beforeEach(() => {
        // Mock the useWindowSize hook
        jest.spyOn(require('react-use'), 'useWindowSize').mockReturnValue({
            width: 800,
            height: 600,
        });
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('renders the video with correct dimensions and data', () => {
        const youtubeId = 'abcdefg';
        const email = 'test@example.com';

        render(<VideoItem youtubeId={youtubeId} email={email}/> );

        const iframeElement = screen.getByRole('youtube-iframe');
        expect(iframeElement).toBeInTheDocument();
        expect(iframeElement).toHaveAttribute('src', `https://www.youtube.com/embed/${youtubeId}`);
        expect(iframeElement).toHaveAttribute('allowFullScreen');

        const titleElement = screen.getByText('Test Title');
        expect(titleElement).toBeInTheDocument();

        const emailElement = screen.getByText(`Shared by ${email}`);
        expect(emailElement).toBeInTheDocument();

        const descriptionElement = screen.getByText('Test Description');
        expect(descriptionElement).toBeInTheDocument();
    });
});
