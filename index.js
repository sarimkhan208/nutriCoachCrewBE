const express = require("express")
const app = express()
const cors = require("cors")
const { connection } = require("./connections/connection")
const { userRouter } = require("./routes/userRoutes")
app.use(cors())
app.use(express.json())


const http = require('http')
const {Server} = require('socket.io')

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods:"*",
    },
});


io.on('connection',(socket) => {

    socket.on("join_room",(data)=>{
        socket.join(data)
    })

    socket.on("send_message",(data)=>{
        socket.to(data.room).emit("receive_message",data)
    })

    socket.on("disconnect" , ()=>{
    })

})


  


app.get("/",(req,res)=>{
    res.status(200).send("Nutri-Coach-Crew Backend");
})

app.use("/users",userRouter);

server.listen(8000, async ()=>{
    try{
        await connection
        console.log('Connected to MongoDB')
    }catch(err){
        console.log(err)
    }
    console.log("server is running")
    
})

