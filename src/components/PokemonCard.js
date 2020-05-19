import React from 'react'
import { Card } from 'semantic-ui-react'

class PokemonCard extends React.Component {

  state = {
    isFlipped: false
  };

  flipCard = () => {
    this.setState({isFlipped: !this.state.isFlipped});
  }

  render() {

    let hp = "";
    this.props.stats.forEach(stat => {
      if(stat.name === "hp"){
        hp = stat.value;
      }
    });

    let imgSrc = this.state.isFlipped 
                  ? this.props.sprites.back
                  : this.props.sprites.front;

    return (
      <Card>
        <div onClick={this.flipCard}>
          <div className="image">
            <img alt="oh no!" src={imgSrc} />
          </div>
          <div className="content">
            <div className="header">{this.props.name}</div>
          </div>
          <div className="extra content">
            <span>
              <i className="icon heartbeat red" />
              {hp}
            </span>
          </div>
        </div>
      </Card>
    )
  }
}

export default PokemonCard
