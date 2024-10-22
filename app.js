const express = require("express");
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const dotenv = require("dotenv");
const cors = require("cors"); // Import the cors package
const bodyParser = require("body-parser"); // Import body-parser

// Load config
dotenv.config();

const app = express();
app.use(bodyParser.json()); // Use body-parser to parse JSON
app.use(cors()); // Enable CORS

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
const authRoutes = require("./routes/auth"); // Import auth routes
const noteRoutes = require("./routes/noteRoutes"); // Import note routes
const attendanceRoutes = require("./routes/attendance"); // Import attendance routes

app.use("/api/users", userRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/auth", authRoutes); // Use auth routes
app.use("/api/notes", noteRoutes); // Use note routes
app.use("/api/attendance", attendanceRoutes); // Use attendance routes

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
