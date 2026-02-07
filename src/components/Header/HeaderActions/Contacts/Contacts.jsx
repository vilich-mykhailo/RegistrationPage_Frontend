import "./Contacts.css";
import { contactsInfo } from "../../../../data/massageData";

const Contacts = () => {
  return (
    <section className="contacts-page page page-enter">
      <div className="contacts-container">
        {/* LEFT — IMAGE */}
        <div className="contacts-image">
          <img
            src="/images/HomePage/Contacts/contacts.png"
            alt="IvRoxe Massage Studio"
          />
        </div>

        {/* RIGHT — INFO */}
        <div className="page-contact-info">
          <h2 className="page-contact-info__title">
            {contactsInfo.title}
          </h2>

          <ul className="page-contact-info__list">
            {contactsInfo.items.map((item) => (
              <li key={item.label}>
                <span className="page-contact-label">
                  {item.icon}{" "}{item.label}
                </span>

                <p>{item.value}</p>
                <small>{item.note}</small>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Contacts;
