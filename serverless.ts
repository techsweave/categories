import type { AWS } from '@serverless/typescript';

import {
    createCategory,
    deleteCategory,
    getCategory,
    scanCategory,
    updateCategory
} from '@functions/index';

const serverlessConfiguration: AWS = {
    service: 'categories-service',

    frameworkVersion: '2',

    provider: {
        name: 'aws',
        runtime: 'nodejs14.x',
        stage: 'dev',
        region: 'eu-central-1',
        lambdaHashingVersion: '20201221',

        apiGateway: {
            shouldStartNameWithService: true,
            minimumCompressionSize: 1024,
        },

        environment: {
            AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
            REGION: '${self:provider.region}',
            STAGE: '${self:provider.stage}',
            QUEUE: '${self:custom.queue}',
            S3ARN: '${self:custom.s3arn}',
            CATEGORIES_TABLE: '${self:custom.categoriesTable}',
            USER_POOL_ID: '{self:custom.userPoolId}'
        },

        iam: {
            role: {
                statements: [
                    {
                        Effect: 'Allow',
                        Action: [
                            'dynamodb:*',
                            'sns:*',
                            'sqs:*'
                        ],
                        Resource: ['*']
                    }
                ]
            }
        }
    },

    custom: {
        region: '${opt:region, self:provider.region}',
        stage: '${opt:stage, self:provider.stage}',
        queue: 'https://sqs.eu-central-1.amazonaws.com/780844780884/messagesQueue',
        s3arn: 'arn:aws:sns:eu-central-1:780844780884:images',
        categoriesTable: 'categories-table',
        userPoolId: 'eu-central-1_eciEUvwzp',
        cognitoArn: 'arn:aws:cognito-idp:eu-central-1:780844780884:userpool/eu-central-1_eciEUvwzp',
        dynamodb: {
            stages: ['dev'],
            start: {
                port: 8008,
                inMemory: true,
                migrate: true,
                seed: true,
                convertEmptyValues: true,
                // Uncomment only if you already have a DynamoDB running locally
                // noStart: true
            },
            migration: {
                dir: 'offline/migrations',
            },
        },
        webpack: {
            includeModules: true,
        },
    },

    package: {
        individually: true,
    },

    plugins: [
        'serverless-webpack',
        'serverless-offline',
        'serverless-dynamodb-local'
    ],
    // resources: {
    //     Resources: {
    //         categoriesTable: {
    //             Type: 'AWS::DynamoDB::Table',
    //             Properties: {
    //                 TableName: '${self:custom.categoriesTable}',
    //                 AttributeDefinitions: [
    //                     { AttributeName: 'id', AttributeType: 'S' }
    //                 ],
    //                 KeySchema: [
    //                     { AttributeName: 'id', KeyType: 'HASH' }
    //                 ],
    //                 ProvisionedThroughput: {
    //                     ReadCapacityUnits: '5',
    //                     WriteCapacityUnits: '5'
    //                 }
    //             },

    //         },
    //     },
    // },
    // import the function via paths
    functions: {
        createCategory,
        deleteCategory,
        getCategory,
        scanCategory,
        updateCategory
    },
};

module.exports = serverlessConfiguration;


