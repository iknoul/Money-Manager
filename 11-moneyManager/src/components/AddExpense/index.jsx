 
 import { useState, useRef, useContext } from 'react'
 import {PlusOutlined} from '@ant-design/icons'
 import {Select,Input, Button, InputNumber, Form, DatePicker} from 'antd'
 import {FirstContext} from '../../context'
 import './AddExpense.css'

 const AddExpense=(props)=>{ 

  const{categories, setCategories,  data, setData} = useContext(FirstContext)
  const [newCategory, setNewCategory]  = useState('')
  const [onChange, setOnChange] = useState({category:'',amount:0,date:`${new Date().getDate()}-${new Date().getMonth()+1}-${new Date().getFullYear()}`});
  const inputRef = useRef(null);
  
  const onOk=()=>{
    if(onChange.category!=''&&onChange.amount!=0){
      setData([...data,onChange])
      setOnChange({category:'',amount:0,date:`${new Date().getDate()}-${new Date().getMonth()+1}-${new Date().getFullYear()}`}) 
      props.setAEStatus('none')
      props.setShowIconF({...props.showIconF,s:'flex'})
      setTimeout(()=>{props.setShowIconF({...props.showIconF,s:'none'})},2000)
    }   
    else{
      props.setShowIconF({...props.showIconF,f:'flex'})
      setTimeout(()=>{props.setShowIconF({...props.showIconF,f:'none'})},2000)
    }
  }

  const onCancel=()=>{
    setOnChange({category:'',amount:0,date:`${new Date().getDate()}-${new Date().getMonth()+1}-${new Date().getFullYear()}`}) 
    props.setAEStatus('none')
  }

  const onDateChange=(date,dateString)=>{
    if(date){
      setOnChange({...onChange,date:dateString});
    }
    else{
      setOnChange({...onChange,date:`${new Date().getDate()}-${new Date().getMonth()+1}-${new Date().getFullYear()}`});
    }    
  }

  const addItem = (e) => {
    e.preventDefault();
    setCategories([...categories,{category: newCategory || `New item ${index++}`, amount: 0,budget:0,ldate:0}]);
    setNewCategory('');
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  }


  return (
    <div className="aEmain" style={{display:props.aEStatus}}>
      <Form
      labelCol={{
        span: 5,
      }}
      wrapperCol={{
        span: 10,
      }}
      layout='horizondel'
      style={{
        
      }}
    >
        <Form.Item label="Category">
        <Select className='selectCategary' style={{width: 300,  }}
            onChange={e=>{setOnChange({...onChange,category:e})}}
            placeholder="Select or Add Category"
            value={onChange.category != '' ? onChange.category : null}
            dropdownRender={(menu) => (<>
              {menu}   

              <div className="addCategory">
                <Input
                  placeholder="Please enter item"
                  ref={inputRef}
                  value={newCategory}
                  onChange={e=>{setNewCategory(e.target.value)}}
                  onKeyDown={(e) => e.stopPropagation()}
                />
                <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                  Add item
                </Button>                    
              </div>         
            </>)}

            options={categories.map((item) => ({
                label: item.category,
                value: item.category,
            }))}
        />
        </Form.Item>
        <Form.Item label="Date">
          <DatePicker selected={onChange.date } format='DD-MM-YYYY' placeholder={'Today'} onChange={(e,u)=>{onDateChange(e,u)}} />
        </Form.Item>
        <Form.Item label="Amount">
          <InputNumber min={0} defaultValue={0} onChange={e=>{setOnChange({...onChange,amount:e})}} value={onChange.amount}/>
        </Form.Item>         
      </Form>
        <div className="botButton">
          <Button type="text"  onClick={e=>{setTimeout(onCancel,250)}}>
                      Cancel
          </Button> 
          <Button type="text"  onClick={e=>{setTimeout(onOk,250)}}>
                      ok
          </Button>
        </div>
    </div>
  );
 }

 export default AddExpense