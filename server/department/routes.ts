
import { Router } from "express";
import { getAllDepartments, insertDepartments, updateDepartments, deleteDepartment } from "./service";
import { dbClient } from "../database";

const router = Router()
const pg = dbClient()

router.get("/", async function(req, res, next) {

    try {
        res.json(await getAllDepartments())
    } catch(e) {
        next(e)
    }
})

router.post("/", async function (req, res, next) {
    
    try{
        const{ departmentName, departmentLocation } = req.body
        await insertDepartments(departmentName, departmentLocation)
        res.sendStatus(400)
    }catch(e){
        next(e)
    }
})

router.put("/", async function (req, res, next) {

    try{
        const{ departmentLocation, departmentName, departmentNo } = req.body
        await updateDepartments(departmentLocation, departmentName, departmentNo)
        res.sendStatus(400)
    }catch(e){
        next(e)
    }
})

router.delete("/", async function (req, res, next) {

    try{
        const { departmentName, departmentLocation } = req.body
        await deleteDepartment(departmentName, departmentLocation)
        res.sendStatus(400)
    }catch(e){
        next(e)
    }
})

module.exports = router