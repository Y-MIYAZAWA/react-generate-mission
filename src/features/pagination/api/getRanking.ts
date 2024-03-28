import axios from "axios";

export const getRankikng = (genreId: number, page: number) => {
  return axios.get('https://app.rakuten.co.jp/services/api/IchibaItem/Ranking/20220601',{
    params:{
      applicationId: '1080929396851801369',
      formatVersion: 2,
      page: page,
      elements: "itemName,itemPrice,mediumImageUrls,itemCaption,rank",
      genreId: genreId,
    }
  })
}