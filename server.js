const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

// 提供静态文件
app.use(express.static(path.join(__dirname, 'public')));

// 模拟用户数据存储，设置你的用户名和密码
const users = [
    { username: 'yourUsername', password: 'yourPassword' }, // 设置你的用户名和密码
    { username: 'admin', password: 'admin123' },
    { username: 'operator', password: 'operator123' }
];

// 处理登录请求
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    // 查找用户并验证密码
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        res.json({ success: true });
    } else {
        res.json({ success: false, message: '用户名或密码无效' });
    }
});

// 提供 dashboard 页面
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

// 启动服务器
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
