const roles = [
    ".NET Backend Engineer  ",
    "Automation Developer  ",
    "Azure AI Builder  "
];

let roleIndex = 0;
let charIndex = 0;
let currentText = "";
let deleting = false;

function typeEffect() {

    const element = document.getElementById("typing");

    if (roleIndex >= roles.length) {
        roleIndex = 0;
    }

    let fullText = roles[roleIndex];

    if (deleting) {
        currentText = fullText.substring(0, charIndex--);
    } else {
        currentText = fullText.substring(0, charIndex++);
    }

    element.textContent = currentText;

    if (!deleting && charIndex === fullText.length) {
        deleting = true;
        setTimeout(typeEffect, 1000);
        return;
    }

    if (deleting && charIndex === 0) {
        deleting = false;
        roleIndex++;
    }

    setTimeout(typeEffect, deleting ? 50 : 100);

}




function showArch(element,type) {

    let text = "";

    if (type === "client") {
        text = "Client sends HTTP requests to the backend application.";
    }

    if (type === "controller") {
        text = "Controllers handle incoming requests and return responses.";
    }

    if (type === "service") {
        text = "Service layer contains business logic and validation.";
    }

    if (type === "repository") {
        text = "Repository layer manages database operations.";
    }

    if (type === "database") {
        text = "SQL Server stores structured application data.";
    }

    document.getElementById("archInfo").innerText = text;

    // mobile info

    let mobileInfo = element.nextElementSibling;

    mobileInfo.innerText = text;
    mobileInfo.style.display = "block";

}


function flipCard(card) {

    // agar current card already flipped hai
    if (card.classList.contains("flip")) {
        card.classList.remove("flip");
        return;
    }

    // sab cards reset karo
    document.querySelectorAll(".arch-card")
        .forEach(c => c.classList.remove("flip"));

    // current card flip karo
    card.classList.add("flip");

}

typeEffect();
const terminalInput = document.getElementById("terminalInput");
const terminalOutput = document.getElementById("terminalOutput");

terminalInput.addEventListener("keypress", function (e) {

    if (e.key === "Enter") {

        let command = terminalInput.value.toLowerCase();
        let result = "";

        if (command === "about") {
            result = ".NET backend developer with 2+ years experience.";
        }

        else if (command === "skills") {
            result = "ASP.NET, SQL Server, Azure, Entity Framework.";
        }

        else if (command === "projects") {
            result = "Invoice AI Automation, WhatsApp Automation, Task Manager.";
        }

        else if (command === "clear") {
            terminalOutput.innerHTML = "";
            return;
        }

        else {
            result = "Unknown command. Try: about, skills, projects";
        }

        terminalOutput.innerHTML += "<div>> " + command + "</div>";
        terminalOutput.innerHTML += "<div>" + result + "</div>";

        terminalInput.value = "";

    }

});

AOS.init({
    duration: 900,
    offset: 120,
    once: true
});

const skillBars = document.querySelectorAll(".skill-bar");

function animateSkills() {

    skillBars.forEach(bar => {

        const width = bar.getAttribute("data-width");
        bar.style.width = width;

    });

}

window.addEventListener("scroll", animateSkills);

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");





window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }

    });

});



window.addEventListener("scroll", function () {

    let scrollTop = document.documentElement.scrollTop;
    let scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    let progress = (scrollTop / scrollHeight) * 100;

    document.getElementById("scrollBar").style.width = progress + "%";

});


const archNodes = document.querySelectorAll(".arch-node");
const archInfo = document.getElementById("archExplanation");

archNodes.forEach(node => {

    node.addEventListener("mouseenter", () => {

        archInfo.innerText = node.getAttribute("data-info");

    });

});



    const chatBtn = document.querySelector(".ai-open-btn");
    const chatWindow = document.querySelector(".ai-chat-window");
    const chatMessages = document.getElementById("aiMessages");
    const chatInput = document.getElementById("aiInput");
    const sendBtn = document.querySelector(".ai-send-btn");





    let chatStarted = false;
document.addEventListener("DOMContentLoaded", function () {
    chatBtn.addEventListener("click", () => {

        if (chatWindow.style.display === "flex") {

            chatWindow.style.display = "none";
            chatBtn.innerHTML = "💬";   // back to chat icon

        } else {

            chatWindow.style.display = "flex";
            chatBtn.innerHTML = "✖";   // change to close icon

            chatInput.focus();  

            if (!chatStarted) {

                addMessage("Hi 👋 I'm Rutuja , Sagar's AI Assistant.", "bot", true);
                addMessage("Ask me anything about his projects, skills, or experience.", "bot", false);

                chatStarted = true;
            }
        }
    });

    sendBtn.addEventListener("click", sendMessage);
})

function sendMessage() {

    const question = chatInput.value.trim();

    if (question === "") return;

    askAI(question);

    chatInput.value = "";
}


function showAIThinking() {

    const wrapper = document.createElement("div");
    wrapper.className = "ai-message bot";
    wrapper.id = "aiThinking";

    const avatar = document.createElement("div");
    avatar.className = "ai-avatar";
    avatar.innerHTML = '<img src="/images/bot.png">';

    const bubble = document.createElement("div");
    bubble.className = "ai-bubble ai-thinking";

    bubble.innerHTML = "Typing<span>.</span><span>.</span><span>.</span>";

    wrapper.appendChild(avatar);
    wrapper.appendChild(bubble);

    chatMessages.appendChild(wrapper);
    chatMessages.scrollTop = chatMessages.scrollHeight;

}


function removeAIThinking() {

    const thinking = document.getElementById("aiThinking");

    if (thinking) thinking.remove();
}
async function askAI(question) {

    addMessage(question, "user");

    showAIThinking();

    const res = await fetch("https://portfolio-ai-chatbot-ypfk.onrender.com/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: question })
    });

    const data = await res.json();

    removeAIThinking();

    typeMessage(data.reply);

}

const closeBtn = document.querySelector(".ai-close");

if (closeBtn) {
    closeBtn.onclick = () => {
        chatWindow.style.display = "none";
    };
}
function addMessage(text, type) {

    const wrapper = document.createElement("div");
    wrapper.className = type === "user" ? "ai-message user" : "ai-message bot";

    const avatar = document.createElement("div");
    avatar.className = "ai-avatar";

    avatar.innerHTML = type === "user"
        ? '<img src="/images/user.png">'
        : '<img src="/images/bot.png">';

    const bubble = document.createElement("div");
    bubble.className = "ai-bubble";

    bubble.innerHTML = text.replace(/\n/g, "<br>");

    wrapper.appendChild(avatar);
    wrapper.appendChild(bubble);

    chatMessages.appendChild(wrapper);

    chatMessages.scrollTop = chatMessages.scrollHeight;
}
function typeMessage(text) {

    const wrapper = document.createElement("div");
    wrapper.className = "ai-message bot";

    const avatar = document.createElement("div");
    avatar.className = "ai-avatar";
    avatar.innerHTML = '<img src="/images/bot.png">';

    const bubble = document.createElement("div");
    bubble.className = "ai-bubble";

    wrapper.appendChild(avatar);
    wrapper.appendChild(bubble);
    chatMessages.appendChild(wrapper);

    let i = 0;

    const interval = setInterval(() => {

        bubble.textContent += text[i];

        i++;

        chatMessages.scrollTop = chatMessages.scrollHeight;

        if (i >= text.length) {
            clearInterval(interval);
        }

    }, 15);
}

chatInput.addEventListener("keypress", function (e) {

    if (e.key === "Enter") {
        e.preventDefault();
        sendMessage();
    }

});


async function callApi() {

    const url = document.getElementById("apiUrl").value;

    const res = await fetch(url);

    const data = await res.json();

    document.getElementById("apiResponse").innerText =
        JSON.stringify(data, null, 2);

}









// close navbar when menu item clicked (mobile)

document.querySelectorAll('.navbar-nav .nav-link').forEach(function (link) {

    link.addEventListener('click', function () {

        const navbarCollapse = document.querySelector('.navbar-collapse');

        const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
            toggle: false
        });

        bsCollapse.hide();

    });

});


document.addEventListener('click', function (event) {

    const navbar = document.querySelector('.navbar-collapse');
    const toggler = document.querySelector('.navbar-toggler');

    if (navbar.classList.contains('show') &&
        !navbar.contains(event.target) &&
        !toggler.contains(event.target)) {

        const bsCollapse = new bootstrap.Collapse(navbar, {
            toggle: false
        });

        bsCollapse.hide();

    }

});