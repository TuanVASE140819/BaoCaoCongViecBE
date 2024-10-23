const express = require("express");
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");

// Load config
dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Import Swagger docs
const swaggerDocs = require("./swagger");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Routes
const userRoutes = require("./routes/userRoutes");
const roleRoutes = require("./routes/roleRoutes");
const reportRoutes = require("./routes/reportRoutes");
const authRoutes = require("./routes/auth");
const noteRoutes = require("./routes/noteRoutes");
const attendanceRoutes = require("./routes/attendance");

app.use("/api/users", userRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/attendance", attendanceRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
