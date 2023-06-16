import fetch from "node-fetch";
import apiBody from "./apiBody.js";
import { writeCsvFile } from "./csvHandler.js";
import { json } from "express";

export const getData = async (req, res) => {
  const apiUrl = "https://www.vrbo.com/serp/g";

  console.log(req.query, "query");

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

  console.log(apiBody.variables.request, "post body");

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

    await writeCsvFile(listings);

    res.json({ msg: "Success" });
  } catch (err) {
    console.log(err);
    res.json({ msg: "Error" });
  }
};
