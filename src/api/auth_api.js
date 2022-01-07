import Server from "./server";

class AuthAPI extends Server {
  async userRole() {
    try {
      let result = await this.axios(
        "get",
        "/api/v1/user/role/getRoleByHeaderUserCode"
      );
      if (result) {
        return result;
      } else {
        let err = {
          tip: "获取管理员用户失败",
          response: result,
        };
        throw err;
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async userName() {
    try {
      let result = await this.axios("get", "/api/v1/gw/user/info");
      if (result) {
        return result;
      } else {
        let err = {
          tip: "获取用户名",
          response: result,
        };
        throw err;
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}

export default new AuthAPI();
