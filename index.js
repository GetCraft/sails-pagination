const PaginationService = {
  build: build,
  paginate: paginate,
}

function build(query0, allowedSorts) {
  const params = {
    skip: 0,
    limit: 100,
  }

  if (query0 && Object.keys(query0).length > 0) {
    let query = {}
    const criterias = ['limit', 'skip', 'sort']
    criterias.forEach(c => {
      if (query0.where && (query0.where[c] || query0.where[c] === 0)) {
        query[c] = query0.where[c]
        delete query0.where[c]
      }
    })
    query = Object.assign(query, query0)

    if (query.sort && allowedSorts && Array.isArray(allowedSorts) &&
        allowedSorts
        .map(s => query.sort.startsWith(s))
        .filter(r => r === false).length > 0) {
      delete query.sort
    }

    let newParams = {
      skip: query.skip
        ? query.skip
        : params.skip,
      limit: query.limit
        ? query.limit
        : params.limit,
    }

    if (query.sort) {
      if (typeof query.sort === 'object') {
        newParams.sort = [query.sort]
      } else {
        newParams.sort = query.sort
      }
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
