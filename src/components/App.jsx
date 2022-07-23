import { Component } from 'react';
import Section from './Section';
import ContactList from './ContactList';
import Phonebook from './Phonebook';
import Filter from './Filter';
import s from './App.module.css';
import capitalize from 'utils/capitalize';

const LOCAL_STORAGE_KEY = 'contacts';
const INITIAL_STATE = {
  contacts: [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '129-21-23'},
            ],
  filter: '',
};

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  addContact = newContact => {
    let doesAlreadyExist = false;
    this.state.contacts.forEach(({ name }) => {
      doesAlreadyExist = name === newContact.name;
    });

    if (doesAlreadyExist) {
      alert(
        `${capitalize(
          newContact.name
        )}is already in contacts.`
      );
      return;
    }

    this.setState(prevState => {
      return { contacts: [...prevState.contacts, newContact] };
    });
  };

  handleFilterInput = event => {
    this.setState({ filter: event.target.value });
  };

  filterContacts = contacts => {
    return this.state.filter
      ? contacts.filter(({ name }) =>
          name.toLowerCase().includes(this.state.filter.toLowerCase())
        )
      : contacts;
  };

  deleteContact = targetId => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(({ id }) => id !== targetId),
      };
    });
  };

  handleDeleteContactBtnClick = event => {
    this.deleteContact(event.target.dataset.id);
  };

  componentDidMount() {
    const save = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!save) {
      this.setState({ ...INITIAL_STATE });
      return;
    }
    this.setState({ contacts: JSON.parse(save) });
  }

  componentDidUpdate() {
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify(this.state.contacts)
    );
  }

  render() {
    const {
      addContact,
      handleFilterInput,
      filterContacts,
      handleDeleteContactBtnClick,
    } = this;
    const { contacts, filter } = this.state;

    return (
      <div className={s.container}>
        <div className={s.app}>
          <Section title="Phonebook">
            <Phonebook addContact={addContact} />
          </Section>
          <Section title="Contacts">
            <Filter name={filter} inputHandler={handleFilterInput} />
            <ContactList
              contacts={filterContacts(contacts)}
              deleteBtnHandler={handleDeleteContactBtnClick}
            />
          </Section>
        </div>
      </div>
    );
  }
}

export default App;
