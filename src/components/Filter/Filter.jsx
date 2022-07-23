import PropTypes from 'prop-types';
import s from './Filter.module.css';

const Filter = ({ name, inputHandler }) => {
  return (
    <div className={s.wrapper}>
      <p>Find Contacts by Name</p>
      <input
        className={s.input}
        type="text"
        name="filter"
        value={name}
        onChange={inputHandler}
      />
    </div>
  );
};

Filter.propTypes = {
  name: PropTypes.string.isRequired,
  inputHandler: PropTypes.func.isRequired,
};

export default Filter;
