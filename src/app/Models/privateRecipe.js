const {date} = require('../../lib/utils')
const db = require('../../config/db')

module.exports = {
    create(data,callback){ 
        const query = `
            INSERT INTO recipes(
               chef_id,
               image,
               title,
               ingredients,
               preparation,
               information,
               created_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id
        `
        const values = [ 
            data.chef_id,
            data.image,
            data.title,
            data.ingredients,
            data.preparation,
            data.information,
            date(Date.now()).iso
        ]
        
        db.query(query,values, function(err, results){
            console.log(err)
            console.log(results)
        })
    },
    
    find(id, callback){
        db.query(`
            SELECT recipes.*, chefs.name AS chef_name
            FROM recipes
            LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
            WHERE recipes.id = $1`, [id], function(err,results){
                if(err) throw `Database Error!${err}`
                callback(results.rows[0])
        })
    }
}