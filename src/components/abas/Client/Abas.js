import React, { Component } from 'react';
import GoogleMap from './googleMap';
import Historico from './Historico';
import Details from './Details';
import Acerto from './Acerto';

const tabData = [
  { name: 'Acerto', isActive: true },
  { name: 'Detalhes', isActive: false },
  { name: 'Mapa', isActive: false },
  { name: 'Histórico', isActive: false }
];
class Tabs extends Component {
  render() {
    return (
      <div className="nav nav-tabs" className="tabs">
        {tabData.map((tab) => {
          return (
            <Tab key={tab.name} data={tab} client={this.props.client} isActive={this.props.activeTab === tab} handleClick={this.props.changeTab.bind(this, tab)} />
          );
        })}      
      </div>
    );
  }
};
const Tab = React.createClass({
  render: function() {
    return (
      <span style={{ padding: 10 }} onClick={this.props.handleClick} className={this.props.isActive ? 'active' : null}>
        <a href="#">{this.props.data.name}</a>
      </span>
    );
  }
});
const Content = React.createClass({
  render: function() {
    return (
      <div>
        {this.props.activeTab.name === 'Acerto' ? 
        <section className="agenda">
          <Acerto client={this.props.client} />
         </section>
        : null} 

        {this.props.activeTab.name === 'Detalhes' ? 
        <section className="agenda">
          <Details client={this.props.client} />
         </section>
        : null} 

        {this.props.activeTab.name === 'Mapa' ? 
        <section className="agenda">
        <GoogleMap />
        </section>
        : null} 
        
        {this.props.activeTab.name === 'Histórico' ? 
        <section className="agenda">
          <Historico client={this.props.client} />
        </section>
        : null} 
      </div>
    );
  }
});
const Abas = React.createClass({
  getInitialState: function() {
    return {
      activeTab: tabData[0]
    };
  }, 
  handleClick: function(tab) {
    this.setState({ activeTab: tab });
  },
  render: function() {
    return (
      <div>
        <Tabs client={this.props.client} activeTab={this.state.activeTab} changeTab={this.handleClick} />
        <Content client={this.props.client} activeTab={this.state.activeTab} />
      </div>
    );
  }
});

export default Abas;
