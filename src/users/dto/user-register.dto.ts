import { IsEmail, IsString } from 'class-validator';

export class UserRegisterDto {
	@IsEmail({}, { message: 'Email is incorrect' })
	email: string;

	@IsString({ message: 'No password specified' })
	password: string;

	@IsString({ message: 'No name specified' })
	name: string;
}
