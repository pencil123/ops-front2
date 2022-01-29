import Server from "./server";
class UserAPI extends Server {
  async listRoles() {
    try {
      let res = await this.axios("get", "/api/v1/user/role/listRoles");
      if (res.code === 200) {
        return res.data;
      } else {
        let err = {
          message: "请求获取失败",
        };
        throw err;
      }
    } catch (err) {
      let errobj = {
        message: "请求获取失败",
      };
      throw errobj;
    }
  }

  async addRole(data) {
    try {
      let res = await this.axios("post", "/api/v1/user/role/addRole", data);
      if (res.code === 200) {
        return res.data;
      } else {
        let err = {
          message: "请求获取失败",
        };
        throw err;
      }
    } catch (err) {
      let errobj = {
        message: "请求获取失败",
      };
      throw errobj;
    }
  }
  async delRolebyId(data) {
    try {
      let res = await this.axios("post", "/api/v1/user/role/delByRoleId", data);
      if (res.code === 200) {
        return res.data;
      } else {
        let err = {
          message: "请求获取失败",
        };
        throw err;
      }
    } catch (err) {
      let errobj = {
        message: "请求获取失败",
      };
      throw errobj;
    }
  }
}

export default new UserAPI();
