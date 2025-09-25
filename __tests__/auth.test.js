const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const UserData = require('../src/models/userData');
const authRoutes = require('../src/routes/auth');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);

// Mock the mailer to prevent sending actual emails
jest.mock('../src/utils/sendMail', () => ({
    sendEmail: jest.fn().mockResolvedValue(true),
    sendPasswordResetEmail: jest.fn().mockResolvedValue(true),
}));


describe('Auth Endpoints', () => {
    // Connect to a test database before all tests
    beforeAll(async () => {
        const url = process.env.uri;
        if (!url) {
            throw new Error("Test database URI not found in .env file");
        }
        await mongoose.connect(url);
    });

    // Clear the test database after each test
    afterEach(async () => {
        await UserData.deleteMany();
    });

    // Disconnect from the test database after all tests
    afterAll(async () => {
        await mongoose.connection.close();
    });

    // --- Signup Tests ---
    describe('POST /api/auth/register', () => {
        it('should create a new user successfully', async () => {
            const res = await request(app)
                .post('/api/auth/register')
                .send({
                    username: 'testuser',
                    email: 'test@example.com',
                    password: 'password123',
                });
            expect(res.statusCode).toEqual(201);
            expect(res.body.state).toBe('success');

            const user = await UserData.findOne({ email: 'test@example.com' });
            expect(user).not.toBeNull();
            expect(user.userName).toBe('testuser');
        });

        it('should return an error if username is taken', async () => {
            // First, create a user
            await request(app)
                .post('/api/auth/register')
                .send({
                    username: 'testuser',
                    email: 'test@example.com',
                    password: 'password123',
                });

            // Then, try to create another user with the same username
            const res = await request(app)
                .post('/api/auth/register')
                .send({
                    username: 'testuser',
                    email: 'another@example.com',
                    password: 'password123',
                });

            expect(res.statusCode).toEqual(400);
            expect(res.body.state).toBe('error');
            expect(res.body.message).toBe('This username is taken!');
        });
    });

    // --- Login Tests ---
    describe('POST /api/auth/checkData', () => {
        it('should log in an existing user successfully', async () => {
            // First, create a user
            await request(app)
                .post('/api/auth/register')
                .send({
                    username: 'testuser',
                    email: 'test@example.com',
                    password: 'password123',
                });

            // Need to manually verify the user for this test
            const user = await UserData.findOne({ email: 'test@example.com' });
            user.mailtoken = 0;
            await user.save();

            // Then, try to log in
            const res = await request(app)
                .post('/api/auth/checkData')
                .send({
                    userName: 'testuser',
                    password: 'password123',
                });

            expect(res.statusCode).toEqual(200);
            expect(res.body.state).toBe('success');
        });

        it('should return an error for invalid credentials', async () => {
            const res = await request(app)
                .post('/api/auth/checkData')
                .send({
                    userName: 'nonexistentuser',
                    password: 'wrongpassword',
                });

            expect(res.statusCode).toEqual(401);
            expect(res.body.state).toBe('error');
            expect(res.body.message).toBe('Invalid credentials');
        });
    });
});
