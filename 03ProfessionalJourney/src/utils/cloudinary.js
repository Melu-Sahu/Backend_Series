import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      return null;
    }
    // upload the file in cloudinary

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    //file uploaded successfully
    // console.log(
    //   "File uploaded using Cloudinary service on cloudinary",
    //   response.url
    // );
    fs.unlinkSync(localFilePath); // remove the locally saved temperory file as the upload operation got successful for cleaning of server.
    console.log("Uploaded to cloudnary");
    return response;
  } catch (error) {
    console.log("Cloudnary error", error);
    fs.unlinkSync(localFilePath); // remove the locally saved temperyry file as the upload operation got failed.
    return null;
  }
};

// cloudinary.uploader.upload(
//   "https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
//   { public_id: "olympic_flag" },
//   function (error, result) {
//     console.log(result);
//   }
// );

export { uploadOnCloudinary };
