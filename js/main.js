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
      <RecipeList />
    )
  }
}

class RecipeList extends React.Component {

  render(){
    console.log(recipes[0].index);
    return (
      <div>
      { recipes.map(recipe => <Recipe key={recipe.key} name={recipe.name} ingredients={recipe.ingredients} />) }
      </div>
    )
  }
}

class Recipe extends React.Component {
  render(){
    console.log(this.props.key)
    return(
      <div>
        <h1>{this.props.name} {this.props.key}</h1>
      </div>
    )

  }
}

function update(){
  localStorage.setItem("recipeBox", JSON.stringify(recipes));
}
update()

ReactDOM.render(<Layout />, target);
