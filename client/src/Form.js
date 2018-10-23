import React, { Component} from 'react';
import ReactPixel from 'react-facebook-pixel'
import axios from 'axios'
import PropTypes from 'prop-types'

const options = {
    autoConfig: true,   // set pixel's autoConfig
    debug: true,     // enable logs
};

ReactPixel.init('2159723064348101', {}, options);
ReactPixel.pageView();
ReactPixel.fbq('track', 'PageView');

const gebruiker = [
	{
		type: 'text',
		id: 'FNAME',
		label: 'Voornaam',
		errortext: 'Geef een voornaam op',
		required: true,
	}, 	{
		type: 'text',
		id: 'LNAME',
		label: 'Achternaam',
		errortext: 'Geef een achternaam op',
		required: true,
	}, 	{
		type: 'text',
		id: 'BIRTH',
		label: 'Geboortedatum',
		placeholder: 'DD-MM-JJJJ',
		errortext: 'Geef een geboortedatum op',
		required: true,
	}, {
		type: 'email',
		id: 'EMAIL',
		label: 'Emailadres',
		errortext: 'Geef een emailadres op',
		required: true,
	}, {
		type: 'number',
		id: 'PHONE',
		label: 'Telefoonnummer',
		placeholder: '0612345678',
		errortext: 'Geef een 10 cijferig telefoonnummer op',
		required: true,
	},  {
		type: 'text',
		id: 'ADDRESS',
		label: 'Straatnaam en huisnummer',
		errortext: 'Geef een adres op',
		required: true,
	},	{
		type: 'text',
		id: 'POSTAL',
		label: 'Postcode',
		placeholder: '1234AB',
		// pattern: '/^[1-9][0-9]{3}[\s]?[A-Za-z]{2}$/i',
		errortext: 'Geef een geldige postcode op',
		required: true,
	}, 	{
		type: 'text',
		id: 'CITY',
		label: 'Woonplaats',
		errortext: 'Geef een woonplaats op',
		required: true,
	},	{
		type: 'number',
		id: 'SALARY',
		label: 'Bruto jaarsalaris',
		errortext: 'Geef uw salaris op',
		required: true,
	},	{
		type: 'number',
		id: 'MONEY',
		label: 'Eigen geld',
		errortext: 'Geef uw eigengeld op',
		required: true,
	}
]

const overig = [
	{
		type: 'select',
		id: 'BNUMBER',
		label: 'Bouwnummervoorkeur',
		errortext: 'Geef een bouwnummer op',
		required: true,
		options: [1, 2, 3, 4]
	}, 	{
		type: 'checkbox',
		id: 'partner',
		label: 'Ik wil graag mijn partner opgeven',
	}
]

class Fieldset extends Component {
	constructor (props) {
		super(props);
		this.state = {fieldset: []};
		this.formFields = [];
	}

	static propTypes = {
		fields: PropTypes.array.isRequired,
		title: PropTypes.string,
		isPartner: PropTypes.bool
	};

	static defaultProps = {
		fields: [],
		title: '',
		isPartner: false
	}

	componentDidMount () {
		this.setState({fieldset: this.renderForm()});

	}

	mapToFormModel = (props) => {
		let {formFields} = this;
		const {label, options, ...attrs} = props
		const hasError = (props.hasError ? ' has-error' : '');
		attrs.id = (this.props.isPartner ? 'P' : '') + attrs.id

		switch(props.type) {
			case 'text':
				formFields.push(
					<div key={Fieldset.createUniqueKey()} className="form-item">
						<label>{props.label}</label>
						<input {...attrs} 
							onChange={this.props.change} 
							value={this.props.state[attrs.id]}/>
						<div className={`error-text ${hasError}`}>{ props.errortext }</div>
					</div>
				);
				break;
			case 'email':
				formFields.push(
					<div key={Fieldset.createUniqueKey()} className="form-item">
						<label>{props.label}</label>
						<input {...attrs} 
							onChange={this.props.change}
							value={this.props.state[attrs.id]}/>
						<div className={`error-text ${hasError}`}>{ props.errortext }</div>
					</div>
				);
				break;
			case 'number':
				formFields.push(
					<div key={Fieldset.createUniqueKey()} className="form-item">
						<label>{props.label}</label>
						<input {...attrs} 
							onChange={this.props.change}
							value={this.props.state[attrs.id]}/>
						<div className={`error-text ${hasError}`}>{ props.errortext }</div>
					</div>
				);
				break;
			case 'checkbox':
				formFields.push(
					<div key={Fieldset.createUniqueKey()} className="form-item checkbox">
						<input {...attrs} 
							onClick={this.props.change}
							defaultChecked={this.props.state[attrs.id]}/>
						<label>{props.label}</label>
						<div className={`error-text ${hasError}`}>{ props.errortext }</div>
					</div>
				);
				break;
			case 'select':
				formFields.push(
					<div key={Fieldset.createUniqueKey()} className="form-item">
						<label>{props.label}</label>
						<select {...attrs} onChange={this.props.change}>
							{props.options.map(opt => {
									return (<option key={Fieldset.createUniqueKey()}>{opt}</option>)
								})
							}
						</select>
						<div className={`error-text ${hasError}`}>{ props.errortext }</div>
					</div>
				);
				break;
			default:
				break;
		}
	}

	renderForm = () => {
		const {fields} = this.props;
		const {formFields} = this;
		fields.forEach(field => this.mapToFormModel(field));
		return (
			<div>{formFields}</div>
		)
	}

	render () {
		const { fieldset } = this.state;
		return (
			<fieldset>
			<h2>{this.props.title}</h2>
				{this.state.fieldset}
			</fieldset>
		);
	}

	static createUniqueKey () {
	    return Math.round(Math.random() * 100000);
	}
}

class Form extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			state: 0,
			partner: false,
			BNUMBER: 1
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
		ReactPixel.track('submit', this.state ) 
		var self = this;
		self.setState({
			state: 1
		})
		const element = document.getElementById('inschrijf-formulier');

		const {partner, state, ...data} = this.state
		axios.post('/sendform', data)
			.then(function(res) {
				self.setState({
					state: 2
				})
				console.log(res)
				if (element) element.scrollIntoView();
			})
			.catch(function(err) {
				self.setState({
					state: 3
				})
				console.log(err)
				if (element) element.scrollIntoView();
			})
	}

	render() {
		let partnerForm = this.state.partner ? 
			<Fieldset 
				fields={gebruiker} 
				change={this.handleInputChange} 
				title="Uw Partner"
				isPartner={true}
				state={this.state}/> : '';
		let body;
		switch(this.state.state) {
			case 0:
				body = <div className="content center">
				<h1>Inschrijven</h1>
				<Fieldset 
					fields={gebruiker} 
					change={this.handleInputChange} 
					title="Uw Gegevens"
					state={this.state}/>
				<Fieldset 
					fields={overig} 
					change={this.handleInputChange}
					title="Uw Woning"
					state={this.state}/>
				{partnerForm}
				<button className="button">Inschrijven</button>
				</div>
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
			<form id="inschrijf-formulier" className="section" onSubmit={this.onSubmit}>
				{body}
			</form>
		)
	}
}

export default Form;