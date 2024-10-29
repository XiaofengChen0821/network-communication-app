document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    // 验证用户名和密码是否为空
    if (!username || !password) {
        document.getElementById('message').innerText = '用户名和密码不能为空！';
        return;
    }

    // 提交到后端进行登录验证
    const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    const result = await response.json();
    
    if (result.success) {
        // 登录成功后，将用户名保存到 localStorage
        localStorage.setItem('username', username);
        // 跳转到 dashboard 页面
        window.location.href = '/dashboard';
    } else {
        document.getElementById('message').innerText = result.message;
    }
});
// 在 dashboard 页面中监听 "Create Account" 按钮点击事件
document.getElementById('createAccountButton').addEventListener('click', function() {
    // 显示创建账户表单
    document.getElementById('createAccountForm').style.display = 'block';
});

// 监听提交创建账户的按钮事件
document.getElementById('submitCreateAccount').addEventListener('click', function() {
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const username = document.getElementById('create-username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('create-password').value;

    // 检查是否填写所有字段
    if (!firstName || !lastName || !username || !email || !password) {
        alert('Please fill in all fields.');
        return;
    }

    // 邮箱格式验证
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    // 密码长度验证
    if (password.length < 6) {
        alert('Password must be at least 6 characters long.');
        return;
    }

    // 模拟账户创建成功
    alert(`Account created for ${firstName} ${lastName}`);

    // 隐藏创建账户表单
    document.getElementById('createAccountForm').style.display = 'none';

    // 清空表单字段
    document.getElementById('first-name').value = '';
    document.getElementById('last-name').value = '';
    document.getElementById('create-username').value = '';
    document.getElementById('email').value = '';
    document.getElementById('create-password').value = '';
});
