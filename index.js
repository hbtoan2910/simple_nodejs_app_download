const axios = require("axios"); // For making HTTP requests
const fs = require("fs-extra"); // For working with the filesystem
const path = require("path"); // For file paths
const schedule = require("node-schedule"); // For scheduling tasks

// API endpoint and target folder
const API_URL = "https://dog.ceo/api/breeds/image/random"; // This is a demo api to return random image of dog
const DOWNLOAD_FOLDER = path.join("C:\\", "NodeJS_Demo", "RyanDownloadedData");

// Ensure the folder exists
fs.ensureDirSync(DOWNLOAD_FOLDER);

// Function to fetch and save data
async function fetchDataAndSave() {
  try {
    console.log("Fetching data from API...");

    // Send GET request to the API and get image URL
    const response = await axios.get(API_URL);
    const imageUrl = response.data.message;
    console.log(`Image URL fetched: ${imageUrl}`);

    // Fetch (send GET request to imageURL) the image as a stream to be able to save to local drive later
    const imageResponse = await axios({
      url: imageUrl,
      method: "GET",
      responseType: "stream", // Important to handle the image as a stream
    });

    // Construct a timestamped filename
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const fileName = `dog-${timestamp}.jpg`;
    const filePath = path.join(DOWNLOAD_FOLDER, fileName);

    // Save the image stream to the file
    const writer = fs.createWriteStream(filePath);
    imageResponse.data.pipe(writer);

    // Wait for the file to finish writing
    await new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });

    console.log(`Image saved to: ${filePath}`);
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
}

// Schedule the task to run every 2 hours
// schedule.scheduleJob("0 */2 * * *", () => {
//   console.log("Scheduled task started...");
//   fetchDataAndSave();
// });

// Schedule the task to run every 5mins
schedule.scheduleJob("*/5 * * * *", () => {
  console.log("Scheduled task started...");
  fetchDataAndSave();
});

// Run immediately on startup
fetchDataAndSave();
