import { dbClient, query, transactionQuery } from '../database'

export async function getAllEmployees() {

    const employees = await query(`
        SELECT
            e."employee_name" as "employeeName",
            e."salary",
            d."department_name" as "departmentName",
            d."department_location" as "departmentLocation",
            e."last_modify_date" as "lastModifyDate"
        FROM department d
        INNER JOIN employee e ON d."department_no" = e."department_no"`)

    return employees.rows
}

export async function insertEmployees(employeeName: string, salary: number, departmentName: string, departmentLocation: string) {

    await transactionQuery(async (client) => {

        const employee = await client.query(`SELECT * FROM employee WHERE "employee_name" = $1`, [employeeName])

        if (employee.rowCount !== 0) throw Error(`Employee ${employeeName} already exists`)

        const department = await client.query(`
            SELECT "department_no" as "departmentNo"
            FROM department
            WHERE "department_name" = $1 AND "department_location" = $2
        `, [departmentName, departmentLocation])

        if (department.rowCount === 0) throw Error(`Department ${departmentName}, ${departmentLocation} does not exist`)

        await client.query(`
            INSERT INTO employee ("employee_name", "salary", "department_no")
            VALUES ($1, $2, $3)
        `, [employeeName, salary, department.rows[0].departmentNo])
    })
}

export async function updateEmployee(employeeName: string, salary: number, departmentName: string, departmentLocation: string, lastModifyDate: Date) {

    await transactionQuery(async (client) => {

        const employee = await client.query(`SELECT * FROM employee WHERE "employee_name" = $1`, [employeeName])

        if (employee.rowCount === 0 ) throw Error(`Employee ${employeeName} does not exists`)

        const department = await client.query(`
            SELECT "department_no" as "departmentNo"
            FROM department
            WHERE "department_name" = $1 AND "department_location" = $2
        `, [departmentName, departmentLocation])

        if (department.rowCount === 0) throw Error(`Department ${departmentName}, ${departmentLocation} does not exist`)

        await client.query(`
            UPDATE employee SET "salary" = $1, "department_no" = $2, "last_modify_date" = $3 WHERE "employee_name" = $4
        `, [salary, department.rows[0].departmentNo, lastModifyDate, employeeName])
    })
}

export async function deleteEmployee(employeeName: string) {

    await transactionQuery(async (client) => {

        const employee = await client.query(`SELECT * FROM employee WHERE "employee_name" = $1`, [employeeName])

        if (employee.rowCount === 0) throw Error(`Employee ${employeeName} does not exists`)

        await client.query(`DELETE FROM employee WHERE "employeeName" = $1`, [employeeName])
    })
}
