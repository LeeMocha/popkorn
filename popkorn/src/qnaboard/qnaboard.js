import React, { useState, useEffect } from 'react';
import { apiCall } from '../service/apiService';
import SearchForm from '../admin/submenu/modules/SearchForm';
import Header from '../header/Header';
import './qnaboard.css';
import AdminPaging from '../admin/submenu/modules/AdminPaging';
import Footer from '../footer/Footer';
import Qnainsert from './qnainsert';
import Qnaposting from './qnaposting';

function QnaBoard() {
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [currCategoryl, setCurrCategoryl] = useState('all');
  const [selectedSearchType, setSelectedSearchType] = useState('all');
  const searchTypes = ['all', 'Title', 'ID', 'Content'];
  const categories = ['Refund', 'Transaction', 'Etc'];
  const [currKeyword, setCurrKeyword] = useState('');
  const [showkeyword, setShowkeyword] = useState(false);
  const [showInsertModal, setshowInsertModal] = useState(false);
  const [showContentModal, setshowContentModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [qnaData, setqnaData] = useState({
    servData: [],
    pageData: {
      page: 1,
      size: 20,
      prev: false,
      next: false,
      start: 0,
      end: 0,
      pageList: [1],
      totalPage: 0
    }
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const updateKeyword = (keyword) => {
    setCurrKeyword(keyword);
    setCurrCategoryl('all');
    setCurrentPage(1);
    setShowkeyword(true);
  };

  useEffect(() => {
    const endpoint = currCategoryl === 'all'
      ? `/api/qna/searchlist?searchType=${selectedSearchType}&keyword=${currKeyword}&page=${currentPage}`
      : `/api/qna/posts?category=${currCategoryl}&keyword=${currKeyword}&page=${currentPage}`;

    apiCall(endpoint, "GET", null, null)
      .then(response => {
        setPosts(response.data.dtoList);
        setqnaData({
          servData: response.data.dtoList,
          pageData: {
            page: response.data.page,
            size: response.data.size,
            prev: response.data.prev,
            next: response.data.next,
            start: response.data.start,
            end: response.data.end,
            pageList: response.data.pageList,
            totalPage: response.data.totalPage
          }
        });
      })
      .catch(err => {
        console.error('Error loading data:', err);
      });
  }, [currCategoryl, currKeyword, currentPage]);

  const setPageState = (newPage) => {
    if (newPage < 1 || newPage > qnaData.pageData.totalPage) return;
    setCurrentPage(newPage);
  };

  const handleCategoryClick = category => {
    setCurrCategoryl(category);
    setSelectedSearchType('all');
    setCurrKeyword('');
    setShowkeyword(false);
    setCurrentPage(1);
  };

  const openModal = () => setshowInsertModal(true);
  const closeModal = () => setshowInsertModal(false);

  // 게시물 클릭 이벤트 핸들러
  const showContent = (post) => {
    setSelectedPost(post);
  };

  // 모달 닫기 이벤트 핸들러
  const closeContent = () => {
    setSelectedPost(null);
  };

  return (
    <>
      <Header />
      <div className='qnawhole'>
        <h1 className='qnaheader'>QNA Board</h1>
        <div className='searchguide'>
          {showkeyword && currKeyword.length != 0 ?
            <div>{`${currKeyword}로 검색한 결과입니다.`}</div>
            : null}
        </div>
        <div className='qnasearchform'>
          <div>
            <select className='qnacategoryl' onChange={(e) => {
              setSelectedSearchType(e.target.value);
              setPageState(1);
            }}>
              {searchTypes.map((searchTypes, index) =>
                <option value={searchTypes} key={index}>{searchTypes}</option>
              )}
            </select>
          </div>
          <SearchForm setCurrKeyword={updateKeyword} setCurrentPage={setCurrentPage} showButton={false} />
        </div>
        <div className='qnacategorysearch'>
          <button className='categorysearchbtnall' onClick={() => handleCategoryClick('all')}>All</button>
          {categories.map((category, index) => (
            <button className='categorysearchbtn' key={index} onClick={() => handleCategoryClick(category)}>
              {category.toUpperCase()}
            </button>
          ))}
        </div>
        <div>
          {posts.length > 0 ?
            <table className='qnalist'>
              <thead className='qnasubheader'>
                <tr>
                  <th className='qnacategory'>Category</th>
                  <th className='qnatitle'>Title</th>
                  <th className='qnaauthor'>Author</th>
                  <th className='qnadate'>Date</th>
                </tr>
              </thead>
              <tbody>
        {posts.map((post, index) => (
          <tr key={index} className='qnatr'>
            <td>{post.category}</td>
            <td className='qnatitlepost' onClick={() => showContent(post)}>{post.title}</td>
            <td>{post.id}</td>
            <td>{new Date(post.createdat).toLocaleString('ko-KR', {
              year: 'numeric', month: '2-digit', day: '2-digit',
              hour: '2-digit', minute: '2-digit', hour12: false
            })}</td>
          </tr>
        ))}
      </tbody>
      {selectedPost && <Qnaposting onClose={closeContent} post={selectedPost} />}
            </table> : (
              <table className='qnalist'>
                <thead className='qnasubheader'>
                  <tr>
                    <th className='qnacategory'>Category</th>
                    <th className='qnatitle'>Title</th>
                    <th className='qnaauthor'>Author</th>
                    <th className='qnadate'>Date</th>
                  </tr>
                </thead>
              </table>
            )}
          <div className='qnapaging'>
            <AdminPaging pageData={qnaData.pageData} setPageState={setPageState} />
          </div>
          <div className='writeqnacontainer'>
            <button className='writeqna' onClick={openModal}>Post QNA</button>
            {showInsertModal && <Qnainsert onClose={closeModal}>
              <h2>Modal Title</h2>
              <p>This is a modal content.</p>
            </Qnainsert>}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default QnaBoard;