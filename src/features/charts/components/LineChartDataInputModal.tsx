import { Box, Modal } from '@mui/material'
import React, { Dispatch, SetStateAction } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { LineChartData } from '../types/data'

type LineChartProps = {
  open: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>,
  setData: Dispatch<SetStateAction<LineChartData[]>>
  index: number,
  setIndex: Dispatch<SetStateAction<number>>,
  setColors: Dispatch<SetStateAction<string[]>>
}

type LineChartForm = {
  index: string,
  month: string,
  day: string,
  color: string,
  value: string
}

export const LineChartDataInputModal = (props: LineChartProps) => {
  const {register, handleSubmit, reset} = useForm<LineChartForm>();
  const onSubmit: SubmitHandler<LineChartForm> = (data) => {
    let newData: LineChartData = {
      index: parseInt(data.index),
      date: `${data.month}/${data.day}`,
      Data: parseInt(data.value)
    } 
    props.setData(preData => [...preData, newData]);
    props.setColors(preColors => [...preColors, data.color]);
    props.setIndex(props.index + 1);
    reset();
    props.setOpen(false);
  } 

  return(
    <>
    <Modal open={props.open} onClose={() => {props.setOpen(false)}}>
      <Box sx={{
          border: '1px solid black',
          height: 'maxContent',
          width: '70%',
          backgroundColor: 'white', 
          textAlign: 'center',
          position: 'absolute' as 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
      }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register('index')} type='hidden' value={props.index}></input>
          <label htmlFor='month'>日付：</label>
          <input {...register('month')} id='month' type='number' required></input>月
          <input {...register('day')} id='day' type='number' required></input>日<br /><br />
          <label htmlFor='value'>数量：</label>
          <input {...register('value')} id='value' type='number' required></input><br /><br />
          <label htmlFor='color'>カラー：</label>
          <select {...register('color')} id='color' required>
            <option value=''></option>
            <option value='#ff0000'>red</option>
            <option value='#ffff00'>yellow</option>
            <option value='#0000ff'>blue</option>
            <option value='#008000'>green</option>
            <option value='#9acd32'>yellowgreen</option>
            <option value='#a52a2a'>brown</option>
            <option value='#800080'>purple</option>
            <option value='#ffa500'>orange</option>
            <option value='#ffc0cb'>pink</option>
            <option value='#c0c0c0'>silver</option>
          </select><br /><br />
          <input type='submit'></input><br /><br />
        </form>
      </Box>
    </Modal>
    </>
  )
}