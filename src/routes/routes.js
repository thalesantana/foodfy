const express = require('express')
const routes = express.Router()

const recipes = require('../app/controllers/privateRecipesController')
const chefs = require('../app/controllers/chefsController')
const publicRecipes = require('../app/controllers/publicRecipesController')

// PUBLIC ROUTES
routes.get('/',function(req,res){return res.redirect("/index")})
routes.get('/index', publicRecipes.index);
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
routes.post("/admin/recipes", recipes.post); // Cadastrar nova receita
routes.put("/admin/recipes", recipes.put); // Editar uma receita
routes.delete("/admin/recipes", recipes.delete); // Deletar uma receita
//CHEFS
routes.get("/admin/chefs", chefs.index);
routes.get("/admin/chefs/createchef", chefs.create);
routes.post("/admin/chefs", chefs.post);
routes.get("/admin/chefs/:id", chefs.show);
routes.get("/admin/chefs/:id/edit", chefs.edit);
routes.put("/admin/chefs", chefs.put); 
routes.delete("/admin/chefs", chefs.delete); 

module.exports = routes;