## Chart lib

- react-apexcharts apexcharts (highly recommend)
- @ant-design/charts chart.js react-chartjs-2 react-google-charts

```
- apexcharts : ^3.35.3
- react-apexcharts : ^1.4.0
- @ant-design/charts : ^1.3.6
- chart.js : ^3.8.0
- react-chartjs-2 : ^4.2.0
- react-google-charts : ^4.0.0
```

```css
div[id^='reactgooglegraph'] svg,
div[data-chart-source-type~='G2Plot'] svg {
  @apply !rounded-[2rem];
}
div[id^='reactgooglegraph'] text,
div[data-chart-source-type~='G2Plot'] text {
  @apply !text-[1.8rem];
}
div[id^='reactgooglegraph'] {
  @apply !mx-auto;
}
.g2-tooltip,
.g2-tooltip-list-item {
  @apply !text-[1.6rem];
}
.g2-tooltip-list-item {
  @apply !py-3;
}
.g2-tooltip-title {
  @apply !py-2 !text-center !text-[2.5rem];
}
.g2-tooltip-marker {
  @apply !scale-150 !text-left;
}
.g2-tooltip-name {
  @apply !text-[1.8rem] !font-semibold;
}
.g2-tooltip-value {
  @apply !text-[1.8rem];
}
```
