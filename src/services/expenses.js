const { Expense } = require('../models/Expense.model.js');

const getAllExpenses = async () => {
  const result = await Expense.findAll();

  return result;
};

const getExpense = async (id) => {
  return Expense.findByPk(id);
};

const createExpense = async ({
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
}) => {
  return Expense.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });
};

const removeExpense = async (id) => {
  const expenseToRemove = await getExpense(id);

  await Expense.destroy({ where: { id } });

  return expenseToRemove;
};

const editExpense = async ({ id, spentAt, title, amount, category, note }) => {
  const user = await getExpense(id);

  const updatedUser = await user.update({
    spentAt,
    title,
    amount,
    category,
    note,
  });

  return updatedUser;
};

module.exports = {
  getAllExpenses,
  getExpense,
  createExpense,
  removeExpense,
  editExpense,
};
