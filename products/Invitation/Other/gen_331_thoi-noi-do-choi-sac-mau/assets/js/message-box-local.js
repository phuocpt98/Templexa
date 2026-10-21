// Offline Local Message Box for ThoiNoi1
(function () {
    const DEFAULT_THOINOI_WISHES = [
        { name: "Ông Bà Nội", message: "Chúc cháu yêu của ông bà hay ăn chóng lớn, luôn vui vẻ, ngoan ngoãn và mạnh khỏe! Cả nhà yêu cháu nhiều!", time: "Hôm nay" },
        { name: "Bác Tuấn & Bác Lan", message: "Mừng thôi nôi bé yêu! Chúc con một đời bình an, thông minh sáng dạ và luôn tràn ngập tiếng cười!", time: "Hôm nay" },
        { name: "Cô Út", message: "Chúc mừng sinh nhật 1 tuổi thiên thần nhỏ! Mau ăn chóng lớn để đi chơi cùng cô Út nhé!", time: "Hôm nay" },
        { name: "Gia đình chú Minh", message: "Chúc con thôi nôi vui vẻ, luôn là niềm tự hào và niềm hạnh phúc to lớn của ba mẹ!", time: "Hôm nay" }
    ];

    function renderMessages() {
        const list = document.querySelector('.edit_message_list') || document.getElementById('MessageBox') || document.getElementById('wb-message-list');
        if (!list) return;

        let userWishes = JSON.parse(localStorage.getItem('thoinoi_user_wishes') || '[]');
        let all = [...userWishes, ...DEFAULT_THOINOI_WISHES];

        list.innerHTML = '';
        all.forEach(item => {
            const el = document.createElement('div');
            el.className = 'MessageBox-item';
            el.style.cssText = 'padding: 12px 16px; margin-bottom: 10px; background: rgba(255,255,255,0.92); border-radius: 12px; box-shadow: 0 2px 6px rgba(0,0,0,0.05); border-left: 4px solid #38BDF8;';

            const nameEl = document.createElement('div');
            nameEl.style.cssText = 'font-weight: 700; color: #0284C7; font-size: 15px; margin-bottom: 4px;';
            nameEl.textContent = item.name;

            const msgEl = document.createElement('div');
            msgEl.style.cssText = 'color: #334155; font-size: 14px; line-height: 1.5;';
            msgEl.innerHTML = item.message.replace(/\n/g, '<br>');

            el.appendChild(nameEl);
            el.appendChild(msgEl);
            list.appendChild(el);
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        renderMessages();

        // Listen for submit wish buttons
        const sendBtn = document.querySelector('.btn_sendMessage') || document.querySelector('[data-action="send-message"]');
        if (sendBtn) {
            sendBtn.addEventListener('click', (e) => {
                setTimeout(() => {
                    const nameIn = document.querySelector('input[name="name"], input[placeholder*="tên"], input[placeholder*="Tên"]');
                    const msgIn = document.querySelector('textarea, input[name="message"], input[placeholder*="lời chúc"], input[placeholder*="Lời chúc"]');
                    if (nameIn && msgIn && msgIn.value.trim()) {
                        const wishes = JSON.parse(localStorage.getItem('thoinoi_user_wishes') || '[]');
                        wishes.unshift({
                            name: nameIn.value.trim() || "Khách mời thân thương",
                            message: msgIn.value.trim(),
                            time: new Date().toLocaleDateString('vi-VN')
                        });
                        localStorage.setItem('thoinoi_user_wishes', JSON.stringify(wishes));
                        renderMessages();
                        alert("Cảm ơn bạn đã gửi lời chúc tốt đẹp tới bé yêu!");
                        msgIn.value = '';
                    }
                }, 400);
            });
        }
    });

    window.refreshThoiNoiMessages = renderMessages;
})();
