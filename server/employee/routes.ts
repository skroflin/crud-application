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
        console.log(req.body)
        const{ employeeName, salary, departmentNo, lastModifyDate } = req.body.data
        const insertEmployeeResult = await insertEmployees(employeeName, salary, departmentNo, lastModifyDate)
        if (await insertEmployeeResult === true){
            res.sendStatus(200) 
        }else{
            res.sendStatus(400)
        }
    }catch(e){
        next(e)
    }
})

router.put("/", async function (req, res, next) {

    try{
        const{ salary, departmentNo, lastModifyDate, employeeName } = req.body
        const updateEmployeeResult = await updateEmployee(salary, departmentNo, lastModifyDate, employeeName)
        if (await updateEmployeeResult === true){
            res.sendStatus(200)
        }else{
            res.sendStatus(400)
        }
    }catch(e){
        next(e)
    }
})

router.delete("/", async function (req, res, next){

    try{
        console.log(req.body)
        const{ employeeName } = req.body.data
        const deleteEmployeeResult = await deleteEmployee(employeeName)
        if (await deleteEmployeeResult === true){
            res.sendStatus(200)
        }else{
            res.sendStatus(400)
        }
    }catch(e){
        next(e)
    }
})

module.exports = router