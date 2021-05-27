export default {
    type: 'object',
    properties: {
        name: { type: 'string' },
        description: { type: 'string' },
        macroCategorieId: { type: 'string' },
        taxes: { type: 'number' },
        customSpecsTemplate: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    fieldName: { type: 'string' },
                    unitMisure: { type: 'string' }
                },
                required: ['fieldName', 'unitMisure']
            },

        }

    },
    required: ['name']
} as const;