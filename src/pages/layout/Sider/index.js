import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import './index.less'
const siderMenuList = [
    {
        ItemGroupTit: '通用',
        itemList: [
            {
                path: 'button',
                title: 'Button  按钮'
            },
            {
                path: '',
                title: 'icon  图标'
            },
            {
                path: '',
                title: 'Typography  排版'
            }
        ]
    },
    {
        ItemGroupTit: '布局',
        itemList: [
            {
                path: '',
                title: 'Divider  分割线'
            },
            {
                path: '',
                title: 'Grid  图标'
            },
            {
                path: '',
                title: 'Layout  布局'
            },
            {
                path: '',
                title: 'Space  间距'
            }
        ]
    },
    {
        ItemGroupTit: '数据录入',
        itemList: [
            {
                path: 'switch',
                title: 'Switch  开关'
            },
            {
                path: 'form',
                title: 'Form  表单'
            }
        ]
    },
    {
        ItemGroupTit: '反馈',
        itemList: [
            {
                path: 'drawer',
                title: 'Drawer  抽屉'
            }
        ]
    }
]
export default function SiderChildren() {
    return (
        <div>
            <Menu defaultSelectedKeys={['1']} mode="inline">
                {siderMenuList.map((item, index) => (
                    <Menu.ItemGroup key={index} title={item.ItemGroupTit}>
                        {item.itemList.map((i, j) => (
                            <Menu.Item key={`${index} - ${j}`}>
                                <Link to={i.path}>{i.title}</Link>
                            </Menu.Item>
                        ))}
                    </Menu.ItemGroup>
                ))}
            </Menu>
        </div>
    )
}
