import express from "express"
import ChatAgent from "./ChatAgent.js"
const chat = new ChatAgent();
const app = express();

app.use(express.json());

 app.post("/api/talk",async (req, res) => {
       
       
       try {
              const { text, sender } = req.body;
              const responce = await chat.processUserInput(text);
              res.json({
              text: responce,
              sender: "agent"
              
       });
       
       
       } catch (e) {
              throw e;
              // return res.status(400).json(
              //        error:"houve um erro interno"
              // )
       }
       
      // res.send(process.env.GROQ_API_KEY)


})

// const port = process.env.PORT || 3000

export default app;