import { useState } from 'react';

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
}

const regClicked = (event, name, username, password, email, onRegSubmit, loadUser) => {

    if (!username || !password || !email || !name) {
        return console.log('empty username, email, or password');
    }

    if (!validateEmail(email)) {
        return console.log('The email is invalid!');
    }

    event.preventDefault();
    fetch("https://barin-app.herokuapp.com/register", {
        method: "POST",
        headers: { 
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, username, password })
    })
        .then(resp => resp.json())
        .then(user => {
            console.log(user);
            if (user.user_id) {
                loadUser(user);
                onRegSubmit();
            } else {
                console.log('Error Registering!');
            }
        })
        .catch(err => {
            console.log("error:", err);
        });
}



export default function Register({ onRegSubmit, loadUser }) {
    let [username, setUsername] = useState();
    let [password, setPassword] = useState();
    let [email, setEmail] = useState();
    let [name, setName] = useState();

    return (
        <div className="columns is-centered mt-6">
            <div className="column is-5-tablet is-4-desktop is-3-widescreen">
                <form action="" className="box">
                    <div className="field">
                        <label for="" className="label">Name</label>
                        <div className="control has-icons-left">
                            <input
                                type="text"
                                placeholder="e.g. Rahim May"
                                className="input"
                                onChange={(e) => { setName(e.target.value) }}
                                required
                            />
                            <span className="icon is-small is-left">
                                <i className="fas fa-envelope"></i>
                            </span>
                        </div>
                    </div>
                    <div className="field">
                        <label for="" className="label">Username</label>
                        <div className="control has-icons-left">
                            <input
                                type="text"
                                placeholder="e.g. hemoo91"
                                className="input"
                                onChange={(e) => { setUsername(e.target.value) }}
                                required
                            />
                            <span className="icon is-small is-left">
                                <i className="fas fa-envelope"></i>
                            </span>
                        </div>
                    </div>
                    <div className="field">
                        <label for="" className="label">Email</label>
                        <div className="control has-icons-left">
                            <input
                                type="email"
                                placeholder="e.g. jsmith@gmail.com"
                                className="input"
                                onChange={(e) => { setEmail(e.target.value) }}
                                required
                            />
                            <span className="icon is-small is-left">
                                <i className="fas fa-envelope"></i>
                            </span>
                        </div>
                    </div>
                    <div className="field">
                        <label for="" className="label">Password</label>
                        <div className="control has-icons-left">
                            <input
                                type="password"
                                placeholder="*******"
                                className="input"
                                onChange={(e) => { setPassword(e.target.value) }}
                                required
                            />
                            <span className="icon is-small is-left">
                                <i className="fa fa-lock"></i>
                            </span>
                        </div>
                    </div>
                    <div className="field has-text-centered">
                        <button
                            className="button is-success"
                            onClick={(e) => regClicked(e, name, username, password, email, onRegSubmit, loadUser)}>
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}