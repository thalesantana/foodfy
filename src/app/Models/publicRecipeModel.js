const db = require('../../config/db')

module.exports = {
    async indexRecipes(){
        try {
            return await db.query(`SELECT recipes.*, chefs.name AS chef_name
            FROM recipes
            LEFT JOIN chefs ON (recipes.chef_id = chefs.id)`)
        } catch (error) {
            throw error
        }     
    },
    async findRecipe(id){
        try {
           return await db.query(`
            SELECT recipes.*, chefs.name AS chef_name
            FROM recipes
            LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
            WHERE recipes.id = $1`, [id])
        } catch (error) {
            throw error
        } 
    },
    async findBy(filter) {
        try {
            return await db.query(`
            SELECT recipes.*, chefs .name AS chef_name
            FROM recipes
            LEFT JOIN chefs ON (recipes.chef_id =  chefs.id)
            WHERE recipes.title ILIKE '%${filter}%'
            OR chefs.name ILIKE '%${filter}%'
            GROUP BY recipes.id, chefs.name
            `)
        } catch (error) {
            throw error
        }
       
    },
    async allChefs(){
        try {
            return await db.query(`SELECT chefs.*, count(recipes) AS total_recipes
            FROM chefs
            LEFT JOIN recipes ON (chefs.id = recipes.chef_id)
            GROUP BY chefs.id`)
        } catch (error) {
            throw error
        }
    },
}