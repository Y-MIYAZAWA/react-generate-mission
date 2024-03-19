import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Input } from './features/batchInput/components/Input';
import { Link } from 'react-router-dom';
import { Change } from './features/changeSelect/components/Change';
import { NarrowDown } from './features/narrowDown/components/NarrowDown';
import { InputModal } from './features/inputModal/components/InputModal';

const App = () => {
  return (
      <>
      <BrowserRouter>
        <div id='menu'>
          <h1>React実践課題</h1>
          <Link to="/batch">課題1.フォームの一括入力</Link><br />
          <Link to="/change">課題2.フォームの指定箇所から他の場所に選択した値を移動</Link><br />
          <Link to="/narrow">課題3.フォームのセレクト絞込み表示</Link><br />
          <Link to="/inmodal">課題4.モーダル内容変更と削除と項目の追加</Link>
        </div>
        <div id='element'>
          <Routes>
            <Route path='/batch' element={<Input /> } />
            <Route path='/change' element={<Change />} />
            <Route path='/narrow' element={<NarrowDown />} />
            <Route path='/inmodal' element={<InputModal />} />
          </Routes>
        </div>
      </BrowserRouter>
      </>
    )
};

export default App;
