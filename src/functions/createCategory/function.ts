import dbContext from '@dbModel/dbContext';
import Category from '@dbModel/tables/category';


const createProduct = async (item: Category): Promise<Category> => {
    return dbContext.put(item);
};

export default createProduct;