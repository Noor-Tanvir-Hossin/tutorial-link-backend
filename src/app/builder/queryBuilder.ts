import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const searchTerm = this?.query?.searchTerm;
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }

    return this;
  }

  filter() {
    const queryObj = { ...this.query }; // copy

    // Filtering
    const excludeFields = [
      'searchTerm',
      'page',
      'limit',
      'sortOrder',
      'sortBy',
      'fields',
    ];

    excludeFields.forEach((el) => delete queryObj[el]);

    const filterConditions: Partial<FilterQuery<T>> = {};

    if (queryObj.minPrice || queryObj.maxPrice) {
      (filterConditions as any).price = {};
      if (queryObj.minPrice) {
        (filterConditions as any).price.$gte = Number(queryObj.minPrice); // Minimum price
      }
      if (queryObj.maxPrice) {
        (filterConditions as any).price.$lte = Number(queryObj.maxPrice); // Maximum price
      }
    }

    if (queryObj.author) {
      (filterConditions as any).author = queryObj.author;
    }

    // ✅ Category Filtering
    if (queryObj.category) {
      (filterConditions as any).category = queryObj.category;
    }

    // ✅ Availability Filtering (true/false)
    if (queryObj.availability !== undefined) {
      (filterConditions as any).inStock = queryObj.availability === 'true';
    }

    //  if (queryObj.filter) {
    //   queryObj.author = queryObj.filter; // Map `filter` to `author`
    //   delete queryObj.filter; // Remove `filter` from the query object
    // }

    this.modelQuery = this.modelQuery.find(filterConditions);

    return this;
  }

  sort() {
    let sortStr;

    if (this?.query?.sortBy && this?.query?.sortOrder) {
      const sortBy = this?.query?.sortBy;
      const sortOrder = this?.query?.sortOrder;
      // "-price" othoba "price"
      sortStr = `${sortOrder === 'desc' ? '-' : ''}${sortBy}`;
    }

    this.modelQuery = this.modelQuery.sort(sortStr);

    return this;
  }

  paginate() {
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);

    return this;
  }

  fields() {
    const fields =
      (this?.query?.fields as string)?.split(',')?.join(' ') || '-__v';

    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }
}

export default QueryBuilder;
