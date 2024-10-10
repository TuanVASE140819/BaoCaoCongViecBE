const express = require("express");
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const dotenv = require("dotenv");
const cors = require("cors"); // Import the cors package

// Load config
dotenv.config();

const app = express();
app.use(express.json());
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

app.use("/api/users", userRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/reports", reportRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
