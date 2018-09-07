import React, {Component} from 'react';
import Message            from './Message.jsx';

class MessageList extends Component {

  render() {
    const messageItem = this.props.messages.map((message, id) => {
      return <Message key={id} message={message} />
    });

    return (
      <main className="messages">
        {messageItem}
      </main>
    )
  }
}

export default MessageList;