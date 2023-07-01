const url = 'http://localhost:8080/api/admin';

function getAllUsers() {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            loadTable(data);
        });
}

async function getAdminPage() {
    try {
        const response = await fetch(url);
        const user = await response.json();
        loadTable(user);
    } catch (error) {
        console.error('Error:', error);
    }
}


function loadTable(listAllUsers) {
    let res = '';
    for (let user of listAllUsers) {
        res +=
            `<tr>
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.lastName}</td>
        <td>${user.age}</td>
        <td>${user.email}</td>
        <td>${user.username}</td>
        <td id=${'roles' + user.id}>${user.roles.map(r => r.role).join(' ')}</td>
        <td>
          <button class="btn btn-info" type="button"
          data-bs-toggle="modal" data-bs-target="#editModal"
          onclick="editModal(${user.id})">Edit</button>
        </td>
        <td>
          <button class="btn btn-danger" type="button"
          data-bs-toggle="modal" data-bs-target="#deleteModal"
          onclick="deleteModal(${user.id})">Delete</button>
        </td>
      </tr>`;
    }
    document.getElementById('tableBodyAdmin').innerHTML = res;
}

function addUser() {
    const form = document.getElementById('newUserForm');
    const role = document.getElementById('role_select');
    const rolesAddUser = [];
    for (let i = 0; i < role.options.length; i++) {
        if (role.options[i].selected) {
            rolesAddUser.push({
                id: role.options[i].value,
                role: role.options[i].innerHTML,
                authority: role.options[i].innerHTML
            });
        }
    }
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            name: form.newName.value,
            lastName: form.newLastName.value,
            age: form.newAge.value,
            email: form.newEmail.value,
            username: form.newUserName.value,
            password: form.newPassword.value,
            roles: rolesAddUser
        })
    })
        .then(response => {
            if (response.ok) {
                getAllUsers();
                document.getElementById('all-users-tab').click();
            }
        });
}

function closeModal() {
    document.querySelectorAll('.btn-close').forEach(btn => btn.click());
}

function editModal(id) {
    fetch(url + '/' + id, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        }
    })
        .then(res => res.json())
        .then(u => {
            document.getElementById('editId').value = u.id;
            document.getElementById('editName').value = u.name;
            document.getElementById('editLastName').value = u.lastName;
            document.getElementById('editAge').value = u.age;
            document.getElementById('editEmail').value = u.email;
            document.getElementById('editUsername').value = u.username;
            document.getElementById('editPassword').value = '****';
        });
}

function editUser() {
    const form = document.getElementById('modalEdit');
    const idValue = document.getElementById('editId').value;
    const nameValue = document.getElementById('editName').value;
    const lastNameValue = document.getElementById('editLastName').value;
    const ageValue = document.getElementById('editAge').value;
    const emailValue = document.getElementById('editEmail').value;
    const usernameValue = document.getElementById('editUsername').value;
    const passwordValue = document.getElementById('editPassword').value;
    const listOfRole = [];
    for (let i = 0; i < form.roles.options.length; i++) {
        if (form.roles.options[i].selected) {
            let tmp = {};
            tmp['id'] = form.roles.options[i].value;
            listOfRole.push(tmp);
        }
    }
    const user = {
        id: idValue,
        name: nameValue,
        lastName: lastNameValue,
        age: ageValue,
        email: emailValue,
        username: usernameValue,
        password: passwordValue,
        roles: listOfRole
    };
    fetch(url + '/' + user.id, {
        method: 'PATCH',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(user)
    })
        .then(() => {
            closeModal();
            getAllUsers();
        });
}

function deleteModal(id) {
    fetch(url + '/' + id, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        }
    })
        .then(res => res.json())
        .then(u => {
            document.getElementById('deleteId').value = u.id;
            document.getElementById('deleteName').value = u.name;
            document.getElementById('deleteLastName').value = u.lastName;
            document.getElementById('deleteAge').value = u.age;
            document.getElementById('deleteEmail').value = u.email;
            document.getElementById('deleteUsername').value = u.username;
            document.getElementById('deleteRole').value = u.roles.map(r => r.role).join(', ');
        });
}

function deleteUser() {
    const id = document.getElementById('deleteId').value;
    const urlDel = url + '/' + id;
    const method = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    fetch(urlDel, method)
        .then(() => {
            closeModal();
            getAllUsers();
        });
}

getAdminPage();

document.getElementById('newUserForm').addEventListener('submit', (e) => {
    e.preventDefault();
    addUser();
});