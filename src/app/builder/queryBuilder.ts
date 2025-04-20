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
    const queryObj = { ...this.query };

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

    // Hourly rate filter (minHourlyRate & maxHourlyRate)
    if (queryObj.minHourlyRate || queryObj.maxHourlyRate) {
      (filterConditions as any).hourlyRate = {};
      if (queryObj.minHourlyRate) {
        (filterConditions as any).hourlyRate.$gte = Number(queryObj.minHourlyRate);
      }
      if (queryObj.maxHourlyRate) {
        (filterConditions as any).hourlyRate.$lte = Number(queryObj.maxHourlyRate);
      }
    }

    // Subject filter (by subject name)
    if (queryObj.subject) {
      (filterConditions as any).subjects = {
        $regex: queryObj.subject,
        $options: 'i',
      };
    }

    // Location filter
    if (queryObj.location) {
      (filterConditions as any).location = {
        $regex: queryObj.location,
        $options: 'i',
      };
    }

    // Rating filter (minRating)
    if (queryObj.minRating) {
      (filterConditions as any).ratings = {
        $gte: Number(queryObj.minRating),
      };
    }

    // Availability filter by day (e.g., availabilityDay=Sunday)
    if (queryObj.availabilityDay) {
      (filterConditions as any)['availability.day'] = queryObj.availabilityDay;
    }

    this.modelQuery = this.modelQuery.find(filterConditions);

    return this;
  }

  sort() {
    let sortStr;

    if (this?.query?.sortBy && this?.query?.sortOrder) {
      const sortBy = this?.query?.sortBy;
      const sortOrder = this?.query?.sortOrder;
      sortStr = `${sortOrder === 'desc' ? '-' : ''}${sortBy}`;
    } else {
      // Default sorting by relevance (or newest if needed)
      sortStr = '-createdAt';
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

export const tutorSearchableFields = ['name', 'subjects', 'location', 'bio'];

export default QueryBuilder;
