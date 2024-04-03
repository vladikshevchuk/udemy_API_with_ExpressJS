import { Container, ContainerModule, interfaces } from 'inversify';
import { App } from './app';
import { ExeptionFiltres } from './errors/exeption.filter';
import { LoggerService } from './logger/logger.service';
import { UserController } from './users/users.controller';
import { ILogger } from './logger/logger.interface';
import { TYPES } from './types';
import { IExeptionFilter } from './errors/exeption.filter.interface';

export interface IBootstrapReturn {
	appContainer: Container;
	app: App;
}

export const appBinding = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.ILogger).to(LoggerService);
	bind<IExeptionFilter>(TYPES.ExeptionFiltres).to(ExeptionFiltres);
	bind<UserController>(TYPES.UserController).to(UserController);
	bind<App>(TYPES.Aplication).to(App);
});

function bootstrap(): IBootstrapReturn {
	const appContainer = new Container();
	appContainer.load(appBinding);
	const app = appContainer.get<App>(TYPES.Aplication);
	app.init();
	return { app, appContainer };
}

export const { app, appContainer } = bootstrap();
