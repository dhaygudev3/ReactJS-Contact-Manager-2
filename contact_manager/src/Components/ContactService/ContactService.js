import axios from "axios";

export class ContactService {
  //  static serverURl = "http://localhost:7000";
  static serverURl2 = "http://localhost:8080";

  static getAllContacts() {
    // let dataUrl = `${this.serverURl}/Contacts`; ///json
    let dataUrl = `${this.serverURl2}/contacts`;
    // let dataUrl = `${this.serverURl2}/Contacts`;  // json
    return axios.get(dataUrl);
    // return axios.get(this.serverURl1)   /// json
  }

  /// http://localhost:8080/contact/66435864fdb9a0f044acea08    // http://localhost:8080/contacts/66435864fdb9a0f044acea07
  static getAllContactByID(contactsID) {

    // let dataUrl = `${this.serverURl}/Contacts/${contactsID}` // for json
    let dataUrl = `${this.serverURl2}/contact/${contactsID}`

    return axios.get(dataUrl);
  }

  static addContact(contact) {
    let dataUrl = `${this.serverURl2}/contact`
    // let dataUrl = `${this.serverURl}/Contacts`//  json
    return axios.post(dataUrl, contact)
  }


  static updateContact(contact, contactsID) {
    // let dataUrl = `${this.serverURl}/Contacts/${contactsID}`//json
    let dataUrl = `${this.serverURl2}/contact/${contactsID}`
    return axios.put(dataUrl, contact)

  }
  static deleteConatct(contactsID) {
    // let dataUrl = `${this.serverURl}/Contacts/${contactsID}`//json
    let dataUrl = `${this.serverURl2}/contact/${contactsID}`
    return axios.delete(dataUrl)
  }
  // http://localhost:8080/search/tukaram
  static findBySearch(search) {
    let dataUrl = `${this.serverURl2}/search/${search}`
    return axios.get(dataUrl)
  }

}
