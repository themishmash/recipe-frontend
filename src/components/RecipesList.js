import React from "react";
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from "./RecipesList.module.css";


//this file has two components in it 
//this is implemented as functional react component
//lack state and life cycle method. no component did mount.

const Recipe = props => (  
  <tr>
    <td>{props.recipe.peepname}</td>
    <td>{props.recipe.title}</td>
    <td>{props.recipe.url}</td>
    <td>{props.recipe.date.substring(0, 10)}</td>
    <td>
      <Link to={"/edit/"+props.recipe._id}>edit</Link> | <a href="#" onClick={() => { props.deleteRecipe(props.recipe._id) }}>delete</a>
    </td>
  </tr>
  )



class RecipesList extends React.Component {
  constructor(props) {
    super(props);

    // this.deleteRecipe = this.deleteRecipe.bind(this);

    this.state = {recipes: []};
  }

  componentDidMount() {
    // this.setState({
    //   peeps: ['test peep'],
    //   peepname: 'test peep'
    // }); 
    //the above is COMMENTED OUT as now want to get the current users that have been added and have as drop down box
    console.log('herrerereeee')
    axios.get('http://localhost:5000/recipes/')
      .then(response => {
        this.setState({ recipes: response.data})
      })
      .catch((error) => {
        console.log(error); 
      })
  }

  deleteRecipe = (id) => {
    axios.delete('http://localhost:5000/recipes/'+id)
      .then(response => { console.log(response.data)});
      
    this.setState({
      recipes: this.state.recipes.filter(el => el._id !==id)
    })
  }


  recipeList() { 
    return this.state.recipes.map(currentrecipe => {
      return <Recipe recipe={currentrecipe} deleteRecipe={this.deleteRecipe} key={currentrecipe._id}/>;
    })
  }

  // Recipe = () => {
  //   <div>
  //   <tr>
  //     <td>{this.state.peepname}</td>
  //     <td>{this.state.title}</td>
  //     <td>{this.state.url}</td>
  //     <td>{this.state.date.substring(0, 10)}</td>
  //     <td>
  //       <Link to={"/edit/"+this.state.recipe._id}>edit</Link> | <a href='#' onClick={() => { this.state.deleteRecipe(this.state.recipe._id)}}>delete</a>
  //     </td>
  //   </tr>
  //   </div>
  // }




  render () {
    return (<div className={styles}>
      <div><Navbar /></div>
      <div className={styles.containerlist}>
      <h3 className={styles.h3list}>Current Recipes</h3>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Title</th>
            <th>URL</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          { this.recipeList() }
        </tbody>
      </table>
      </div>
      <div className={styles.imagecontainer}>
      <div className={styles.imagelist}>
      <img src="./cupcake.jpg" alt="cupcake" className={styles.responsive}width="800" height="400"></img>
      </div>
      </div>
    </div>)
  }
}

export default RecipesList