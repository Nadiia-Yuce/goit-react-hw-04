import { useEffect, useState } from "react";
import ContactForm from "./components/ContactForm/ContactForm";
import ContactList from "./components/ContactList/ContactList";
import SearchBox from "./components/SearchBox/SearchBox";
import css from "./App.module.css";
import initialData from "./contacts.json";
import { FaAddressBook } from "react-icons/fa";

export default function App() {
  //ф-я отримання значення з localStorage
  const getInitialContacts = () => {
    const savedContacts = window.localStorage.getItem("updatedContacts");
    const parsedContacts = JSON.parse(savedContacts);

    // для збереження початкового масиву, якщо сторедж порожній
    return savedContacts !== null && parsedContacts.length > 0
      ? parsedContacts
      : initialData;
    //return savedContacts !== null ? JSON.parse(savedContacts) : [] - щоб не залишати дефолтних значень в localStorage
  };

  //стан для контактів
  const [contacts, setContacts] = useState(getInitialContacts);
  //стан для файндера
  const [searchValue, setsearchValue] = useState("");

  //записуємо нові значення в localStorage
  useEffect(() => {
    window.localStorage.setItem("updatedContacts", JSON.stringify(contacts));
  }, [contacts]);

  //перебираємо масив контактів і фільтруємо його за значенням, яке введе користувач в файндер
  //отримуємо відфільтрований масив (початкове значення), на основі якого буде малюватися розмітка; передаємо його пропсом в ContactList
  const toSearch = contacts.filter(contact =>
    contact.name.toLocaleLowerCase().includes(searchValue.toLowerCase())
  );

  //ф-я додавання нового контакту через форму; передаємо в ContactForm
  const addContact = newContact => {
    setContacts(prev => {
      // console.log(newContact);
      return [...prev, newContact];
    });
  };

  //ф-я видалення; передається в Contacts через ContactList
  //очікує contactId, який буде передано в Contacts при виклику коллбек ф-ії
  const removeContact = contactId => {
    // console.log(contactId);
    setContacts(prev => {
      //повернеться масив з усіма контактами, окрім того, чий id співпаде з переданим через onClick з Contact
      return prev.filter(contact => contact.id !== contactId);
    });
  };

  return (
    <div>
      <div className={css.titleWrap}>
        <FaAddressBook size={35} color="#62453C" />
        <h1>Phonebook</h1>
      </div>
      <ContactForm onAdd={addContact} />
      <SearchBox value={searchValue} onSearch={setsearchValue} />
      <ContactList contacts={toSearch} onDelete={removeContact} />
    </div>
  );
}
