const express = require('express')
const routes = express.Router()

const recipes = require('../app/controllers/publicRecipes')


routes.get('/',function(req,res){return res.redirect("/recipes")})
routes.get('/recipes', recipes.index);
routes.get('/about', recipes.about);
routes.get('/recipes-list', recipes.recipes);

module.exports = routes
