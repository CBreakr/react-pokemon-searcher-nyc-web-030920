import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import Search from './Search'
import { Container } from 'semantic-ui-react'

import * as requests from "../requests";

class PokemonPage extends React.Component {

  state = {
    pokemon: [],
    filter: ""
  }

  componentDidMount(){
    this.fetchAndRenderAllPokemon();
  }

  fetchAndRenderAllPokemon(){
    requests.getAllPokemon()
    .then(data => {
      console.log("pokemon", data);
      this.setState({pokemon: data});
    });
  }

  runFilter = (event) => {
    this.setState({filter:event.target.value});
  }

  addPokemon = (event) => {
    const pokemon = this.createPokemonFromForm(event.target);
    console.log("pokemon", pokemon);
    
    requests.addNewPokemon(pokemon)
    .then(data => {
      this.fetchAndRenderAllPokemon();
    });
  }

  createPokemonFromForm(form){
    const pokemon = {
      name: form.name.value,
      sprites: {
        front: form.frontUrl.value,
        back: form.backUrl.value
      },
      stats: [
        {
          name: "hp",
          value: form.hp.value
        }
      ]
    };

    console.log(pokemon);

    form.reset();

    return pokemon;
  }

  render() {

    const filteredPokemon = this.state.pokemon.filter(pokemon => {
      // return pokemon.name.includes(this.state.filter)
      return true;
    });

    return (
      <Container>
        <h1>Pokemon Searcher</h1>
        <br />
        <PokemonForm addPokemon={this.addPokemon} />
        <br />
        <Search runFilter={this.runFilter} />
        <br />
        <PokemonCollection pokemon={filteredPokemon} />
      </Container>
    )
  }
}

export default PokemonPage
