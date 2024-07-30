import { PatentStatus, PatentType } from "./patent";

export interface IStatistics {
	PATENTE: {
		ARQUIVADO: number;
		CONCEDIDO: number;
		EM_ANDAMENTO: number;
	};
	PROGRAMA: {
		ARQUIVADO: number;
		CONCEDIDO: number;
		EM_ANDAMENTO: number;
	};
}

export interface IRequests {
	PATENTE: Array<{ periodo: string; quantidade: number; }>;
	PROGRAMA: Array<{ periodo: string; quantidade: number; }>;
}

export interface ITopRanking {
	nomeVisualizacao: string;
	citacoes: number;
	qtdPatentes: number;
	qtdProgramas: number;
}

export interface IRecentRequest {
	codigo: string;
	nome: string;
	dataDeposito: string;	// YYYY-MM-DD
	status: PatentStatus,
	tipo: PatentType
}
