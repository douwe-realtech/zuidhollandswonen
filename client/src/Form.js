import React, { Component} from 'react';
import PropTypes from 'prop-types'

// Bouwnummervoorkeur

// Postcode
// Adres
// Woonplaats

// Bruto jaarsalaris
// Eigen geld

// Bent u de enige koper?

const gebruiker = [
	{
		type: 'text',
		id: 'voornaam',
		label: 'Voornaam',
		errortext: 'Geef een voornaam op',
		required: true,
	}, 	{
		type: 'text',
		id: 'achternaam',
		label: 'Achternaam',
		errortext: 'Geef een achternaam op',
		required: true,
	}, 	{
		type: 'date',
		id: 'geboortedatum',
		label: 'Geboortedatum',
		errortext: 'Geef een geboortedatum op',
		required: true,
	}, {
		type: 'email',
		id: 'email',
		label: 'Emailadres',
		errortext: 'Geef een emailadres op',
		required: true,
	}, {
		type: 'number',
		id: 'telefoon',
		label: 'Telefoonnummer',
		placeholder: '0612345678',
		errortext: 'Geef een 10 cijferig telefoonnummer op',
		required: true,
	},  {
		type: 'text',
		id: 'adres',
		label: 'Straatnaam en huisnummer',
		errortext: 'Geef een adres op',
		required: true,
	},	{
		type: 'text',
		id: 'postcode',
		label: 'Postcode',
		placeholder: '1234AB',
		// pattern: '/^[1-9][0-9]{3}[\s]?[A-Za-z]{2}$/i',
		errortext: 'Geef een geldige postcode op',
		required: true,
	}, 	{
		type: 'text',
		id: 'woonplaats',
		label: 'Woonplaats',
		errortext: 'Geef een woonplaats op',
		required: true,
	},	{
		type: 'number',
		id: 'salaris',
		label: 'Bruto jaarsalaris',
		errortext: 'Geef uw salaris op',
		required: true,
	},	{
		type: 'number',
		id: 'eigengeld',
		label: 'Eigen geld',
		errortext: 'Geef uw eigengeld op',
		required: true,
	}
]

const overig = [
	{
		type: 'select',
		id: 'bouwnummer',
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
		attrs.id += (this.props.isPartner ? '-partner' : '')

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
			partner: false
		}
		this.handleInputChange = this.handleInputChange.bind(this)
	}

	handleInputChange(e) {
		const target = e.target;
		console.log(target.value)
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.id;
		this.setState({
			[name]: value
		})

	}

	render() {
		let partnerForm = this.state.partner ? 
			<Fieldset 
				fields={gebruiker} 
				change={this.handleInputChange} 
				title="Uw Partner"
				isPartner={true}
				state={this.state}/> : ''
		return (
			<form id="inschrijf-formulier" className="section">
				<div className="content center">
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
				</div>
				<button className="button">Inschrijven</button>
			</form>
		)
	}
}

export default Form;