import { ADTSettings } from "angular-datatables/src/models/settings";

import { DtTranslationService } from "../../../services/dt-translation/dt-translation.service";

export function getTopRankingDtOptions (dtTranslationService: DtTranslationService): ADTSettings {
	return {
		lengthMenu: [5, 10, 20],
		stateSave: true,
		language: dtTranslationService.getDataTablesPortugueseTranslation(),
		columns: [{
			title: "Ranking",
			data: "ranking",
			ngPipeInstance: {
				transform: (value: string) => (value[0] === "#" ? value : `#${value}`)
			},
			className: "p-2 text-center align-middle",
			width: "106px"
		}, {
			title: "Nome",
			data: "nomeVisualizacao",
			className: "p-2 w-auto align-middle"
		}, {
			title: "Qtd. Citações",
			data: "citacoes",
			className: "p-2 align-middle",
			width: "145px"
		}, {
			title: "Aparece Em",
			data: null,
			className: "p-2 align-middle",
			width: "235px",
			orderable: false,
			searchable: false
		}],
		data: [],
		order: [[0, "asc"]]
	};
}
