import { BarSeriesOption, EChartsOption } from "echarts";

import { StatisticsComponent } from "../statistics.component";

function buildSeries (statisticsComponent: StatisticsComponent, name: string, color: string): BarSeriesOption {
	return {
		name,
		type: "bar",
		stack: "total",
		barWidth: "75%",
		label: {
			show: true,
			fontSize: 16,
			lineHeight: 22,
			formatter: param => {
				if (!param.value || !statisticsComponent.status)
					return "0%";

				const statistics = param.dataIndex === 0 ? statisticsComponent.status.PATENTE : statisticsComponent.status.PROGRAMA;
				const total = statistics.ARQUIVADO + statistics.CONCEDIDO + statistics.EM_ANDAMENTO;
				return `${((Number(param.value) / total) * 100).toFixed(2)}%`.replace(".", ",");
			}
		},
		itemStyle: { color },
		data: []
	};
}

export function getStatusChartOptions (statisticsComponent: StatisticsComponent): EChartsOption {
	return {
		tooltip: {
			trigger: "axis",
			valueFormatter: (value, dataIndex) => {
				if (!statisticsComponent.status)
					return `${value} (0%)`;

				const statistics = dataIndex === 0 ? statisticsComponent.status.PATENTE : statisticsComponent.status.PROGRAMA;
				const total = statistics.ARQUIVADO + statistics.CONCEDIDO + statistics.EM_ANDAMENTO;
				return `${value} (${((Number(value) / total) * 100).toFixed(2)}%)`.replace(".", ",");
			}
		},
		legend: {},
		grid: {
			left: 0,
			right: 0,
			top: 50,
			bottom: 0,
			containLabel: true
		},
		yAxis: {
			type: "value",
			axisLabel: {
				fontSize: 14
			}
		},
		xAxis: {
			type: "category",
			data: ["Patentes", "Programas de\nComputador"],
			axisLabel: {
				interval: 0,
				fontSize: 14
			}
		},
		series: [
			buildSeries(statisticsComponent, "EM ANDAMENTO", "#003380"),
			buildSeries(statisticsComponent, "ARQUIVADO", "#DC3545"),
			buildSeries(statisticsComponent, "CONCEDIDO", "#198754")
		]
	};
}
