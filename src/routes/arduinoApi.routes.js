import { Router } from "express";

const router = Router();

router.get('/humedad_del_suelo',(req,res)=>{
    res.json(res.send("funcionalidad en progreso"));
})

export default router;