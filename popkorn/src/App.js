import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Main from './Main';
import ProductPage from './producPage/ProductPage';
import MyPageMain from './auth/mypage/mypagemain';
import AuthMain from './auth/AuthMain';
import TBBtn from './useModules/TBBtn'
import AdminMain from './admin/AdminMain';

import './App.css';
import ProductDetail from './productDetail/ProductDetail';
import Cart from './Cart/Cart';
import Order from './order/Order';

import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import React from 'react';


// 로그인 상태는 Session 전역으로 관리함. 
// Session의 상태를 표현하는 useState를 Boolean 값으로 설정해둠
// 만약 false 일 경우엔 지정된 경로가 아닌 로그인 경로 컴포넌트를 전달
// 로그인 상태 확인 후 진행되어야 할 페이지

export const Logincontext = React.createContext();


function App() {

  const [isLoggedIn, setIsloggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const storedLoginID = sessionStorage.getItem('loginID');
    axios.get(`/api/user/selectone?id=${storedLoginID}`)
      .then(response => {
        if (storedLoginID === response.data.id && response.data.status === 'admin') {
          setIsloggedIn(true);
          setIsAdmin(true);

        } else if (storedLoginID === response.data.id) {
          setIsloggedIn(true);

        }
      })
      .catch(err => {
        console.log("해당하는 로그인 정보 없음=>" + err);
      });
  }, []);


  useEffect(() => {
    sessionStorage.setItem('loginCheck', isLoggedIn);
  }, [isLoggedIn]);

  return (
    <Logincontext.Provider value={[isLoggedIn, setIsloggedIn]}>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Main}></Route>
          <Route path="/productpage" Component={ProductPage}></Route>
          <Route path="/MyPageMain" element={isLoggedIn ? <MyPageMain isAdmin={isAdmin} /> : <AuthMain />}></Route>
          <Route path="/auth" Component={AuthMain}></Route>
          <Route path="/productdetail" Component={ProductDetail}></Route>
          <Route path="/cart" Component={Cart}></Route>
          <Route path="/order" Component={Order}></Route>
          <Route path='/AuthMain' element={<AuthMain />}></Route>
          <Route path='/AdminMain' element={<AdminMain />}></Route>
        </Routes>
      </BrowserRouter>
      {/* <TBBtn/> */}
    </Logincontext.Provider>
  );
}

export default App;
