const User = {
  result: document.getElementById('result'),
  filter: document.getElementById('filter'),
  listItems: [],
  
  filterData(searchTerm) {
    User.listItems.forEach(item => item.innerText.toLowerCase().includes(searchTerm.toLowerCase()) ? item.classList.remove('hide'): item.classList.add('hide'))
  },

  createUsersList(results) {
    User.result.innerHTML = ''

    results.forEach(user => {
      const li = document.createElement('li')
      User.listItems.push(li)
  
      li.innerHTML = `
        <img src="${user.picture.large}" alt="${user.name.first}">
        <div class="user-info">
          <h4>${user.name.first} ${user.name.last}</h4>
          <p>${user.location.city}, ${user.location.country}</p>
        </div>
      `
      User.result.appendChild(li)
    })
  },

  async getData() {
    const res = await fetch('https://randomuser.me/api?results=50')
    const { results } = await res.json()
  
    User.createUsersList(results)
  },

  start() {
    User.filter.addEventListener('input', event => User.filterData(event.target.value))
    User.getData()
  }
}

User.start()