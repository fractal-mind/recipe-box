require('../css/master.sass');

import React from 'react';
import ReactDOM from 'react-dom';

const target = document.getElementById('root');

let recipes = (typeof localStorage["recipeBox"] != "undefined") ?
  JSON.parse(localStorage["recipeBox"]) :
  [{key: 0, name: "French Toast", ingredients: ["Bread", "Eggs", "Milk"]},
   {key: 1, name: "PB&J", ingredients: ["Bread", "Peanut Butter", "Jelly"]}
  ]

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
    return (
       <i className="addButton material-icons" onClick={() => {console.log("clicked")}}>add_circle_outline</i>
    )
  }
}

class RecipeList extends React.Component {

  render(){
    return (
      <div className="recipeList">
      { recipes.map(recipe => <Recipe key={recipe.key} name={recipe.name} ingredients={recipe.ingredients} />) }
      </div>
    )
  }
}

class Recipe extends React.Component {
  render(){
    return(
      <div className="recipe">
        <p className="recipeName">{this.props.name}</p>
      </div>
    )

  }
}

function update(){
  localStorage.setItem("recipeBox", JSON.stringify(recipes));
}
update()

ReactDOM.render(<Layout />, target);
