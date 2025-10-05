import express from "express"
import Todo from "../models/todo.model.js";
const router = express.Router();

//get todos
router.get("/", async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);       //take all the todo and send to client so that it can show in frontend
    } catch (error) {
        res.status(500).json({ message: "Error in get all todo " })
    }
})

//add todos
router.post("/", async (req, res) => {
    const todo = new Todo({
        task: req.body.task
    })
    try {
        const newTodo = await todo.save();
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(500).json({ message: "error in posting todo" });
    }
})

//update(either task or completion)

router.patch("/:id", async (req, res) => {

    try {
         
        const todo =await Todo.findById(req.params.id)
        if(!todo) return res.status(404).json({message:"No such task exist"});

        if(req.body.task!=undefined){
            todo.task=req.body.task;
        }
        if(req.body.completed!=undefined){
            todo.completed=req.body.completed;
        }
        const updatedTodo=await todo.save();
        res.json(updatedTodo);
    } catch (error) {
        res.status(500).json({ message: "error in update todo" });
    }
    
})

router.delete("/:id",async (req,res)=>{
    try {
        const deletedTodo= await Todo.findByIdAndDelete(req.params.id);
        res.json(deletedTodo);
    } catch (error) {
        res.status(500).json({message:"error in deleting"})
    }
})
export default router;