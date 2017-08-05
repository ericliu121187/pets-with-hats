import PropTypes from 'prop-types'
import React from 'react'

const propTypes = {
  ids: PropTypes.arrayOf(PropTypes.number).isRequired,
  messagesById: PropTypes.shape({
    id: PropTypes.shape({
      id: PropTypes.number.isRequired,
      message: PropTypes.string.isRequired,
      responses: PropTypes.arrayOf(PropTypes.object),
      timestamp: PropTypes.number.isRequired,
    }),
  }).isRequired,
}

function MessageList({ ids, messagesById }) {
  function sortMessagesByRecency(msg1, msg2) {
    if (new Date(msg1.timestamp) < new Date(msg2.timestamp)) return 1
    if (new Date(msg1.timestamp) > new Date(msg2.timestamp)) return -1
    return 0
  }

  const messages = ids.map(id => messagesById[id]).sort(sortMessagesByRecency)

  return (
    <ul className="messages">
      {messages.map(message => {
        const { id, message: text, responses, timestamp } = message // eslint-disable-line

        return (
          <li key={id}>
            <div>
              {text}
            </div>

            <div>
              {new Date(timestamp).toString()}
            </div>

            <div>
              {id}
            </div>
          </li>
        )
      })}
    </ul>
  )
}

MessageList.propTypes = propTypes

export default MessageList
