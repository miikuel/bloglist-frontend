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
      <span>{blog.title} {blog.author}</span><button onClick={changeLabel}>{buttonLabel}</button>
      <br/>
      <span>{blog.url}</span>
      <br/>
      <span>likes {blog.likes}</span><button onClick={(e) => addLike(e, blog)}>like</button>
      <br/>
      <span>{blog.user.name}</span>
      <br/>
      <button onClick={e => deleteBlog(e, blog)}>remove</button>
    </div>
  )
}

export default Blog