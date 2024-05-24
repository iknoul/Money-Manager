import SideBar from "../../components/SideBar"
import { useContext } from "react"
import {Progress,Empty} from 'antd'
import  { PieChart } from 'react-minimal-pie-chart'
import {FirstContext} from '../../context'
import { useEffect } from "react"
import './Expenses.css'
const Expenses=()=>{
    const {categories, setCategories, data} = useContext(FirstContext)
    const copyCategories = [...categories]

    let d = data!=''?data[0].date:'22-12-2034'
    data&&data.map(i=>{
        if(i.date>d){
            d=i.date
        }
    })
    const expenseE=()=>{
        categories.map((i,index)=>{
            copyCategories[index].amount = 0    
            copyCategories[index].date ='0'     
               
            {data.length!=0&&data.filter(m=>m.category==i.category).map((j,index2)=>{
                copyCategories[index].amount =copyCategories[index].amount+j.amount
                if(j.date>copyCategories[index].date){copyCategories[index].date=j.date}
            })}                                                 
        })
        setCategories(copyCategories)
    }
    useEffect(expenseE,[])
    
    return(<>
        <div className="mainD">
            <SideBar st={'flex'}/>
            <div className="dBmain">
                <div className="leftE">
                    <h3 style={{color:'rgb(240,141,141)'}}>Expense Per Category</h3>
                    <div className="leftEContent">
                    {
                        categories.map((i,index)=>{
                            return(<div className='categoryEM' key={index}><div className='categoryETitle' key={index}>
                            <p style={{width:100,display:"flex",justifyContent:"center",fontWeight:'bold'}}>{i.category}</p><p style={{width:80,display:"flex",justifyContent:"center"}}>${i.amount}</p></div> 
                            
                            <p style={{color:'rgb(158, 158, 158)', display:'flex', justifyContent:'center'}}>{i.date!=0?`last updated: ${i.date}`:'No cost in a while'}</p></div>)
                        })
                    }
                    </div>
                </div>
                
        <div className="rightE">                    
        <div className="cirlcrE">
    
        {/* Render labels manually */}
        <div className="labels-circle">
        {/* style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} */}
            {categories.filter(m=>m.amount>0).map((i, index) => (
                <div key={index} style={{marginBottom: '5px', color: index < 10 ? `rgb(${(index*50)}, ${(index*2)}, ${(90-index*2)}` : ( 'red' ) }}>
                    {i.category}
                </div>
            ))}
        </div>
        <div className='circle'>
        <PieChart
            data={
                categories.map((i, index) => ({
                    value: i.amount,
                    color: index < 10 ? `rgb(${(index*50)}, ${(index*2)}, ${(90-index*2)}` : ( 'red' )
                }))
            }
            lineWidth={60}
            radius={50}
            segmentsStyle={{ transition: 'stroke .4s', cursor: 'pointer' }}
            segmentsShift={(index) => (index < 2 ? 5-index : 0)}
            animate={true}
        />
        </div>
    </div>
    <div className="progressE">
    <h3 style={{color:'rgb(240,141,141)'}}>Expense per Budget </h3>
                   <div className=".progressEContent" style={{overflow:'scroll',scrollbarWidth:'none'}}>{
                    
                            categories.filter(m=>m.budget>0).length!=0?categories.filter(m=>m.budget>0).map((i,index)=>{
                                const a = parseInt((i.amount)/(i.budget/100))
                                console.log(a)
                                return(
                                    <div key={index}>
                                    <p>{i.category}</p>
                                    <Progress percent={a} status='normal' strokeColor={a>75?'red':(a>35?'orange':'green')}/>
                                    {/* <Progress percent={70} status="exception" showInfo={true}/> */}
                                    </div>
                                )
                            }):<Empty className='nothing'image={Empty.PRESENTED_IMAGE_SIMPLE} />
                       
                   }</div>
                    </div>
</div>
            </div>
            </div>
        {/* </div> */}
        </>)
}
export default Expenses