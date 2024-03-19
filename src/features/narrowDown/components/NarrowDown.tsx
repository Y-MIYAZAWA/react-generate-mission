import React, { useState } from "react"
import { useForm } from "react-hook-form";
import "../assets/css/narrowDown.css";
import { Box, Modal } from "@mui/material";

type Inputs = {
  direction1: string,
  direction2: string,
  direction3: string
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const NarrowDown = () => {
  const options1 = ["東","西","南","北"];
  const options2 = ["北東","北西","南東","南西"];
  const options3 = ["北北東","東北東","北北西","西北西","南南東","東南東","南南西","西南西"];
  const [narrowedOptions2, setOptions2] = useState(options2);
  const [narrowedOptions3, setOptions3] = useState(options3);

  const {register, handleSubmit, watch, formState: {errors}} = useForm<Inputs>();

  const filterItems = (arr: string[], query: string) => {
    return arr.filter((el) => el.toLowerCase().includes(query.toLowerCase()));
  }

  const onChange1 = () => {
    setOptions2(filterItems(options2, watch('direction1')));
  }

  const onChange2 = () => {
    setOptions3(filterItems(options3, watch('direction2')));
  }

  const [open, setOpen] = useState(false);

  return(
    <>
    <form id="narrow-select" onSubmit={handleSubmit((data) => {console.log(data)})}>
      <div id="select-container">
        <select id="direction-1" {...register('direction1')} onClick={onChange1}>
          {options1.map((option) => {
            return <option value={option} key={option}>{option}</option>
          })}
        </select>
        →
        <select id="direction-2" {...register('direction2')} onClick={onChange2}>
          {narrowedOptions2.map((option) => {
            return <option value={option} key={option}>{option}</option>
          })}
        </select>
        →
        <select id="direction-3" {...register('direction3')}>
        {narrowedOptions3.map((option) => {
            return <option value={option} key={option}>{option}</option>
          })}
        </select>
      </div>
      <input type="submit" onClick={() => setOpen(true)} />
    </form>
    <Modal open={open}>
      <Box sx={style}>
        <div>送信完了！</div>
        <button onClick={() => setOpen(false)}>閉じる</button>
      </Box>
    </Modal>
    </>
  )
}