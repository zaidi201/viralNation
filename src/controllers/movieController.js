const db = require("../../models");
const Op = db.Sequelize.Op;

exports.addMovie = async (data) => {
  try {
    const movie = await db.movie.create(data);

    return movie;
  } catch (e) {
    return { message: e.message };
  }
};
exports.getAllMovies = async (name, description, limit, pageNumber, sort) => {
  try {
    const movie = await db.movie.findAll({
      order: [["createdAt", `${sort ? sort : "ASC"}`]],
      limit,
      offset: (pageNumber - 1) * 10,
      where: {
        movieName: { [Op.iLike]: `%${name}%` },
        description: { [Op.iLike]: `%${description}%` },
      },
      include: {
        model: db.review,
        include: {
          model: db.user,
          attributes: ["userName", "email", "id"],
        },
      },
    });

    return movie;
  } catch (e) {
    return { message: e.message };
  }
};

exports.getMovieById = async (id) => {
  try {
    const movie = await db.movie.findOne({ where: { id } });
    if (!movie) {
      return { message: "movie not found" };
    }
    return movie;
  } catch (e) {
    return { message: e.message };
  }
};

exports.updateMovie = async (data) => {
  const { movieName, description, director, releaseDate } = data;
  try {
    const movie = await db.movie.update(
      { movieName, description, director, releaseDate },
      {
        where: { id: data.id },
      }
    );

    if (movie == 1) {
      return { message: "update successful" };
    } else {
      return { message: "update failed" };
    }
  } catch (e) {
    return { message: e.message };
  }
};
exports.deleteMovie = async (id) => {
  try {
    const movie = await db.movie.destroy({ where: { id: id } });
    if (movie == 1) {
      return { message: "delete successful" };
    } else {
      return { message: "delete failed" };
    }
  } catch (e) {
    return { message: e.message };
  }
};
