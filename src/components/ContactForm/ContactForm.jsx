import { Formik, Form, Field, ErrorMessage } from "formik";
import { nanoid } from "nanoid";
import * as Yup from "yup";
import css from "./ContactForm.module.css";

export default function ContactForm({ onAdd }) {
  //початкові значення для обовʼязкового пропсу initialValues в Formik
  const initialValues = { contactName: "", number: "" };

  //під час сабміту додається новий контакт, який атрибутом передається в початкову ф-ю addContact в App
  // обовʼязкові аргументи для сабміту форми Formik-у:
  //values - об'єкт значень полів форми в момент її відправки
  //actions - обʼєкт налаштувань; використовуємо для ресету
  const handleSubmit = (values, actions) => {
    onAdd({
      name: values.contactName,
      number: values.number,
      id: nanoid(),
    });
    actions.resetForm();
  };

  //бібліотека для валідації "yup"; схема валідації полів; передається пропсом в Formik
  //помилки валідації візуалізуємо через компонент ErrorMessage, який додаємо до кожного філда
  const contactSchema = Yup.object().shape({
    contactName: Yup.string()
      .min(3, "Too short! Minimum 3 letters.")
      .max(50, "Too long! Maximum 50 letters.")
      .required("Required!"),
    number: Yup.string()
      .min(3, "Too short! Minimum 3 digits.")
      .max(50, "Too long! Maximum 50 digits.")
      .required("Required!"),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={contactSchema}
    >
      {/* отримання доступу до стану форми за допомогою властивостей, які Formik
      надає в межах render-функції або в children пропсі (ще можна отримати values-значення полів) */}
      {({ isValid, dirty }) => (
        <Form className={`${css.form} animate__animated animate__fadeInDown`}>
          <div className={css.formGroup}>
            <label htmlFor="contactName" className={css.formLabel}>
              Name
            </label>
            <Field
              name="contactName"
              id="contactName"
              className={css.formInput}
            />
            <ErrorMessage
              name="contactName"
              component="span"
              className={css.error}
            />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="number" className={css.formLabel}>
              Number
            </label>
            <Field name="number" id="number" className={css.formInput} />
            <ErrorMessage
              name="number"
              component="span"
              className={css.error}
            />
          </div>

          <button
            type="submit"
            className={css.formBtn}
            disabled={!isValid || !dirty}
          >
            Add contact
          </button>
        </Form>
      )}
    </Formik>
  );
}
