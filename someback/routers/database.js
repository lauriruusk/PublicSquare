
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
    const pubQuery = `
        CREATE TABLE IF NOT EXISTS "publications" (
            "id" SERIAL PRIMARY KEY,
            "posterid" INTEGER NOT NULL,
            "content" VARCHAR(255) NOT NULL,
            "date" VARCHAR(100) NOT NULL
        )`
    await executeQuery(pubQuery);
    console.log("Publications table initialised")
    const adminQuery = `
        INSERT INTO "users" ("email", "password")
            VALUES ('${process.env.ADMIN_USERNAME}', '${process.env.ADMIN_PASSWORD}')
        WHERE
            NOT EXISTS(SELECT * FROM "users" WHERE email='${process.env.ADMIN_USERNAME}')`
    await executeQuery(adminQuery);
    console.log('admin added');
}

const addUserToDatabase = async (params) => {
    const query2 = `
        INSERT INTO users (email, password)
            SELECT '${params.email}', '${params.password}'
        WHERE
            NOT EXISTS(SELECT email, password FROM users WHERE email='${params.email}');`
    
        const result = await executeQuery(query2);
        console.log(result.rowCount);
        // console.log('User added!');
        if(result === 0) {
            console.log("User already exists");
        }
        return result;
}

const loginData = async (params) => {
    console.log('login received');
    const query = `SELECT * FROM users WHERE "email"='${params.email}'`;
    let result = await executeQuery(query);
    return JSON.stringify(result.rows)
}

const initialUsers = async (a) => {
    console.log(a);
    const query = `
        INSERT INTO "users"(email, password, firstname, lastname, birthday, phone) VALUES ('${a.email}', '${a.password}', '${a.firstname}', '${a.lastname}', '${a.birthday}', '${a.phone}')`;
    await executeQuery(query);
    console.log(`User ${a.email} added!`);

}

const getAllPublications = async () => {
    const query = `SELECT * FROM publications`
    const all = executeQuery(query);
    return JSON.stringify(all);
}

const getFilteredPublications = async ({flt}) => {
    const query = `SELECT * FROM publications
                        WHERE content CONTAINS '${flt}';`
}

const addPublication = async (params) => {
    const query = `
            INSERT INTO publications (senderid, content, date)
                VALUES (${params.senderid}, ${params.content}, ${params.date}) `
}

const updateUser = async (params) => {
    const query = `
            UPDATE users
            SET email = ${params.email}
            SET firstname=${params.firstname}
            SET lastname=${params.lastname}
            SET phone=${params.phone}
            SET birthday=${params.birthday}
            WHERE id=${params.id};`
}

const changePassword = async (params) => {
    const query = `
            UPDATE users
                SET password=${params.password}
            WHERE id=${params.id}`
}

const deleteUser = async(params) => {
    const query = `DELETE FROM USERS WHERE id=${params.id} `
}

export {createUsersTable, addUserToDatabase, loginData, initialUsers};
