import Contact from "../Contact/Contact";
import css from "./ContactList.module.css";

export default function ContactList({ contacts, onDelete }) {
  return (
    //всередині ліста мепаємо початковий масив контактів, малюємо лішку з ключем
    //в Contact пропсом кидаємо ітерований обʼєкт масиву
    //onDelete просто передається далі в Contact
    <ul className={css.list}>
      {contacts.map(contact => (
        <li
          key={contact.id}
          className={`${css.item} animate__animated animate__fadeInUp`}
        >
          <Contact contact={contact} onDelete={onDelete} />
        </li>
      ))}
    </ul>
  );
}
