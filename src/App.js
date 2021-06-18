// use this url for testing https://wallpaperaccess.com/full/2821192.jpg
// https://c8.alamy.com/comp/EP4MJN/smiling-faces-collage-EP4MJN.jpg
// https://thumbs.dreamstime.com/b/collage-many-faces-same-model-58698827.jpg

import './App.css';
import { useState } from 'react';
import 'bulma/css/bulma.css';
import Navbar from './Components/Navbar2';
import Linkform from './Components/Linkform';
import Signin from './Components/Signin';
import Register from './Components/Register';
import FaceBox from './Components/FaceBox';


export default function App() {
  let [dimensions, setDimensions] = useState([]);
  let [route, setRoute] = useState('LogIn'); // states are (home, register, LogIn)
  let [user_info, setUser_info] = useState();
  let [imageURL, setImageURL] = useState();
  let [input, setInput] = useState();
  const videoURL = "https://stream.mux.com/7x00BUIdQh29OwBsavAvAXZt1Ylqhklkz/high.mp4?token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InQ5UHZucm9ZY0hQNjhYSmlRQnRHTEVVSkVSSXJ0UXhKIn0.eyJleHAiOjE2MjE5Mjk3MDYsImF1ZCI6InYiLCJzdWIiOiI3eDAwQlVJZFFoMjlPd0JzYXZBdkFYWnQxWWxxaGtsa3oifQ.P2Hv1GTX9UpJ3prN92E0YUjQmRdw9kuPpUUaxwa1tNI97jONyD22o3AYmMb56D_QB280rWQ7jMh3GR2hAO2pUhU_RpjhA5horxHovWUJlWOZ9MQkw4cPT27mWI6yBjlcBzmBksLBsiIAlybxpUhBW5Kjt47yYOHQik07tHKW45inIex46Q3fcj7o764C-nkoDJF0YvWPJgG-U2rzt1Fh7h6hn_fjrKn7-GywKOtcKpSKYNHcjOvTzX0AqroxZH4Kl5K3EEP08gN3CqgLzZCKYHg4z6AhBEtBg7LMyZ_elk5BGsy3sVuyJGiavtOAVsGeBGATLDNup3CKBMEkcM2l8Q";


  const onPictureSubmit = () => {
    setImageURL(input);
    fetch('https://barin-app.herokuapp.com/faceDetect', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        imgURL: input
      })
    }).then(resp => resp.json())
    .then(apires => {
        calculateFace(apires);
        if (apires) {
          fetch('https://barin-app.herokuapp.com/image', {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: user_info.user_id
            })
          })
            .then(resp => resp.json())
            .then(score => {
              setUser_info({ ...user_info, score: score });
              console.log(user_info.score);
            })
            .catch(err => {
              console.log("error:", err);
            });
        }
      })
  }


  const calculateFace = (res) => {
    // const box = res.outputs[0].data.regions[0].region_info.bounding_box;
    const box = res.outputs[0].data.regions; // array of regions
    const image = document.getElementById('boximage');
    const width = Number(image.width);
    const height = Number(image.height);
    const boxes = [];

    box.forEach(b => {
      const d = b.region_info.bounding_box;
      boxes.push({
        left_col: d.left_col * width,
        top_row: d.top_row * height,
        right_col: width - (d.right_col * width),
        bottom_row: height - (d.bottom_row * height),
      });
    });
    setDimensions(boxes);
  }

  const login_commponents =
    <>
      <Navbar
        buttonText='Log In'
        onSigninSubmit={() => setRoute('LogIn')}
        onRegSubmit={() => setRoute('register')}
      />
      <Signin
        onSigninSubmit={() => setRoute('home')}
        onRegSubmit={() => setRoute('register')}
        loadUser={(u) => setUser_info(u)}
      />
    </>

  const home_components =
    <>
      <Navbar
        buttonText='Log Out'
        onSigninSubmit={() => setRoute('LogIn')}
        onRegSubmit={() => setRoute('register')}
      />
      <Linkform
        user={user_info}
        onSubmit={onPictureSubmit}
        inputChange={e => setInput(e.target.value)}
      />
      <FaceBox
        imageURL={imageURL}
        boxes={dimensions}
      />
    </>

  const reg_components =
    <>
      <Navbar
        buttonText='Log In'
        onSigninSubmit={() => setRoute('LogIn')}
        onRegSubmit={() => setRoute('register')}
      />
      <Register
        onRegSubmit={() => setRoute('home')}
        loadUser={(u) => setUser_info(u)}
      />
    </>

  return (
    <div>
      <video id="videoBack" autoPlay loop muted repeat>
        <source src={videoURL} type="video/mp4" />
      </video>
      {route === 'LogIn' && login_commponents}
      {route === 'home' && home_components}
      {route === 'register' && reg_components}
    </div>
  );
}