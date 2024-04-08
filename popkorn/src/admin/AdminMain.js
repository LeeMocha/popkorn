import React, { useRef, useState } from "react";
import Mainlogo from "../header/logo/Mainlogo/Mainlogo";

import "./AdminMain.css";

import DashBoard from "./submenu/dashboard/DashBoard";
import RateChart from "./submenu/modules/RateChart";
import PieChart from "./submenu/modules/chart/PieChart";
import StackChart from "./submenu/modules/chart/StackChart";

import MainEvent from "./submenu/event/MainEvent";
import SlideEvent from "./submenu/event/SlideEvent";
import TotalList from "./submenu/stock/TotalList";
import AdminList from "./submenu/user/AdminList";
import UserList from "./submenu/user/UserList";
import StateList from "./submenu/deiliver/StateList";

import Send from "./submenu/email/Send";

export default function AdminMain() {

    const [subMenuVisible, setSubMenuVisible] = useState({});                                                           // 서브메뉴 토글용
    const dashboards = useRef([]);                                                                                      // DashBoard 컴포넌트의 prop스로 전달할 ref
    const [selectMenu, setSelectMenu] = useState(<DashBoard dashboards={dashboards.current.map((e) => e.component)} />);   // canvers에 보여질 컴포넌트를 담는 state
    const [iconColors, setIconColors] = useState(Array(8).fill('#7de4ff'));                                             // 아이콘의 개수에 맞게 초기 상태 배열 생성



    const toggleDashboard = (sub) => {
        const isDuplicateIndex = dashboards.current.findIndex(dashboard => dashboard.key === sub.key);
        if (isDuplicateIndex === -1) {
            // dashboards 안에 없으면 추가.
            dashboards.current = [...dashboards.current, sub];
        } else {
            // dashboards에 이미 존재하면 제거.
            dashboards.current = dashboards.current.filter((_, index) => index !== isDuplicateIndex);
        }
        setSelectMenu(<DashBoard dashboards={dashboards.current.map(item => item.component)} />);
    };


    const toggleIconColor = (index) => {
        setIconColors(prevColors => {
            const newColors = [...prevColors];
            newColors[index] = prevColors[index] === '#7de4ff' ? '#FE7CF3' : '#7de4ff'; // 해당 아이콘의 색상을 토글
            return newColors;
        });
    };


    const menuList = [
        {
            key: 0,
            icon: "xi-codepen",
            main: "DashBoard",
            subMenu: [{ key: 0, subkey: <i className="xi-chart-pie dicon" onClick={() => toggleIconColor(0)} style={{ color: iconColors[0] }}></i>, component: <PieChart /> }
                , { key: 1, subkey: <i className="xi-presentation dicon" onClick={() => toggleIconColor(1)} style={{ color: iconColors[1] }}></i>, component: <StackChart /> }
                , { key: 2, subkey: <i className="xi-chart-line dicon" onClick={() => toggleIconColor(2)} style={{ color: iconColors[2] }}></i>, component: () => { } }
                , { key: 3, subkey: <i className="xi-dollar dicon" onClick={() => toggleIconColor(3)} style={{ color: iconColors[3] }}></i>, component: <RateChart /> }
                , { key: 4, subkey: <i className="xi-qr-code dicon" onClick={() => toggleIconColor(4)} style={{ color: iconColors[4] }}></i>, component: () => { } }
                , { key: 5, subkey: <i className="xi-forum-o dicon" onClick={() => toggleIconColor(5)} style={{ color: iconColors[5] }}></i>, component: () => { } }
                , { key: 6, subkey: <i className="xi-sitemap-o dicon" onClick={() => toggleIconColor(6)} style={{ color: iconColors[6] }}></i>, component: () => { } }
                , { key: 7, subkey: <i className="xi-puzzle dicon" onClick={() => toggleIconColor(7)} style={{ color: iconColors[7] }}></i>, component: () => { } }]
        },
        {
            key: 1,
            icon: "xi-calendar",
            main: "Event",
            subMenu: [{ key: 0, subkey: "Main Event", component: <MainEvent /> }
                , { key: 1, subkey: "Slide Event", component: <SlideEvent /> }]
        },
        {
            key: 2,
            icon: "xi-users-o",
            main: "User",
            subMenu: [{ subkey: "User List", component: <UserList /> }
                , { subkey: "Admin List", component: <AdminList /> }]
        },
        {
            key: 3,
            icon: "xi-document",
            main: "Order",
            subMenu: [{ subkey: "Order List", component: () => <></> }
                , { subkey: "Refund List", component: () => <></> }
                , { subkey: "Legacy", component: () => <></> }]
        },
        {
            key: 4,
            icon: "xi-box",
            main: "Stock",
            subMenu: [{ subkey: "Total List", component: () => <TotalList /> }
                , { subkey: "Add", component: () => <></> }
                , { subkey: "Update", component: () => <></> }
                , { subkey: "Drop", component: () => <></> }]
        },
        {
            key: 5,
            icon: "xi-truck",
            main: "Diliver",
            subMenu: [{ subkey: "State List", component: <StateList /> }
                , { subkey: "Completed", component: () => <></> }]
        },
        {
            key: 6,
            icon: "xi-mail-o",
            main: "Mail",
            subMenu: [{ subkey: "Send", component: () => <Send /> }
                , { subkey: "Batch", component: () => <></> }]
        },
        {
            key: 7,
            icon: "xi-traffic",
            main: "Traffic",
            subMenu: []
        },
        {
            key: 8,
            icon: "xi-file-code-o",
            main: "Code",
            subMenu: []
        },
        {
            key: 9,
            icon: "xi-log-out",
            main: "Log-Out",
            subMenu: []
        },
    ]


    const showComponent = (sub) => {
        if (typeof sub === 'function') {
            // 컴포넌트가 함수인 경우 실행하여 JSX를 받음
            setSelectMenu(sub());
        } else {
            // 컴포넌트가 JSX인 경우 그대로 설정
            setSelectMenu(sub.component);
        }
    }

    const toggleSubMenu = (key) => {
        setSubMenuVisible(prevState => ({
            ...prevState,
            [key]: !prevState[key]
        }));
    };

    const allHide = () => {
        setSubMenuVisible({});
        setSelectMenu(() => <DashBoard dashboards={dashboards.current.map((e) => e.component)} />)
    }

    return (
        <div className="adminMain_wrap">
            <div className="admin_controller">
                <div className="admin_menubar">
                    <div className="admin_logo"><Mainlogo /></div>
                    <div className="admin_homeBtn_wrap" onClick={allHide}><span>Admin</span><i className="xi-home-o"></i><span>Home</span></div>
                    <div className="admin_menu_upperWrap">
                        <div className="admin_menu_wrap">
                            {
                                menuList.map((menu, i) => {
                                    return (
                                        <React.Fragment key={i}>
                                            <div key={i} className="admin_menu_slot_wrap" onClick={() => toggleSubMenu(menu.key)}>
                                                <i className={menu.icon}></i><span>{menu.main}</span>{menu.subMenu.length === 0 ? <></> : <i className={`xi-angle-down-min xi-x  ${subMenuVisible[menu.key] ? "" : "hide"}`}></i>}
                                            </div>
                                            <div key={`submenu_${menu.main}`} className={`admin_submenu_slot ${subMenuVisible[menu.key] ? "" : "hide"} ${menu.key === 0 ? "dashboard" : ""}`}>
                                                {menu.subMenu.map((sub, i) => (
                                                    <span
                                                        key={i}
                                                        className={`${subMenuVisible[menu.key] ? "" : "hide"}`}
                                                        onClick={menu.key === 0 ? () => toggleDashboard(sub) : () => showComponent(sub)}
                                                    >
                                                        {sub.subkey}
                                                    </span>
                                                ))}
                                            </div>
                                        </React.Fragment>
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="admin_canvers">
                    {selectMenu}
                </div>
            </div>
        </div>
    );
}

