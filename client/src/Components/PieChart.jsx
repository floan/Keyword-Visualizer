import React, { PureComponent } from 'react'
import Chart from 'chart.js';
import Schemes from 'chartjs-plugin-colorschemes';
import classes from '../styles/PieChart.module.css';
let myChart; 

export default class PieChart extends PureComponent {
	constructor(props){
		super(props);
		this.state = {
			dataDictionary: this.props.data, //List of tupples
			id: this.props.id,
			isBar: true
		}
	}

    chartRef = React.createRef();

    buildChart = () => {
    	let data = []; 
    	let labels = [];
		let sum = 0;

		this.state.dataDictionary.forEach((i)=>{
			labels.push(i[0]);
			data.push(i[1]);
		})

        const myChartRef = this.chartRef.current.getContext("2d");

        const barChart = {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                    	label: '',
                        data: data,
                        backgroundColor: (data.length > 10) ? Chart['colorschemes'].tableau.HueCircle19 : Chart['colorschemes'].brewer.Spectral11 ,
                    }
                ]
            },
            options: {
            	scales: {
			        yAxes: [{
			            ticks: {
			                beginAtZero: true, 
			                stepSize: 1
			            }
			        }]
			    }
            }
        }

        const pieChart = {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [
                    {
                        data: data,
                        backgroundColor: (data.length > 10) ? Chart['colorschemes'].tableau.HueCircle19 : Chart['colorschemes'].brewer.Spectral11 ,
                    }
                ]
            },
            options: {
            // plugins: {
            // 	colorschemes: {
            // 		scheme: (data.length > 10) ? 'tableau.HueCircle19' : 'brewer.Spectral11'
            // 	}
            // }
            }
        }
        if (typeof myChart !== "undefined") myChart.destroy();
        myChart = new Chart(myChartRef, (this.state.isBar) ? barChart : pieChart);
    }
    
    componentDidMount() {
    	this.buildChart(); 
    }

    componentDidUpdate(){
    	this.buildChart();
    }


    render() {
        return (
        	<div> 
	        	<button className={classes.graphButton} onClick={() => {if(this.state.isBar != true) this.setState({isBar: true})}}>Bar Chart</button>
	      		<button className={classes.graphButton} onClick={() => {if(this.state.isBar == true) this.setState({isBar: false})}}>Pie Chart</button> <br />
	      		<span>Your ID Number is: {this.state.id}</span> 
	            <div className={classes.graphContainer}>
	                <canvas
	                    id="myChart"
	                    ref={this.chartRef}
	                />
	            </div>
            </div>
        )
    }
}