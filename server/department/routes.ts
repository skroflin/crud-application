
import { Router } from "express";
import { getAllDepartments, insertDepartments, updateDepartments } from "./service";
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
        res.json(await insertDepartments(departmentName, departmentLocation))
    }catch(e){
        next(e)
    }
})

router.put("/", async function (req, res, next) {

    try{
        const{ departmentLocation, departmentName, departmentNo } = req.body
        await updateDepartments(departmentLocation, departmentName, departmentNo)
        res.sendStatus(200)
    }catch(e){
        next(e)
    }
})

module.exports = router