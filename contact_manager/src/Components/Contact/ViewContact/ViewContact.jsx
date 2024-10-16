import React, { useEffect, useState } from 'react';
import { useParams,Link } from 'react-router-dom';
import { ContactService } from '../../ContactService/ContactService';
import Spinner from '../../Spinner/Spinner';

const ViewContact = () => {
  let { ContactID } = useParams();
 console.log(ContactID);
  let [state, setState] = useState({
    loading: true,
    contact: {},
    errorMessage: ""
  });

  useEffect(() => {
    setState({ ...state, loading: true });
    let promise = new Promise((res,rej)=>{
      res(ContactService.getAllContactByID(ContactID))
    })
    
    promise.then(res => {
        setState({ ...state, loading: false, contact: res.data.data });
        // setState({ ...state, loading: false, contact: res.data.data });  //json
      })
      .catch(error => {
        console.error('Error');
        setState({ ...state, loading: false, errorMessage: 'Something is wrong' });
      });
  }, [ContactID]);

  let { loading, contact, errorMessage } = state;

  return (
    <div>
      {/* <pre>{JSON.stringify(contact)}</pre> */}

      <div>
            {/* <pre>{JSON.stringify(contact)}</pre>
            <h2>{contactId}</h2> */}
            <section className='view-contact my-3'>
                <div className="container">
                    <div className="row">
                        <p className='h4 text-secondary text-light'>View Contact</p>
                        <p className='fst-italic text-white'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis odit, dignissimos corporis consequuntur maxime, assumenda dolores veritatis inventore totam quas sit praesentium vero delectus voluptatum accusamus tempore facere officia? Iste!</p>
                    </div>
                </div>
            </section>
            {
                loading ? <Spinner/> : <React.Fragment>{
                    Object.keys(contact).length>0&&
                    <section className="view-contact my-3">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-4 my-3">
                                    <img src={contact.photo} alt="" className='img-fluid contact-img' />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <ul className="list-group">
                                        <li className="list-group-item list-group-item-action">Title: <span className='fw-bold ms-1'>{contact.title}</span></li>
                                        <li className="list-group-item list-group-item-action">Name: <span className='fw-bold ms-1'>{contact.name}</span></li>
                                        <li className="list-group-item list-group-item-action">Email: <span className='fw-bold ms-1'>{contact.email}</span></li>
                                        <li className="list-group-item list-group-item-action">Contact: <span className='fw-bold ms-1'>{contact.contact}</span></li>
                                        <li className="list-group-item list-group-item-action">Group: <span className='fw-bold ms-1'>{contact.groupID}</span></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-2">
                                    <Link className="btn btn-warning my-2" to={'/contacts/list'}>Back</Link>
                                </div>
                            </div>
                        </div>
                    </section>
                }
                </React.Fragment>
            }
        </div>
    </div>
  );
}

export default ViewContact;
