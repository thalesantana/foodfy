const db = require('../../config/db')
const {date} = require('../../lib/utils')
const File = require('./fileModel')

module.exports = {
    allChefs(){
        return db.query(`SELECT chefs.*, count(recipes) AS total_recipes
        FROM chefs
        LEFT JOIN recipes ON (chefs.id = recipes.chef_id)
        LEFT JOIN files ON  (chefs.file_id =  files.id)
        GROUP BY chefs.id`)    
    },
    find(id){
       return db.query(`
        SELECT chefs.*, (SELECT count(*) FROM recipes WHERE recipes.chef_id = $1 ) as total_recipes 
        FROM chefs WHERE chefs.id = $1
        GROUP BY chefs.id `, [id])
    },
    create(name,file_id){
        const query = `
        INSERT INTO chefs(
            name,
            file_id,
            created_at
        ) VALUES ($1, $2, $3)
        RETURNING id
    `
        const values = [ 
            name,
            file_id,
            date(Date.now()).iso
        ] 
    return db.query(query, values)
    },
    
    async update(data,file_id){
        const query = `
            UPDATE chefs SET
                name =($1),
                file_id = ($2)
            WHERE id = $3
        `
        const values = [
            data.name,
            file_id,
            data.id
        ]
        
        return db.query(query, values)
    }, 
    async delete(id,file_id){    
        try{
             await File.delete(file_id)

            return db.query(`DELETE FROM chefs WHERE id= $1`, [id])  
        } catch(error) {
            throw(error)
        }     
    },

    files(id){
        return db.query(`SELECT * FROM files WHERE id = $1`,
        [id])
    }
}

