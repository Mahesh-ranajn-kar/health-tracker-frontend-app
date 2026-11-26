import api from "../../services/api"



export const userService = {
  async getUsers() {
    const response = await api.get('/users')
    return response.data
  },

  async getUserRoles() {
    const response = await api.get('/users/roles')
    return response.data
  },

  async createUser(user) {
    const response = await api.post('/users', user)
    return response.data
  },

  async updateUser(user) {
    const response = await api.patch(`/users/${user.id}`, user)
    return response.data
  },

  async deleteUser(userId) {
    const response = await api.delete(`/users/${userId}`)
    return response.data
  }
}