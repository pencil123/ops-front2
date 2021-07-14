import PromRaw from '@/pages/Prom/Raw';
import PromStat from '@/pages/Prom/Stat';
import NodeManager from '@/pages/Node/Manager';
import NodeAdd from '@/pages/Node/Add';
import UserList from '@/pages/User/List';
import UserAdd from '@/pages/User/Add';

const menu = [
    {
        name: '效能数据',
        icon: 'iconjiankong',
        key: 'Prom',
        children:[
            {
                name:'效能明细数据',
                icon:'',
                key:'PromRaw'
            },{
                name:'效能自定义检索',
                icon:'',
                key:'PromStat'
            }
        ]
    },
    {
        name: '主机管理',
        icon: 'info-circle',
        key: 'Node',
        children:[
            {
                name:'服务器管理',
                icon:'',
                key:'NodeManager'
            },{
                name:'添加服务器',
                icon:'',
                key:'NodeAdd'
            }
        ]
    }, 
    {
        name: '管理员',
        icon: 'info-circle',
        key: 'User',
        children:[
            {
                name:'管理员列表',
                icon:'',
                key:'UserList'
            },{
                name:'添加管理员',
                icon:'',
                key:'UserAdd'
            }
        ]
    }
]

const tabs = {
    NodeManager: <NodeManager />,
    NodeAdd:<NodeAdd />,
    UserList:<UserList/>,
    UserAdd:<UserAdd/>,
    PromRaw:<PromRaw/>,
    PromStat:<PromStat/>
}


export {
    menu,
    tabs
}