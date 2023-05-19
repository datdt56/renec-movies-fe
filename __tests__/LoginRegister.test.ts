import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "@firebase/auth";
import {auth} from "@/configs/firebase";

const randomEmail = require("random-email");
const generateUniqueId = require('generate-unique-id');

describe('Firebase Auth Tests', () => {
    beforeAll(() => {

    })
    beforeEach(() => {
    });

    afterEach(() => {
    });

    it('should register a new user successfully with valid email and password', async () => {
        const email = randomEmail()
        const password = generateUniqueId({length:6})
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        expect(userCredential.user.email).toBeTruthy()
    },5000);

    it('should be failed to register a new user with invalid email', async () => {
        try{
            const user = { email: 'test', password: 'password' };
            await createUserWithEmailAndPassword(auth, user.email, user.password);
        }catch (e: any) {
            expect(e.message).toBeTruthy()
        }
    });
    it('should be failed to register a new user with invalid password', async () => {
        try{
            const email = randomEmail()
            const password = generateUniqueId({length:4})
            await createUserWithEmailAndPassword(auth, email, password);
        }catch (e: any) {
            expect(e.message).toBeTruthy()
        }
    });
    it('should return a specified error message when trying to register with registered email', async () => {
        try{
            const password = generateUniqueId({length:6})
            const userCredential = await createUserWithEmailAndPassword(auth, 'datdt56@gmail.com', password);
        }catch (e:any) {
            expect(e.message.includes('email-already-in-use')).toBeTruthy()
        }
    });
    it('should be successful when trying to login with valid email and password', async () => {
        const userCredential = await signInWithEmailAndPassword(auth, 'datdt56@gmail.com', 'dat931');
        expect(userCredential.user.email === 'datdt56@gmail.com').toBeTruthy()
    });

});