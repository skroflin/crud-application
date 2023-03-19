import { dbClient } from '../database'

export async function getAllEmployees() {

    const client = await dbClient()
    const employees = await client.query('SELECT * FROM public.employee')
    return employees.rows
}

export async function insertEmployee(employeeName: string, salary: number, departmentName: string, lastModifyDate?:Date) {

    const client = await dbClient()
    
    try{
        await client.query('BEGIN')

        const departmentNo = await client.query('SELECT "departmentNo" FROM public.department WHERE "departmentName" = $1', [departmentName])
        console.log(departmentNo.rows[0])

        const ad = await client.query(
            'INSERT INTO public.employee ("employeeName", "salary", "departmentNo", "lastModifyDate") VALUES ($1, $2, $3, $4)',
            [employeeName, salary, departmentName, lastModifyDate]
        )

        await client.query('COMMIT')
    }catch(e){
        await client.query('ROLLBACK')
        throw e
    }finally{
        client.release()
    }
    
}

function query(_arg0: string, _arg1: any[]) {
    throw new Error('Function not implemented.')
}
