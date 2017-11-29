import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './menu.css'
class Menu extends Component {
    render() {
        return (
            <div class="menuNavigation">
                <nav>
                    <ul>
                        <Link to="/"><li><img src="icons/menu-menu.png"/></li></Link>
                        <Link to="/about"><li><img src="icons/menu-info.png"/></li></Link> 
                        <Link to="/setting"><li><img src="icons/menu-setting.png"/></li></Link> 
                        <Link to="/login"><li><img src="icons/menu-login.png"/></li></Link>
                    </ul>
                </nav>

            </div>
        );
    }
}

export default Menu;
