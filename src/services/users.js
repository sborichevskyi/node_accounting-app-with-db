const { User } = require('../models/User.model.js');

const getAllUsers = async () => {
  const result = await User.findAll();

  return result;
};

const getUser = async (id) => {
  return User.findByPk(id);
};

const createUser = async (name) => {
  return User.create({ name });
};

const removeUser = async (id) => {
  return User.destroy({ where: { id } });
};

const editUser = async ({ id, name }) => {
  const user = await getUser(id);

  const updatedUser = await user.update({ name });

  return updatedUser;
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  removeUser,
  editUser,
};
