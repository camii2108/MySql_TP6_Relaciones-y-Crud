const { check } = require("express-validator");
const path = require("path");
module.exports = [
      check("title").notEmpty().withMessage("Title Requerido").bail().isLength({ min: 2, max: 20 }).withMessage("En title debe tener entre 2 y 20 caracteres"),
      check("rating").notEmpty().withMessage("Rating Requerido"),
      check("awards").notEmpty().withMessage("Awards Requerido"),
      check("release_date").notEmpty().withMessage("Release Date Requerido"),
      check("genre_id").notEmpty().withMessage("Genre Requerido"),
];
