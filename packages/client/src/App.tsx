import { useState, ChangeEvent, MouseEvent } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { HandleConversationMessage } from './utils/graphql/mutations.ts'
import './App.css'
import { useMutation } from '@apollo/client'

function App() {
  const [messages, setMessages] = useState<string[]>([])
  const [userMessage, setUserMessage] = useState<string>("")

  const updateMessages = (message: string) => {
    setMessages(prevMessages => [...prevMessages, message])
  }

  const [chat] = useMutation(HandleConversationMessage, {
    variables: {message: userMessage},
    onCompleted: (data) => updateMessages(data.handleConversationMessage.content),
    onError: (error) => console.log(error)
  })

  // console.log(data.handleConversationMessage)

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => setUserMessage(event.target.value)

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("clicked")
    updateMessages(userMessage)
    const chatResult = await chat({
      variables: {message: userMessage}
    })

    console.log(chatResult)
    console.log(messages)
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div>
        <div>
          {messages.map((message, i) => (
            <div key={i}>{message}</div>
          ))}
        </div>
        <input value={userMessage} onChange={handleInputChange}></input>
        <button onClick={handleSubmit}>Chat</button>
      </div>
     
    </>
  )
}

export default App
