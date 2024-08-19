import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newObject => {
  console.log('newobject:', newObject)
  const config = {
    headers: { 'Authorization': token, 'Content-Type': 'application/json' },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async objectToUpdate => {
  const updateUrl = `${baseUrl}/${objectToUpdate.id}`
  const config = {
    headers: { 'Authorization': token, 'Content-Type': 'application/json' }
  }
  const response = await axios.put(updateUrl, objectToUpdate, config)
  return response.data
}

const deleteById = async blogToDelete => {
  const deleteUrl = `${baseUrl}/${blogToDelete.id}`
  const config = {
    headers: { 'Authorization': token, 'Content-Type': 'application/json' }
  }
  try {
    const response = await axios.delete(deleteUrl, config)
    return response
  } catch (error) {
    return error.response
  }
}

export default { getAll, create, update, deleteById, setToken }