import { Router } from "express";
import { getAllEmployees, insertEmployees, updateEmployee, deleteEmployee } from "./service";

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
        const{ employeeName, salary, departmentNo, lastModifyDate } = req.body.data
        await insertEmployees(employeeName, salary, departmentNo, lastModifyDate)
        res.sendStatus(400)
    }catch(e){
        next(e)
    }
})

router.put("/", async function (req, res, next) {

    try{
        const{ salary, departmentNo, lastModifyDate, employeeName } = req.body.data
        await updateEmployee(salary, departmentNo, lastModifyDate, employeeName)
        res.sendStatus(400)
    }catch(e){
        next(e)
    }
})

router.delete("/", async function (req, res, next){

    try{
        console.log(req.body)
        const{ employeeName } = req.body
        await deleteEmployee(employeeName)
        res.sendStatus(400)
    }catch(e){
        next(e)
    }
})

module.exports = router