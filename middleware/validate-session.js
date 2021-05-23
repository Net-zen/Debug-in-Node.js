const jwt = require('jsonwebtoken');
const DataTypes = require('sequelize');
const sequelize = require('../db');

const User = require("../models/user")(sequelize, DataTypes);

module.exports = async (req, res, next) => {
  if (req.method === "OPTIONS") {
    next(); // allowing options as a method for request
  } else {
    const sessionToken = req.headers.authorization;
    if (!sessionToken)
      return res
        .status(403)
        .send({ auth: false, message: "No token provided." });
    else {
      try {
        const decoded = await jwt.verify(sessionToken, "lets_play_sum_games_man");
          try {
            req.user = await User.findOne({ where: { id: decoded.id } });
            next();
          } catch (err) {
            res.status(401).send({ error: "not authorized" });
          }
      } catch (err) {
        res.status(400).send({ error: "not authorized" });
      }
    }
  }
};
