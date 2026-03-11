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

function showArch(type) {

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