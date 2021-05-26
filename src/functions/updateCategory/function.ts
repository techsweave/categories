import dbContext from '@dbModel/dbContext';
import Category from '@dbModel/tables/category';

const updateCategory = async (item: Category): Promise<Category> => {
    return dbContext.update(item, { onMissing: 'skip' });
};

export default updateCategory;