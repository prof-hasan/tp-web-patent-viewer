import { ADTSettings } from "angular-datatables/src/models/settings";

import { PatentType } from "../../models/patent";

import { DtTranslationService } from "../../services/dt-translation/dt-translation.service";

export enum RequestDtType {
	RECENT_REQUESTS = "RECENT_REQUESTS",
	PATENTS = "PATENTS",
	PROGRAMS = "PROGRAMS"
}

export function getRequestsDtOptions (dtTranslationService: DtTranslationService, type: RequestDtType): ADTSettings {
	const options: ADTSettings = {
		lengthMenu: type === RequestDtType.RECENT_REQUESTS ? [5, 10, 20] : [10, 25, 50, 100],
		stateSave: true,
		language: dtTranslationService.getDataTablesPortugueseTranslation(),
		columns: [{
			title: "Data",
			data: "dataDeposito",
			ngPipeInstance: {
				transform: (value: string) => (value.includes("/") ? value : new Date(value).toLocaleDateString("pt-BR"))
			},
			className: "p-2 text-start align-middle",
			width: "98px"
		}],
		data: [],
		order: [[0, "desc"]]
	};

	if (type === RequestDtType.RECENT_REQUESTS) {
		options.columns!.push({
			title: "Tipo",
			data: "tipo",
			ngPipeInstance: {
				transform: (value: PatentType | string) => value[0].toUpperCase() + value.slice(1).toLowerCase()
			},
			className: "p-2 align-middle",
			width: "105px"
		});
	}

	options.columns!.push({
		title: "Título",
		data: "nome",
		className: "p-2 w-auto align-middle",
		ngPipeInstance: {
			transform: (value: string) => value || "-"
		}
	}, {
		title: "Número",
		data: "codigo",
		className: "p-2 align-middle",
		width: "176px"
	});

	if (type === RequestDtType.PROGRAMS) {
		options.columns!.push({
			title: "Linguagens",
			data: null,
			className: "p-2 w-auto text-center align-middle",
			orderable: false,
			searchable: false
		});
	}

	options.columns!.push({
		title: "Status",
		data: null,
		className: "p-2 align-middle",
		width: "145px"
	}, {
		title: "Detalhes",
		data: null,
		className: "p-2 text-center align-middle",
		width: "98px",
		orderable: false,
		searchable: false
	});

	return options;
}
