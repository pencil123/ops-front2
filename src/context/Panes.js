import React from "react";

// 确保传递给 createContext 的默认值数据结构是调用的组件（consumers）所能匹配的！
// 导出 Context 对象
export const PanesContext = React.createContext();


// 导出操作函数
export const PanesActions = (self) =>({
    updateState(obj){
        console.log(obj);
        self.setState(obj)
    }
})