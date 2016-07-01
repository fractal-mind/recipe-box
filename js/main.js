require('../css/master.sass');

import React from 'react';
import ReactDOM from 'react-dom';

const target = document.getElementById('root');

let recipes = (typeof localStorage["recipeBox"] != "undefined") ?
  JSON.parse(localStorage["recipeBox"]) :
  [{key: 0, name: "French Toast", ingredients: ["Bread", "Eggs", "Milk"], expand: false},
   {key: 1, name: "PB&J", ingredients: ["Bread", "Peanut Butter", "Jelly"], expand: false}
  ]
let currentKey = (recipes.length - 1);

class Layout extends React.Component {
  render(){
    return(
      <div >
      <Header />
      <RecipeList />
      </div>
    )
  }
}

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <p className="headerOne">Recipe</p>
        <p className="headerTwo">Box.</p>
        <AddButton />
      </div>
    )
  }
}

class AddButton extends React.Component {
  render() {
    let addCard = () => {
      currentKey++;
      recipes.splice(0, 0, {key: currentKey, name: "New Recipe", ingredients: ["Add some Ingredients!"], expand: false});
      update();
    }
    return (
       <i className="addButton material-icons" onClick={() => {addCard()}}>add_circle_outline</i>
    )
  }
}

class EditButton extends React.Component {
  render(){
    return(
      <i className="editButton material-icons">list</i>
    )
  }
}

class DeleteButton extends React.Component {
  render(){
    return(
      <i className="deleteButton material-icons">delete</i>
    )
  }
}

class RecipeList extends React.Component {
    render(){
    return (
      <div className="recipeList">
      { recipes.map(recipe => <Recipe key={recipe.key} name={recipe.name} ingredients={recipe.ingredients} expand={recipe.expand} index={recipes.indexOf(recipe)} />) }
      </div>
    )
  }
}

class Recipe extends React.Component {

  render(){
  //Handles toggling of card size
    let expandCard = () => {
      if (recipes[this.props.index].expand === true) {
        recipes[this.props.index].expand = false;
        console.log("Collapsed");
        update();
      }
      else {
        recipes[this.props.index].expand = true
        console.log("Expanded");
        update();
      }
    }


    if (this.props.expand === true) {
      return (
        <div className="recipe recipeExpand" onClick={() => {expandCard()}} >
          <p className="recipeName">{this.props.name}</p>
        <IngredientList list={this.props.ingredients}/>
      <EditButton />
      <DeleteButton />
        </div>
      )
    }
    else {
      return(
      <div className="recipe" onClick={() => {expandCard()}} >
        <p className="recipeName">{this.props.name}</p>
      </div>
    )}

  }
}

class IngredientList extends React.Component {
  render(){

    return(
      <div>
      <p className="ingredientHeading">Ingredients</p>
      <ul className="ingredientList">
        { this.props.list.map( item => <Ingredient item={item} key={(this.props.list.indexOf(item))}/> ) }
      </ul>
      </div>
    )
  }
}

class Ingredient extends React.Component {
  render(){
    console.log("Rendering " + this.props.item)
    return(
      <li className="ingredient">{this.props.item}</li>
    )
  }
}

function update(){
  localStorage.setItem("recipeBox", JSON.stringify(recipes));
  ReactDOM.render(<Layout />, target);
}
update()
