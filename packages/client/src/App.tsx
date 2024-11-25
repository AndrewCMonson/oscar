import { useMutation } from '@apollo/client'
import { ChangeEvent, MouseEvent, useState } from 'react'
import './App.css'
import { Button } from './components/ui/button.tsx'
import { Input } from './components/ui/input.tsx'
import { HandleConversationMessage } from './utils/graphql/mutations.ts'

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
    updateMessages(userMessage);
    setUserMessage("");
    const chatResult = await chat({
      variables: {message: userMessage}
    })

    console.log(chatResult)
    console.log(messages)
  }

  return (
    <>
      <div className='w-full flex flex-col items-center'>
        <div>
          {messages.map((message, i) => (
            <div className='border-2 rounded-sm mb-2 w-96' key={i}>{message}</div>
          ))}
        </div>
        <Input className='w-96' value={userMessage} onChange={handleInputChange}></Input>
        <Button className="mt-2 w-sm" onClick={handleSubmit}>Chat</Button>
      </div>
     
    </>
  )
}

export default App
