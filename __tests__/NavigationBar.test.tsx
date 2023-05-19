import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/router';
import { useSnapshot } from 'valtio';
import NavigationBar from '@/components/NavigationBar';

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

jest.mock('valtio', () => ({
    useSnapshot: jest.fn(),
}));

jest.mock('@/common/msg', () => ({
    msgError: jest.fn(),
    msgSuccess: jest.fn(),
}));

jest.mock('@/store/user.proxy', () => ({
    userProxy: {
        user: {},
    },
}));

describe('NavigationBar', () => {
    it('should render login/register form when user is not logged in', () => {
        useSnapshot.mockReturnValueOnce({});

        useRouter.mockReturnValueOnce({});

        render(<NavigationBar />);

        const emailInput = screen.getByPlaceholderText('Email');
        const passwordInput = screen.getByPlaceholderText('Password');
        const button = screen.getByRole('button', { name: 'Login/Register' });

        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(button).toBeInTheDocument();
    });

    it('should render user info and buttons when user is logged in', () => {
        const mockUser = {
            email: 'test@example.com',
        };
        useSnapshot.mockReturnValueOnce({ user: mockUser });

        useRouter.mockReturnValueOnce({});

        render(<NavigationBar />);

        const welcomeText = screen.getByText('Welcome');
        const userEmail = screen.getByText('test@example.com');
        const shareButton = screen.getByRole('button', { name: 'Share a movie' });
        const logoutButton = screen.getByRole('button', { name: 'Logout' });

        expect(welcomeText).toBeInTheDocument();
        expect(userEmail).toBeInTheDocument();
        expect(shareButton).toBeInTheDocument();
        expect(logoutButton).toBeInTheDocument();
    });
})