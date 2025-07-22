const expensesModel = require('../services/expenses.js');
const { normalizeExpense } = require('../services/normalize.js');

async function getAllExpenses(req, res) {
  try {
    const expenses = await expensesModel.getAllExpenses();

    res.status(200).json(expenses.map((exp) => normalizeExpense(exp)));
  } catch (err) {
    res.status(500).json({ message: 'Не вдалося зчитати витрати' });
  }
}

async function getExpense(req, res) {
  try {
    const expId = +req.params.expId;
    const expense = await expensesModel.getExpense(expId);

    if (!expId || !expense) {
      return res.status(400).json({ message: `Витрату ${expId} не знайдено` });
    }

    res.status(200).json(normalizeExpense(expense));
  } catch (err) {
    res.status(500).json({ message: 'Не вдалося зчитати витрату' });
  }
}

async function createExpense(req, res) {
  try {
    const body = req.body;

    if (!body) {
      return res.status(400).json({ message: 'Не передано тіло запиту' });
    }

    const newExpense = await expensesModel.createExpense(body);

    if (!newExpense) {
      return res.status(500).json({ message: 'Нову витрату не створено' });
    }

    res.status(201).json(normalizeExpense(newExpense));
  } catch (err) {
    res.status(500).json({ message: 'Не вдалося створити витрату' });
  }
}

async function removeExpense(req, res) {
  try {
    const expId = +req.params.expId;
    const removedExpense = await expensesModel.removeExpense(expId);

    if (!removedExpense) {
      return res.status(404).json({ message: `Витрату ${expId} не знайдено` });
    }
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: 'Не вдалося видалити витрату' });
  }
}

async function updateExpense(req, res) {
  try {
    const body = req.body;
    const expId = +req.params.expId;

    if (!body) {
      return res.status(400).json({ error: 'Body is required' });
    } else if (!expId) {
      return res.status(400).json({ error: 'Expense id is required in URL' });
    }

    const updatedExpense = await expensesModel.editExpense(expId, body);

    res.status(200).json(normalizeExpense(updatedExpense));
  } catch (err) {
    res.status(500).json({ message: 'Не вдалося оновити витрату' });
  }
}

module.exports = {
  getAllExpenses,
  getExpense,
  createExpense,
  removeExpense,
  updateExpense,
};
