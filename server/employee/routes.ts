import { Router } from "express";
import { getAllEmployees, insertEmployees, updateEmployee, deleteEmployees } from "./service";

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
        //console.log(employeeName, salary, departmentName, lastModifyDate)
        res.json(await insertEmployees(employeeName, salary, departmentNo, lastModifyDate))
    }catch(e){
        next(e)
    }
})

router.put("/", async function (req, res, next) {

    try{
        const{ salary, departmentNo, lastModifyDate, employeeName } = req.body
        //console.log(salary, departmentNo, lastModifyDate)
        await updateEmployee(salary, departmentNo, lastModifyDate, employeeName)
        res.sendStatus(200)
    }catch(e){
        next(e)
    }
})

router.delete("/", async function (req, res, next){
    
    try{
        const{ employeeName } = req.body
        console.log(employeeName)
        await deleteEmployees(employeeName)
        res.sendStatus(200)
    }catch(e){
        next(e)
    }
})

module.exports = router