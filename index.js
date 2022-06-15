const express = require("express");
const uuid = require("uuid");
const cors = require("cors");

const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(cors());

const users = [];

const checkUserId = (request, response, next) => {
  const { id } = request.params;
  const index = users.findIndex((user) => user.userId === id);

  if (index < 0) {
    return response.status(404).json({ message: "User not found" });
  }

  request.userIndex = index;
  request.userId = id;

  next();
};

const checkRegister = (request, response, next) => {
  const { userName, email, password } = request.body;

  if (password.length < 6) {
    return response
      .status(404)
      .json({ message: "Minimum of 6 digits required" });
  }

  const userNameIndex = users.findIndex((value) => value.userName === userName);
  if (userNameIndex > 0) {
    return response.status(404).json({
      message: `Username already registered, 
      use another one to register`,
    });
  }

  const emailIndex = users.findIndex((value) => value.email === email);
  if (emailIndex > 0) {
    return response.status(404).json({
      message: `Email already registered, 
    use another one to register`,
    });
  }

  request.userName = userName;
  request.email = email;
  request.password = password;

  next();
};

app.post("/createUser", checkRegister, (request, response) => {
  const { name } = request.body;
  const { userName, email, password } = request;

  const user = {
    userId: uuid.v4(),
    name,
    email,
    userName,
    password,
  };

  users.push(user);

  return response.status(201).json(user);
});

app.get("/getUsers", (request, response) => {
  const allUsers = users.map((value) => {
    return {
      userId: value.userId,
      name: value.name,
      email: value.email,
      userName: value.userName,
    };
  });

  return response.status(200).json(allUsers);
});

app.put("/updateUsers/:id", checkUserId, checkRegister, (request, response) => {
  const { name } = request.body;
  const { userName, email, password, userIndex, userId } = request;
  const oldUser = users[userIndex];
  const newUser = {
    userId,
    name: name || oldUser.name,
    userName: userName || oldUser.userName,
    email: email || oldUser.email,
    password: password || oldUser.password,
  };

  users[userIndex] = newUser;

  return response.status(201).json(newUser);
});

app.delete("/deleteUser/:id", checkUserId, (request, response) => {
  const { userIndex } = request;
  users.splice(userIndex, 1);

  return response.status(204).json();
});

app.listen(port, () => {
  console.log(`Serve started ${port}`);
});
