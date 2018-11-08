import React, { Component } from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll'
import brochure from './brochure.pdf'
import Form from './Form'
import './App.css';

class Nav extends Component {
  render() {
    return (
      <nav>
        <h2>Zuidhollands Wonen</h2>
        <div className="menu-toggle">
          <input type="checkbox" />
          <span></span>
          <span></span>
          <span></span>

          <div className="menu">
            <AnchorLink href="#hero">Home</AnchorLink>
            <AnchorLink href="#ligging">Project</AnchorLink>
            <AnchorLink href="#woningen">Woningen</AnchorLink>
            <AnchorLink href="#inschrijf-formulier">Inschrijven</AnchorLink>
            <AnchorLink href="#contact">Contact</AnchorLink>
          </div>
        </div>
      </nav>
    )
  }
}

class Sub extends Component {
  render() {
    return (
      <div id={this.props.id} className="sub">
        <div id={"pic-sub-" + this.props.id} className="picture"></div>
              <div className="content center">
                  <h3>{this.props.title}</h3>
            <p>{this.props.text}</p>
              </div>
      </div>
    )
  }
}


class Section extends Component {
  render() {
    let subs = [];
    let button;
    if (this.props.subs && this.props.subs.length > 0) {
      this.props.subs.forEach (function(el, i) {
        subs.push(<Sub 
          id    = {i} 
          key = {i}
          title   = {el[0]}
          text  = {el[1]} 
          />
        )
      });
    }

    if (this.props.button) {
      button = <a className="button" href={brochure} target="_blank" rel="noopener noreferrer">{this.props.button}</a>
    }

    return (
      <div id={this.props.id} className="section">
        <div className="content center">
          <h1>{this.props.title}</h1>
          <p dangerouslySetInnerHTML={{__html: this.props.text}}></p>
        </div>
        <div id={'pic-' + this.props.id} className="picture"></div>
        {button}
        {subs}
      </div>
    )
  }
}


class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
          

        <div className="container">
          <div id="hero">
            <AnchorLink className="button inverted hero" href="#inschrijf-formulier">Inschrijven</AnchorLink>
          </div>

          <Section 
            id    = "introductie"
            title = "Sir Winston Churchilllaan"
            text  = "De Sir Winston Churchilllaan in Rijswijk is één van de oost-west verbindingen tussen Wateringen en Oud-Rijswijk. Het perceel Sir Winston Churchilllaan 1013, het kavel waarop Lammertink projectontwikkeling vier woningen van het type twee-onder-een-kap realiseert, ligt aan de westzijde en aan de rand van de woonwijk Eikelenburg. De groei van Rijswijk is langs de Sir Winston Churchilllaan goed herkenbaar, van Oud Rijswijk in het oosten, naar de Plaspoelpolder en het moderne centrum in het midden, tot Eikelenburg in het westen. De diversiteit van de bebouwing langs de Sir Winston Churchilllaan is groot."
          />

          <Section 
            id    = "ligging"
            title = "Het Project"
            text  = "De oriëntatie van de woonwijken is aan de westzijde voornamelijk met de rug naar de Sir Winston Churchilllaan en in het oosten meer met voorkant georiënteerd op de Sir Winston Churchilllaan. Tussen de projectmatige ontwikkelingen die aan de Sir Winston Churchilllaan grenzen, is het oorspronkelijke lint van de Sir Winston Churchilllaan nabij nummer 1013 herkenbaar door een aantal vrijstaande woningen. Op het onderhavige perceel stond oorspronkelijk ook een vrijstaande woning, doch ten behoeve van de herontwikkeling van het woonperceel naar in totaal vijf woningen, is de bestaande woning gesloopt. Op het terrein is ten tijde van de start van de ontwikkeling en voor de bouw van de tweekappers, inmiddels één woning gerealiseerd."
            subs  = {[
              ["Bestemmingsplan",
              "De westelijke zijde van het perceel grenst aan het fietspad, een belangrijke langzaam-verkeersentree naar Eikelenburg.Het bestemmingsplan is het publiekrechtelijk kader waaraan bouwplannen moeten voldoen. In het bestemmingsplan zijn de regels vastgelegd waaraan voldaan moet worden voor wat betreft bouwhoogte, het bebouwingspercentage of bouwvlak, de afstand tot de erfgrenzen, de erfafscheidingen en dergelijke. "],
              ["Eigen entiteit",
              "De Sir Winston Churchilllaan valt binnen het bestemmingsplan Eikelenburg. De drie woongebouwen ter plaatse van de Sir Winston Churchilllaan 1013 vormen een eigen entiteit en een compositie die zich naar haar omgeving voegt. "],
              ["Ontsluiting",
              "De ontsluiting van de percelen vanaf de Sir Winston Churchilllaan ligt centraal, is 5,5 meter breed en voert naar het midden van het achterste perceel, hierdoor wordt het idee van een hofje gecreëerd. De toegangsweg vormt een zogenaamde mandeligheid, dat wil zeggen dat de toegangsweg het eigendom blijft van de bewoners."],
            ]}
          />

          <Section
            id    = "woningen"
            title   = "woningen"
            text  = "Iedere woning wordt voorzien van parkeerplaatsen op eigen terrein, die toegankelijk zijn vanaf de eerder genoemde centrale ontsluitingsweg. Gezien de ligging van de kavels ten opzichte van de Sir Winston Churchilllaan en het fietspad van Eikelenburg, is het van belang dat de overgang van openbaar naar privé zoveel mogelijk landschappelijk wordt ingepast. Het gaat hier bijvoorbeeld om het toepassen van groene hagen als erfafscheidingen. De erfafscheiding kan achter de uitbouw van de woning naast het fietspad oplopen tot 2 meter hoog. De inrichting en de ontsluiting van de percelen, zoals in deze brochure op het inrichtingsplan  is weergegeven, zijn daarom een belangrijk onderdeel van het ontwerp en verdienen de goedkeuring van de Gemeente Rijswijk." 
            button = "Download Brochure"
            />

          <Form />

          <Section 
            id    = "contact"
            title = "contact"
            text  = "Heeft u interesse in deze locatie of verdere vragen?<br> <br>

              <a href='mailto:info@zuidhollandswonen.nl'>info@zuidhollandswonen.nl</a> <br> <br>"
          />

        </div>
      </div>
    );
  }
}

export default App;