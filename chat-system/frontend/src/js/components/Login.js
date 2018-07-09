import React, { PropTypes as T } from 'react'
import './Login.less'


export default React.createClass({
    getInitialState() {
        return {
            username: '',
            password: ''
        }
    },

    handlePasswordChange(event) {
        var value = event.target.value;
        var newState = {
            password: value,
        };
        this.setState(newState)
    },

    handleUsernameChange(event) {
        var value = event.target.value;
        var newState = {
            username: value,
        };
        this.setState(newState)
    },

    handleKeyPress(event) {
        if (event.key === 'Enter') {
            this.onSubmit()
        }
    },

    onSubmit() {
        var username = this.state.username
        var password = this.state.password
        this.props.login(username, password);
    },

render() {
    return (
        <div class="login-container">
            <div class="login-panel center-block">
                <div class="panel-heading">
                    Login
                </div>
                <div class="login-form">
                    <div class="input">
                        <input type="text"
                            class="form-control"
                            id="login-email"
                            placeholder="Username"
                            value={this.state.username}
                            onChange={this.handleUsernameChange}
                        />
                    </div>
                    <div class="input">
                        <input type="text"
                        name="password"
                        class="form-control"
                        id="login-password"
                        placeholder="Password"
                        type="password"
                        value={this.state.password}
                        onChange={this.handlePasswordChange}
                        onKeyPress={this.handleKeyPress}
                    />
                    </div>
                    <div class="submit-button">
                        <button
                            id="login-submit"
                            type="submit"
                            class="btn btn-block"
                            onClick={this.onSubmit}
                        >
                        Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
})
