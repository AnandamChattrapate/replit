// chat schema -> model
import mongoose from 'mongoose'

const chatSchema=new mongoose.Schema({
    chatName:{
        type:String,
        trim:true,
        required:function(){
            return this.isGroupChat;
        }
    },  
    isGroupChat:{
        type:Boolean,
        default:false,
    },
    users:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required: true
        },
    ],
    latestMessage:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Message",
    },
    lastReadAt:[{
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
        },readAt:{
            type:Date,
            default:Date.now,
        }

    }]


},{timestamps:true});

chatSchema.path("users").validate(function (users) {
  if (this.isGroupChat) {
    return users.length <= 100;
  }
  return true;
}, "Group can have maximum 100 users");

export default mongoose.model('Chat',chatSchema);
