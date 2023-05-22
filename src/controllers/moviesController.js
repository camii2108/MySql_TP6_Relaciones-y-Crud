const { validationResult } = require("express-validator");
const { Movie, Sequelize, Genre } = require("../database/models");
const { Op } = Sequelize;

//Otra forma de llamar a los modelos
//const Movies = db.Movie;

const moviesController = {
      list: (req, res) => {
            Movie.findAll({ include: [{ association: "actors" }] }).then((movies) => {
                  res.render("moviesList", { movies });
            });
      },
      detail: (req, res) => {
            Movie.findByPk(req.params.id, {
                  include: [
                        {
                              association: "actors",
                        },
                        {
                              association: "genre",
                        },
                  ],
            }).then((movie) => {
                  res.render("moviesDetail", { movie });
            });
      },
      new: (req, res) => {
            Movie.findAll({
                  order: [["release_date", "DESC"]],
                  limit: 5,
            }).then((movies) => {
                  res.render("newestMovies", { movies });
            });
      },
      recomended: (req, res) => {
            Movie.findAll({
                  where: {
                        rating: { [Op.gte]: 8 },
                  },
                  order: [["rating", "DESC"]],
            }).then((movies) => {
                  res.render("recommendedMovies", { movies });
            });
      }, //Aqui debemos modificar y completar lo necesario para trabajar con el CRUD
      add: function (req, res) {
            Genre.findAll()
                  .then((genres) => {
                        return res.render("moviesAdd", { genres });
                  })
                  .catch((error) => console.log(error));
      },
      create: function (req, res) {
            const errors = validationResult(req);
            if (errors.isEmpty()) {
                  Movie.create({
                        ...req.body,
                  })
                        .then(() => {
                              res.redirect("/movies");
                        })
                        .catch((error) => console.log(error));
            } else {
                  return res.render("moviesAdd", { errors: errors.mapped() });
            }
      },
      edit: function (req, res) {
            const MOVI_PROMISE = Movie.findByPk(req.params.id);
            const GENRES_PROMISE = Genre.findAll();
            Promise.all([MOVI_PROMISE, GENRES_PROMISE])
                  .then(([Movie, Genres]) => {
                        res.render("moviesEdit", { Movie, Genres });
                  })
                  .catch((error) => console.log(error));
      },
      update: function (req, res) {
            const errors = validationResult(req);
            MOVIE_ID = req.params.id;
            if (errors.isEmpty()) {
                  const { title, rating, awards, release_date, length, genre_id } = req.body;

                  Movie.update(
                        {
                              title,
                              rating,
                              awards,
                              release_date,
                              length,
                              genre_id,
                        },
                        {
                              where: { id: MOVIE_ID },
                        }
                  )
                        .then((response) => {
                              if (response) {
                                    return res.redirect(`/movies/detail/${MOVIE_ID}`);
                              } else {
                                    throw new Error("Mensaje de error");
                              }
                        })
                        .catch((error) => console.log(error));
            } else {
                  Movie.findByPk(MOVIE_ID)
                        .then((Movie) => {
                              res.render("moviesEdit", { Movie, errors: errors.mapped() });
                        })
                        .catch((error) => console.log(error));
            }
      },
      delete: function (req, res) {
            Movie.findByPk(req.params.id).then((Movie) => {
                  res.render("moviesDelete", { Movie });
            });
      },
      destroy: function (req, res) {
            Movie.destroy({
                  where: { id: req.params.id },
            }).then(() => {
                  res.redirect("/movies");
            });
      },
};

module.exports = moviesController;
