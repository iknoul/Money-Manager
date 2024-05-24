 
 import { useState } from 'react'
 import {Select, Button, InputNumber, Form} from 'antd'
 import './AddBudget.css'

 const AddBudget=(props)=>{ 

 
  const [onChange, setOnChange] = useState({category:'',budget:0});

  const onOk=()=>{
    if(onChange.category!=''&&onChange.budget>=0){
      const copyCategories = [...props.categories]
      copyCategories[copyCategories.findIndex(m=>m.category==onChange.category)].budget = onChange.budget
      props.setCategories(copyCategories)
      setOnChange({category:'',budget:0}) 
      props.status.setABStatus('none')
      
    }   
  }
  const onCancel=()=>{
      setOnChange({category:'',budget:0}) 
      props.status.setABStatus('none')
  }

  return (
    <div className="aBmain" style={{display:props.status.aBStatus}}>
        <Form
        labelCol={{
          span: 10,
        }}
        wrapperCol={{
          span: 6,
        }}
        layout='inline'
        style={{
          width:'230px',
          display:'flex',
          flexDirection:'column',
          gap:'15px',
          justifyContent:'center'          
        }}
      >
        <Form.Item label="Category">
          <Select className='selectCategary' style={{width: 120 }}
                onChange={e=>{setOnChange({...onChange,category:e})}}
                placeholder="Select Category"
              value={onChange.category != '' ? onChange.category : null}
              dropdownRender={(menu) => (<>
                  {menu}  
          
              </>)}

              options={props.categories.map((item) => ({
                  label: item.category,
                  value: item.category,
              }))}
          />
        </Form.Item>
        <Form.Item label="Amount">
          <InputNumber min={0} defaultValue={0} onChange={e=>{setOnChange({...onChange,budget:e})}} value={onChange.budget}/>
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

 export default AddBudget