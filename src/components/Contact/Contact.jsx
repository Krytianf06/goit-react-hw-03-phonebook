import PropTypes from 'prop-types';
import s from './Contact.module.css';

const Contact = ({ name, number, id, deleteBtnHandler }) => {
  return (
    <li className={s.item}>
      <div>
        <span className={s.name}>{`${name}: `}</span>
        <span className={s.tel}>{`${number} `}</span>
      </div>

      <button
        className="Button"
        type="button"
        data-id={id}
        onClick={deleteBtnHandler}
      >
        Delete Contact
      </button>
    </li>
  );
};

Contact.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  deleteBtnHandler: PropTypes.func.isRequired,
};

export default Contact;
