import React from 'react'

export const Charts = () => {
  return(
    <>
    <div id='charts'>
      <div id='config'>
        <form>
          <h3>設定</h3>
          <label htmlFor='graph-select'>グラフの種類</label>
          <select id='graph-select'>
            <option value=''></option>
            <option value='pieChart'>pie chart</option>
          </select>
        </form>
      </div>
      <div id='graph'>
      </div>
    </div>
    </>
  )
}