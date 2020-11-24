//const Recipe = require('../models/Recipe')

module.exports={
    index(req,res){
        return res.render("recipes/index")
    },
    about(req,res){
        return res.render("recipes/about")
    },
    recipes(req,res){
        return res.render("recipes/recipes-list")
    }
}