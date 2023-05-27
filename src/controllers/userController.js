const { User } = require("../models");

exports.getAllUsers = async (_, res) => {
  console.log("User -> getAllUsers");
  const users = await User.findAll();
  res.json(users);
};

exports.getUserById = async (req, res) => {
  console.log("User -> getUserById");
  const { id } = req.params;
  const users = await User.findByPk(id);
  res.json(users);
};

exports.createUser = async (req, res) => {
  console.log("User -> createUser", req.body);
  const user = await User.create(req.body);
  console.log("User created", user);
  res.json(user);
}

exports.deleteUser = async (req, res) => {
  console.log("User -> deleteUser");
  const { id } = req.params;
  await User.destroy({ where: { id } });
  
  res.json({ message: `User has been deleted`});
};

exports.updateUser = async (req, res) => {
  console.log("User -> updateUser");
  const { id } = req.params;
  const user = await User.update(req.body, {
    returning: true,
    where: {
      id
    }
  });
  res.json(user);
};