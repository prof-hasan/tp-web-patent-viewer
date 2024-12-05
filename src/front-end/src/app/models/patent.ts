export enum PatentStatus {
	ARQUIVADO = "ARQUIVADO",
	EM_ANDAMENTO = "EM_ANDAMENTO",
	CONCEDIDO = "CONCEDIDO"
}

export enum PatentType {
	PATENTE = "PATENTE",
	PROGRAMA = "PROGRAMA"
}

export interface IPatent {
	codigo: string;
	nome: string;
	dataDeposito: string;	// YYYY-MM-DD
	tipo: PatentType;
	status: PatentStatus;
	linguagens?: string[];
}

export interface IDetailedPatent extends IPatent {
	resumo: string;
	inventores: string[];
	titulares: string[];
	despachosPatente: Array<{
		sequencia: number;
		comentario: string;
		despacho: {
			codigo: string;
			titulo: string;
		};
		revista: {
			numRevista: string;
			dataPublicacao: string;	// YYYY-MM-DD
		};
	}>;
}
