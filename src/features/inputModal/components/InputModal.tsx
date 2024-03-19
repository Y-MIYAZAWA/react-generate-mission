import { Box, Modal } from "@mui/material";
import React, { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form";

type User = {
  id: number,
  lastName: string,
  firstName: string,
}

type Input = {
  lastName: string,
  firstName: string
}

const style = {
  textAlign: 'center',
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

export const InputModal = () => {
  const [count, setCount] = useState<number>(1);
  const [users, setUser] = useState<User[]>([]);
  const [edittingUser, setEdit] = useState<User>({
    id: 0,
    lastName: "",
    firstName: ""
  });
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const editUserOpen  = (props: User) => {
    setEdit(props);
    setEditOpen(true);
  }

  const { register, handleSubmit, formState: {errors}} = useForm<Input>();

  const onSubmit: SubmitHandler<Input> = (data) => {
    setUser((state) => {
      return(
        state.map((obj) => obj.id === edittingUser.id ? {
          id: edittingUser.id,
          lastName: data.lastName,
          firstName: data.firstName
        } : obj)
      )
    })
    setEditOpen(false);
  };

  const deleteUserOpen = (props: User) => {
    setEdit(props);
    setDeleteOpen(true);
  }

  const deleteUser = (props: User) => {
    setUser((prevState) => prevState.filter((user) => user.id !== props.id ));
    setDeleteOpen(false);
  }

  const addUser = () => {
    setCount(count + 1);
    setUser([...users,{
      id: count,
      lastName: `ユーザー姓${count}`,
      firstName: `ユーザー名${count}`,
    }])
  };

  return(
    <>
    <table border={1} cellSpacing={0}>
      <thead>
        <tr>
          <td>ID</td><td>姓</td><td>名</td>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => {
        return(
        <tr key={user.id}>
          <td>{user.id}</td><td>{user.lastName}</td><td>{user.firstName}</td><td><input type="button" value="編集" onClick={() => {editUserOpen(user)}}></input></td><td><input type="button" value="削除" onClick={() => {deleteUserOpen(user)}}></input></td>
        </tr>)
        })}
      </tbody>
    </table>
    <button onClick={addUser}>+</button>
    <Modal open={editOpen}>
      <Box sx={style}>
        <h2 id="title">
          編集
        </h2>
        <div>
          ID:{edittingUser.id} 姓:{edittingUser.lastName} 名:{edittingUser.firstName}
        </div><br />
        <form id="edit-user" onSubmit={handleSubmit(onSubmit)}>
          <h2>ユーザー名変更</h2>
          <label htmlFor="last-name">姓:</label>
          <input id="last-name" type="text" {...register('lastName')}></input>
          <label htmlFor="first-name">名:</label>
          <input id="first-name" type="text" {...register('firstName')}></input>
          <input type="submit"></input>
          <input type="button" value="キャンセル" onClick={() => {setEditOpen(false)}}></input>
        </form>
      </Box>
    </Modal>
    <Modal open={deleteOpen}>
      <Box sx={style}>
        <h2>
          削除
        </h2>
        <div>
          削除しますか？
        </div>
        <button onClick={() => {deleteUser(edittingUser)}}>削除</button>
        <button onClick={() => {setDeleteOpen(false)}}>キャンセル</button>
      </Box>
    </Modal>
    </>
  )
}