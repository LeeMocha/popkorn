import TypeIt from "typeit-react";
import ListForm from "../modules/ListForm";
import SearchForm from "../modules/SearchForm";

import "./user.css";
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function UserList() {
    const [page, setPage] = useState(1);
    const [data, setDataState] = useState({
            userList:{
                content: []
            },
            totalcnt: 0,
            signedcnt: 0,
            unsignedcnt: 0
        });

    useEffect(() => {
        axios.get(`/api/user/userlist?page=${page}&size=20`)
            .then(response => {
                console.log(response.data);
                setDataState(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [page]);

    return (
        <div className="userlist_wrap">
            <div className="userlist_header">
                <TypeIt options={{ loop: false }} className="userlist_type">User List</TypeIt>
            </div>
            <div className="userlist_statistical">
                <div><span>TOTAL USERS</span><span>{data.dashboard1+data.dashboard2+data.dashboard3}</span></div>
                <div><span>SIGNED USERS</span><span>{data.dashboard2}</span></div>
                <div><span>UNSIGNED USERS</span><span>{data.dashboard3}</span></div>
            </div>
            <SearchForm setDataState={setDataState} entity={"user"}/>
            <ListForm data={data.dtoList} setDataState={setDataState} setPage={setPage} pk={"id"}/>
        </div>
    );
}