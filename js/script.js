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


const chatToggle = document.getElementById("chatToggle");
const chatBox = document.getElementById("chatBox");

chatToggle.addEventListener("click", () => {

    if (chatBox.style.display === "block") {
        chatBox.style.display = "none";
    }
    else {
        chatBox.style.display = "block";
    }

});

const chatInput = document.getElementById("chatInput");
const chatBody = document.getElementById("chatBody");

chatInput.addEventListener("keypress", async function (e) {

    if (e.key === "Enter") {

        let question = chatInput.value;

        chatBody.innerHTML += "<div>> " + question + "</div>";

        const res = await fetch("http://localhost:3000/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: question })
        });

        const data = await res.json();

        chatBody.innerHTML += "<div>" + data.reply + "</div>";

        chatInput.value = "";

    }

});


async function callApi() {

    const url = document.getElementById("apiUrl").value;

    const res = await fetch(url);

    const data = await res.json();

    document.getElementById("apiResponse").innerText =
        JSON.stringify(data, null, 2);

}






const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", (e) => {

    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";

});


// Chatbot invitation messages

const chatbotMessages = [
    "Ask about my projects",
    "Ask about my .NET backend skills ⚙",
    "Ask about automation systems "
];

let chatbotMessageIndex = 0;
let chatbotCharIndex = 0;

const chatbotTypingElement =
    document.getElementById("chatTypingText");


// Typing animation

function startChatbotTyping() {

    if (chatbotCharIndex <
        chatbotMessages[chatbotMessageIndex].length) {

        chatbotTypingElement.innerHTML +=
            chatbotMessages[chatbotMessageIndex]
                .charAt(chatbotCharIndex);

        chatbotCharIndex++;

        setTimeout(startChatbotTyping, 50);

    }
    else {

        setTimeout(startChatbotErase, 2000);

    }

}


// Erase animation

function startChatbotErase() {

    if (chatbotCharIndex > 0) {

        chatbotTypingElement.innerHTML =
            chatbotMessages[chatbotMessageIndex]
                .substring(0, chatbotCharIndex - 1);

        chatbotCharIndex--;

        setTimeout(startChatbotErase, 30);

    }
    else {

        chatbotMessageIndex++;

        if (chatbotMessageIndex >= chatbotMessages.length) {
            chatbotMessageIndex = 0;
        }

        setTimeout(startChatbotTyping, 500);

    }

}


// Start chatbot typing

startChatbotTyping();


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