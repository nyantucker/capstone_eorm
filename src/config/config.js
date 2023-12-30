import dotenv from 'dotenv'
dotenv.config() 

let config = {
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
}

export default config