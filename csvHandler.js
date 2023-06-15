const createCsvWriter = require("csv-writer").createObjectCsvWriter;

const writeCsvFile = async (listings) => {
  const today = new Date();
  const csvData = [];
  let header = [
    { id: "unit_id", title: "Unit Id" },
    { id: "headline", title: "Headline" },
  ];

  listings.forEach((listing) => {
    const { listingNumber, propertyMetadata, rateSummary } = listing;
    const { beginDate, endDate, rentNights } = rateSummary;

    let startDate = new Date(beginDate);
    const lastDate = new Date(endDate);
    let csvRow = {
      unit_id: listingNumber,
      headline: propertyMetadata.headline,
    };

    let i = 0;
    while (startDate < lastDate) {
      if (startDate >= today) {
        const dateHeader =
          startDate.getDate() +
          "-" +
          startDate.getMonth() +
          "-" +
          startDate.getFullYear();

        header.push({ id: dateHeader, title: dateHeader });
        csvRow = { ...csvRow, [dateHeader]: rentNights[i] };
        i++;
      }
      startDate.setDate(startDate.getDate() + 1);
    }

    csvData.push(csvRow);
  });

  const csvWriter = createCsvWriter({
    path: "listings.csv",
    header: header,
  });

  await csvWriter.writeRecords(csvData);
};

module.exports = {
  writeCsvFile,
};
