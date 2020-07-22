/* eslint-disable react/no-unescaped-entities */
import React, { Component } from 'react';

class AuthenticationRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {username: '',
                  password: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name] : e.target.value });
 }

  handleSubmit(event) {
    alert('Submitted: ' + this.state.username + this.state.password );
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <h3>Iniciar sesion</h3>
        <form onSubmit={this.handleSubmit}>
        <label>
          Usuario:
          <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
        </label>
        <label>
          Contraseña:
          <input type="text" name="password" value={this.state.password} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Entrar" />
        </form>
      </div>
    );
  }
}

export default AuthenticationRoute;
