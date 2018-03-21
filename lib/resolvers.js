'use strict'

const storage = require('./storage')

// Setup a resolver for every query and mutator defined in the schema
const resolvers = {
  getMessage: ({ id }) => {
    const message = storage.filter((item) => item.id === id)
    return message[0]
  },
  getAllMessages: (args) => {
    return storage
  },
  createMessage: ({ input }) => {
    const lastID = storage[storage.length - 1].id
    const newMessage = {}

    if (!input.text || !input.author) {
      throw new Error('Text and Author fields are required to create a Message')
    }

    newMessage.id = parseInt(lastID, 10) + 1
    newMessage.text = input.text
    newMessage.author = input.author
    newMessage.comment = input.comment || ''

    storage.push(newMessage)
    return newMessage
  },
  updateMessage: ({ id, input }) => {
    let message = null

    for (let i = 0; i < storage.length; i++) {
      if (storage[i].id === id) {
        storage[i].text = input.text || storage[i].text
        storage[i].author = input.author || storage[i].author
        storage[i].comment = input.comment || storage[i].comment
        message = storage[i]
        break
      }
    }

    if (!message) {
      throw new Error(`no message exists with id: ${id}`)
    }

    return message
  }
}

module.exports = resolvers
