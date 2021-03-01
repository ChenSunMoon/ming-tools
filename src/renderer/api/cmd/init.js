export default [
    {
        name: 'You-Get',
        execPath: 'you-get',
        options: [
            {
                key: 'url',
                name: 'URL',
                isStore: false,
                cmdKey: '',
                required: true,
                valueType: ''
            },
            {
                key: 'savePath',
                name: '保存路径',
                isStore: true,
                required: true,
                cmdKey: '--output-dir',
                valueType: 'folder'
            },
            {
                key: 'cookies',
                name: 'Cookies',
                isStore: true,
                cmdKey: '-c'
            }
        ],
    },
    {
        name: 'You-Get代理',
        execPath: 'you-get',
        options: [
            {
                key: 'url',
                name: 'URL',
                isStore: false,
                required: true,
                cmdKey: ''
            },
            {
                key: 'savePath',
                name: '保存路径',
                required: true,
                isStore: true,
                valueType: 'folder',
                cmdKey: '--output-dir'
            },
            {
                key: 'cookies',
                name: 'Cookies',
                isStore: true,
                cmdKey: '-c'
            },
            {
                key: 'proxy',
                name: '代理',
                value: '127.0.0.1:10808',
                isStore: true,
                cmdKey: '-x'
            }
        ],
    },
    {
        name: 'YouTube-DL',
        execPath: 'youtube-dl',
        options: [
            {
                key: 'url',
                name: 'URL',
                value: '',
                isStore: false,
                required: true,
                cmdKey: ''
            },
            {
                key: 'savePath',
                name: '保存路径',
                value: '',
                isStore: true,
                required: true,
                valueType: 'folder',
                cmdKey: '--cache-dir'
            },
            {
                key: 'cookies',
                name: 'Cookies',
                value: '',
                isStore: true,
                cmdKey: '--cookies'
            }
        ],
    },
]