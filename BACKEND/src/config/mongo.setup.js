import mongoose from 'mongoose';


const db = async()=>{
    try{
        const conn= await mongoose.connect(process.env.MONGO_URL);
        console.log(" DB connection success ");

    } catch(err){
        console.log(" erro in setting up connection ",err)
    }

}
export default db;