import { Router, Request, Response, NextFunction } from "express";
import { getAllEmployees, insertEmployees, updateEmployee, deleteEmployee } from "./service";

const router = Router()

router.get("/", async function(_req: Request, res: Response, next: NextFunction) {

    try {
        res.json(await getAllEmployees())
    } catch(e) {
        next(e)
    }
})

router.post("/", async function (req: Request, res: Response, next: NextFunction) {

    try {
        console.log(req.body)
        const { employeeName, salary, departmentNo } = req.body
        await insertEmployees(employeeName, salary, departmentNo)
        res.sendStatus(200)
    } catch(e) {
        next(e)
    }
})

router.put("/", async function (req: Request, res: Response, next: NextFunction) {

    try {
        console.log(req.body)
        const { salary, departmentNo, lastModifyDate, employeeName } = req.body
        await updateEmployee(salary, departmentNo, lastModifyDate, employeeName)
        res.sendStatus(200)
    } catch(e) {
        next(e)
    }
})

router.delete("/", async function (req: Request, res: Response, next: NextFunction){

    try {
        const { employeeName } = req.body
        await deleteEmployee(employeeName)
        res.sendStatus(200)
    } catch(e) {
        next(e)
    }
})

module.exports = router