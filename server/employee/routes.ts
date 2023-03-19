import { Router } from "express";
import { getAllEmployees, insertEmployee } from "./service";

const router = Router()

router.get("/", async function(req, res, next) {

    try {
        res.json(await getAllEmployees())
    } catch(e) {
        next(e)
    }
})

router.post("/", async function (req, res, next) {
    
    try{
        const{ employeeName, salary, departmentNo, lastModifyDate } = req.body
        console.log(employeeName, salary, departmentNo, lastModifyDate)
        res.json(await insertEmployee(employeeName, salary, departmentNo, lastModifyDate))
    }catch(e){
        next(e)
    }
})

module.exports = router