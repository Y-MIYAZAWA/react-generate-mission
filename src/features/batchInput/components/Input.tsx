import { Box, Modal, Typography } from "@mui/material";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const inputsLength = 8;

type Inputs = {
  batch: string | number,
  input1: string | number,
  input2: string | number,
  input3: string | number,
  input4: string | number,
  input5: string | number,
  input6: string | number,
  input7: string | number,
  input8: string | number,
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


export const Input = () => {
  const { register, handleSubmit, watch, formState: { errors }} = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  }
  const batching = () => {
    const inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll(".input-child");
    for(let i = 0; i < inputs.length; i++){
      let nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set;
      nativeSetter?.call(inputs[i], `${watch('batch')}`);
      let ev = new Event ("input", { bubbles: true });
      inputs[i].dispatchEvent(ev);
    }
  }

  const [open, setOpen] = useState(false);

  return(
    <>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div id="batch-area">
        <label htmlFor="batch">一括入力</label>
        <input {...register('batch')} onBlur={batching} id="batch" />
      </div>
      <div id="input-child-container">
        <label htmlFor="input1">1:</label>
        <input {...register('input1')} className="input-child" id="input1" /><br />
        <label htmlFor="input2">2:</label>
        <input {...register('input2')} className="input-child" id="input2" /><br />
        <label htmlFor="input3">3:</label>
        <input {...register('input3')} className="input-child" id="input3" /><br />
        <label htmlFor="input4">4:</label>
        <input {...register('input4')} className="input-child" id="input4" /><br />
        <label htmlFor="input5">5:</label>
        <input {...register('input5')} className="input-child" id="input5" /><br />
        <label htmlFor="input6">6:</label>
        <input {...register('input6')} className="input-child" id="input6" /><br />
        <label htmlFor="input7">7:</label>
        <input {...register('input7')} className="input-child" id="input7" /><br />
        <label htmlFor="input8">8:</label>
        <input {...register('input8')} className="input-child" id="input8" /><br />
      </div>
      <input type="button" value="決定" onClick={() => {setOpen(true)}} />
      <Modal open={open}>
        <Box sx={style}>
          <h5>本当に送信しますか？</h5>
          <div>1:{watch('input1')}円</div>
          <div>2:{watch('input2')}円</div>
          <div>3:{watch('input3')}円</div>
          <div>4:{watch('input4')}円</div>
          <div>5:{watch('input5')}円</div>
          <div>6:{watch('input6')}円</div>
          <div>7:{watch('input7')}円</div>
          <div>8:{watch('input8')}円</div>
          <input type="submit" onClick={handleSubmit(onSubmit)} />
          <input type="button" onClick={() => {setOpen(false)}} value="キャンセル" />
        </Box>
      </Modal>
    </form>
    </>
  )
}