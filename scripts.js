document.getElementById("login-button").addEventListener('click', function() {
    const pass = document.getElementById("pass").value
    if (pass == "temp") {
        document.getElementById("main-page").style.display = "none";
        document.getElementById("pass").value = "";
        document.getElementById("admin-page").style.display = "block";

        document.getElementById("update").addEventListener('click', function() {
        
            const capacity = document.getElementById("capacity").value;
            console.log(typeof capacity)
            if (capacity != "") {
                document.getElementById("capacity").value = "";

                const updateContainer = document.getElementById("update-container");
                updateContainer.style.border = "5px solid"
                updateContainer.style.borderRadius = "5px"
        
                const number = document.getElementById("number");
                number.textContent = capacity + " players";

                let now = new Date();
                let today = now.toDateString();
                let hours = now.getHours();
                let minutes = now.getMinutes();
                let seconds = now.getSeconds();

                const lastUpdated = document.getElementById("last-updated");
                lastUpdated.textContent = `Last updated: ${today}, ${hours}:${minutes}:${seconds}`;
        
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
            }
        });
    }    
});

document.getElementById("back").addEventListener('click', function() {
    document.getElementById("status").textContent = " ";
    document.getElementById("main-page").style.display = "block";
    document.getElementById("admin-page").style.display = "none";  
});