const userUrl = 'http://localhost:8080/api/user';

async function getUserPage() {
    try {
        const response = await fetch(userUrl);
        const user = await response.json();
        getInformationAboutUser(user);
    } catch (error) {
        console.error('Error:', error);
    }
}

function getInformationAboutUser(user) {
    const result = `
    <tr>
      <td>${user.id}</td>
      <td>${user.name}</td>
      <td>${user.lastName}</td>
      <td>${user.age}</td>
      <td>${user.email}</td>
      <td>${user.username}</td>
      <td id=${'roles' + user.id}>${user.roles.map(r => r.role).join(' ')}</td>
    </tr>`;
    document.getElementById('userTableBody').innerHTML = result;
}

getUserPage();