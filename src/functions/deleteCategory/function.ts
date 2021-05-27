import dbContext from '@dbModel/dbContext';
import Category from '@dbModel/tables/category';

const deleteCategory = async (id: string): Promise<Category> => {
    const item: Category = new Category();
    item.id = id;
    return dbContext.delete(item);
};

export default deleteCategory;