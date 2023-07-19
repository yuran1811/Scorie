import { t as T } from 'i18next';

export const columnDefaultOptions: ApexCharts.ApexOptions = {
  chart: { height: 400 },
  theme: { mode: 'dark' },
  colors: ['#00E396'],
  dataLabels: { enabled: false },
  plotOptions: { bar: { columnWidth: '60%' } },
  legend: {
    show: true,
    showForSingleSeries: true,
    markers: { fillColors: ['#00E396', '#775DD0'] },
  },
};

export const polarDefaultOptions: ApexCharts.ApexOptions = {
  chart: { height: 400 },
  theme: {
    mode: 'dark',
    palette: 'pallete7',
    monochrome: { enabled: false, shadeTo: 'dark', shadeIntensity: 0.5, color: '#13D8AA' },
  },
  fill: { opacity: 1 },
  stroke: { width: 1, colors: undefined },
  legend: { position: 'bottom' },
  yaxis: { show: false },
  dataLabels: { enabled: false, textAnchor: 'middle', style: { fontSize: '12px !important' } },
  plotOptions: { polarArea: { rings: { strokeWidth: 0 }, spokes: { strokeWidth: 0 } } },
};

export const radarDefaultOptions: ApexCharts.ApexOptions = {
  chart: { height: 400, toolbar: { show: false } },
  theme: { mode: 'dark', palette: 'palette1' },
  dataLabels: { enabled: false },
  markers: { size: 6 },
  fill: { opacity: 0.4 },
  tooltip: {
    enabled: true,
    custom: ({ series, seriesIndex, dataPointIndex }) => `${T('amount')}: ${series[seriesIndex][dataPointIndex]}`,
  },
  yaxis: { show: false, labels: { style: { fontSize: '0px !important' } } },
};
