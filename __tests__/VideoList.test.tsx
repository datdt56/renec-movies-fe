import React from 'react';
import { render, screen } from '@testing-library/react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Spin } from 'antd';
import VideoItem from '@/components/VideoItem';
import VideoList from '@/components/VideoList';

jest.mock('react-firebase-hooks/firestore', () => ({
    useCollectionData: jest.fn(),
}));

jest.mock('@/configs/firebase', () => ({
    videosCollRef: jest.fn(),
}));

jest.mock('antd', () => ({
    Spin: jest.fn(({ spinning, children }) => (spinning ? <div data-testid="spin" /> : children)),
}));

jest.mock('@/components/VideoItem', () => jest.fn(() => <div data-testid="video-item" />));

describe('VideoList', () => {
    it('renders loading spinner when loading is true', () => {
        useCollectionData.mockReturnValue([null, true, null]);

        render(<VideoList />);

        expect(screen.getByTestId('spin')).toBeInTheDocument();
        expect(screen.queryByTestId('video-item')).not.toBeInTheDocument();
    });

    it('renders error message when error exists', () => {
        const error = new Error('Test error');
        useCollectionData.mockReturnValue([null, false, error]);

        render(<VideoList />);

        expect(screen.getByText(error.toString())).toBeInTheDocument();
        expect(screen.queryByTestId('video-item')).not.toBeInTheDocument();
    });

    it('renders VideoItem components when list exists', () => {
        const list = [{ youtubeId: '1', email: 'test1@example.com' }, { youtubeId: '2', email: 'test2@example.com' }];
        useCollectionData.mockReturnValue([list, false, null]);

        render(<VideoList />);

        expect(screen.queryByTestId('spin')).not.toBeInTheDocument();
        expect(screen.getAllByTestId('video-item')).toHaveLength(2);
        expect(VideoItem).toHaveBeenCalledTimes(2);
        expect(VideoItem).toHaveBeenCalledWith({ youtubeId: '1', email: 'test1@example.com' }, {});
        expect(VideoItem).toHaveBeenCalledWith({ youtubeId: '2', email: 'test2@example.com' }, {});
    });
});
