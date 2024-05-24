import AddExpense from '../../components/AddExpense'
import SideBar from '../../components/SideBar'
import { useState } from 'react'
import { Button, Empty, Alert, Descriptions} from 'antd';
import { MdAttachMoney } from "react-icons/md";
import { GiTakeMyMoney } from "react-icons/gi";
import { TbMoneybag } from "react-icons/tb";
import { FirstContext } from '../../context';
import { useContext } from 'react';
import {PlusOutlined } from '@ant-design/icons'
import './DashBoard.css'

const DashBoard=()=>{
    const{  data} = useContext(FirstContext)
    const [aEStatus, setAEStatus] = useState('none')
    const [showIconF, setShowIconF] = useState({s:'none',f:'none'})

    return(<>
    <div className="mainD">
        <SideBar st={'flex'}/>
        <div className="dBmain">
            <div className="leftD" >
                <div className="account">
                <Descriptions
                    style={{padding:10}}
                    title="Account info"
                    size={'default'}
                    titleMarginBottom={3}
                    // extra={<Button type="primary">Edit</Button>}
                    items={[{key: '1',
                    label: 'Account no',
                    children: '890934906000',span:2},{key: '3',
                    label: 'Balence',
                    children: '$23489'},{key: '2',
                    label: 'User name',span:3,
                    children: 'iknoul'},{key: '4',
                    label: 'Ifsc code',
                    children: '89093',}]}
                />
                </div>
                <div className="addD" style={{position:aEStatus=='none'?'relative':'static'}}>
                    {/* style={{position:aEStatus=='none'?'relative':'relative'}} */}
                    <MdAttachMoney id='mA1'size={30}/>
                    <MdAttachMoney id='mA2'size={30}/>
                    <MdAttachMoney id='mA3'size={30}/>
                    <GiTakeMyMoney id='GT1'size={30}/>                
                    <TbMoneybag id='TM1'size={60}/>

                    <Button
                    size='large'
                    style={{display:aEStatus=='none'?'flex':'none',alignItems:'center',backgroundColor:'rgb(70,70,70)'}}
                    className='btAdd'
                    shape="square"
                    type="primary"
                    onClick={e=>{setAEStatus('flex')}}
                    icon={<PlusOutlined />}
                    >Add Expense</Button>
                    <AddExpense showIconF={showIconF} setShowIconF={setShowIconF}aEStatus={aEStatus} setAEStatus={setAEStatus}></AddExpense>                 
                    <Alert
                        style={{position:'absolute',display:showIconF.s}}
                        message="Succesfully added."
                        // description="Succesfully added."
                        type="success"
                        showIcon={true}
                    />
                    <Alert
                        style={{position:'absolute',display:showIconF.f,zIndex:2, top:100,left:480}}
                        message="fields shouldn't be empty"
                        // description="Succesfully added."
                        type="warning"
                        showIcon={true}
                    />
                </div>
            </div>
            <div className="rightD">
                <h3 className='history-title'>Last added</h3>
                {data.length!=0?data.map((i, index)=>{
                    return(
                    <div className="history-item" key={index}>
                        
                        <div className="title-history-item">
                            <h4>{i.category}</h4>
                            <h4 style={{color:'rgb(252, 186, 186)'}}>{i.date}</h4>
                        </div>
                        <div className="history-item-bottom">
                        <label>amount:&nbsp;</label><p>${i.amount}</p>
                        </div>
                        <div className="history-item-bottom2">
                        <label>note:&nbsp;</label><p></p>
                        </div>
                    </div>)
                }): <Empty className='nothing'image={Empty.PRESENTED_IMAGE_SIMPLE} />}
            </div>
            
            
        </div>
    </div>
    </>)
}
export default DashBoard