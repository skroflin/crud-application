import { dbClient } from '../database'

export async function getAllDepartments() {

    const client = await dbClient()
    const departments = await client.query('SELECT * FROM public.department')
    return departments.rows
}

export async function insertDepartments(departmentName: string, departmentLocation: string) {

    const client = await dbClient()
    try{
        await client.query('BEGIN')

        const ad = await client.query(
            'INSERT INTO public.department ("departmentName", "departmentLocation") VALUES ($1, $2)',
            [departmentName, departmentLocation]
        )

        await client.query('COMMIT')
    }catch(e){
        await client.query('ROLLBACK')
        throw e
    }finally{
        client.release()
    }
}

export async function updateDepartments(departmentLocation: string, departmentName: string, departmentNo: number) {

    const client = await dbClient()
    try{
        await client.query('BEGIN')

        await client.query(
            'UPDATE public.department SET "departmentLocation" = $1, "departmentName" = $2 WHERE "departmentNo" = $3 RETURNING *', [departmentLocation, departmentName, departmentNo]
        )

        await client.query('COMMIT')
    }catch(e){
        await client.query('ROLLBACK')
    }finally{
        client.release()
    }
}

function query(arg0: string, arg1: any[]) {
    throw new Error('Function not implemented.')
}