const express = require('express')
const routes = express.Router()

const recipes = require('../app/controllers/privateRecipes')
const chefs = require('../app/controllers/chefs')
const publicRecipes = require('../app/controllers/publicRecipes')

routes.get("/admin/recipes", recipes.index); // Mostrar a lista de receitas
routes.get("/admin/recipes/create", recipes.create); // Mostrar formulário de nova receita
routes.get("/admin/recipes/:id", recipes.show); // Exibir detalhes de uma receita
routes.get("/admin/recipes/:id/edit", recipes.edit); // Mostrar formulário de edição de receita
routes.post("/admin/recipes", recipes.post); // Cadastrar nova receita
routes.put("/admin/recipes", recipes.put); // Editar uma receita
routes.delete("/admin/recipes", recipes.delete); // Deletar uma receita

routes.get("/admin/chefs/createchef", chefs.create);
routes.post("/admin/chefs", chefs.post);

routes.get('/',function(req,res){return res.redirect("/recipes")})
routes.get('/recipes', publicRecipes.index);
routes.get('/about', publicRecipes.about);
routes.get('/recipes-list', publicRecipes.recipes);

module.exports = routes;