module.exports = {
  operationName: "SearchRequestQuery",
  variables: {
    filterCounts: true,
    request: {
      paging: {
        page: 1,
        pageSize: 50,
      },
      filterVersion: "1",
      coreFilters: {
        adults: 1,
        maxBathrooms: null,
        maxBedrooms: null,
        maxNightlyPrice: null,
        maxTotalPrice: null,
        minBathrooms: 0,
        minBedrooms: 0,
        minNightlyPrice: 0,
        minTotalPrice: null,
        pets: 0,
      },
      filters: [],
      q: "chicago-illinois-united-states-of-america",
    },
  },
};
