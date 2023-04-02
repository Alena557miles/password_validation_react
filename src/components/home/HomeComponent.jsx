import React, { useEffect, useState } from 'react';
import  './HomeComponent.css'

function HomeComponent() {
  const [password, setPassword] = useState('');
  useEffect(() => {
    checkPasswordStrength(password)
  },[])

  function checkPasswordStrength(password) {
    let strength = 0;
    let sections = Array.from(document.querySelectorAll('.password-section'));
    if (/^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/.test(password)) {
      strength = 1;
    }
    if (/^(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])|(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])|(?=.*[0-9])(?=.*[a-zA-Z])/.test(password)) {
      strength = 2;
    }
    if (/^(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])(?=.*[0-9])/.test(password)) {
      strength = 3;
    }
    sections.forEach(section => section.classList.remove('red', 'yellow', 'green'));
    sections.forEach(section => section.classList.add('gray'));
    
    if (!password){
      sections.forEach(section => section.classList.add('gray'));
    } else if(password.length < 8) {
      sections.forEach(section => section.classList.add('red'));
    } else if (strength === 1) {
      sections[0].classList.add('red');
    } else if (strength === 2) {
      sections[0].classList.add('yellow');
      sections[1].classList.add('yellow');
    } else if (strength === 3) {
      sections.forEach(section => section.classList.add('green'));
    }
  }

  function handleInputChange(event) {
    setPassword(event.target.value);
    checkPasswordStrength(event.target.value);
  }

  return (
    <div>
      <label htmlFor="password">Password:</label>
      <input type="password" id="password" value={password} onChange={handleInputChange} />
      <div id="password-strength">
        <div className="password-section"></div>
        <div className="password-section"></div>
        <div className="password-section"></div>
      </div>
    </div>
  );
}

export default HomeComponent;
