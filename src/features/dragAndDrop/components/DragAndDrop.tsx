import React, { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import '../assets/css/dragAndDrop.css'

const style = {
  width: 200,
  height: 150,
  border: "1px dotted #888"
};

export const DragAndDrop = () => {

  const [files, setFiles] = useState<File[]>([])
  const {getRootProps, getInputProps, acceptedFiles, isDragReject} = useDropzone({accept: {'image/png': [], 'image/jpeg': []}})
  useEffect(() => {
    if(isDragReject) return;
    setFiles(file => [...file, ...acceptedFiles])
  },[acceptedFiles])
  const onSubmit = () => {
    console.log(files);
    setFiles([]);
  }
  return(
    <>
    <div id='title'>
      <h2>画像ドラッガブル</h2>
    </div>
    <div {...getRootProps()} id='drop-zone'>
      <input {...getInputProps()}></input>
      ここにファイルをアップロード
    </div>
    {isDragReject && (
      <div>許可された拡張子ではありません</div>
    )}
    {files[0] && (
    <form id='files-submit' onSubmit={onSubmit}>
      <div id='files'>
      {files.map((file) => {
        return(
          <div key={file.name}>{file.name}<br />{file.type}</div>
        )
      })}
      </div>
      <div id='buttons'>
        <button onClick={() => {setFiles([])}}>リセット</button>
        <input type='submit'></input>
      </div>
    </form>
    )}
    </>
  )
}