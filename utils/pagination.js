function pagination(items, page, itemsPerPage) {
    const totalItems = items.length;
    const lastPage = Math.ceil(totalItems / itemsPerPage);

    const paginatedItems = items.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    return {
        items: paginatedItems,
        currentPage: page,
        hasNextPage: page < lastPage,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage,
        totalItems,
    };
}

export default pagination;