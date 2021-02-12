const db = require('../../config/db')

module.exports = {
    indexRecipes(callback){
        db.query(`SELECT recipes.*, chefs.name AS chef_name
        FROM recipes
        LEFT JOIN chefs ON (recipes.chef_id = chefs.id)`, function(err, results){
            if(err) throw `Database Error! ${err}`

            callback(results.rows)
        })
    },
    findRecipe(id, callback){
        db.query(`
        SELECT recipes.*, chefs.name AS chef_name
        FROM recipes
        LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
        WHERE recipes.id = $1`, [id],function(err,results){
                if(err) throw `Database Error!${err}`
                
                callback(results.rows[0])
        })
    },
    findBy(filter,callback){
        db.query=(`
        SELECT recipes.*, chefs.name AS chef_name
        FROM recipes
        LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
        WHERE recipes.title ILIKE '%${filter}%'`, function(err, results){
            if(err) throw `Database Error! ${err}`


            callback(results.rows)
        })
    },
    allChefs(callback){
        db.query(`SELECT chefs.*, count(recipes) AS total_recipes
        FROM chefs
        LEFT JOIN recipes ON (chefs.id = recipes.chef_id)
        GROUP BY chefs.id`
        , function(err, results){
            if(err) throw `Database Error! ${err}`

            callback(results.rows)
        })
    },
}