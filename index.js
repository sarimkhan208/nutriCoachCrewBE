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

io.listen(8000)

io.on('connection',(socket) => {
    // console.log(`User connect ${socket.id}`)

    socket.on("join_room",(data)=>{
        // console.log("join_room",data)
        socket.join(data)
    })

    socket.on("send_message",(data)=>{
        socket.to(data.room).emit("receive_message",data)
    })

    socket.on("disconnect" , ()=>{
        // console.log("User disconnect",socket.id)
    })

})


  


app.get("/",(req,res)=>{
    res.status(200).send("Nutri-Coach-Crew Backend");
})

app.use("/users",userRouter);

app.listen(8080, async ()=>{
    try{
        await connection
        console.log('Connected to MongoDB')
    }catch(err){
        console.log(err)
    }
    console.log("server is running")
})