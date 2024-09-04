import { BarSeriesOption, EChartsOption } from "echarts";

function buildSeries (name: string, color: string): BarSeriesOption {
	return {
		name,
		type: "bar",
		label: {
			show: true,
			fontSize: 16,
			lineHeight: 22
		},
		itemStyle: { color },
		data: []
	};
}

export function getRequestsChartOptions (): EChartsOption {
	return {
		tooltip: { trigger: "axis" },
		legend: {
			bottom: 0
		},
		grid: {
			left: 0,
			right: 0,
			top: 20,
			bottom: 35,
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
			buildSeries("Solicitações de Patentes", "#003380"),
			buildSeries("Solicitações de Programas de Computador", "#198754")
		]
	};
}
