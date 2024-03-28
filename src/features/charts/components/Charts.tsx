import React, { useState } from 'react'
import '../assets/css/charts.css'
import { PieChartDataInputModal } from './PieChartDataInputModal';
import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, XAxis, YAxis } from 'recharts';
import { BarChartData, LineChartData, PieChartData, RadarChartData } from '../types/data';
import { LineChartDataInputModal } from './LineChartDataInputModal';
import { BarChartDataInputModal } from './BarChartDataInputModal';
import { RadarChartDataInputModal } from './RadarChartDataInputModal';


const colorsObj: {[prop: string] : string} = {
  '#ff0000' : 'red',
  '#ffff00' : 'yellow',
  '#080000' : 'green',
  '#9acd32' : 'yellowgreen',
  '#0000ff' : 'blue',
  '#a52a2a' : 'brown',
  '#800080' : 'purple',
  '#ffa500' : 'orange',
  '#ffc0cb' : 'pink',
  '#c0c0c0' : 'silver'
}

export const Charts = () => {
  const [graphValue, setGraphValue] = useState<string>();
  const [index, setIndex] = useState(0);

  const [pieChartData, setPieData] = useState<PieChartData[]>([]);
  const [pieChartInputOpen, setPieOpen] = useState(false);

  const [lineChartData, setLineData] = useState<LineChartData[]>([]);
  const [lineChartInputOpen, setLineOpen] = useState(false);

  const [barChartData, setBarData] = useState<BarChartData[]>([]);
  const [barChartInputOpen, setBarOpen] = useState(false);

  const [radarChartData, setRadarData] = useState<RadarChartData[]>([]);
  const [radarChartInputOpen, setRadarOpen] = useState(false);

  const [colors, setColors] = useState<string[]>([]);

  const onChangeGraph = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGraphValue(e.target.value);
    setIndex(0);
    setColors([]);
    setLineData([]);
    setPieData([]);
  }


  return(
    <>
    <div id='charts'>
      <div id='config'>
        <form>
          <h3>設定</h3>
          <p><label htmlFor='graph-select'>グラフの種類</label></p>
          <select id='graph-select' onChange={onChangeGraph}>
            <option value=''></option>
            <option value='pieChart'>pie chart</option>
            <option value='lineChart'>line chart</option>
            <option value='barChart'>bar chart</option>
            <option value='radarChart'>radar chart</option>
          </select>
          <p><label htmlFor='graph-title'>グラフタイトル</label></p>
          <input type='text'></input>
          <p><label htmlFor='data'>データ</label></p>
          {pieChartData.length > 0 && (
            <>
            <table border={1} style={{textAlign: 'center'}}>
              {pieChartData.map((data) => {
                return(
                  <tbody key={data.index}>
                    <tr>
                      <td colSpan={2}>{data.name}</td>
                    </tr>
                    <tr>
                      <td>{data.value}</td><td>{colorsObj[`${colors[data.index]}`]}</td>
                    </tr>
                  </tbody>
                )
              })}
            </table>
            </>
          )}
          {lineChartData.length > 0 && (
            <>
            <table border={1} style={{textAlign: 'center'}}>
              <thead>
                <tr>
                  <td colSpan={2}>{colorsObj[`${colors[colors.length - 1]}`]}</td>
                </tr>
              </thead>
              {lineChartData.map((data) => (
                <tbody key={data.index}>
                  <tr>
                    <td>{data.date}</td><td>{data.Data}</td>
                  </tr>
                </tbody>
              ))}
            </table>
            </>
          )}
          {barChartData.length > 0 && (
            <>
            <table border={1} style={{textAlign: 'center'}}>
              <thead>
                <tr>
                  <td colSpan={2}>{colorsObj[`${colors[colors.length - 1]}`]}</td>
                </tr>
              </thead>
              {barChartData.map((data) => (
                <tbody key={data.index}>
                  <tr>
                    <td>{data.date}</td><td>{data.Data}</td>
                  </tr>
                </tbody>
              ))}
            </table>
            </>
          )}
          {radarChartData.length > 0 && (
            <>
            <table border={1} style={{textAlign: 'center'}}>
              <thead>
                <tr>
                  <td colSpan={2}>{colorsObj[`${colors[colors.length - 1]}`]}</td>
                </tr>
              </thead>
              {radarChartData.map((data) => (
                <tbody key={data.index}>
                  <tr>
                    <td>{data.category}</td><td>{data.value}</td>
                  </tr>
                </tbody>
              ))}
            </table>
            </>
          )}
          {graphValue === 'pieChart' &&
            <button onClick={() => {setPieOpen(true)}} type='button'>項目を追加</button>
          }
          {graphValue === 'lineChart' &&
            <button onClick={() => {setLineOpen(true)}} type='button'>項目を追加</button>
          }
          {graphValue === 'barChart' &&
            <button onClick={() => {setBarOpen(true)}} type='button'>項目を追加</button>
          }
          {graphValue === 'radarChart' &&
            <button onClick={() => {setRadarOpen(true)}} type='button'>項目を追加</button>
          }
        </form>
      </div>
      <PieChartDataInputModal
        open={pieChartInputOpen}
        setOpen={setPieOpen}
        setData={setPieData}
        index={index}
        setIndex={setIndex}
        setColors={setColors}
      />
      <LineChartDataInputModal
        open= {lineChartInputOpen}
        setOpen={setLineOpen}
        setData={setLineData}
        index={index}
        setIndex={setIndex}
        setColors={setColors}
      />
      <BarChartDataInputModal
        open={barChartInputOpen}
        setOpen={setBarOpen}
        setData={setBarData}
        index={index}
        setIndex={setIndex}
        setColors={setColors}
      />
      <RadarChartDataInputModal
        open={radarChartInputOpen}
        setOpen={setRadarOpen}
        setData={setRadarData}
        index={index}
        setIndex={setIndex}
        setColors={setColors}
      />
      <div id='graph'>
        {(graphValue === 'pieChart' && pieChartData.length > 0) && (
          <>
          <PieChart width={500} height={500}>
            <Pie data={pieChartData} dataKey="value" cx="50%" cy="50%" outerRadius={200}>
              {pieChartData.map((data) => (
                <Cell key={data.index} fill={colors[data.index]} />
              ))}
            </Pie>
          </PieChart>
          </>
        )}
        {(graphValue === 'lineChart' && lineChartData.length > 1) && (
          <>
          <LineChart
            width={400}
            height={200}
            data={lineChartData}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey="date" />
            <YAxis dataKey="Data" />
            <Line type='monotone' dataKey="Data" stroke={colors[colors.length - 1]} />
          </LineChart>
          </>
        )}
        {(graphValue === 'barChart' && barChartData.length > 1) && (
          <>
          <BarChart
            width={400}
            height={200}
            data={barChartData}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey="date" />
            <YAxis />
            <Bar dataKey="Data" fill={colors[colors.length - 1]} />
          </BarChart>
          </>
        )}
        {(graphValue === 'radarChart' && radarChartData.length > 2) && (
          <>
          <RadarChart
            cx='50%'
            cy='50%'
            width={500}
            height={500}
            outerRadius={150}
            data={radarChartData}
          >
            <PolarGrid />
            <PolarAngleAxis dataKey='category' />
            <PolarRadiusAxis />
            <Radar
              dataKey='value'
              fill={colors[colors.length - 1]}
              fillOpacity={0.8}
            />
          </RadarChart>
          </>
        )}
      </div>
    </div>
    </>
  )
}