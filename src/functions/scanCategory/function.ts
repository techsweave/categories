import dbContext from '@dbModel/dbContext';
import Category from '@dbModel/tables/category';
import { ScanOptions } from '@aws/dynamodb-data-mapper';
import { objectToConditionExpression } from 'utilities-techsweave';


const scanCategory = async (filter: any): Promise<{
    items: Category[],
    lastKey: Partial<Category>
}> => {
    let items: Category[] = [];
    let lastKey: Partial<Category>;
    const dbFilter: ScanOptions = {
        limit: filter.limit,
        indexName: filter.indexName,
        pageSize: filter.pageSize,
        startKey: filter.startKey,
        filter: await objectToConditionExpression(filter.filter)
    };

    const paginator = dbContext.scan(Category, dbFilter).pages();

    for await (const page of paginator) {
        items = items.concat(page);
        lastKey = paginator.lastEvaluatedKey;
    }

    return Promise.resolve({
        items: items,
        lastKey: lastKey
    });
};

export default scanCategory;