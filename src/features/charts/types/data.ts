type PieChartData = {
  index: number,
  name: string,
  value: number,
}

type LineChartData = {
  index: number,
  date: string,
  Data: number
}

type BarChartData = {
  index: number,
  date: string,
  Data: number
}

type RadarChartData = {
  index: number,
  category: string,
  value: number
}


export type {PieChartData, LineChartData, BarChartData, RadarChartData}