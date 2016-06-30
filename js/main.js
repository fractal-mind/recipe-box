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
      recipes.splice(0, 0, {key: currentKey, name: "New Recipe", ingredients: [], expand: false});
      update();
    }
    return (
       <i className="addButton material-icons" onClick={() => {addCard()}}>add_circle_outline</i>
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

function update(){
  localStorage.setItem("recipeBox", JSON.stringify(recipes));
  ReactDOM.render(<Layout />, target);
}
update()
