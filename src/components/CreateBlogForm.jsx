import { useState } from 'react'

const CreateBlogForm = ({ handleNewBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    const newBlog = { title, author, url }
    setTitle('')
    setAuthor('')
    setUrl('')
    handleNewBlog(newBlog)
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        title:
        <input type="text" value={title} name="title" onChange={({ target }) => setTitle(target.value)}/>
        <br/>
        author:
        <input type="text" value={author} name="author" onChange={({ target }) => setAuthor(target.value)}/>
        <br/>
        url:
        <input type="text" value={url} name="url" onChange={({ target }) => setUrl(target.value)}/>
        <br/>
        <button type="submit">create</button>
      </div>
    </form>
  )
}

export default CreateBlogForm