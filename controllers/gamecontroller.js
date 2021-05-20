const router = require('express').Router();
const DataTypes = require('sequelize');
const sequelize = require('../db');

const Game = require('../models/game')(sequelize, DataTypes);

router.route('/all').get( async (req, res) => {
  try {
    const games = await Game.findAll({where: {owner_id: req.user.id}});
    res.status(200).json({
      games: games,
      message: "Data fetched."
    });
  } catch (err) {
    res.status(500).json({
      message: "Data not found"
    });
  }
});

router.route('/:id').get( async (req, res) => {
  try {
    const game = await Game.findOne({ where: { id: req.params.id, owner_id: req.user.id } });
    res.status(200).json({
        game: game
    });
  } catch (err) {
    res.status(500).json({
      message: "Data not found."
    });
  }
});

router.route("/create").post(async (req, res) => {
  try {
    const game = await Game.create({
      title: req.body.game.title,
      owner_id: req.user.id,
      studio: req.body.game.studio,
      esrb_rating: req.body.game.esrb_rating,
      user_rating: req.body.game.user_rating,
      have_played: req.body.game.have_played,
    });
    res.status(200).json({
      game: game,
      message: "Game created.",
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.route("/update/:id").put(async (req, res) => {
  try {
    const game = await Game.update(
      {
        title: req.body.game.title,
        studio: req.body.game.studio,
        esrb_rating: req.body.game.esrb_rating,
        user_rating: req.body.game.user_rating,
        have_played: req.body.game.have_played,
      },
      {
        where: {
          id: req.params.id,
          owner_id: req.user.id,
        },
      }
    );
    res.status(200).json({
      game: game,
      message: "Successfully updated.",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

router.route("/remove/:id").delete(async (req, res) => {
  try {
    const game = await Game.destroy({
      where: {
        id: req.params.id,
        owner_id: req.user.id,
      }
    });
    res.status(200).json({
      game: game,
      message: "Successfully deleted",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

module.exports = router;
