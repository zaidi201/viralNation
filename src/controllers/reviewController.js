const db = require("../../models");
const Op = db.Sequelize.Op;

exports.addReview = async (data) => {
  try {
    const review = await db.review.create(data);

    return review;
  } catch (e) {
    return { message: e.message };
  }
};
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

    const sortedReviews = review.sort((a, b) => {
      if (a.userId === userId && b.userId !== userId) {
        return -1;
      } else if (b.userId === userId && a.userId !== userId) {
        return 1;
      } else {
        return 0;
      }
    });
    // console.log(JSON.stringify(userId, 0, 2));

    return sortedReviews;
  } catch (e) {
    console.log(e.message);
    return { message: e.message };
  }
};

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
      return { message: "update successful" };
    } else {
      return { message: "update failed" };
    }
  } catch (e) {
    return { message: e.message };
  }
};
exports.deleteReview = async (id) => {
  try {
    const review = await db.review.destroy({ where: { id: id } });
    if (review == 1) {
      return { message: "delete successful" };
    } else {
      return { message: "delete failed" };
    }
  } catch (error) {
    return { message: e.message };
  }
};
