import React, { Component } from "react";

import TechItem from "./TechItem";

class TechLists extends Component {
  state = {
    newTech: "",
    techs: []
  };

  // Executa  assim que o componente aparece na tela
  componentDidMount() {
    const techs = localStorage.getItem("techs");

    if (techs) {
      this.setState({ techs: JSON.parse(techs) });
    }
  }

  // Executa sempre que houver alterações nas props ou estado
  componentDidUpdate(prevPros, prevState) {
    if (prevState.techs != this.setState.techs) {
      localStorage.setItem("techs", JSON.stringify(this.state.techs));
    }
  }

  // Executa quando o componente deixa de existir
  componentWillMount() {}

  handleInputChange = e => {
    this.setState({ newTech: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    console.log(this.state.newTech);

    const { newTech, techs } = this.state;

    if (newTech == "") return false;

    this.setState({
      techs: [newTech, ...techs],
      newTech: ""
    });
  };

  handleDelete = tech => {
    console.log(tech);
    this.setState({
      techs: this.state.techs.filter(t => t != tech)
    });
  };

  render() {
    const { techs } = this.state;
    return (
      <>
        <ul>
          {techs.map(tech => (
            <TechItem
              key={tech}
              tech={tech}
              onDelete={() => this.handleDelete(tech)}
            />
          ))}
        </ul>

        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            onChange={this.handleInputChange}
            value={this.state.newTech}
          />
          <input type="submit" value="submit" />
        </form>
      </>
    );
  }
}

export default TechLists;
