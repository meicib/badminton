document.getElementById("login-button").addEventListener('click', function() {
    const pass = document.getElementById("pass").value
    if (pass == "temp") {
        document.getElementById("main-page").style.display = "none";
        document.getElementById("pass").value = "";
        document.getElementById("admin-page").style.display = "block";

        document.getElementById("update").addEventListener('click', async function() {
        
            const capacity = document.getElementById("capacity").value;
            if (capacity != "") {
                let now = new Date();
                
                const response = await fetch('/status', {
                    method: 'POST',
                    body: JSON.stringify({
                        capacity: capacity,
                        today: now.toDateString(),
                        hours: now.getHours(),
                        minutes: now.getMinutes(),
                        seconds: now.getSeconds(),
                    })
                });

                const data = await response.json();

                if (response.ok) {
                    document.getElementById("capacity").value = "";
                    await updateStatus();
                }
            }
        });
    }    
});

document.getElementById("back").addEventListener('click', function() {
    document.getElementById("status").textContent = " ";
    document.getElementById("main-page").style.display = "block";
    document.getElementById("admin-page").style.display = "none";  
});

async function updateStatus() {

    const response = await fetch('/status');
    const data = await response.json();

    if (response.ok) {
        const updateContainer = document.getElementById("update-container");
        updateContainer.style.border = "5px solid"
        updateContainer.style.borderRadius = "5px"

        const number = document.getElementById("number");
        number.textContent = data.body.capacity + " players";

        const lastUpdated = document.getElementById("last-updated");
        lastUpdated.textContent = `Last updated: ${data.body.today}, ${data.body.hours}:${data.body.minutes}:${data.body.seconds}`;

        const lowOrHigh = document.getElementById("summary");
        const backgroundColor = document.getElementById("update-container")

        if (capacity <= 16) {
            backgroundColor.style.backgroundColor = '#e7fcf6';
            updateContainer.style.borderColor = '#e7fcf6';
            lowOrHigh.textContent = "low";
        } else if (capacity <= 24) {
            backgroundColor.style.backgroundColor = '#fff9e7';
            updateContainer.style.borderColor = '#fff9e7';
            lowOrHigh.textContent = "medium";
        } else {
            backgroundColor.style.backgroundColor = '#ffecee';
            updateContainer.style.borderColor = '#ffecee';
            lowOrHigh.textContent = "high";
        }
        document.getElementById("status").textContent = "success"
    } else {
        alert('Status could not be loaded! See console.')
        console.log(response, data)
    }
}