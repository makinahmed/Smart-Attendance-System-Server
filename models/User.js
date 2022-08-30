const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(
          v
        );
      },
      message: (prop) => `Invalid email ${prop.value}`,
    },
  },
  password: {
    type: String,
    minlength: [6, "password is tool short"],
    required: true,
  },

  roles: {
    type: [String],
    required: true,
    default: ["Student"],
  },
  accountStatus: {
    type: String,
    enum: ["PENDING", "ACTIVE", "REJECTED"],
    default: "PENDING",
    required: true,
  },
});

const User = model("User", userSchema);

module.exports = User;
