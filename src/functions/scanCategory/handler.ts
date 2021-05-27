import 'source-map-support/register';

import Category from '@dbModel/tables/category';
import scanCategory from './function';

import { ValidatedEventAPIGatewayProxyEvent, middyfy, Response } from 'utilities-techsweave';
import StatusCodes from 'http-status-codes';

import schema from './schema';


/*
 * Remember: event.body type is the type of the instantiation of ValidatedEventAPIGatewayProxyEvent
 * In this case event.body type is type of 'Category'
*/
const scanCategoryHandler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
    let res: Response<Category> = new Response<Category>();

    try {
        const result = await scanCategory(event.body);
        res = Response.fromMultipleData(result.items, StatusCodes.OK, result.lastKey);

    } catch (error) {
        res = Response.fromError<Category>(error);
    }
    return res.toAPIGatewayProxyResult();
};

export const main = middyfy(scanCategoryHandler);
