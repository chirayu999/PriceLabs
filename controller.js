const fetch = require("node-fetch");
const apiBody = require("./apiBody");
const csvHandler = require("./csvHandler");

const getData = async (req, res) => {
  const apiUrl = "https://www.vrbo.com/serp/g";

  if (!req.query.pageSize) {
    return res.status(404).json({
      msg: "Missing Variable - Page Size",
    });
  }

  if (!req.query.address) {
    return res.status(404).json({
      msg: "Missing Variable - Address",
    });
  }

  apiBody.variables.request.paging.pageSize = parseInt(req.query.pageSize);
  apiBody.variables.request.q = req.query.address;

  try {
    const response = await fetch(apiUrl, {
      method: "post",
      body: JSON.stringify(apiBody),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const jsonResponse = await response.json();

    const listings = jsonResponse.data.results.listings;

    await csvHandler.writeCsvFile(listings);

    res.json({ msg: "Success" });
  } catch (err) {
    console.log(err);
    res.json({ msg: "Error" });
  }
};

module.exports = {
  getData,
};
