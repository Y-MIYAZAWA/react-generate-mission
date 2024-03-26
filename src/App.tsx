import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Input } from './features/batchInput/components/Input';
import { Link } from 'react-router-dom';
import { Change } from './features/changeSelect/components/Change';
import { NarrowDown } from './features/narrowDown/components/NarrowDown';
import { InputModal } from './features/inputModal/components/InputModal';
import { Paginations } from './features/pagination/components/Pagination';
import { ItemDetail } from './features/pagination/components/ItemDetail';
import { rakutenItem } from './features/pagination/types/rakutenAPI';
import { EditImage } from './features/editImage/components/EditImage';

const App = () => {
  const [item, setItem] = useState<rakutenItem>({
    itemName: "",
    itemCaption: "",
    itemPrice: "",
    rank: 0,
    mediumImageUrls: []
  });
  const updateItem = (item:rakutenItem) : void => setItem(item);
  return (
      <>
        <BrowserRouter>
          <div id='menu'>
            <Link to="http://localhost:3000"><h1>React実践課題</h1></Link>
            <Link to="/batch">課題1.フォームの一括入力</Link><br />
            <Link to="/change">課題2.フォームの指定箇所から他の場所に選択した値を移動</Link><br />
            <Link to="/narrow">課題3.フォームのセレクト絞込み表示</Link><br />
            <Link to="/inmodal">課題4.モーダル内容変更と削除と項目の追加</Link><br />
            <Link to="/pagenation">課題5.ページャー（ページネーション）機能と詳細画面</Link><br />
            <Link to="/editImg">課題6.画像リサイズ機能と画像ダウンロード機能</Link>
          </div>
          <div id='element'>
            <Routes>
              <Route path='/batch' element={<Input /> } />
              <Route path='/change' element={<Change />} />
              <Route path='/narrow' element={<NarrowDown />} />
              <Route path='/inmodal' element={<InputModal />} />
              <Route path='/pagenation' element={<Paginations updateItem={updateItem} />} />
              <Route path='/item' element={<ItemDetail itemCaption={item.itemCaption} itemName={item.itemName} itemPrice={item.itemPrice} mediumImageUrls={item.mediumImageUrls} rank={item.rank} />} />
              <Route path='/editImg' element={<EditImage />} />
            </Routes>
          </div>
        </BrowserRouter>
      </>
    )
};

export default App;
