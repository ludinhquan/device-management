document.getElementById('btnFbLogin').addEventListener('click', e => {
  FB.getLoginStatus(function (response) {
    fbLogin();
  });
});

document.getElementById('btnFbLogout').addEventListener('click', e => {
  FB.logout();
});

function fbLogin() {
  FB.login(
    function (response) {
      const {
        authResponse: {accessToken, userID},
      } = response;
      fetch('/fb-auth', {
        method: 'post',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({fbToken: accessToken, fbID: userID}),
      });
    },
    {scope: 'public_profile,email'},
  );
}
