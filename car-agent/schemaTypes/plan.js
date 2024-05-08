// schemas/plan.js

export default {
    name: 'plan',
    title: 'Plan',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Name',
        type: 'string',
      },
      {
        name: 'description',
        title: 'Description',
        type: 'string',
      },
      {
        name: 'features',
        title: 'Features',
        type: 'string',
      },
      {
        name: 'price',
        title: 'Price',
        type: 'string',
      },
      {
        name: 'numOfProcesses',
        title: 'Number of Processes',
        type: 'number',
      },
    ],
  };
  