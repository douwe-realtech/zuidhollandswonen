import React, { Component } from 'react';
import ReactPixel from 'react-facebook-pixel'
import axios from 'axios'
import './App.css';

class OpenDag extends Component {
	constructor(props) {
		super(props);
		this.state = {
			state: 0,
		}
		this.handleInputChange = this.handleInputChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	handleInputChange(e) {
		const target = e.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.id;
		this.setState({
			[name]: value
		})

	}

	onSubmit(e) {
		e.preventDefault();
		ReactPixel.track('SubmitApplication') 
		var self = this;
		self.setState({
			state: 1
		})

		const {partner, state, ...data} = this.state
		console.log(data)
		axios.post('opendag/send', data)
			.then(function(res) {
				self.setState({
					state: 2
				})
				console.log(res)
			})
			.catch(function(err) {
				self.setState({
					state: 3
				})
				console.log(err)
			})
	}

	render () {
		let body;
		switch(this.state.state) {
			case 0:
				body = <form onSubmit={this.onSubmit}>
						<div className="center">
						<h2>Startverkoop</h2>
						<p><strong>Donderdag 1 November <br/>
						van 18.30 uur tot 20.00 uur</strong><br/></p>
						<p className="adres">Lammertink Groep<br/>  
						Schietlood 2<br/>
						2495 AN Den Haag</p>
						</div>
						<div className="form-item">
							<label>Naam</label>
							<input id="FNAME" onChange={this.handleInputChange}/>
						</div>
						<div className="form-item">
							<label>Email</label>
							<input id="EMAIL" onChange={this.handleInputChange}/>
						</div>
						<button className="button inverted">MELD MIJ AAN</button>
					</form>
				break;
			case 1:
				body = <div className="content center">
				<h1>Bezig met versturen</h1>
				</div>
				break;
			case 2:
				body = <div className="content center">
				<h1>Inschrijving geslaagd</h1>
				</div>
				break;
			case 3:
				body = <div className="content center">
				<h1>Inschrijving mislukt</h1>
				<p>Onze excuses, probeer het later nogmaals altublieft.</p>
				</div>
				break;
			}
		return (
			<div id="opendag-container">
				<div id="form">
					{body}
				</div>
				<div id='text'>
					<h1>Sir Winston Churchilllaan</h1>
					<p>De twee-onder-een kapwoningen liggen op fraaie percelen van 358 tot 410 m2 eigen grond. Alle woningen hebben een woonoppervlakte van maar liefst ca. 149 m2. Via de entree en de hal komt u in de woonkamer waar de diverse prachtige raampartijen zorgen voor een goede lichtinval. De keuken en de afzonderlijke berging maken de begane grond compleet. De 1e etage heeft 3 slaapkamers, goede badkamer en de mogelijkheid voor het creëren van een 2e badkamer of walk in closet.</p>
				</div>
			</div>
		)
	}
}

export default OpenDag