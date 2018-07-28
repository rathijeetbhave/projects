import React, { PropTypes as T } from 'react'
import './Home.less'
import TextAreaComponent from '../partials/FormComponents/TextAreaComponent';
import SubmitButton from '../partials/FormComponents/SubmitButton';

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      chatText: "",
      chatData: ""
    }
  }
  componentDidMount() {

  }

  setChatValue = (e) => {
    this.setState({ chatText: e.target.value })
  }

  submit() {

  }
  renderChatInputComponent = () => {
    let { chatText } = this.state
    return (
      <TextAreaComponent
        inputType="text"
        title="Message"
        name="message"
        type="text"
        content={chatText}
        controlFunc={this.setChatValue}
        formGroupClass="left-floater custom-width-textarea"
      />
    )
  }
  renderSubmitButton = () => {
    return (
      <SubmitButton
        title="Enter"
        controlFunc={this.submit}
        bsClass="button-form-group group-filter width-20"
      />
    )
  }

  renderChatBox() {
    let { chatData } = this.state
    return (
      <div class="chat-box">
        {chatData}
      </div>
    )
  }
  render() {
    return (
      <div class="home-section">
        {this.renderChatBox()}
        {this.renderChatInputComponent()}
        {this.renderSubmitButton()}
      </div>
    )
  }
}

export default Home
