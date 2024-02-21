// Hide unnecessary nav menu links
const postList = document.querySelector('.posts');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');
const adminItems = document.querySelectorAll('.admin');

export const setupUI = (user) => {
  if (user) {
    //admin only
    if(user.admin){
      adminItems.forEach(item => item.style.display = 'block');
    }
    //account info
    const html = `
    <div>Logged in as ${user.email}</div>
    <div>Account created on ${user.metadata.creationTime}</div>
    <div>${user.admin ? 'Admin' : ''}</div>
    `;
    accountDetails.innerHTML = html;

    // toggle user UI elements
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');
  } else {
    adminItems.forEach(item => item.style.display = 'none');

    // hide account info
    accountDetails.innerHTML = '';

    // toggle user elements
    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'block');
  }
};

// setup posts
export const setupPosts = (data) => {

  if (data != null) {
    let html = '';
    data.forEach(doc => {
      const post = doc.data();
      const li = `
      <li>
        <div class="collapsible-header grey lighten-4"> ${post.title} </div>
        <div class="collapsible-body white"> ${post.content} </div>
      </li>
    `;
      html += li;
    });
    postList.innerHTML = html;
  } else {
    postList.innerHTML = '<h5>Login to view posts</h5>'
  }
};



// setup materialize components
document.addEventListener('DOMContentLoaded', function () {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

});