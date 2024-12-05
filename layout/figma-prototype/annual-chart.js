// There should not be negative values in rawData
const rawData = [
  [28, 17, 15, 22, 32, 9, 24, 17, 10, 26, 16, 18, 0],
  [4, 13, 8, 17, 25, 9, 8, 11, 18, 22, 13, 5, 0],
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
  'Solicitações de Patentes',
  'Solicitações de Programas de Computador'
].map((name, sid) => {
  return {
    name,
    type: 'bar',
    label: {
      show: true,
      fontSize: 16,
      lineHeight: 22
    },
    itemStyle: {
      color: ["#003380", "#198754"][sid]
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
    data: ['2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
    axisLabel: {
      interval: 0,
      fontSize: 14
    }
  },
  series
};
