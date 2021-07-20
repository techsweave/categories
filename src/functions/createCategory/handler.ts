import 'source-map-support/register';

import Category from '@dbModel/tables/category';
import schema from './schema';
import createCategory from './function';
import { ValidatedEventAPIGatewayProxyEvent, middyfy, Response, AuthenticatedUser } from 'utilities-techsweave';
import { StatusCodes } from 'http-status-codes';

/*
 * Remember: event.body type is the type of the instantiation of ValidatedEventAPIGatewayProxyEvent
 * In this case event.body type is type of 'Category'
*/
const createCategoryHandler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
    let res: Response<Category>;

    try {

        const user: AuthenticatedUser = await AuthenticatedUser.fromToken(event.headers?.accesstoken);
        if (!(await user.isVendor(process.env.USER_POOL_ID))) {
            throw {
                name: 'userNotAllowed',
                message: 'You must be a vendor to create a category'
            };
        }

        const category: Category = new Category();

        category.name = event.body.name;
        category.description = event.body?.description;
        category.taxes = event.body?.taxes;
        category.customSpecTemplates = event.body?.customSpecsTemplate;
        category.macroCategorieId = event.body?.macroCategorieId;

        res = await Response.fromData<Category>(await createCategory(category), StatusCodes.CREATED);

    } catch (error) {
        res = await Response.fromError<Category>(error);
    }
    return res.toAPIGatewayProxyResult();
};

export const main = middyfy(createCategoryHandler);
