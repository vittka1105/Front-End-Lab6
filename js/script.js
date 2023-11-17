function getUserInfos() {
    Promise.all(Array.from({ length: 5 }, () => fetch('https://randomuser.me/api').then(response => response.json())))
        .then(usersData => {
            const usersInfo = usersData.map(user => {
                const picture = user.results[0].picture.large;
                const postcode = user.results[0].location.postcode;
                const coordinates = `${postcode} ${user.results[0].location.coordinates.latitude}, ${user.results[0].location.coordinates.longitude}`;
                const email = user.results[0].email;
                const city = user.results[0].location.city;
                return { picture, postcode, coordinates, email, city };
            });

            displayUserInfo(usersInfo);
        })
        .catch(error => console.error('Error fetching user info:', error));
}

function displayUserInfo(usersInfo) {
    const userInfoContainer = document.getElementById('userInfo');
    userInfoContainer.innerHTML = '';

    usersInfo.forEach(userInfo => {
        userInfoContainer.innerHTML += `
            <div class="userCard">
                <img src="${userInfo.picture}" alt="User Picture">
                <p><strong>Postcode:</strong> ${userInfo.postcode}</p>
                <p><strong>Coordinates:</strong> ${userInfo.coordinates}</p>
                <p><strong>Email:</strong> ${userInfo.email}</p>
                <p><strong>City:</strong> ${userInfo.city}</p>
            </div>
        `;
    });
}