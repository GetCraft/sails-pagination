# Sails Pagination
A simple sailsjs pagination service

## Installation

  `npm install @littlefk/sails-pagination`

## Usage

assuming that req.query is:

	{
		skip: 0,
		limit: 100,
		sort: 'name ASC'
	}

Then in your sails controller


	const Pagination = require('sails-pagination')

	const buildParams = Pagination.build(req.query)

	Model
    .find(buildParams)
    .then((models) => {
      return [
        models,
        Model.count(buildParams)
      ]
    })
    .spread((models, count) => {
      return Pagination.paginate(count, buildParams, models)
    })
    .then((models) => {
      res.json(models)
    })
    .catch((error) => {
      return res.serverError(error)
    })


## Tests

  `npm test`

## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code.
