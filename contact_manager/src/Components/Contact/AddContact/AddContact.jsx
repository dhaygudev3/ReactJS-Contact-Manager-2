import React, { useState } from 'react'
import { ContactService } from '../../ContactService/ContactService'
import { useNavigate } from 'react-router-dom'

const AddContact = () => {

  let navigate = useNavigate(); 

    let [state,setState]=useState({
      loading:false,
      contact: {
        name: "",
        photo: "",
        contact: "",
        email: "",
        title: "",
        company: "",
        groupID: "",
      },
      
      group:{

      },
      errorMessage:""
    })

    let updateInput=(event)=>{

      setState({...state,contact:{...state.contact,[event.target.name]:event.target.value}})
    }

    let  { loading, contact, group, errorMessage } = state;


    let submitForm = (event)=>{
       event.preventDefault();
       let proomise = new Promise((res,rej)=>{
        res (ContactService.addContact(contact));
       })
       .then((res)=>{
        if (res) {
          navigate("/Contact/list",{replace:true})
        } else {
          navigate("/Contact/Add",{replace:false})
        }
       }).catch((error)=>{
          console.error(error)
       }) 
    }
   
  return (
    <>
    {/* <pre>{JSON.stringify(contact)}</pre> */}
    <section className='add-contact'>
    <div className="conatiner p-3">
      <div className="row d-flex align-items-center">
        <p className='fw-bold h4 text-primary'>Add Contact</p>
        <p className='fst-italic'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita illum iure saepe enim labore temporibus laudantium debitis cumque quo? Sit magni incidunt veniam obcaecati sed nisi expedita nihil libero iste.</p>
    
      <div className="col-md-4">
        <form action="" onSubmit={submitForm}>

          <div className="mb-2">
            <input type="text" name="name" id="" className='form-control' placeholder='Name'  required={true} onChange={updateInput} value={contact.name}/>
          </div>
          <div className="mb-2">
            <input type="text" name="photo" id="" className='form-control' placeholder='PhotoURL' required={true} onChange={updateInput} value={contact.photo} />
          </div>
          <div className="mb-2">
            <input type="text" name="contact" id="" className='form-control' placeholder='Mobile'  required={true} onChange={updateInput} value={contact.contact}/>
          </div>
          <div className="mb-2">
            <input type="text" name="email" id="" className='form-control' placeholder='Email' required={true} onChange={updateInput} value={contact.email} />
          </div>
          <div className="mb-2">
            <input type="text" name="company" id="" className='form-control' placeholder='Company' required={true} onChange={updateInput} value={contact.company} />
          </div>
          <div className="mb-2">
            <input type="text" name="title" id="" className='form-control' placeholder='Title'  required={true} onChange={updateInput} value={contact.title}/>
          </div>
          <div className="mb-2">
            <input type="text" name="groupID" id="" className='form-control' placeholder='Company Group'  required={true} onChange={updateInput} value={contact.groupID}/>
          </div>

          <input type="submit" name="" id="" className='btn btn-primary form-control' value={'Submit'} />
          
        </form>
       
      </div>
      
      </div>
      <div className="col-md-8">
        <img src={contact.photo} alt="" className='img-fluid contact-img'/>
      </div>
    </div>
  </section>
</>
  )
}

export default AddContact