import { Router } from "express";
import { generateUser } from "../utils.js";

const router = Router();

router.get("/",(req,res)=>{
    let users=[];
    const cant = req.query.cant || 100;
    for(let i=0;i<cant;i++){
        const newUser = generateUser();
        users.push(newUser);
    }
    res.json({users})
});

export {router as userRouter}