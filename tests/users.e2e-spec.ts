import { App } from '../src/app';
import { boot } from '../src/main';
import request from 'supertest';

let application: App;

beforeAll(async () => {
	const { app } = await boot;
	application = app;
});

describe('Users e2e', () => {
	it('Register - error', async () => {
		const result = await request(application.app)
			.post('/users/register')
			.send({ email: 'mail2@gmail.com', password: 'qweqweqwe' });
		expect(result.statusCode).toBe(422);
	});

	it('Login - succes', async () => {
		const result = await request(application.app)
			.post('/users/login')
			.send({ email: 'mail2@gmail.com', password: 'qweqweqwe' });
		expect(result.body.jwt).not.toBeUndefined;
	});

	it('Login - error', async () => {
		const result = await request(application.app)
			.post('/users/login')
			.send({ email: 'mail2@gmail.com', password: '222' });
		expect(result.statusCode).toBe(401);
	});

	it('Info - success', async () => {
		const login = await request(application.app)
			.post('/users/login')
			.send({ email: 'mail2@gmail.com', password: 'qweqweqwe' });
		console.log('LOGIN JWT', login.body.jwt);

		const res = await request(application.app)
			.get('/users/info')
			.set('Authorization', `Bearer ${login.body.jwt}`);
		console.log('RESULT', res.body);
		// expect(res.body.email).toBe('mail2@gmail.com');
	});

	it('Info - error', async () => {
		const res = await request(application.app).get('/users/info').set('Authorization', `Bearer 1`);
		expect(res.statusCode).toBe(401);
	});
});

afterAll(() => {
	application.close();
});
