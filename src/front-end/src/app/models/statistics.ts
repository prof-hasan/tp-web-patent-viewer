import { PatentStatus, PatentType } from "./patent";

export interface IStatisticsCount {
	ARQUIVADO: number;
	CONCEDIDO: number;
	EM_ANDAMENTO: number;
}

export interface IStatistics {
	PATENTE: IStatisticsCount;
	PROGRAMA: IStatisticsCount;
	TOTAL: IStatisticsCount;
}

export interface IRequests {
	PATENTE: Array<{ periodo: string; quantidade: number; }>;
	PROGRAMA: Array<{ periodo: string; quantidade: number; }>;
}

export interface ITopRanking {
	ranking: number;
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
