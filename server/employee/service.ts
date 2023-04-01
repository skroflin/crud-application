import { dbClient } from '../database'

export async function getAllEmployees() {

    const client = await dbClient()
    const employees = await client.query('SELECT * FROM public.employee ORDER BY "employeeNo" ASC')
    return employees.rows
}

export async function insertEmployees(employeeName: string, salary: number, departmentNo: number, lastModifyDate:Date) {

    const client = await dbClient()
    
    try{
        await client.query('BEGIN')

        //const departmentNo = await client.query('SELECT "departmentNo" FROM public.department WHERE "departmentName" = $1 WHERE "departmentLocation"', [departmentName, departmentLocation])

        const insertedEmployee = await client.query(
            'INSERT INTO public.employee ("employeeName", "salary", "departmentNo", "lastModifyDate") VALUES ($1, $2, $3, $4)',
            [employeeName, salary, departmentNo, lastModifyDate]
        )
        
        //if (departmentNo.row.length == 0) throw new Error(`Department with name ${departmentName} does not exist)`)

        await client.query('COMMIT')
    }catch(e){
        await client.query('ROLLBACK')
    }finally{
        client.release()
    }
    
}

export async function updateEmployee(salary: number, departmentNo: number, lastModifyDate: Date, employeeName: string){
    const client = await dbClient()

    try{
        await client.query('BEGIN')

        //const employeeNo = await client.query('SELECT "employeeNo" FROM public.employee WHERE "employeeNo" = $1', [employeeNo])

        await client.query(
            'UPDATE public.employee SET "salary" = $1, "departmentNo" = $2, "lastModifyDate" = $3 WHERE "employeeName" = $4 RETURNING *', [salary, departmentNo, lastModifyDate, employeeName]
        )

        await client.query('COMMIT')
    }catch(e){
        await client.query('ROLLBACK')
    }finally{
        client.release()
    }
}

export async function deleteEmployees(employeeName: string){
    const client = await dbClient()

    try{
        await client.query('BEGIN')

        await client.query(
            'DELETE FROM public.employee WHERE "employeeName" = $1 RETURNING *', [employeeName]
        )

        await client.query('COMMIT')
    }catch(e){
        await client.query('ROLLBACK')
        console.log(e)
    }finally{
        client.release()
    }
}

function query(_arg0: string, _arg1: any[]) {
    throw new Error('Function not implemented.')
}
