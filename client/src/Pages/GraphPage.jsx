import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import PieChart from '../Components/PieChart.jsx';
import css from '../styles/GraphPage.css';
import handleRequestFunction from '../Components/handleRequestFunction.js'; //Function that communicates with API


class GraphPage extends Component {
  constructor(props){
  	super(props);
    if(this.props.location == null || this.props.location.state.data == null){
      this.state = {
        hasData: false, 
        data: null, 
        id: null,
        res: ''
      }
    }
    else{
    	this.state = {
        hasData: true, 
        data: this.props.location.state.data, //Data is a list of tupples
        id: this.props.location.state.id,  //ID number that we are supposed to use
    	};
    }
  }

  handleInputChange = (event) => {
    this.setState({
     id: event.target.value, 
   });
  }

  render(){
    const display = (this.state.hasData) ? 
    <div className='wrapper-gp'>
      <h1> Top 20 Keywords! </h1>
      <PieChart data={this.state.data} id={this.state.id}/>
    </div>
    : 
    <div className='wrapper-find-gp'>
      <h1> Please enter an ID Number! </h1>
      <input className='ipt-gp' type='text' name='id' value={this.state.id} onChange={this.handleInputChange.bind(this)} />
      <button className='btn' onClick={
        async () => {
          if(this.state.id == null || this.state.id == ''){ //If id is empty 
            //Do nothing, wait for the user to input some data
          }
          else{ // Display the data of the new transcript
            let response; 
            try{
              response = await handleRequestFunction(this.state.id);
              this.setState({
                hasData: true, 
                data: response.data, 
                res: ''
              })
            }
            catch{
              this.setState({
                res: 'You did not enter a valid ID',
              })
            }
          }
        }
      }>Find my Keywords!</button>
    </div>


  	return (
	    <div>
        {display}
        <h1 className='error'>{this.state.res}</h1>
	    </div>
	  )
  }
}

export default withRouter(GraphPage);