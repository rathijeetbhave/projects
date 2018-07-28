import React, { PropTypes as T } from 'react'
import { isLoggedIn } from '../../utils/auth'
import './index.less'
import Title from '../Header/Title';
import Footer from '../Footer';

class UserComponent extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.onLogin()
  }

  onLogin() {
    if (isLoggedIn()) {

    }
  }

  render() {
    let { children } = this.props

    return (
      <div class="main-container">
        <Title />
        {children}
        <Footer />
      </div>
    )
  }
}

UserComponent.propTypes = {
}

export default UserComponent
