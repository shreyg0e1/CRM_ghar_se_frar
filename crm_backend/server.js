import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import escapeRoutes from "./routes/escapeRoutes.js";
import detailRoutes from "./routes/detailsRoutes.js";
import tripRoutes from "./routes/tripRoutes.js";
import packageRoutes from "./routes/packageRoutes.js";
import contactusRoutes from "./routes/contactUsRoutes.js";
import enquiryRoutes from "./routes/enquireRoutes.js";
import dreamRoutes from "./routes/dreamRoutes.js"

connectDB();
const app = express();

// ✅ Middlewares
app.use(cors()); // allow all origins by default
app.use(express.json()); // replaces bodyParser.json()
app.use(express.urlencoded({ extended: true })); // replaces bodyParser.urlencoded()

// Routes
app.use("/escape", escapeRoutes);

app.use("/detail", detailRoutes);

app.use("/package", packageRoutes);

app.use("/trip", tripRoutes);

app.use("/contact", contactusRoutes);

app.use("/enquiry", enquiryRoutes);

app.use("/dream", dreamRoutes);


app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
