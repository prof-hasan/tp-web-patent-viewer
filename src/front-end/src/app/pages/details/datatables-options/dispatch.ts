import { ADTSettings } from "angular-datatables/src/models/settings";

import { DtTranslationService } from "../../../services/dt-translation/dt-translation.service";

export function getDispatchDtOptions (dtTranslationService: DtTranslationService): ADTSettings {
	return {
		lengthMenu: [10, 25, 50, 100],
		stateSave: true,
		language: dtTranslationService.getDataTablesPortugueseTranslation(),
		columns: [{
			title: "Sequência",
			data: "sequencia",
			className: "p-2 text-center align-middle",
			width: "117px"
		}, {
			title: "Código",
			data: "despacho.codigo",
			className: "p-2 text-start align-middle",
			width: "98px"
		}, {
			title: "Título",
			data: "despacho.titulo",
			className: "p-2 w-auto align-middle"
		}, {
			title: "Revista",
			data: "revista.numRevista",
			className: "p-2 text-start align-middle",
			width: "98px"
		}, {
			title: "Publicação",
			data: "revista.dataPublicacao",
			ngPipeInstance: {
				transform: (value: string) => (value.includes("/") ? value : new Date(value).toLocaleDateString("pt-BR"))
			},
			className: "p-2 text-start align-middle",
			width: "121px"
		}, {
			title: "Comentário",
			data: null,
			className: "p-2 text-center align-middle",
			width: "105px",
			orderable: false,
			searchable: false
		}],
		data: [],
		order: [[0, "asc"]]
	};
}
