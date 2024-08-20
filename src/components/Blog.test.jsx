import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders content when button is not clicked', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Teppo Test',
    likes: 5,
    url: 'www.testing.com'
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText(`${blog.title} ${blog.author}`)
  expect(element).toBeDefined()
})

test('renders content when button is clicked', async () => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'Teppo Testi',
      likes: 5,
      url: 'www.testing.com',
      user: {
        name: "Taavetti Testi"
      }
    }

    render(<Blog blog={blog} />)

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)
    
    let element = screen.getByText(`${blog.url}`)
    expect(element).toBeDefined()
    element = screen.getByText(`likes ${blog.likes}`)
    expect(element).toBeDefined()
    element = screen.getByText(`${blog.user.name}`)
    expect(element).toBeDefined()
  })

  test('if the blog is liked twice the mock event handler is also called twice', async () => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'Teppo Testi',
      likes: 5,
      url: 'www.testing.com',
      user: {
        name: "Taavetti Testi"
      }
    }
  
    const mockHandler = vi.fn()

    render(<Blog blog={blog} addLike={mockHandler}/>)

    const user = userEvent.setup()
    let button = screen.getByText('view')
    await user.click(button)
    button = screen.getByText('like')
    await user.click(button)
    await user.click(button)
    
    expect(mockHandler.mock.calls).toHaveLength(2)
  })