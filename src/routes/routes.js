const express = require('express')
const routes = express.Router()
const multer = require('../app/middlewares/multer.js')

const recipes = require('../app/controllers/privateRecipesController')
const chefs = require('../app/controllers/chefsController')
const publicRecipes = require('../app/controllers/publicRecipesController')

// PUBLIC ROUTES
routes.get('/',publicRecipes.home)
routes.get('/about', publicRecipes.about);
routes.get('/recipeslist', publicRecipes.recipes);// Exibir detalhes de uma receita
routes.get("/recipe/:id", publicRecipes.show); // Mostrar a lista de receitas
routes.get('/chefs', publicRecipes.chefs); // Mostrar a lista de chefs

//PRIVATE ROUTES

//RECIPES
routes.get('/admin',function(req,res){return res.redirect("/admin/recipes")})
routes.get("/admin/recipes", recipes.index); // Mostrar a lista de receitas
routes.get("/admin/recipes/create", recipes.create); // Mostrar formulário de nova receita
routes.get("/admin/recipes/:id", recipes.show); // Exibir detalhes de uma receita
routes.get("/admin/recipes/:id/edit", recipes.edit); // Mostrar formulário de edição de receita
routes.post("/admin/recipes",multer.array("photos",5) ,recipes.post); // Cadastrar nova receita
routes.put("/admin/recipes",multer.array("photos",5), recipes.put); // Editar uma receita
routes.delete("/admin/recipes", recipes.delete); // Deletar uma receita
//CHEFS
routes.get("/admin/chefs", chefs.index);
routes.get("/admin/chefs/createchef", chefs.create);
routes.post("/admin/chefs",multer.array("photos",5) , chefs.post);
routes.get("/admin/chefs/:id", chefs.show);
routes.get("/admin/chefs/:id/edit", chefs.edit);
routes.put("/admin/chefs",multer.array("photos",5) , chefs.put); 
routes.delete("/admin/chefs", chefs.delete); 

module.exports = routes;