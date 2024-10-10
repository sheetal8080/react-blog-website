import express from "express";
import cors from "cors"; // Import the cors package
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import cookieParser from "cookie-parser";
import multer from "multer";

const app = express();

// Enable CORS for all routes and origins
app.use(cors({
  origin: "http://localhost:3000", // Allow requests from this origin
  credentials: true, // Include cookies in cross-origin requests if needed
}));

app.use(express.json());
app.use(cookieParser());

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

// Route for file upload
app.post("/api/upload", upload.single("file"), function (req, res) {
  const file = req.file;
  res.status(200).json(file.filename);
});

// Routes for authentication, users, and posts
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

// Start the server
app.listen(8800, () => {
  console.log("Server is running on port 8800");
});
