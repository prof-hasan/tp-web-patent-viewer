import localePt from "@angular/common/locales/pt";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { provideHttpClient } from "@angular/common/http";
import { registerLocaleData } from "@angular/common";
import { ApplicationConfig, importProvidersFrom, LOCALE_ID } from "@angular/core";
import { provideRouter, RouteReuseStrategy } from "@angular/router";

import { BlockUIModule } from "ng-block-ui";
import { ModalModule } from "ngx-bootstrap/modal";
import { provideScrollbarOptions } from "ngx-scrollbar";
import { provideToastr } from "ngx-toastr";
import { defineLocale, ptBrLocale } from "ngx-bootstrap/chronos";

import { AppRouteReuseStrategy } from "./app.routes.reuse-strategy";
import { routes } from "./app.routes";

defineLocale("pt-br", ptBrLocale);
registerLocaleData(localePt);

export const appConfig: ApplicationConfig = {
	providers: [
		provideHttpClient(),
		provideRouter(routes),
		provideAnimationsAsync(),
		importProvidersFrom(
			BlockUIModule.forRoot(),
			ModalModule.forRoot()
		),
		provideScrollbarOptions({ visibility: "hover" }),
		provideToastr({
			timeOut: 3000,
			progressBar: true,
			preventDuplicates: true,
			countDuplicates: true,
			resetTimeoutOnDuplicate: true
		}),
		{ provide: RouteReuseStrategy, useClass: AppRouteReuseStrategy },
		{ provide: LOCALE_ID, useValue: "pt-BR" }
	]
};
