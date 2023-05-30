import { dbClient, query, transactionQuery } from '../database'

export async function getAllDepartments() {

    const departments = await query(`
        SELECT
            "department_no" as "departmentNo",
            "department_name" as "departmentName",
            "department_location" as "departmentLocation"
        FROM department`)

    return departments.rows
}

export async function insertDepartments(departmentName: string, departmentLocation: string) {

    await transactionQuery(async (client) => {
        const departments = await client.query(`
            SELECT * FROM department WHERE "department_name" = $1 AND "department_location" = $2
        `, [departmentName, departmentLocation])

        if (departments.rows.length !== 0) throw new Error(`Department with name ${departmentName} and location ${departmentLocation} exists`)

        await client.query(`
            INSERT INTO department ("department_name", "department_location") VALUES ($1, $2)
        `, [departmentName, departmentLocation])
    })
}

export async function updateDepartments(departmentLocation: string, departmentName: string, departmentNo: number) {

    await transactionQuery(async (client) => {

        const departments = await client.query(`
            SELECT * FROM department WHERE "department_name" = $1 AND "department_location" = $2
            `, [departmentName, departmentLocation])

        if (departments.rows.length !== 0) throw new Error (`Department with name ${departmentName} and location ${departmentLocation} already exists`)

        await client.query(`
            UPDATE department
            SET "department_location" = $1, "department_name" = $2 WHERE "department_no" = $3
        `, [departmentLocation, departmentName, departmentNo])
    })
}

export async function deleteDepartment(departmentName: string, departmentLocation: string){

    await transactionQuery(async (client) => {
        await client.query(`
            DELETE FROM department WHERE "departmentName" = $1 AND "departmentLocation" = $2`
        , [departmentName, departmentLocation])
    })
}