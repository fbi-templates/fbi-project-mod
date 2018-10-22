export class UserService {
  users: any

  constructor() {
    this.users = [
      {
        id: 1,
        name: 'echo'
      },
      {
        id: 2,
        name: 'ada'
      }
    ]
  }

  async getAll() {
    return this.users
  }

  async getOne(id: any) {
    return this.users.find((u: any) => u.id === id * 1)
  }

  async add(user: any) {
    const id = this.users[this.users.length - 1].id + 1
    const _user = {
      id,
      name: user['name']
    }
    this.users.push(_user)
    return _user
  }

  async update(id: any, user: any) {
    let exist = await this.getOne(id)
    if (!exist) {
      return `userId '${id}' not found`
    }
    exist = Object.assign(exist, user)
    return exist
  }

  async remove(ids: any) {
    const _ids = Array.isArray(ids) ? ids : [ids]

    for (let i = this.users.length - 1; i >= 0; i--) {
      if (_ids.includes(this.users[i].id + '')) {
        this.users.splice(i, 1)
      }
    }
  }
}
