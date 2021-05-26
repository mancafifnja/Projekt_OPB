import fs from "fs"
import path from "path"

const sequelize = new Sequelize('sem2021_mancaf', 'jurijt', '3nyv10x8', {
    host: 'baza.fmf.uni-lj.si',
    port: 5432,
    dialect: 'postgres'
});

export default sequelize;