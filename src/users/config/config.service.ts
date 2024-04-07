import { DotenvConfigOutput, DotenvParseOutput, config } from 'dotenv';
import { IConfigService } from './config.service.interface';
import { inject, injectable } from 'inversify';
import { ILogger } from '../../logger/logger.interface';
import { TYPES } from '../../types';

@injectable()
export class ConfigService implements IConfigService {
	private config: DotenvParseOutput;

	constructor(@inject(TYPES.ILogger) private logger: ILogger) {
		const result: DotenvConfigOutput = config();
		if (result.error) {
			this.logger.error('[ConfigService] The .env file could not be read or is missing');
		} else {
			this.logger.log('[ConfigService] Successfully loaded the .env file');
			this.config = result.parsed as DotenvParseOutput;
		}
	}

	get(key: string): string {
		return this.config[key];
	}
}
