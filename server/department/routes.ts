
import { Router, Request, Response, NextFunction } from "express";
import { getAllDepartments, insertDepartments, updateDepartments, deleteDepartment } from "./service";
import { dbClient } from "../database";

const router = Router()
const pg = dbClient()

router.get("/", async function(_req: Request, res: Response, next: NextFunction) {

    try {
        res.json(await getAllDepartments())
    } catch(e) {
        next(e)
    }
})

router.post("/", async function (req: Request, res: Response, next: NextFunction) {

    try {
        console.log(req.body)
        const { departmentName, departmentLocation } = req.body
        await insertDepartments(departmentName, departmentLocation)
        res.sendStatus(200)
    } catch(e) {
        next(e)
    }
})

router.put("/", async function (req: Request, res: Response, next: NextFunction) {

    try {
        const { departmentLocation, departmentName, departmentNo } = req.body
        await updateDepartments(departmentLocation, departmentName, departmentNo)
        console.log(req.body)
        res.sendStatus(200)
    } catch(e) {
        next(e)
    }
})

router.delete("/", async function (req: Request, res: Response, next: NextFunction) {

    try {
        const { departmentName, departmentLocation } = req.body
        await deleteDepartment(departmentName, departmentLocation)
        res.sendStatus(200)
    } catch(e){
        next(e)
    }
})

module.exports = router