const PaginationService = {
  build: build,
  paginate: paginate,
}

function build(query) {
  const params = {
    skip: 0,
    limit: 100,
    sort: 'name ASC'
  }

  if (query) {
    let newParams = {
      skip: query.skip
        ? query.skip
        : params.skip,
      limit: query.limit
        ? query.limit
        : params.limit,
      sort: query.sort
        ? query.sort
        : params.sort
    }

    if (query.where) {
      newParams.where = query.where
    }

    return newParams
  } else {
    return params
  }
}

function paginate(count, params, rows){
  const currentPage = params.skip > 0
    ? (params.skip / params.limit) + 1
    : 1
  const totalPages = isNaN(Math.ceil(count/params.limit))
    ? 1
    : Math.ceil(count/params.limit)
  return {
    count: count,
    totalPages: totalPages,
    currentPage: currentPage,
    qs: {
      skip: parseInt(params.skip),
      limit: parseInt(params.limit),
      sort: params.sort,
    },
    rows: rows,
  }
}

module.exports = PaginationService
