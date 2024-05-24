import { useContext } from "react";
import { useState } from "react";
import { FaChevronLeft, FaChevronRight,FaUser } from "react-icons/fa6";
import {Avatar} from 'antd'
import { NavLink } from "react-router-dom";
import './SideBar.css'
const SideBar =()=>{

    const [sideBarDisplay, setSideBarDisplay] = useState('flex')
    const onClick = ()=>{
        if(sideBarDisplay=='none'){
            setSideBarDisplay('flex')
        }
        else{
            setSideBarDisplay('none')
        }
    }
    return(<>
    <div className="main_" >
         <div className="sBMain" style={{display:sideBarDisplay}}>
            <div className="profile">
                <Avatar shape="square" size={70} icon={<FaUser />} />
                <p>Iknoul</p>
                <h5>iknoul07@gmail.com</h5>
            </div>
            <div className="pageNav">
            <NavLink className='nav-link' to='/'><h4>DashBoard</h4></NavLink>
            <NavLink className='nav-link' to='/e'><h4>Expenses</h4></NavLink>
            <NavLink className='nav-link' to='/d'><h4>Wallet</h4></NavLink>

            </div>
         </div>
         <div className="sBside" onClick={onClick}>            
            <FaChevronLeft style={sideBarDisplay=='flex'?{display:'flex'}:{display:'none'}} fontSize={33} />
            <FaChevronRight style={sideBarDisplay=='flex'?{display:'none'}:{display:'flex'}} fontSize={33} />
 
         </div>
    </div>
    </>)
}

export default SideBar