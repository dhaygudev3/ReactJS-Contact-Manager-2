import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js'
import '@fortawesome/fontawesome-free'
import NavBar from './Components/NavBar/NavBar.jsx';
import { Navigate, Route, Routes } from 'react-router-dom';
import ContactList from './Components/Contact/ContactList/ContactList.jsx';
import ViewContact from './Components/Contact/ViewContact/ViewContact.jsx';
import AddContact from './Components/Contact/AddContact/AddContact.jsx';
import EditContact from './Components/Contact/EditContact/EditContact.jsx';
import Spinner from './Components/Spinner/Spinner.jsx';
function App() {
  return (
    <>
    {/* <Spinner/> */}
      <NavBar/>

      <Routes>
        <Route path='/' element={<Navigate to={'/Contact/list'} />} />
        <Route path='/Contact/list' element={<ContactList />} />
        <Route path='/Contact/view/:ContactID' element={<ViewContact />} />
        <Route path='/Contact/add' element={<AddContact />} />
        <Route path='/Contact/edit/:ContactID' element={<EditContact />} />
      </Routes>
    </>
  );
}

export default App;
