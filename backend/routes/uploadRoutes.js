// import express from "express";
// import multer from "multer";

// const router = express.Router();

// const storage = multer.diskStorage({
//   destination: "uploads/",
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage });

// router.post("/", upload.single("file"), (req, res) => {
//   res.json({
//     url: `http://localhost:5000/uploads/${req.file.filename}`,
//   });
// });

// export default router;
import express from "express";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/", upload.single("file"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.filename}`, // ✅ Relative path
  });
});

export default router;