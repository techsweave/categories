import dbContext from '@dbModel/dbContext';
import Category from '@dbModel/tables/category';

const getCategory = async (id: string): Promise<Category> => {
    const item: Category = new Category();
    item.id = id;
    return dbContext.get(item);
};

export default getCategory;