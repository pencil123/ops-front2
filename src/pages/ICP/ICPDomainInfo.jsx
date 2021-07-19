import React, { Component } from "react";
import DomainInfoDesc from "./components/DomainInfoDesc";
export class ICPDomainInfo extends Component {
  state = {
    ICPDomain: {},
  };
  componentDidMount() {
    this.setState({ ICPDomain: JSON.parse(localStorage.getItem("ICPDomain")) });
  }

  render() {
    return (
      <div>
        <DomainInfoDesc domainInfo={this.state.ICPDomain} />
      </div>
    );
  }
}

export default ICPDomainInfo;
