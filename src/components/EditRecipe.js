import React from "react";
import Navbar from './Navbar';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class EditRecipe extends React.Component {
  constructor(props) {
    super(props); 

    this.state = {
      peepname: '',
      title: '',
      url: '',
      date: new Date(),
      peeps: [] 
    }
  }

  
  componentDidMount() {
    //need another axios for username to link to recipe we edit
    axios.get('http://localhost:5000/recipes/' +this.props.match.params.id)
      .then(response => {
        this.setState({
          peepname: response.data.peepname,
          title: response.data.title,
          url: response.data.url,
          date: new Date(response.data.date)
        })
      })
      .catch(function(error) {
        console.log(error);
      })
    
    //not set username - so remove that. this is because we set username from recipe we are editing
    axios.get('http://localhost:5000/peeps/')
      .then(response => {
        if (response.data.length > 0) { 
          this.setState({
            //.map to only return peepname field
            peeps: response.data.map(peep => peep.peepname),
           
          })
        }
      })
      .catch((error)=> {
        console.log(error);
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

    axios.put('http://localhost:5000/recipes/update/' + this.props.match.params.id, this.state)
      .then(res => console.log(res.data));
  
    window.location = '/' //taking person back to home page - the list of exercises
    //console.log("hello")

  }


  render () {
    return (<div>
       <div><Navbar /></div>
        <h3>Edit Recipe</h3>
        <div className="container">
          <form action="/action_page.php">
            <div className="row">
              <div className="col-25">
                <label>{this.state.peepname}</label>
              </div>
              <div className="col-75">
                <select ref="peepInput"
                required
                className="peep"
                value={this.state.peepname}
                onChange={this.onchangePeepname}>
                {
                  this.state.peeps.map(function(peep) {
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
                <div>
                  <DatePicker
                  selected={this.state.date}
                  onChange={this.onChangeDate}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <button onClick={this.onSubmit} className="submit" >Edit recipe</button>
            </div>

          </form>
        </div>
    </div>)
  }
} 



export default EditRecipe