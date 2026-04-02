import reviewModel from '../../models/reviews/model.js';
import inventoryModel from '../../models/inventory/model.js';

export async function createReview(req, res, next) {
  try {
    const { vehicle_id, review_text, rating } = req.body;
    const user_id = req.session.user.user_id;

    await reviewModel.createReview({
      vehicle_id,
      user_id,
      review_text,
      rating,
    });

    const vehicle = await inventoryModel.getVehicleBySlug(req.params.slug);
    return res.redirect(`/vehicles/${vehicle.slug}`);
  } catch (error) {
    next(error);
  }
}

export async function buildEditReview(req, res, next) {
  try {
    const review = await reviewModel.getReviewById(req.params.reviewId);

    if (!review || review.user_id !== req.session.user.user_id) {
      return res.status(403).send('Access denied');
    }

    res.render('reviews/edit', {
      title: 'Edit Review',
      review,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateReview(req, res, next) {
  try {
    const review = await reviewModel.getReviewById(req.params.reviewId);

    if (!review || review.user_id !== req.session.user.user_id) {
      return res.status(403).send('Access denied');
    }

    await reviewModel.updateReview({
      review_id: req.params.reviewId,
      review_text: req.body.review_text,
      rating: req.body.rating,
    });

    const vehicle = await inventoryModel.getVehicleBySlug(req.params.slug);
    return res.redirect(`/vehicles/${vehicle.slug}`);
  } catch (error) {
    next(error);
  }
}

export async function deleteReview(req, res, next) {
  try {
    const review = await reviewModel.getReviewById(req.params.reviewId);

    if (!review || review.user_id !== req.session.user.user_id) {
      return res.status(403).send('Access denied');
    }

    await reviewModel.deleteReview(req.params.reviewId);

    const vehicle = await inventoryModel.getVehicleBySlug(req.params.slug);
    return res.redirect(`/vehicles/${vehicle.slug}`);
  } catch (error) {
    next(error);
  }
}