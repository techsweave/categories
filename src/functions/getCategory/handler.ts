import 'source-map-support/register';

import Category from '@dbModel/tables/category';
import getCategory from './function';
import { ValidatedEventAPIGatewayProxyEvent, middyfy, Response } from 'utilities-techsweave';
import { StatusCodes } from 'http-status-codes';

/*
 * Remember: event.body type is the type of the instantiation of ValidatedEventAPIGatewayProxyEvent
 * In this case event.body type is 'void' -> we have no body!
*/
const getCategoryHandler: ValidatedEventAPIGatewayProxyEvent<void> = async (event) => {
    let response: Response<Category>;
    try {
        response = await Response.fromData<Category>(
            await getCategory(event.pathParameters?.id),
            StatusCodes.OK);
    }
    catch (error) {
        response = await Response.fromError<Category>(error);
    }
    return response.toAPIGatewayProxyResult();
};

export const main = middyfy(getCategoryHandler);
