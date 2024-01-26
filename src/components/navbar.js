import React, { Component } from 'react';
import { render } from 'react-dom';

class Navbar extends Component {

    render() {
        return (
            <nav>
                <div class="nav-wrapper #80d8ff light-blue accent-1">
                    <a href="#" class="brand-logo">Logo</a>
                    <ul id="nav-mobile" class="right hide-on-med-and-down">
                        <li><a href="sass.html">Sass</a></li>
                        <li><a href="badges.html">Components</a></li>
                        <li><a href="collapsible.html">JavaScript</a></li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default Navbar;