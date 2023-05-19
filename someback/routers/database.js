
import pg from 'pg'
import 'dotenv/config'

const { PG_HOST, PG_PORT, PG_USERNAME, PG_PASSWORD, PG_DATABASE, NODE_ENV } = process.env

const pool = new pg.Pool({
    host: PG_HOST,
    port: Number(PG_PORT),
    user: PG_USERNAME,
    password: PG_PASSWORD,
    database: PG_DATABASE,
    ssl: NODE_ENV === 'production'
})

const executeQuery = async (query, parameters) => {
    const client = await pool.connect()
    try {
        const result = await client.query(query, parameters)
        return result
    } catch (error) {
        console.error(error.stack)
        error.name = 'dbError'
        throw error
    } finally {
        client.release()
    }
}

const createUsersTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS "users" (
            "id" SERIAL PRIMARY KEY,
            "email" VARCHAR(100) NOT NULL,
            "password" VARCHAR(100) NOT NULL,
            "firstname" VARCHAR(100),
            "lastname" VARCHAR(100),
            "birthday" VARCHAR(100),
            "phone" REAL
        )`
    await executeQuery(query)
    console.log('Users table initialized');
    const adminQuery = `
        INSERT INTO "users" ("email", "password") VALUES ('${process.env.ADMIN_USERNAME}', '${process.env.ADMIN_PASSWORD}')`
    await executeQuery(adminQuery);
    console.log('admin added');
}

const addUserToDatabase = async (params) => {
    const query = `
        INSERT INTO users ("email", "password") VALUES ('${params.email}', '${params.password}') `
    
        await executeQuery(query);
        console.log('User added!');
}

const loginData = async (params) => {
    console.log('login received');
    // console.log(params);
    const query = `SELECT * FROM users WHERE "email"='${params.email}'`;
    let result = await executeQuery(query);

    // executeQuery(query).then(result => {
    //     console.log(JSON.stringify(result.rows));
    //     return JSON.stringify(result.rows);
    // })
    return JSON.stringify(result.rows)
}

const initialUsers = async (a) => {
    console.log(a);
    const query = `
        INSERT INTO "users"(email, password, firstname, lastname, birthday, phone) VALUES ('${a.email}', '${a.password}', '${a.firstname}', '${a.lastname}', '${a.birthday}', '${a.phone}')`;
    await executeQuery(query);
    console.log(`User ${a.email} added!`);

}

export {createUsersTable, addUserToDatabase, loginData, initialUsers};