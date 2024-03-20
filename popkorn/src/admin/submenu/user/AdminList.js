

import TypeIt from "typeit-react";
import ListForm from "../modules/ListForm";
import SearchForm from "../modules/SearchForm";

import "./user.css";
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminList() {
    const [page, setPage] = useState(1);
    const [data, setDataState] = useState([]);

    useEffect(() => {
        axios.get(`/api/user/adminlist?page=${page}&size=20`)
            .then(response => {
                setDataState(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [page]);

    return (
        <div className="userlist_wrap">
            <div className="userlist_header">
                <TypeIt options={{ loop: false }} className="userlist_type">Admin List</TypeIt>
            </div>
            <div className="userlist_statistical">
                <div><span>TOTAL ADMIN</span><span>{data.length}</span></div>
            </div>
            <SearchForm />
            <ListForm data={data} setDataState={setDataState} setPage={setPage} />
        </div>
    );
}