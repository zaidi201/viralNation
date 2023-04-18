const db = require("../../models");
const Op = db.Sequelize.Op;
const message = require("../../constants/messages.json");

//add review provided with user and movie id in object(validations are done in graphql schema)
exports.addReview = async (data) => {
  try {
    const review = await db.review.create(data);

    return review;
  } catch (e) {
    return { message: e.message };
  }
};

//get all reviews of movies and user
exports.getAllreviews = async (userId, comment, limit, pageNumber, sort) => {
  try {
    const review = await db.review.findAll({
      order: [["createdAt", `${sort ? sort : "ASC"}`]],
      limit,
      offset: (pageNumber - 1) * 10,
      where: {
        comment: { [Op.iLike]: `%${comment}%` },
      },
      include: [
        {
          model: db.movie,
        },
        {
          model: db.user,
        },
      ],
    });

    //logged in user reviews will always stay on top by following sorting algo
    const sortedReviews = review.sort((a, b) => {
      if (a.userId === userId && b.userId !== userId) {
        return -1;
      } else if (b.userId === userId && a.userId !== userId) {
        return 1;
      } else {
        return 0;
      }
    });

    return sortedReviews;
  } catch (e) {
    console.log(e.message);
    return { message: e.message };
  }
};

//update review by id
exports.updatereview = async (data) => {
  const { comment, rating } = data;
  try {
    const review = await db.review.update(
      { comment, rating },
      {
        where: { id: data.id },
      }
    );

    if (review == 1) {
      return { message: message.updated };
    } else {
      return { message: message.failed };
    }
  } catch (e) {
    return { message: e.message };
  }
};

//delete review by id
exports.deleteReview = async (id) => {
  try {
    const review = await db.review.destroy({ where: { id: id } });
    if (review == 1) {
      return { message: message.deleted };
    } else {
      return { message: message.failed };
    }
  } catch (error) {
    return { message: e.message };
  }
};
