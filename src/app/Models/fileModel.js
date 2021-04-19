const db = require('../../config/db')
const fs  = require('fs')

module.exports ={
    async create({filename,path}){
        try{
            const query = `
                INSERT INTO files (
                    name,
                    path
                )VALUES($1, $2)
                RETURNING id
            `
            const values = [
                filename,
                path
            ]           
            return await db.query(query, values)
        }catch(error){
            throw error
        }
        
    },
     async delete(file_id){
        try{
            const result = await db.query(`SELECT * FROM files WHERE id = $1`, [file_id])
            const file = result.rows[0]

            fs.unlinkSync(file.path)
            
            return db.query(`
            DELETE FROM files WHERE id= $1
        `, [file_id])
        }catch(err){
            console.log(err)
        } 
    },
    async createRF(recipe_id, file_id ){
        try{
            const query = `
                INSERT INTO recipes_files (
                    recipe_id,
                    file_id
                )VALUES($1, $2)
                RETURNING id
            `
            const values = [
                recipe_id, 
                file_id 
            ]           
            return await db.query(query, values)
        }catch(error){
            throw error
        }       
    },
}