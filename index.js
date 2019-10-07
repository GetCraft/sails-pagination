const PaginationService = {
  build: build,
  paginate: paginate,
}

function build(query) {
  const params = {
    skip: 0,
    limit: 100,
  }

  if (query) {
    let newParams = {
      skip: query.skip
        ? query.skip
        : params.skip,
      limit: query.limit
        ? query.limit
        : params.limit,
    }

    if (query.sort) {
      newParams.sort = query.sort
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

  const qs = {
    skip: parseInt(params.skip),
    limit: parseInt(params.limit)
  }
  if (params.sort) {
    qs.sort = params.sort
  }

  return {
    count: count,
    totalPages: totalPages,
    currentPage: currentPage,
    qs: qs,
    rows: rows,
  }
}

module.exports = PaginationService
