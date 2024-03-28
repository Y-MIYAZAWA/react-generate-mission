import React, { useContext } from 'react'
import { rakutenItem } from '../types/rakutenAPI';

export const ItemDetail = (item: rakutenItem) => {
  console.log(item.itemCaption)
  return(
    <>
    <table border={1}>
      <thead>
        <tr>
          <td>{item.rank}位</td><td>{item.itemName}</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colSpan={2}><img src={item.mediumImageUrls[0]}></img><img src={item.mediumImageUrls[1]}></img><img src={item.mediumImageUrls[2]}></img></td>
        </tr>
        <tr>
          <td colSpan={2}>{item.itemCaption}</td>
        </tr>
        <tr>
          <td colSpan={2}>{item.itemPrice}円</td>
        </tr>
      </tbody>
    </table>
    </>
  )
}