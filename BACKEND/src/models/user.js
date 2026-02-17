// Model = bridge between your code & MongoDB
// model works whenever you SAVE / READ / UPDATE / DELETE
// schema -> set of rules

// const userSchema=new mongoose.Schema({
//     userName:String,
//     email:String,
//     password:String,
// });

// creating a Model named "User" using "userSchema"
// Used to create a model
// Model = tool to talk to MongoDB

// const User =mongoose.model("User",userSchema);
// export default User;
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

export default mongoose.model("User", userSchema);
