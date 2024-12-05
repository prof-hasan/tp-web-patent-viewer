import { Routes } from "@angular/router";

export const routes: Routes = [
	// Public
	{ path: "statistics", loadComponent: () => import("./pages/statistics/statistics.component").then(c => c.StatisticsComponent) },
	{ path: "search-patents", loadComponent: () => import("./pages/search-patents/search-patents.component").then(c => c.SearchPatentsComponent) },
	{ path: "search-softwares", loadComponent: () => import("./pages/search-softwares/search-softwares.component").then(c => c.SearchSoftwaresComponent) },
	{ path: "details/:codigo", data: { shouldReuse: false }, loadComponent: () => import("./pages/details/details.component").then(c => c.DetailsComponent) },

	// No match
	{ path: "", redirectTo: "statistics", pathMatch: "full" },
	{ path: "**", redirectTo: "statistics" }
];
