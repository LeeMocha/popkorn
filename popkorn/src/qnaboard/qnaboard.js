import React, { useState, useEffect } from 'react';
import { apiCall } from '../service/apiService';
import SearchForm from '../admin/submenu/modules/SearchForm';
import Header from '../header/Header';
import './qnaboard.css';
import AdminPaging from '../admin/submenu/modules/AdminPaging';

function QnaBoard() {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentKeyword, setCurrentKeyword] = useState('');
  const [posts, setPosts] = useState([]);
  const [currCategoryl, setCurrCategoryl] = useState('all');
  const qnaPerPage = 10;
  const [currKeyword, setCurrKeyword] = useState('');
  const categoryl = ['all', 'Title', 'ID', 'Content']
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
    apiCall(`/api/qna/searchlist?searchType=${currCategoryl}&keyword=${currKeyword}&page=${currentPage}`, "GET", null, null)
      .then(response => {
        const sortedPostsDescending = response.data.dtoList.sort((a, b) => new Date(b.createdat) - new Date(a.createdat));
        console.log(response)
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
  }, [currCategoryl, currKeyword, currentPage, qnaPerPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const setPageState = (newPage) => {
    if (newPage < 1 || newPage > qnaData.pageData.totalPage) return;
    setCurrentPage(newPage);
  };

  const handleSearch = (keyword) => {
    setCurrentKeyword(keyword);
    setCurrentPage(1);
  };

  return (
    <div className='qnawhole'>
      <Header />
      <div>
        <h1>QnA Board</h1>
        <div>
          <select onChange={(e) => {
            setCurrCategoryl(e.target.value);
            setPageState(1);
          }}>
            {categoryl.map((category, index) =>
              <option value={category} key={index}>{category}</option>
            )}
          </select>
        </div>
        <SearchForm setCurrKeyword={setCurrKeyword} setCurrentPage={setCurrentPage} showButton={false} />
        {posts.length > 0 ? 
        <table className='qnalist'>
          <thead>
            <tr className='qnaheader'>
              <th>Category</th>
              <th>Title</th>
              <th>Author</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, index) => (
              <tr key={index} className='qnabody'>
                <td>{post.category}</td>
                <td>{post.title}</td>
                <td>{post.id}</td>
                <td>{new Date(post.createdat).toLocaleString('ko-KR', {
                  year: 'numeric', month: '2-digit', day: '2-digit',
                  hour: '2-digit', minute: '2-digit', hour12: false
                })}</td>
              </tr>
            ))}
          </tbody>
        </table> : (
          <p>No posts found</p>
        )}
        <div className='qnapaging'>
          <AdminPaging pageData={qnaData.pageData} setPageState={setPageState} />
        </div>
      </div>
    </div>
  );
}

export default QnaBoard;
