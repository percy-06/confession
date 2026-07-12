const button = document.getElementById("send");
const textarea = document.getElementById("texts");
const posts = document.getElementById("posts");

button.addEventListener("click", async (event) => {
    event.preventDefault();

    const message = textarea.value.trim();

    if (message === "") {
        alert("Please write something.");
        return;
    }

    const response = await fetch("/confession", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message: message
        })
    });

    const data = await response.json();

    alert(data.message);

    textarea.value = "";

    loadConfessions();
});

async function loadConfessions() {

    const response = await fetch("/confessions");

    const confessions = await response.json();

    posts.innerHTML = "";

    confessions.forEach(confession => {

        posts.innerHTML += `
            <div class="post">
                <h3>Anonymous</h3>
                <p>${confession.message}</p>
                <hr>
            </div>
        `;

    });

}

loadConfessions();