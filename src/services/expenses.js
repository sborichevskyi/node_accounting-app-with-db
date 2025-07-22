const { User: Expense } = require('../models/Expense.model.js');

const getAllExpenses = async () => {
  const result = await Expense.findAll();

  return result;
};

const getExpense = async (id) => {
  return Expense.findByPk(id);
};

const createExpense = async (name) => {
  return Expense.create({ name });
};

const removeExpense = async (id) => {
  return Expense.destroy({ where: { id } });
};

const editExpense = async ({ id, body }) => {
  const user = await getExpense(id);

  const updatedUser = await user.update({ body });

  return updatedUser;
};

module.exports = {
  getAllExpenses,
  getExpense,
  createExpense,
  removeExpense,
  editExpense,
};
