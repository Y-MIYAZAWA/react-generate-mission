import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useToken } from '../hooks/useToken'
import { Box } from '@mui/material'
import '../assets/css/login.css'

type Form = {
  id: string,
  password: string
}

export const Login = () => {
  const {register, handleSubmit, reset} = useForm<Form>()
  const token = useToken(64);
  const [isToken, setIsToken] = useState(false);

  useEffect(() => {
    let isStorageToken = window.localStorage.getItem('token64');
    if(!isStorageToken) return
    setIsToken(true);
  },[])
  const onReset = () => {
    reset();
  }
  const onSubmit: SubmitHandler<Form> = () => {
    window.localStorage.setItem('token64', token);
    reset();
    setIsToken(true);
  }

  const onLogout = () => {
    window.localStorage.removeItem('token64')
    setIsToken(false)
  }
  return(
    <>
    <div id='login'>
      <h2>ログイン機能</h2>
    {isToken ?
      <>
      <div id='isLogin-container'>
        <h2>ログイン中</h2>
      </div>
      <div>
        <button type='button' onClick={onLogout}>ログアウト</button>
      </div>
      </>
      :
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor='id'>ID：</label>
          <input type='text' id='id' {...register('id')} required />
          <label htmlFor="password">パスワード：</label>
          <input type="password" id="password" {...register('password')} required />
        </div>
        <div>
          <input type='button' value='入力リセット' onClick={onReset} />
          <input type="submit" id="submit" />
        </div>
      </form>
    }
    </div>
    </>
  )
}