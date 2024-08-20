import { render, screen } from '@testing-library/react'
import CreateBlogForm from './CreateBlogForm'
import userEvent from '@testing-library/user-event'

test('<CreateBlogForm /> updates parent state and calls onSubmit', async () => {
  const user = userEvent.setup()
  const createBlog = vi.fn()

  render(<CreateBlogForm handleNewBlog={createBlog} />)

  const inputs = screen.getAllByRole('textbox')
  const createButton = screen.getByText('create')

  await user.type(inputs[0], 'testing a form...')
  await user.type(inputs[1], 'Teppo Testaaja')
  await user.type(inputs[2], 'www.testi.fi')
  await user.click(createButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('testing a form...')
  expect(createBlog.mock.calls[0][0].author).toBe('Teppo Testaaja')
  expect(createBlog.mock.calls[0][0].url).toBe('www.testi.fi')
})