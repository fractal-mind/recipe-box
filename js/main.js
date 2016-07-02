require('../css/master.sass');

import React from 'react';
import ReactDOM from 'react-dom';

const target = document.getElementById('root');

let recipes = (typeof localStorage["recipeBox"] != "undefined") ?
  JSON.parse(localStorage["recipeBox"]) :
  [{key: 0, name: "French Toast", ingredients: ["Bread", "Eggs", "Milk"], expand: false, edit: false},
   {key: 1, name: "Beef Stew", ingredients: ["Cubed Stew Meat", "Carrots", "Celery", "Potatoes", "Beef Stock", "Worcestershire Sauce", "Bay Leaf"], expand: false, edit: false}
  ]
let currentKey = (recipes.length - 1);


class Layout extends React.Component {
  render(){
    return(
      <div>
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


//Buttons define a function, and then simply call that function on click, using props to understand on what data the operation should be performed.


class AddButton extends React.Component {
  render() {
    let addCard = () => {
      currentKey++;
      recipes.splice(0, 0, {key: currentKey, name: "New Recipe", ingredients: ["Add some Ingredients", "separated by commas", "to build your list!"], expand: true, edit: true});
      update();
    }
    return (
       <i className="addButton material-icons" onClick={() => {addCard()}}>add_circle_outline</i>
    )
  }
}

class EditButton extends React.Component {
  render(){
    let editCard = () => {
      recipes[this.props.index].edit = true;
      update();
    }
    return(
      <i className="editButton material-icons" onClick={() => editCard()}>list</i>
    )
  }
}

class SaveButton extends React.Component {
  render(){
    let saveCard = () => {
      recipes[this.props.index].edit = false;
      recipes[this.props.index].name = this.props.nameState;
      recipes[this.props.index].ingredients = this.props.ingredientState;
      update();
    }
    return (
      <i className="saveButton material-icons" onClick={() => saveCard()}>save</i>
    )
  }
}

class DeleteButton extends React.Component {
  render(){
    let deleteCard = () => {
      recipes.splice(this.props.index, 1);
      update();
    }
    return(
      <i className="deleteButton material-icons" onClick={() => deleteCard()}>delete</i>
    )
  }
}

class RecipeList extends React.Component {
    render(){
    return (
      <div className="recipeList">
      { recipes.map(recipe => <Recipe key={recipe.key} name={recipe.name} ingredients={recipe.ingredients} expand={recipe.expand} index={recipes.indexOf(recipe)} edit={recipe.edit}/>) }
      </div>
    )
  }
}

class Recipe extends React.Component {
//This is where we define all the behavior for the recipe cards.
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

//here we determine which kind of card we should return.
    if (this.props.expand === true) {
      if (this.props.edit === true) {
        return (
          <EditCard key={this.props.key} name={this.props.name} ingredients={this.props.ingredients} expand={this.props.expand} index={this.props.index} toggle={expandCard} />
        )
      } else {
          return (
            <ExpandedCard key={this.props.key} name={this.props.name} ingredients={this.props.ingredients} expand={this.props.expand} index={this.props.index} toggle={expandCard} />
          ) }
    }
    else {
      return(
        <CollapsedCard key={this.props.key} name={this.props.name} ingredients={this.props.ingredients} expand={this.props.expand} index={this.props.index} toggle={expandCard} />
      )}

  }
}

class ExpandedCard extends React.Component {
  render(){
    return(
      <div className="recipe recipeExpand">
        <div className="expandedRecipeHeader" onClick={() => this.props.toggle()}>
          <p className="recipeName recipeNameExpanded">{this.props.name} </p>
        </div>
        <IngredientList list={this.props.ingredients}/>
        <EditButton index={this.props.index}/>
        <DeleteButton index={this.props.index}/>
      </div>
    )
  }
}

class CollapsedCard extends React.Component {
  render(){
    return(
      <div className="recipe" onClick={() => this.props.toggle()}>
        <p className="recipeName">{this.props.name}</p>
      </div>
    )
  }
}

class EditCard extends React.Component {

  constructor(props, context){
    super(props, context);

    //binding 'this' in constructor so we don't need to remember to bind it to individual props
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleIngredientChange = this.handleIngredientChange.bind(this);

    this.state = {
      nameValue: this.props.name,
      ingredientValue: this.props.ingredients.join(", ")
    }

  };

  handleNameChange() {
    this.setState({
      nameValue: document.getElementById("nameEdit").value
    });
  };
  handleIngredientChange() {
    this.setState({
      ingredientValue: document.getElementById("ingredientsEdit").value
    });
  };


  render(){
    return (
      <div className="recipe recipeExpand">
        <div className="expandedRecipeHeaderEdit">
          <input className="recipeName recipeNameEdit" type="text" id="nameEdit" defaultValue={this.state.nameValue} onChange={this.handleNameChange}/>
        </div>
        <p className="ingredientHeading">Ingredients</p>
        <textarea className="ingredientListEdit" id="ingredientsEdit" defaultValue={this.state.ingredientValue} onChange={this.handleIngredientChange}></textarea>
        <SaveButton index={this.props.index} nameState={this.state.nameValue} ingredientState={this.state.ingredientValue.split(", ")}/>
        <DeleteButton index={this.props.index}/>
      </div>
    )
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
