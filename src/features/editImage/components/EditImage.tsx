import React, { ChangeEvent, SyntheticEvent, useEffect, useRef, useState } from "react"
import { InputImage } from "./Input"
import "react-image-crop/dist/ReactCrop.css"
import ReactCrop, { Crop, PixelCrop, centerCrop, makeAspectCrop } from "react-image-crop";
import { Box, Modal } from "@mui/material";

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number,
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  )
}

export const EditImage = () => {
  const imgRef = useRef<HTMLImageElement>(null);
  const hiddenAnchorRef = useRef<HTMLAnchorElement>(null);
  const [imgSrc, setImgSrc] = useState('');
  const [trimSrc, setTrimSrc] = useState('');
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [imgHeight, setImgHeight] = useState(1);
  const [imgWidth, setImgWidth] = useState(1);
  const [aspect, setAspect] = useState(1 / 1);
  const [trimOpen, setTrimOpen] = useState(false);
  const [canvasOpen, setCanvasOpen] = useState(false);

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if(e.currentTarget?.files && e.currentTarget.files[0]){
      setCrop(undefined);
      const reader = new FileReader();
      reader.addEventListener('load',() => {
        setImgSrc(reader.result?.toString() || '')
      },)
      reader.readAsDataURL(e.currentTarget.files[0])
    }
    setTrimOpen(true);
  };


  const onImageLoad = (e: SyntheticEvent<HTMLImageElement>) => {
    setCrop(centerAspectCrop(imgHeight, imgWidth, aspect));
  }


  const handleChangeHeight = (e: ChangeEvent<HTMLInputElement>) => {
    const height = parseInt(e.target.value)
    setImgHeight(height);
    setAspect(imgHeight / imgWidth);
    setCrop({
      unit: '%',
      width: imgWidth,
      height: height,
      x: 0,
      y: 0
    })
  }

  const handleChangeWidth = (e: ChangeEvent<HTMLInputElement>) => {
    const width = parseInt(e.target.value)
    setImgWidth(width);
    setAspect(imgHeight / imgWidth);
    setCrop({
      unit: '%',
      width: width,
      height: imgHeight,
      x: 0,
      y: 0
    })
  }

  const onClose = () => {
    if(trimOpen) setTrimOpen(false);

    if(canvasOpen) setCanvasOpen(false);

  }

  const onTrimming = () => {
    if(imgRef.current && completedCrop){
      const image = imgRef.current
      const canvas = document.createElement('canvas');
      const scaleX = image.naturalWidth / image.height;
      const scaleY = image.naturalHeight / image.width;
      canvas.width = completedCrop.width;
      canvas.height = completedCrop.height;
      const ctx = canvas.getContext('2d');

      ctx?.drawImage(
        image,
        completedCrop.x * scaleX,
        completedCrop.y * scaleY,
        completedCrop.width * scaleX,
        completedCrop.height * scaleY,
        0,
        0,
        completedCrop.width,
        completedCrop.height
      )

      const base64Image = canvas.toDataURL('image/png');

      setTrimSrc(base64Image);

      setCanvasOpen(true);
    }
  }

  const onDownload = () => {
    if(hiddenAnchorRef.current && trimSrc){
      hiddenAnchorRef.current.href = trimSrc
      hiddenAnchorRef.current.click()
      onClose()
    }
  }



  return(
    <>
    <div id="trimming">
      <Modal
        open={trimOpen}
        onClose={onClose}
      >
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
          <div>
            <h2>画像リサイズ</h2>
          </div>
          <div>
            <ReactCrop
              crop={crop}
              onChange={(c) => setCrop(c)}
              onComplete={(c) => setCompletedCrop(c)}
            >
              <img
                src={imgSrc}
                ref={imgRef}
                onLoad={onImageLoad}
                height='200px'
              />
            </ReactCrop>
          </div>
          <div>
            <form>
              <div>切り取り範囲を指定する</div>
              <label htmlFor="image-height">縦幅:</label>
              <input id="image-height" type="number" required onChange={handleChangeHeight} />
              <label htmlFor="image-width">横幅:</label>
              <input id="image-width" type="number" required onChange={handleChangeWidth} />
            </form>
          </div>
          <div>
            <button onClick={onClose}>キャンセル</button>
            <button onClick={onTrimming}>トリミング</button>
          </div>
        </Box>
      </Modal>
    </div>
    <div id="trimming-result">
      <Modal
        open={canvasOpen}
        onClose={onClose}
      >
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
          <div>
            <h2>トリミング完了</h2>
          </div>
          <img src={trimSrc}></img>
          <div>
            <button onClick={() => setCanvasOpen(false)}>戻る</button>
            <button onClick={onDownload}>ダウンロード</button>
            <a
              href="#hidden"
              ref={hiddenAnchorRef}
              download
              style={{
                visibility: 'hidden'
              }}
            ></a>
          </div>
        </Box>
      </Modal>
    </div>
    <InputImage onChange={onFileChange} />
    </>
  )
}