import { useState } from 'react'

const Blog = ({ blog, addLike, deleteBlog }) => {
  const [buttonLabel, setButtonLabel] = useState('view')

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const changeLabel = () => {
    if (buttonLabel === 'view') {
      setButtonLabel('hide')
    }
    else {
      setButtonLabel('view')
    }
  }

  if (buttonLabel === 'view') {
    return (
      <div style={blogStyle}>
        {blog.title} {blog.author}<button onClick={changeLabel}>{buttonLabel}</button>
      </div>
    )
  }
  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}<button onClick={changeLabel}>{buttonLabel}</button>
      <br/>
      {blog.url}
      <br/>
      likes {blog.likes} <button onClick={(e) => addLike(e, blog)}>like</button>
      <br/>
      {blog.user.name}
      <br/>
      <button onClick={e => deleteBlog(e, blog)}>remove</button>
    </div>
  )
}

export default Blog