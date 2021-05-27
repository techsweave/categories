import dbContext from '@dbModel/dbContext';
import Category from '@dbModel/tables/category';


const createCategory = async (item: Category): Promise<Category> => {
    return dbContext.put(item);
};

export default createCategory;