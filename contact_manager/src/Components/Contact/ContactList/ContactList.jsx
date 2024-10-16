import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ContactService } from '../../ContactService/ContactService';
import Spinner from '../../Spinner/Spinner';

const ContactList = () => {
    const [state, setState] = useState({
        loading: false,
        contacts: [],
        errorMess: ""
    });

    let [search, setSearch] = useState("");


    let searchHandle = (event) => {
        setSearch(event.target.value)
        console.log(search);
    }

    useEffect(() => {
        setState(prevState => ({ ...prevState, loading: true }));

        if (search.length < 2 ) {
            ContactService.getAllContacts()
                .then(res => {
                    setState(prevState => ({ ...prevState, loading: false, contacts: res.data.data }));
                    // setState(prevState => ({ ...prevState, loading: false, contacts: res.data.data }));   // json
                    console.log(res.data.data);
                })
                .catch(error => {
                    console.error('Error:', error);
                    setState(prevState => ({ ...prevState, loading: false, errorMess: 'Data not found' }));
                });
        } else {
            ContactService.findBySearch(search)
                .then(res => {
                    setState(prevState => ({ ...prevState, loading: false, contacts: res.data.data }));
                    // setState(prevState => ({ ...prevState, loading: false, contacts: res.data.data }));   // json
                    console.log(res.data.data);
                })
                .catch(error => {
                    console.error('Error:', error);
                    setState(prevState => ({ ...prevState, loading: false, errorMess: 'Data not found' }));
                });

        } 

    }, [search]);

    const deleteContact = (contactID) => {
        ContactService.deleteConatct(contactID)
            .then(() => {
                setState(prevState => ({
                    ...prevState,
                    contacts: prevState.contacts.filter(contact => contact._id !== contactID)
                }));
            })
            .catch(error => {
                console.error('Error:', error);
                setState(prevState => ({ ...prevState, errorMess: 'Failed to delete contact' }));
            });
    };


    const { loading, contacts, errorMess } = state;

    return (
        <div>
            <section className="contact-search p-3">
                <div className="container">
                    <div className="grid">
                        <div className="row">
                            <p className="h3 text-light fw-bolder">
                                Contact Manager <Link to={'/contact/add'} className='btn btn-primary'><i className="fa-solid fa-plus me-2"></i>New</Link>
                            </p>
                            <p className='text-light'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet corrupti accusamus ipsam doloribus, nobis magni quod libero quas aliquid voluptate asperiores, sit animi. Officiis id placeat provident. Perspiciatis, voluptatum modi?</p>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="row">

                                    <div className="col-md-8 mb-2">
                                        <input type="search" placeholder='Search Names' className='form-control' onChange={searchHandle} value={search}  
                                        />
                                    </div>
                                    {/* <div className="col mb-2">
                                        <input type="submit" value="Search" className='btn btn-outline-light' />
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="contact-card">
                <div className="container">
                    <div className="row">
                        {loading ? <Spinner /> : (
                            <React.Fragment>
                                {contacts.length > 0 ? contacts.map((contact) => (
                                    <div className="col-md-6 p-3" key={contact._id}>
                                        <div className="row">
                                            <div className="card m-3 bg-dark">
                                                <div className="card-body">
                                                    <div className="row d-flex align-items-center">
                                                        <div className="col-md-4">
                                                            <img src={contact.photo} alt="" className='img-fluid contact-img' />
                                                        </div>
                                                        <div className="col-md-7">
                                                            <ul className="list-group">
                                                                <li className="list-group-item list-group-item-action bg-dark text-white">Name: <span className='fw-bold ms-1'>{contact.name}</span></li>
                                                                <li className="list-group-item list-group-item-action bg-dark text-white">Email: <span className='fw-bold ms-1'>{contact.email}</span></li>
                                                                <li className="list-group-item list-group-item-action bg-dark text-white">Contact: <span className='fw-bold ms-1'>{contact.contact}</span></li>
                                                            </ul>
                                                        </div>
                                                        <div className="col-md-1 d-flex flex-column p-1">
                                                            <Link to={`/contact/view/${contact._id}`} className='btn btn-warning my-1'><i className="fa-solid fa-eye"></i></Link>
                                                            <Link to={`/contact/edit/${contact._id}`} className='btn btn-warning my-1'><i className="fa-solid fa-pen"></i></Link>
                                                            <button className='btn btn-danger my-1' onClick={() => deleteContact(contact._id)}><i className="fa-solid fa-trash"></i></button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )) : <p className='text-light'>No contacts found.</p>}
                            </React.Fragment>
                        )}
                        {errorMess && <p className='text-danger'>{errorMess}</p>}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ContactList;
