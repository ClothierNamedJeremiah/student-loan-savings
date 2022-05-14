import PropTypes from 'prop-types';

const SavingsTableRow = (props) => {
  const { data } = props;
  return (
    <tr className="text-align--center">
      <th className="fs-white-on-black white-space--nowrap">{data[0]}</th>
      <td>{data[1]}</td>
      <td>{data[2]}</td>
      <td>{data[3]}</td>
      <td>{data[4]}</td>
    </tr>
  );
};

SavingsTableRow.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SavingsTableRow;
