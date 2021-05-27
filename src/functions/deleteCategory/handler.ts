import 'source-map-support/register';

import Category from '@dbModel/tables/category';
import deleteCategory from './function';
import { ValidatedEventAPIGatewayProxyEvent, middyfy, Response, AuthenticatedUser } from 'utilities-techsweave';

import { StatusCodes } from 'http-status-codes';
/*
 * Remember: event.body type is the type of the instantiation of ValidatedEventAPIGatewayProxyEvent
 * In this case event.body type is type of 'Category'
*/
const deleteCategoryHandler: ValidatedEventAPIGatewayProxyEvent<void> = async (event) => {
    let res: Response<Category>;
    try {

        const user: AuthenticatedUser = await AuthenticatedUser.fromToken(event.headers?.AccessToken);
        if (!(await user.isVendor(process.env.USER_POOL_ID))) {
            throw {
                name: 'userNotAllowed',
                message: 'You must be a vendor to delete a category'
            };
        }

        res = Response.fromData<Category>(
            await deleteCategory(event.pathParameters.id),
            StatusCodes.OK);

    } catch (error) {
        res = Response.fromError<Category>(error);
    }
    return res.toAPIGatewayProxyResult();
};

export const main = middyfy(deleteCategoryHandler);
