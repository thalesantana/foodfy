const db = require('../../config/db')
module.exports = {
    find(id, callback){
        db.query(`
        SELECT chefs.*, (SELECT count(*) FROM recipes WHERE recipes.chef_id = $1 ) as total_recipes FROM chefs 
        LEFT JOIN recipes 
        ON chefs.id = recipes.chef_id
        WHERE chefs.id = $1
        GROUP BY chefs.id `, [id],function(err,results){
                if(err) throw `Database Error!${err}`
                
                callback(results.rows[0])
        })
    },
    chefsSelectOptions(callback){
        db.query(`SELECT  * FROM chefs`, function(err, results){
            if(err) throw `Database Error! ${err}`
          
            callback(results.rows)
        })
    },
    recipeData(callback){
        db.query(`SELECT * FROM recipes`, function(err, results){
            if(err) throw `Database Error! ${err}`

            callback(results.rows)
        })
    },
}