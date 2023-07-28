import { randomInArray } from '@/utils';

export const getFakeAntChartData = (size?: number) => {
  const arrayLength = size || 80;
  const array = Array(arrayLength);

  const categories = ['Cate A', 'Cate B', 'Cate C', 'Cate D', 'Cate E'];

  return array.map((_, idx) => {
    const value = Math.random() - 0.5 > 0;
    const categoryRandom = randomInArray(categories);

    return {
      year: '' + 1855 + idx,
      value,
      category: categoryRandom.item,
    };
  });
};

export const fakeGGChartData = [
  ['Year', 'Sales', 'Expenses'],
  ['2004', 1000, 400],
  ['2005', 1170, 460],
  ['2006', 660, 1120],
  ['2007', 1030, 540],
];

export const fakeChartJSColors = ['red', 'orange', 'yellow', 'lime', 'green', 'teal', 'blue', 'purple'];
export const fakeChartJSLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
export const fakeChartJSData = {
  labels: fakeChartJSLabels,
  datasets: [
    {
      label: 'Maths',
      data: fakeChartJSLabels.map(() => Math.floor(Math.random() * 2000 - 1000)),
      borderColor: '#1e3a8a',
      backgroundColor: '#93c5fd',
      yAxisID: 'y',
    },
    {
      label: 'Physics',
      data: fakeChartJSLabels.map(() => Math.floor(Math.random() * 2000 - 1000)),
      borderColor: '#0f766e',
      backgroundColor: '#5eead4',
      yAxisID: 'y1',
    },
  ],
};

export const fakeApexChartData: {
  options: ApexCharts.ApexOptions;
  series: ApexAxisChartSeries;
} = {
  series: [
    {
      name: 'Actual',
      data: [
        {
          x: '2011',
          y: '1292',
          goals: [
            {
              name: 'Expected',
              value: 1400,
              strokeHeight: 5,
              strokeColor: '#775DD0',
            },
          ],
        },
        {
          x: '2012',
          y: '4432',
          goals: [
            {
              name: 'Expected',
              value: 5400,
              strokeHeight: 5,
              strokeColor: '#775DD0',
            },
          ],
        },
        {
          x: '2013',
          y: '5423',
          goals: [
            {
              name: 'Expected',
              value: 5200,
              strokeHeight: 5,
              strokeColor: '#775DD0',
            },
          ],
        },
        {
          x: '2014',
          y: '6653',
          goals: [
            {
              name: 'Expected',
              value: 6500,
              strokeHeight: 5,
              strokeColor: '#775DD0',
            },
          ],
        },
        {
          x: '2015',
          y: '8133',
          goals: [
            {
              name: 'Expected',
              value: 6600,
              strokeHeight: 13,
              strokeWidth: 0,
              strokeLineCap: 'round',
              strokeColor: '#775DD0',
            },
          ],
        },
        {
          x: '2016',
          y: '7132',
          goals: [
            {
              name: 'Expected',
              value: 7500,
              strokeHeight: 5,
              strokeColor: '#775DD0',
            },
          ],
        },
        {
          x: '2017',
          y: '7332',
          goals: [
            {
              name: 'Expected',
              value: 8700,
              strokeHeight: 5,
              strokeColor: '#775DD0',
            },
          ],
        },
        {
          x: '2018',
          y: '6553',
          goals: [
            {
              name: 'Expected',
              value: 7300,
              strokeHeight: 2,
              strokeDashArray: 2,
              strokeColor: '#775DD0',
            },
          ],
        },
      ],
    },
  ],
  options: {
    chart: {
      height: 400,
    },
    plotOptions: {
      bar: {
        columnWidth: '60%',
      },
    },
    colors: ['#00E396'],
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: true,
      showForSingleSeries: true,
      customLegendItems: ['Actual', 'Expected'],
      markers: {
        fillColors: ['#00E396', '#775DD0'],
      },
    },
  },
};
