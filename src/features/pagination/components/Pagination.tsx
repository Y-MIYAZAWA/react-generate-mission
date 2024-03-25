import React, { FC, useContext, useState } from "react";
import "../assets/css/pagination.css"
import { SubmitHandler, useForm } from "react-hook-form";
import { rakutenItem } from "../types/rakutenAPI";
import { getRankikng } from "../api/getRanking";
import { CircularProgress, Pagination } from "@mui/material";
import { useNavigate } from "react-router-dom";


type Input = {
  genreId: number,
}

export const Paginations: FC<{updateItem: (item:rakutenItem) => void}> = ({updateItem}) => {

  const [items, setItems] = useState<rakutenItem[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const {register, handleSubmit, formState: {errors}} = useForm<Input>();

  const setRanking: SubmitHandler<Input> = async (data) => {
    setLoading(true);
    let itemArr:rakutenItem[] = [];
    for(let i = 1; i < 8; i++){
      getRankikng(data.genreId, i)
      .then((response) => {
        itemArr = itemArr.concat(response.data.Items);
      })
      .catch(() => {
        return
      })

      await new Promise(resolve => { setTimeout(resolve, 500); });
    }
    setItems(itemArr);
    setLoading(false);
  }

  const [page, setPage] = useState(1);
  const [start, setStart] = useState(0);
  const perPage = 10;
  const onPageChange = (e: React.ChangeEvent<unknown>, page: number) => {
    setPage(page);
    setStart((page - 1) * perPage);
  }


  const navigate = useNavigate();
  const setItemDetail = (item: rakutenItem) => {
    updateItem(item);
    navigate("/item");
  }

  return(
    <>
    <div id="ranking">
      <h1 id="title">楽天ランキング取得</h1>
      <form id="genre-search" onSubmit={handleSubmit(setRanking)}>
        <label htmlFor="genre-id">知りたいジャンルID：</label>
        <input id="genre-id" type="number" {...register('genreId')} required></input>
        <div>
          <input type="submit" value="ランキング取得"></input>
        </div>
      </form>
      {isLoading ? 
      <div id="loading">
        <CircularProgress id="circular-progress"></CircularProgress>
        <p>ランキング取得中...</p>
      </div> :
      <table id="ranking-table" border={1}>
        <thead>
          <tr>
            <td>順位</td><td>商品名</td>
          </tr>
        </thead>
        <tbody>
          {items.slice(start, start + perPage).map((item) => {
            return(
              <tr key={item.rank}>
                <td>{item.rank}</td><td onClick={() => {setItemDetail(item)}}>{item.itemName}</td>
              </tr>
            )
          })}
        </tbody>
      </table>}
      <div id="pagination">
        <Pagination
        count={Math.ceil(items.length / perPage)}
        page={page}
        onChange={onPageChange} />
      </div>
    </div>
    </>
  )
}