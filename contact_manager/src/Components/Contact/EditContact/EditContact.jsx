import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ContactService } from '../../ContactService/ContactService';

const EditContact = () => {
  const { ContactID } = useParams();
  const navigate = useNavigate();

  const [state, setState] = useState({
    loading: true,
    contact: {
      name: "",
      photo: "",
      contact: "",
      email: "",
      title: "",
      company: "",
      groupID: "",
    },
    errorMessage: ""
  });

  useEffect(() => {
    ContactService.getAllContactByID(ContactID)
      .then(res => {
        setState(prevState => ({
          ...prevState,
          loading: false,
          contact: res.data.data
        }));
      })
      .catch(error => {
        console.error('Error:', error);
        setState(prevState => ({
          ...prevState,
          loading: false,
          errorMessage: 'Something went wrong'
        }));
      });
  }, [ContactID]);

  const updateInput = (event) => {
    setState(prevState => ({
      ...prevState,
      contact: {
        ...prevState.contact,
        [event.target.name]: event.target.value
      }
    }));
  };

  const submitForm = (event) => {
    event.preventDefault();
    ContactService.updateContact(state.contact, ContactID)
      .then(() => {
        navigate("/Contact/list", { replace: true });
      })
      .catch((error) => {
        console.error('Error:', error);
        setState(prevState => ({
          ...prevState,
          errorMessage: 'Failed to update contact'
        }));
      });
  };

  const { loading, contact, errorMessage } = state;

  return (
    <section className='edit-contact'>
      <div className="container p-3">
        <div className="row d-flex align-items-center">
          <p className='fw-bold h4 text-primary'>Edit Contact</p>
          <p className='fst-italic'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita illum iure saepe enim labore temporibus laudantium debitis cumque quo? Sit magni incidunt veniam obcaecati sed nisi expedita nihil libero iste.</p>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="col-md-4">
              <form onSubmit={submitForm}>
                <div className="mb-2">
                  <input
                    type="text"
                    name="name"
                    value={contact.name}
                    className='form-control'
                    placeholder='Name'
                    onChange={updateInput}
                  />
                </div>
                <div className="mb-2">
                  <input
                    type="text"
                    name="photo"
                    value={contact.photo}
                    className='form-control'
                    placeholder='Photo URL'
                    onChange={updateInput}
                  />
                </div>
                <div className="mb-2">
                  <input
                    type="text"
                    name="contact"
                    value={contact.contact}
                    className='form-control'
                    placeholder='Mobile'
                    onChange={updateInput}
                  />
                </div>
                <div className="mb-2">
                  <input
                    type="text"
                    name="email"
                    value={contact.email}
                    className='form-control'
                    placeholder='Email'
                    onChange={updateInput}
                  />
                </div>
                <div className="mb-2">
                  <input
                    type="text"
                    name="company"
                    value={contact.company}
                    className='form-control'
                    placeholder='Company'
                    onChange={updateInput}
                  />
                </div>
                <div className="mb-2">
                  <input
                    type="text"
                    name="groupID"
                    value={contact.groupID}
                    className='form-control'
                    placeholder='Group ID'
                    onChange={updateInput}
                  />
                </div>
                <input type="submit" className='btn btn-primary' value='Update' />
                <Link to='/Contact/list' className='btn btn-danger ms-3'>Cancel</Link>
              </form>
              {errorMessage && <p className="text-danger">{errorMessage}</p>}
            </div>
          )}
          <div className="col-md-8">
            <img src={contact.photo} alt="" className='img-fluid contact-img' />
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditContact;
