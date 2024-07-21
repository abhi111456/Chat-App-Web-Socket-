const socket = io();
const joinBtn = document.getElementById('joinBtn');
const sendBtn = document.getElementById('sendBtn');
const usernameInput = document.getElementById('username');
const messageInput = document.getElementById('message');
const allMessages = document.getElementById('messages');

let username = '';

joinBtn.addEventListener('click', () => {
    username = usernameInput.value.trim();
    if (username) {
        usernameInput.disabled = true;
        joinBtn.disabled = true;
        sendBtn.disabled = false;
        messageInput.focus();
    } else {
        alert('Please enter a username.');
    }
});

socket.on('message', (data) => {
    const { username, message, self } = data;
    const messageBubble = document.createElement('div');
    messageBubble.className = `message-bubble${self ? ' user' : ''}`;
    messageBubble.innerHTML = `
        <span class="message-username">${username}</span>
        <p class="message-text">${message}</p>
    `;
    allMessages.appendChild(messageBubble);
    // Scroll to the bottom of the messages container
    allMessages.scrollTop = allMessages.scrollHeight;
});

sendBtn.addEventListener('click', () => {
    const message = messageInput.value.trim();
    if (message && username) {
        socket.emit('user-message', { username, message });
        messageInput.value = '';
        messageInput.focus();
    }
});

messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendBtn.click();
    }
});
