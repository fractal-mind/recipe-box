import React from 'react';
import ReactDOM from 'react-dom';

const target = document.getElementById('root');

let recipes = (typeof localStorage["recipeBox"] != "undefined") ?
  JSON.parse(localStorage["recipeBox"]) :
  [{name: "French Toast", ingredients: ["Bread", "Eggs", "Milk"]},
   {name: "PB&J", ingredients: ["Bread", "Peanut Butter", "Jelly"]}
  ]

class Layout extends React.Component {
  render(){
    return(
      <h1>Hello World</h1>
    )
  }
}

function update(){
  localStorage.setItem("recipeBox", JSON.stringify(recipes));
}
update()

ReactDOM.render(<Layout />, target);
