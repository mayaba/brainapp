import { useState } from 'react';

/*
TODO:
1- take the username and password when they change
2- query the backend
3- if successful navigate to home page
*/

const loginClicked = (event, username, password, onSigninSubmit, loadUser) => {

        if(!username || !password) {
            return console.log('empty username or password!');
        }

        event.preventDefault();
        fetch("https://barin-app.herokuapp.com/signin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: username,
            password: password
          })
        })
          .then(resp => resp.json())
            .then(user => {
              console.log(user);
              if(user.user_id) {
                loadUser(user);
                onSigninSubmit();
              } else {
                console.log('Error Logging in!');
              }   
          })
          .catch(err => {
            console.log("error:", err);
          });
}

export default function Signin({ onSigninSubmit, loadUser }) {
    let [username, setUsername] = useState();
    let [password, setPassword] = useState();

    return (
        <div className="columns is-centered mt-6">
            <div className="column is-5-tablet is-4-desktop is-3-widescreen">
                <form action="" className="box">
                    <div className="field">
                        <label for="" className="label">Username</label>
                        <div className="control has-icons-left">
                            <input type="text" placeholder="e.g. hemoo91" className="input" required
                                onChange={(e) => { setUsername(e.target.value) }} />
                            <span className="icon is-small is-left">
                                <i className="fas fa-envelope"></i>
                            </span>
                        </div>
                    </div>
                    <div className="field">
                        <label for="" className="label">Password</label>
                        <div className="control has-icons-left">
                            <input type="password" placeholder="*******" className="input" required onChange={(e) => { setPassword(e.target.value) }} />
                            <span className="icon is-small is-left">
                                <i className="fa fa-lock"></i>
                            </span>
                        </div>
                    </div>
                    <div className="field has-text-centered">
                        <button className="button is-success"
                            onClick={(e) => loginClicked(e, username, password, onSigninSubmit, loadUser)}>
                            Login
                        </button>
                    </div>
                    <div className="field has-text-centered has-text-weight-bold">
                        <a href="#0">Register</a>
                    </div>
                </form>
            </div>
        </div>
    );
}