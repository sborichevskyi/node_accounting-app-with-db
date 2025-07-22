const normalizeUser = ({ id, name }) => {
  return {
    id,
    name,
  };
};

const normalizeExpense = ({
  id,
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
}) => {
  return {
    id,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };
};

module.exports = {
  normalizeUser,
  normalizeExpense,
};
