//const Recipe = require('../models/Recipe')

module.exports={
    index(req,res){
        return res.render("publicRecipes/index")
    },
    about(req,res){
        return res.render("publicRecipes/about")
    },
    recipes(req,res){
        return res.render("publicRecipes/recipes-list")
    }
}