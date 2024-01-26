import React, { Component } from 'react';
import { render } from 'react-dom';

class Auth extends Component {

    render() {
        return (
            <div class="row">
                <div class="col s10 m4">
                    <div class="card blue-grey darken-1">
                        <div class="card-content white-text">
                            <span class="card-title">Card Title</span>
                            <p>Bienbenido a ERP Gesivar</p>
                            <p>Porfavor dijite sus credenciales</p>
                        </div>
                        <div class="card-action">
                            <div class="row">
                                <form class="col s12">
                                    <div class="row">
                                        <div class="input-field col s12">
                                            <input id="password" type="password" class="validate"></input>
                                            <label for="password">Password</label>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="input-field col s12">
                                            <input id="email" type="email" class="validate"></input>
                                            <label for="email">Email</label>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Auth;
