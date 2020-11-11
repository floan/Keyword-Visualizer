import React, {Component} from 'react';
import css from '../styles/HomePage.css';
import Dictaphone from '../Components/Dictaphone.jsx';

class HomePage extends Component {
  constructor(props){
  	super(props);
  	this.state = {
  	};
  }

  render(){
  	return (
	    <div className="wrapper">
	    	<h1>WELCOME!</h1>
		    <Dictaphone />
	    </div>
	)
  }
}

export default HomePage;






//If we want to give the user an option to enter a custom code

// handleInputChange = (event) => {
//   	this.setState({
//   		value: event.target.value, 
//   	});
// }

// <span> Please enter a unique class code or leave empty to auto generate one </span>
// <input type="text" name="classId" value={this.state.value} onChange={this.handleInputChange.bind(this)} />