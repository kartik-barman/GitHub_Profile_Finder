$(document).ready(function() {
    const searchBtn = $("#search");
    const inputField = $("#input");

    searchBtn.on("click", () => {
        const searchQuery = inputField.val();

        if (searchQuery) {
            fetchUser(searchQuery);
            inputField.val(''); 
        } else {
            alert("Please enter a username.");
        }
    });

    inputField.on("keypress", (event) => {
        if (event.which === 13) { 
            event.preventDefault(); 
            searchBtn.click(); 
        }
    });
});

const fetchUser = (user_name) => {
    fetch(`https://api.github.com/users/${user_name}`)
        .then((res) => {
            if (!res.ok) {
                throw new Error(`Error: ${res.status} ${res.statusText}`);
            }
            return res.json();
        })
        .then((data) => {
            console.log(data);
            $("#prof-img").attr("src", data.avatar_url);
            $("#name").text(data.name);
            $("#username").text(`@${data.login}`).attr("href", data.html_url);
            $("#bio").text(data.bio);
            $("#repo").text(data.public_repos);
            $("#followers").text(data.followers);
            $("#following").text(data.following);
        })
        .catch((error) => console.error('Fetch Error:', error));
};
