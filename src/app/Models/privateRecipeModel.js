const {date} = require('../../lib/utils')
const db = require('../../config/db')
const fs = require('fs')
const File = require('./fileModel')

module.exports = {
    async create(data){ 
        try{
            const query = `
            INSERT INTO recipes(
               chef_id,
               title,
               ingredients,
               preparation,
               information,
               created_at
            ) VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id
        `
            const values = [ 
                data.chef_id,
                data.title,
                data.ingredients,
                data.preparation,
                data.information,
                date(Date.now()).iso
            ]
            
            const results = await db.query(query,values)
            return results.rows[0].id
        }catch(error){
            throw error
        }
   },
   async update(data){
        try{
            const query = `
            UPDATE recipes SET
               chef_id = ($1),
               title = ($2),
               ingredients = ($3),
               preparation = ($4),
               information = ($5)
            WHERE id = $6
        `
        const values = [
            data.chef_id,
            data.title,
            data.ingredients,
            data.preparation,
            data.information,
            data.id
        ]
        
        return await db.query(query, values)
        }catch(error){
            throw error
        }
        
    }, 
    async delete(id){
        try{
            const result = await db.query(`SELECT * FROM recipes_files WHERE recipe_id = $1`, [id])
            let ids = result.rows
            ids.map(file => File.delete(file.file_id))

            return db.query(`DELETE FROM recipes WHERE id= $1`, [id])  
        } catch(error) {
            throw(error)
        }
        
    },
    async find(id){
        try{
            return await db.query(`
            SELECT recipes.*, chefs.name AS chef_name
            FROM recipes
            LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
            WHERE recipes.id = $1`, [id])
        } catch(error) {
            throw error
        }
    },
    async findByChef(id){
        try{
            return await db.query(`
            SELECT recipes.*, chefs.name AS chef_name
            FROM recipes
            LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
            WHERE recipes.chef_id = $1`, [id])
        } catch(error) {
            throw error
        }
    },
    async indexRecipes(){
        try{
            return await db.query(`SELECT recipes.*, chefs.name AS chef_name
            FROM recipes
            LEFT JOIN chefs ON (recipes.chef_id = chefs.id)`)
        }catch(error){
            throw error
        }
        
    },
    async files(id){
        try {
            return await db.query( `
                SELECT * FROM files
                LEFT JOIN recipes_files ON (recipes_files.file_id = files.id)
                WHERE recipes_files.recipe_id = ${id}
            `)   
          } 
          catch (err) {
            console.error(err)
          }
    }
}