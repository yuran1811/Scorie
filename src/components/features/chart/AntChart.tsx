import { FC } from 'react';
// import { fakeAntChartData } from '@/services';
// import { Line } from '@ant-design/plots';

const config = {
  smooth: true,
  autoFit: true,
  connectNulls: true,

  padding: 80,

  xField: 'year',
  yField: 'value',
  seriesField: 'category',
  colorField: 'seriesField',

  annotations: [
    // {
    // 	type: 'text',
    // 	position: ['median', 'median'],
    // 	content: 'Content',
    // 	style: {
    // 		fill: 'white',
    // 	},
    // },
  ],
  color: [
    '#94a3b8',
    '#f87171',
    '#fb923c',
    '#fbbf24',
    '#a3e635',
    '#34d399',
    '#2dd4bf',
    '#38bdf8',
    '#a78bfa',
    '#f472b6',
    '#fb7185',
  ],

  yAxis: {
    label: {
      formatter: (v: any) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
    },
  },
  animation: {
    appear: {
      animation: 'path-in',
      duration: 5000,
    },
  },
  lineStyle: { lineWidth: 2, shadowBlur: 0, cursor: 'pointer' },
  legend: {
    layout: 'horizontal',
    position: 'top',
    slidable: true,
  },
};

const getSize = () => (Math.min(window.innerWidth, window.innerHeight) * 70) / 100;

export const AntChart: FC = () => {
  // const [data, setData] = useState<any[]>([]);
  // const [chartSize, setChartSize] = useState({
  // 	width: getSize(),
  // 	height: getSize(),
  // });

  // const resizeHandle = (e: UIEvent) => {
  // 	setChartSize({
  // 		width: getSize(),
  // 		height: getSize(),
  // 	});
  // };

  // useEffect(() => {
  // 	(() => {
  // 		setData(fakeAntChartData);
  // 		   fetch('https://gw.alipayobjects.com/os/bmw-prod/55424a73-7cb8-4f79-b60d-3ab627ac5698.json')
  // 		   	.then((response) => response.json())
  // 		   	.then((json) => setData(json))
  // 		   	.catch((error) => {
  // 		   		console.log('fetch data failed', error);
  // 		   	});
  // 	})();
  // }, []);

  return (
    <div className="my-12 w-[90%] max-w-[60rem]">
      Ant Chart
      {/* <Line
        {...config}
        // width={chartSize.width}
        // height={chartSize.height}
        data={data}
        theme="dark"
        renderer="svg"
        legend={false}
      /> */}
    </div>
  );
};
