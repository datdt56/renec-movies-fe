import {act, fireEvent, render, screen} from '@testing-library/react';
import {useRouter} from 'next/router';
import {useSnapshot} from 'valtio';
import NavigationBar from '@/components/NavigationBar';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "@firebase/auth";

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
jest.mock('@firebase/auth',() => ({
    getAuth: jest.fn().mockReturnValue({}),
    createUserWithEmailAndPassword: jest.fn(),
    signInWithEmailAndPassword: jest.fn(),
    signOut: jest.fn()
}))

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
    it('should call createUserWithEmailAndPassword when handleRegister is called', () => {
        const push = jest.fn();
        useSnapshot.mockReturnValueOnce({ user: {} });

        useRouter.mockReturnValueOnce({ push });

        render(<NavigationBar />);

        const emailInput = screen.getByPlaceholderText('Email');
        const passwordInput = screen.getByPlaceholderText('Password');
        const button = screen.getByRole('button', { name: 'Login/Register' });

        act(() => {
            fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
            fireEvent.change(passwordInput, { target: { value: 'password123' } });
            fireEvent.click(button);
        });

        expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
            expect.any(Object),
            'test@example.com',
            'password123'
        );
    });
    it('should call signInWithEmailAndPassword when handleRegister is called with existing email', async () => {
        useSnapshot.mockReturnValueOnce({ user: {} });
        createUserWithEmailAndPassword.mockImplementation(() => {
            throw new Error("email-already-in-use");
        });
        render(<NavigationBar />);

        const emailInput = screen.getByPlaceholderText('Email');
        const passwordInput = screen.getByPlaceholderText('Password');
        const button = screen.getByRole('button', { name: 'Login/Register' });

        act(() => {
            fireEvent.change(emailInput, { target: { value: 'existing@example.com' } });
            fireEvent.change(passwordInput, { target: { value: 'password123' } });
            fireEvent.click(button);
        });

        await expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
            expect.any(Object),
            'existing@example.com',
            'password123'
        );
    },5000);
})