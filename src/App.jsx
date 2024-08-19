import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import CreateBlogForm from './components/CreateBlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogOut = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedUser')
    blogService.setToken(null)
    setUser(null)
  }

  const handleNewBlog = async (newBlog) => {
    //event.preventDefault()
    //const newBlog = {title, author, url}
    blogFormRef.current.toggleVisibility()
    await blogService.create(JSON.stringify(newBlog))
    const newBlogs = await blogService.getAll()
    setBlogs(newBlogs)
    //blogService.getAll().then(blogs => setBlogs(blogs))
    setErrorMessage(`a new blog ${newBlog.title} added`)
    //setTitle('')
    //setAuthor('')
    //setUrl('')
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const addLike = async (event, blog) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    const returnedBlog = await blogService.update(updatedBlog)
    const updatedBlogs = await blogService.getAll()
    setBlogs(updatedBlogs)
    setBlogs(updatedBlogs)
  }

  const deleteBlog = async (event, blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      const response = await blogService.deleteById(blog)
      if (response.status === 401) {
        window.alert(response.data.error)
        return
      }
      const updatedBlogs = await blogService.getAll()
      setBlogs(updatedBlogs)
      setBlogs(updatedBlogs)
    }
  }



  if (user === null) {
    return (
      <div>
        <h2>Login</h2>
        <Notification errorMessage={errorMessage} messageColor='red' />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }
  return (
    <div>
      <h2>blogs</h2>
      <Notification errorMessage={errorMessage} messageColor='green'/>
      <p>{user.name} logged in<button onClick={handleLogOut}>logout</button></p>
      <h2>create new</h2>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <CreateBlogForm handleNewBlog={handleNewBlog} />
      </Togglable>
      {blogs.sort((a,b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} addLike={addLike} deleteBlog={deleteBlog}/>
      )}
    </div>
  )
}

export default App