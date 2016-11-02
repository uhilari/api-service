import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpModule } from '@angular/http';
import { API_CONFIG, ApiConfigs } from './config';
import { ApiFactory } from './api.factory';

@NgModule({
	imports: [HttpModule],
	providers: [ApiFactory]
})
export class ApiModule {
	static forApiService(apiCfgs: ApiConfigs): ModuleWithProviders {
		return {
			ngModule: ApiModule,
			providers: [
				{ provide: API_CONFIG, multi: true, useValue: apiCfgs }
			]
		};
	}
}