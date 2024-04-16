import { IMiddleware } from './middleware.interface';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

export class AuthMiddleware implements IMiddleware {
	constructor(private secret: string) {}

	execute(req: Request, res: Response, next: NextFunction): void {
		if (req.headers.authorization) {
			verify(req.headers.authorization, this.secret, (err, payload) => {
				if (err) {
					next();
				} else if (payload) {
					const decodedToken = payload as { email: string }; // <--- Cast here for Typescript
					const { email } = decodedToken;

					req.user = email;

					next();
				}
			});
		} else {
			next();
		}
	}
}
