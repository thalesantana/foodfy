const {date} = require('../../lib/utils')
const db = require('../../config/db')

module.exports = {
    async create(data){ 
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
   },
   update(data, callback){
        const query = `
            UPDATE recipes SET
               chef_id = ($1),
               image = ($2),
               title =($3),
               ingredients = ($4),
               preparation = ($5),
               information = ($6)
            WHERE id = $7
        `
        const values = [
            data.chef_id,
            data.image,
            data.title,
            data.ingredients,
            data.preparation,
            data.information,
            data.id
        ]
        
        db.query(query, values, function(err, results){
            if(err) throw `Database Error!${err}` 
            
            callback()
        })
    }, 
    delete(id, callback){
        db.query(`DELETE FROM recipes WHERE id= $1`, [id],function(err, results){
            if(err) throw `Database Error! ${err}`

            return callback()
        })
    },
    find(id){
      return db.query(`
        SELECT recipes.*, chefs.name AS chef_name
        FROM recipes
        LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
        WHERE recipes.id = $1`, [id])
    },
    indexRecipes(callback){
        db.query(`SELECT recipes.*, chefs.name AS chef_name
        FROM recipes
        LEFT JOIN chefs ON (recipes.chef_id = chefs.id)`, function(err, results){
            if(err) throw `Database Error! ${err}`

            callback(results.rows)
        })
    },
    async files(id){
        try {
            const query = `
              SELECT * FROM files
              LEFT JOIN recipes_files ON (recipes_files.file_id = files.id)
              WHERE recipes_files.recipe_id = ${id}
            `
            
            const results = await db.query(query)
            //console.log(results.rows)
            return results
          } 
          catch (err) {
            console.error(err)
          }
    },
    async allFiles(){
        try {
            const query = `
              SELECT * FROM files
              LEFT JOIN recipes_files ON (recipes_files.file_id = files.id)`
            
            const results = await db.query(query)
            //console.log(results.rows)
            return results
          } 
          catch (err) {
            console.error(err)
          }
    },
}