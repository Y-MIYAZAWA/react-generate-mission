type rakutenItem = {
  itemCaption: string,
  itemName: string,
  itemPrice: string,
  mediumImageUrls: string[],
  rank: number,
}

type rakutenItems = {
  Items: rakutenItem[]
}

export type { rakutenItem, rakutenItems }