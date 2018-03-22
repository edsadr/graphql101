'use strict'

const storage = require('./storage')

function findAuthor (id) {
  const author = storage.authors.find((author) => author.id === id)
  return author
}

// Setup a resolver for every query and mutator defined in the schema
const resolvers = {
  getMessage: ({ id }) => {
    const message = Object.assign({}, storage.messages.find((item) => item.id === id))

    if (message && message.author) {
      message.author = findAuthor(message.author)
    }

    return message
  },
  getAllMessages: (args) => {
    const allMessages = storage.messages.map((item) => {
      item = Object.assign({}, item)
      item.author = findAuthor(item.author)
      return item
    })

    return allMessages
  },
  createMessage: ({ input }) => {
    const lastID = storage[storage.messages.length - 1].id
    const newMessage = {}

    if (!input.text || !input.author) {
      throw new Error('Text and Author fields are required to create a Message')
    }

    newMessage.id = parseInt(lastID, 10) + 1
    newMessage.text = input.text
    newMessage.author = input.author
    newMessage.comment = input.comment || ''

    storage.messages.push(newMessage)
    return newMessage
  },
  updateMessage: ({ id, input }) => {
    let message = null

    for (let i = 0; i < storage.messages.length; i++) {
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
