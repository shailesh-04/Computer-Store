import reviewsMigration from "@migrations/reviews_20250711191709";
class ReviewsModel {
    create = reviewsMigration.create;
    read = reviewsMigration.read;
    readOne = reviewsMigration.readOne;
    update = reviewsMigration.update;
    delete = reviewsMigration.delete;
}
export default new ReviewsModel();