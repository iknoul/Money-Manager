import AddBudget from '../../components/AddBudget'
import SideBar from '../../components/SideBar'
import { useState } from 'react'
import { Button, Empty} from 'antd';
import { FirstContext } from '../../context';
import { useContext } from 'react';
import { PlusOutlined } from '@ant-design/icons'
import  { PieChart } from 'react-minimal-pie-chart'
import './Wallet.css'

const Wallet=()=>{
    const{  data} = useContext(FirstContext)
    const{categories, setCategories} = useContext(FirstContext)
    const [aBStatus, setABStatus] = useState('none')
    return(<>
    <div className="mainD">
        <SideBar st={'flex'}/>
        <div className="dBmain">
            <div className="leftW" >
                    <h3 style={{color:'rgb(213, 90, 88)'}}>Budget Per Category</h3>

                <div className="leftWContents">
                {categories.map((i,index)=>{
                    return(<div className='budgets' key={index}>
                        <p>{i.category}</p>
                        <h4>${i.budget}</h4>
                    </div>)
                })} 
                </div>
                <Button
                size='large'
                style={{display:aBStatus=='none'?'flex':'none',alignItems:'center',backgroundColor:'rgb(213, 90, 88)'}}
                className='btAdd'
                shape="square"
                type="primary"
                onClick={e=>{setABStatus('flex')}}
                icon={< PlusOutlined/>}
                >Add Budget</Button>
                <AddBudget categories={categories} setCategories={setCategories} status={{aBStatus, setABStatus}} ></AddBudget>
            </div>
        <div className="rightW">
            <div className="circleW">
                <div className="labels-circle">
                {/* style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} */}
                    {categories.filter(m=>m.budget>0).map((i, index) => (
                        <div key={index} style={{marginBottom: '5px', color:`rgb(${(206-index*20)}, ${index<4?(25*index):(index<7?(105+(index*25)):(47+index*17))}, ${index<4?(47+index*17):(index<7?(105+(index*25)):(25*index))})` }}>
                            {i.category}
                        </div>
                    ))}
                </div>
                <div className='circle'>
                    <PieChart
                        data={
                            categories.filter(m=>m.budget>0).map((i, index) => ({
                                value: i.budget,
                                color:`rgb(${(206-index*20)}, ${index<4?(25*index):(index<7?(105+(index*25)):(47+index*17))}, ${index<4?(47+index*17):(index<7?(105+(index*25)):(25*index))})`             
                            
                            }))
                        }
                        lineWidth={60}
                        radius={45}
                        segmentsStyle={{ transition: 'stroke .4s', cursor: 'pointer' }}
                        segmentsShift={(index) => ((index==2 || index==4) &&  5-index)}
                        animate={true}
                    /> 
                </div>
            </div>
        </div>
            
            
        </div>
    </div></>)
}
export default Wallet