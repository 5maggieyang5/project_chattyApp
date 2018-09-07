import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.currentUser,
      text: ""
    }
  }

  //check if any changes with the username/input msg box, set state if have any changes
  handleChange = evt => {
    if(evt.target.name === "username"){
      this.setState({name: evt.target.value})
    }
    if(evt.target.name === "text"){
      this.setState({text: evt.target.value});
    }
  }

  handleUsernameKeyPress = evt => {
    console.log('Username change event detected');
    if(evt.key == 'Enter') {
      evt.preventDefault();
      this.props.addUsername(this.state.name);
    }
  }

  handleTextKeyPress = evt => {
    console.log('Text change event detected');
    if(evt.key == 'Enter') {
      evt.preventDefault();
      this.props.addText(this.state.text);
      evt.target.value='';
      this.setState({text: ""})
    }
  }

  render(){
    return (
      <footer className="chatbar" >
        <input className="chatbar-username" placeholder="Your Name (Optional)" name="username" defaultValue={this.state.name} onChange={this.handleChange} onKeyPress={this.handleUsernameKeyPress}/>
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" name="text" onChange={this.handleChange} onKeyPress={this.handleTextKeyPress}/>
      </footer>
    );
  }
}

export default ChatBar;

