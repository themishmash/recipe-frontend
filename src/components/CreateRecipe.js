import React from "react";
import Navbar from './Navbar';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import styles from './CreateRecipe.module.css';


class CreateRecipe extends React.Component {
  constructor(props) {
    super(props); //need to call super when defining constructor of subclass

    //assign object to this.state. properties of the state that correspond to fields of mongodb document
    //state is how you create variables in react
    //in react nothing like let name = "beau"
    this.state = {
      peepname: '',
      title: '',
      url: '',
      date: new Date(),
      peeps: [] //this is array as on our page there will be drop down menu for users so can select all the users already in database
    }
  }

  //hardcode single user for now - later users will come from mongodb database

  //react life cycle method. React calls this at different points. This will be called before anything displays on the page. right before something loads, this code will load
  componentDidMount() {
    // this.setState({
    //   peeps: ['test peep'],
    //   peepname: 'test peep'
    // }); 
    //the above is COMMENTED OUT as now want to get the current users that have been added and have as drop down box
    axios.get('http://localhost:5000/peeps')
      .then(response => {
        if (response.data.length > 0) {//checking there is at least one user 
          this.setState({
            //.map to only return peepname field
            peeps: response.data.map(peep => peep.peepname),
            peepname: response.data[0].username //username auto set to first user of database
          })
        }
      })
  }

  onHandleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  //methods so can update state properties
  onchangePeepname = (e) => {
    //we won't do this.state.username = "beau"
    this.setState({
      peepname: e.target.value //target is textbox. updates user name in the state
      
    });
  }

  onChangeTitle = (e) => {
    this.setState({
      title: e.target.value
    });
  }

  onChangeUrl = (e) => {
    this.setState({
      url: e.target.value
    });
  }

  onChangeDate = (date) => {
    this.setState({
      date: date
    });
  }

  //handle submit on form
  //can create variables like const if only used within that method
  onSubmit = (e) => { 
    e.preventDefault();
    this.setState(state => ({
      peepname: this.state.peepname,
      title: this.state.description,
      url: this.state.url,
      date: this.state.date
      
    }));
    
    console.log(this.state);

    axios.post('http://localhost:5000/recipes/add', this.state)
      .then(res => {
        this.props.history.push('/'); //goes back to home
        //window.location.reload(false); //page can reload after recipe item added
      })
      .catch((err) => {
        console.log(err)
      })
      
  }


  render () {
    return (<div>
       <div><Navbar /></div>
        <h3 className={styles.h3createrecipe}>Create New Recipe</h3>
        <div className={styles.abovecontainer}>
        <div className={styles.container}>
          <div className={styles.recipecontainer}>
          <form action="/action_page.php">
            <div className="row">
              <div className="col-25">
                <label>Peepname: </label>
              </div>
              <div className="col-75">
                <select ref="peepInput"
                required
                className="peep"
                value={this.state.peepname}
                onChange={this.onchangePeepname}>
                <option value=''></option>
                {
                
                  this.state.peeps.map(peep => {
                    return <option
                    key={peep}
                    value={peep}>{peep}
                    </option>;
                  })
                }
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col-25">
                <label>Title</label>
              </div>
              <div className="col-75">
                <input type="text"
                required
                className="title" 
                name="title" 
                placeholder="Title.."
                value={this.state.title}
                onChange={this.onChangeTitle} 
                />
              </div>
            </div>
            <div className="row">
              <div className="col-25">
                <label>URL</label>
              </div>
              <div className="col-75">
                <input type="text" 
                className="url" 
                name="url" 
                placeholder="URL link.." 
                value={this.state.url}
                onChange={this.onChangeUrl}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-25">
                <label>Date</label>
                <div className={styles.datebox}>
                  <DatePicker
                  selected={this.state.date}
                  onChange={this.onChangeDate}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <button onClick={this.onSubmit} className="submit" >Add recipe</button>
            </div>
            

          </form>
          </div>
          </div>
        </div>
    </div>)
  }
} 


export default CreateRecipe