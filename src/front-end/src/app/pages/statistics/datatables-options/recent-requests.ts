import { ADTSettings } from "angular-datatables/src/models/settings";

import { PatentType } from "../../../models/patent";

import { DtTranslationService } from "../../../services/dt-translation/dt-translation.service";

export function getRecentRequestsDtOptions (dtTranslationService: DtTranslationService): ADTSettings {
	return {
		lengthMenu: [5, 10, 20],
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
		}, {
			title: "Tipo",
			data: "tipo",
			ngPipeInstance: {
				transform: (value: PatentType | string) => value[0].toUpperCase() + value.slice(1).toLowerCase()
			},
			className: "p-2 align-middle",
			width: "105px"
		}, {
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
		}, {
			title: "Status",
			data: "status",
			className: "p-2 align-middle",
			width: "145px"
		}, {
			title: "Detalhes",
			data: null,
			defaultContent: "",
			className: "p-2 text-center align-middle",
			width: "98px",
			orderable: false,
			searchable: false
		}],
		data: [],
		order: [[0, "desc"]]
	};
}
