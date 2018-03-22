'use strict'

const storage = {
  messages: [
    {
      id: '1',
      text: 'This is a message from the past',
      author: '1',
      comment: 'Obviously, this was not Steve'
    },
    {
      id: '2',
      text: 'This is a message from the present',
      author: '2',
      comment: 'Obviously, this is not Elon'
    },
    {
      id: '3',
      text: 'This is a message from the future',
      author: '3',
      comment: 'Looks like this was Marty'
    }
  ],
  authors: [
    {
      id: '1',
      name: 'Steve Jobs'
    },
    {
      id: '2',
      name: 'Elon Musk'
    },
    {
      id: '3',
      name: 'Marty McFly'
    }
  ]
}

module.exports = storage
