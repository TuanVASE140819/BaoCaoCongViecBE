const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  tenVaiTro: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Role", roleSchema);
