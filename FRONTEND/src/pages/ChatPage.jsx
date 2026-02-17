import { useState,useEffect ,useRef} from "react";
import API from '../services/api.js'
import './ChatPage.css';

function ChatPage(){
    const [users,setUsers]=useState([]);
    const [selectedUser,setSelectedUser]=useState(null);
    const [messages,setMessages]=useState([])
    const [newMessage,setNewMessage]=useState("")
    const inputRef = useRef();
    const [name,setName]=useState("");
    const [searchRes,setSearchRes]=useState([])


    // fetch all users
    useEffect(()=>{
        console.log("Use Effect");

        const fetchUsers= async ()=>{
            try{
                const res=await API.get('/chat');
                console.log("all chats we recieved : ",res.data.payload)
                setUsers(res.data.payload);
            }catch(err){
                console.log("error in fetching data "+err.message)

            }
        }
            fetchUsers();

    },[]);
    const handleSelectedUser=async (user)=>{
        setSelectedUser(user);
        try{
            // const chatRes=await API.post('/chat',{
            //     userId:user._id,
            // })
            const otherUserId=user._id;
            console.log("user id : ",otherUserId)
            const msgRes=await API.get(`/message/${otherUserId}`)
            //console.log("message responce set to messages ",msgRes.data)
            setMessages(msgRes.data?.payload || []);
            console.log("messages : ",messages)
            setSearchRes("")
        } catch (err) {
            console.log(err.message);
        }
    }
const handleSend = () => {
console.log(inputRef.current.value);
inputRef.current.value = ""; // clear input
};
    const handleSearch=async(name)=>{
      if(!name){
        return;
      }
      try{
        const res=await API.get('/user/search',{
          params:{
            userName:name
          }
        })
        console.log(res.data?.payload);
        setName("")
        
        let searchResult=res.data?.payload || []
        setSearchRes(searchResult)
        // new chat / existing 
    


      }catch(err){
          console.error("Error:",err.message);

      }

    }
    const handleSendMessage=async()=>{
        if(!newMessage){
            return; 
        }
        try{
            const res=await API.post('/message',{
                oId: selectedUser._id,
                text: newMessage
            })
            console.log(res.data)
            setMessages([...messages,res.data.payload])
            setNewMessage("")
            
            
        }catch(err){
            console.log(err.message)
        }
    }

   return (
    <div style={{display:"flex",height:"100vh"}}>

        {/* side bar */}
        <div style={{
    width: "30%",
    borderRight: "1px solid gray",
    display: "flex",
    flexDirection: "column",
    textAlign:"center",
    alignItems:"center",
    padding:"3%",
    rowGap:"1%",
    backgroundColor:"#f3d5b5"
  }}>
            <h2 style={{fontSize:"35px"}}>chats</h2>
            <div className="searchDiv">
              <input  onChange={(e) => setName(e.target.value)} value={name}  style={{borderRadius:"30px",width:"80%",height:"40px",textAlign:"center",backgroundColor:"#603808",marginBottom:"20px" ,fontSize:"20px",}} placeholder="search" type="text" className="search"/>
            <button onClick={()=>handleSearch(name)}>🔍︎</button>
           
            </div>
             {
              searchRes && (
                <div className="top">
          {searchRes.map(r=>{
            return <button className="searchResult"  id={r._id} onClick={()=>handleSelectedUser(r)}>{r.name}</button>
          })

          }
        </div>

              )
            }
            {/* <button onClick={()=>handleSearch(name)}>"++"</button> */}
            { 
                users.map(user=>{
                    return <button style={{borderRadius:"10px", width:"100%",height:"9%",textAlign:"center",backgroundColor:"#8b5e34",fontSize:"20px"}} id={user._id} onClick={()=>handleSelectedUser(user)}>{user.name}</button>
 })}
 
        </div>
       <div style={{ width: "70%", padding: "10px" ,backgroundColor:"#ffedd8"}}>
  <button style={{alignItems:"center",backgroundColor:"pink",textAlign:"center",width:"90%",height:"10%",fontSize:"30px",fontFamily:"-apple-system",borderRadius:"7px"}}>{selectedUser ? selectedUser.name : "Select a user"}</button>

  <div style={{ height: "70%", overflowY: "scroll" }}>
{
selectedUser &&
  messages &&
  messages.map((msg) =>
    msg.senderId== selectedUser._id ? (
      <p
        key={msg._id}
        style={{ textAlign: "left" }}
      >
        {msg.text}
      </p>
    ) : (
      <p
        key={msg._id}
        style={{ textAlign: "right" }}
      >
        {msg.text}
      </p>
    )
  )}
  </div>
  

  {selectedUser && (
    <div>
      <input style={{width:"85%"}}
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type message..."
      />{selectedUser && (
    <button style={{background:"green"}} onClick={handleSendMessage}>
      ➤
    </button>
  )}
    </div>
  )}

  
</div>

        
    </div>

    
  
);



}
export default ChatPage;