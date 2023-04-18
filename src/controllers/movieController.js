const db = require("../../models");
const Op = db.Sequelize.Op;
const message = require("../../constants/messages.json");

//create movie
exports.addMovie = async (data) => {
  try {
    const movie = await db.movie.create(data);

    return movie;
  } catch (e) {
    return { message: e.message };
  }
};

//get all movies (with reviews and users) with pagination and sorting
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

//get movie by id
exports.getMovieById = async (id) => {
  try {
    const movie = await db.movie.findOne({ where: { id } });
    if (!movie) {
      return { message: message.notFound };
    }
    return movie;
  } catch (e) {
    return { message: e.message };
  }
};

//update movie by id
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
      return { message: message.updated };
    } else {
      return { message: message.failed };
    }
  } catch (e) {
    return { message: e.message };
  }
};

//delete movie by id
exports.deleteMovie = async (id) => {
  try {
    const movie = await db.movie.destroy({ where: { id: id } });
    if (movie == 1) {
      return { message: message.deleted };
    } else {
      return { message: message.failed };
    }
  } catch (e) {
    return { message: e.message };
  }
};
