import { Sequelize } from "sequelize"
import config from "../config/config.js"

const sequelize = new Sequelize(config.database,config.user,config.pass, {
    host: config.host,
    port: config.port,
    dialect: config.dialect
})

export default sequelize

// yarn sequelize-auto -h localhost -d db_capstone_eorm -u root -x 1234 -p 3306 --dialect mysql -o src/models -l esm