import React, { useState } from "react";
import "./../assets/css/change.css";
import { Box, Modal } from "@mui/material";

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

export const Change = () => {
  const [lefts, setLeft] = useState(["HTML","CSS","JavaScript","PHP","MySQL","Go","Rust"]);
  const [rights, setRight] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const onClickToRight = (e: any) => {
    setRight([...rights,e.target.innerHTML]);
    setLeft(
      lefts.filter((item) => (item !== e.target.innerHTML))
    )
  }

  const onClickToLeft = (e: any) => {
    setLeft([...lefts,e.target.innerHTML]);
    setRight(
      rights.filter((item) => (item !== e.target.innerHTML))
    )
  }

  return(
    <div>
    <div id="container">
      <div id="left-container">
        <ul>
        {lefts.map((item) => {
            return <li key={item} onClick={onClickToRight}>{item}</li>
          })}
        </ul>
      </div>
      <div>→</div>
      <div id="right-container">
        <ul>
          {rights.map((item) => {
            return <li key={item} onClick={onClickToLeft}>{item}</li>
          })}
        </ul>
      </div>
    </div>
    <div id="button-case">
      <button type="button" onClick={() => {setOpen(true)}} id="modal-open-button">決定</button>
    </div>
    <Modal open={open}>
      <Box sx={style}>
        <ul>
          {rights.map((item) => {
            return <li key={`${item}OnModal`}>{item}</li>
          })}
        </ul>
        <button type="submit" onClick={() => {
          console.log(rights);
          setOpen(false);
        }}>送信</button>
        <button type="button" onClick={() => {setOpen(false)}}>キャンセル</button>
      </Box>
    </Modal>
    </div>
  )
}