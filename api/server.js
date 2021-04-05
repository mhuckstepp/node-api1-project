// BUILD YOUR SERVER HERE

const express = require("express");
const User = require("./users/model");

const server = express();
server.use(express.json());

// Get All
server.get("/api/users", (req, res) => {
  User.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .then((user) => {
      if (!user) {
        res.status(404).json("user not found");
      } else {
        res.status(200).json(user);
      }
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

server.post("/api/users", (req, res) => {
  const newUser = req.body;
  if (!newUser.name || !newUser.bio) {
    res.status(400).json("Please include name and bio in your form");
  } else {
    User.insert(newUser)
      .then((user) => {
        res.status(201).json(user);
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  }
});

server.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;
  if (!updatedUser.name || !updatedUser.bio) {
    res.status(400).json("Please include name and bio in your form");
  } else {
    User.update(id, updatedUser)
      .then((user) => {
        if (!user) {
          res.status(404).json("user to update not found");
        } else {
          res.status(200).json(user);
        }
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  }
});

server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  User.remove(id)
    .then((user) => {
      if (!user) {
        res.status(404).json("user not found");
      } else {
        res.status(200).json(user);
      }
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

server.use("*", (req, res) => {
  res.status(404).json({ message: "Users API" });
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
