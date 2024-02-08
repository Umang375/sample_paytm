const { default: mongoose } = require("mongoose");
const uri = 'mongodb+srv://Umang1008:vQGMD2Y0vANDr2Zo@cluster0.tmjz9fa.mongodb.net/';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB Connected…')
  })
  .catch(err => console.log(err))

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
})

const accountsSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
})

const User = mongoose.model("User", userSchema);
const Accounts = mongoose.model("Accounts", accountsSchema);
module.exports = {
    User,
    Accounts
}