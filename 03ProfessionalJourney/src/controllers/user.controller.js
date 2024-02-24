import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  // get user's details from frontend
  // validation - not empty
  // check if user already exists : userneme and email
  // check for images, check for avatar
  // upload them to cloudnary, avatar
  // create user object- create entery in db
  // remove password and refresh token field from response,
  // check for user creation
  // return response

  const { fullname, email, password, username } = req.body;

  console.log(fullname, email, password);

  //   if (fullname === "") {
  //     throw new ApiError(400, "fullname is required.");
  //   }

  if (
    [fullname, email, password, username].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "all the field are required.");
  }

  // getting user detail from database
  const existedUser = User.findOne({
    $or: [{ email }, { username }],
  });
  // If user exists, this will throw error
  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists!");
  }

  const avitarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avitarLocalPath) {
    throw new ApiError(400, "Avatar file is required.");
  }

  const avatar = await uploadOnCloudinary(avitarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (avatar) {
    throw new ApiError(400, "Avatar file is required.");
  }

  const user = await User.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLoverCase(),
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something wents wrong while registering the user");
  }

  return res.status(201).json(
    new ApiResponse(200, createdUser, "User registered successfully.")
  )

});

export { registerUser };
