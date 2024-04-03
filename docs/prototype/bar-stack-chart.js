// There should not be negative values in rawData
const rawData = [
  [28, 87],
  [76, 21],
  [130, 45],
];
const totalData = [];
for (let i = 0; i < rawData[0].length; ++i) {
  let sum = 0;
  for (let j = 0; j < rawData.length; ++j) {
    sum += rawData[j][i];
  }
  totalData.push(sum);
}
const grid = {
  left: 0,
  right: 0,
  top: 50,
  bottom: 0,
  containLabel: true
};
const series = [
  'EM ANDAMENTO',
  'INDEFERIDO',
  'DEFERIDO'
].map((name, sid) => {
  return {
    name,
    type: 'bar',
    stack: 'total',
    barWidth: '75%',
    label: {
      show: true,
      fontSize: 16,
      lineHeight: 22,
      formatter: param => {
        const percentage = Math.round(param.value / rawData.reduce((sum, d) => sum + d[param.dataIndex], 0) * 10000) / 100;
        return `${param.value}\n${percentage.toString().replace(".", ",")}%`;
      }
    },
    itemStyle: {
      color: ["#003380", "#DC3545", "#198754"][sid]
    },
    data: rawData[sid].map((d, did) =>
      totalData[did] <= 0 ? 0 : d
    )
  };
});

option = {
  legend: {},
  grid,
  yAxis: {
    type: 'value',
    axisLabel: {
      fontSize: 14
    }
  },
  xAxis: {
    type: 'category',
    data: ['Patentes', 'Programas de Computador'],
    axisLabel: {
      interval: 0,
      fontSize: 14
    }
  },
  series
};
