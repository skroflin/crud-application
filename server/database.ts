import pg from "pg";

let POOL_INSTANCE: pg.Pool | undefined

async function getPool(){
    if(POOL_INSTANCE) return POOL_INSTANCE
    POOL_INSTANCE = new pg.Pool({
        user: 'postgres',
        host: 'localhost',
        password: 'kr0fn4031',
        database: 'postgres',
        port: 5432,
    })

    return POOL_INSTANCE
}

export async function dbClient(){
    return (await getPool()).connect()
}