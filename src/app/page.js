'use client'
import Image from 'next/image'
import Draggable from 'react-draggable'
import { useState, useRef, useEffect } from 'react';

export default function Home() {
  const [commandOpen, setCommandOpen] = useState(false);
  const [aboutMeOpen, setAboutMeOpen] = useState(false);
  const [readmeOpen, setReadmeOpen] = useState(true);
  let readme;
  let commandPrompt;
  let aboutMe;
  var lastClicked = 'readme';
  
  function closeCommand() {
    setCommandOpen(false);
  }

  function openCommand() {
    setCommandOpen(true);
    updateCommandZ();
  }

  function closeAboutMe() {
    setAboutMeOpen(false);
  }

  function openAboutMe() {
    setAboutMeOpen(true);
    updateAboutMeZ();
  }

  function closeReadme() {
    setReadmeOpen(false);
  }

  function openReadme() {
    setReadmeOpen(true);
    updateReadmeZ();
  }

  function updateReadmeZ() {
    document.getElementById('pseudoReadme').style.zIndex = 3;
    if (lastClicked == 'command') {
      try {
        document.getElementById('pseudoCmd').style.zIndex = 2;
      } catch (err) {}
      try {
        document.getElementById('pseudoAbout').style.zIndex = 1;
      } catch (er) {}
    } else if (lastClicked == 'about') {
      try {
        document.getElementById('pseudoAbout').style.zIndex = 2;
      } catch (err) {}
      try {
        document.getElementById('pseudoCmd').style.zIndex = 1;
      } catch (er) {}
    }
    lastClicked = 'readme';
  }

  function updateCommandZ() {
    document.getElementById('pseudoCmd').style.zIndex = 3;
    if (lastClicked == 'readme') {
      try {
        document.getElementById('pseudoReadme').style.zIndex = 2;
      } catch (err) {}
      try {
        document.getElementById('pseudoAbout').style.zIndex = 1;
      } catch (er) {}
    } else if (lastClicked == 'about') {
      try {
        document.getElementById('pseudoAbout').style.zIndex = 2;
      } catch (err) {}
      try {
        document.getElementById('pseudoReadme').style.zIndex = 1;
      } catch (er) {}
    }
    lastClicked = 'command';
  }

  function updateAboutMeZ() {
    document.getElementById('pseudoAbout').style.zIndex = 3;
    if (lastClicked == 'command') {
      try {
        document.getElementById('pseudoCmd').style.zIndex = 2;
      } catch (err) {}
      try {
        document.getElementById('pseudoReadme').style.zIndex = 1;
      } catch (er) {}
    } else if (lastClicked == 'readme') {
      try {
        document.getElementById('pseudoReadme').style.zIndex = 2;
      } catch (err) {}
      try {
        document.getElementById('pseudoCmd').style.zIndex = 1;
      } catch (er) {}
    }
    lastClicked = 'about';
  }

  if (commandOpen) {
    commandPrompt = <Command onXClickCommand={() => closeCommand()} onBoxClick={() => updateCommandZ()}/>;
  }

  if(aboutMeOpen) {
    aboutMe = <AboutMe onXClickCommand={() => closeAboutMe()} onBoxClick={() => updateAboutMeZ()}/>;
  }

  if(readmeOpen) {
    readme = <Readme onXClickCommand={() => closeReadme()} onBoxClick={() => updateReadmeZ()}/>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button onDoubleClick={() => openCommand()} className='fixed left-[25px] top-[100px] desktopIcon'>
        <img className="terminalIcon" src="./images/terminal-icon.png"/>
        Terminal
      </button>
      <button onDoubleClick={() => openAboutMe()} className='left-[25px] top-[225px] desktopIcon'>
        <img className="txtIcon" src="./images/aboutMe.png"/>
        About Me
      </button>
      <button onDoubleClick={() => openReadme()} className='left-[25px] top-[350px] desktopIcon'>
        <img className="txtIcon" src="./images/aboutMe.png"/>
        Readme
      </button>
      <Draggable handle='.handle'>
        <div id='pseudoCmd'>
          {commandPrompt}
        </div>
      </Draggable>
      <Draggable>
        <div id='pseudoAbout'>
          {aboutMe}
        </div>
      </Draggable>
      <Draggable>
        <div id='pseudoReadme'>
          {readme}
        </div>
      </Draggable>
    </main>
  )
}

function Link({link, linkName}) {
  return <a className='padding' href={link} target="_blank">{linkName}</a>;
}

function AboutMe({onXClickCommand, onBoxClick}) {
  return (
    <>
      <div className='textDocument' id="aboutMeBox" onClick={onBoxClick}>
        <div className='text-header'>
          <button className='square' onClick={onXClickCommand}>X</button>
        </div>
        <div className="innerTxtDocument">
          <p>
            My name is Justin Almas, and I&apos;m a fourth year computer science major at Georgia Tech. I am interested in systems software, firmware, and computer architecture.
            I have a passion for all things computers and have extensive experience in C and C++ programming.
          </p>
        </div>
      </div>
    </>
  )
}

function Readme ({onXClickCommand, onBoxClick}) {
  return (
    <>
      <div className='textDocument' id='readme' onClick={onBoxClick}>
        <div className='text-header'>
          <button className='square' onClick={onXClickCommand}>X</button>
        </div>
        <div className="innerTxtDocument">
          <p>Welcome to my personal website! I put this together to get more experience with React and web development in general.</p>
          <p>To learn more about me, open up the terminal and type &apos;justin help&apos; to see a list of commands to use.</p>
          <p>Additionally, you can read a brief about me by double clicking on the icon &apos;About Me&apos;</p>
        </div>
      </div>
    </>
  )
}

function Command({onXClickCommand, onBoxClick}) {
  return (
    <>
      <div className="shell" id="movableShell" onClick={onBoxClick}>
          <div className="shell-header handle" id="shellHeader">
            C:/Users/Justin
            <button className='square' onClick={onXClickCommand}>X</button>
          </div>
        <div id="body">
          <ol>
            <CommandElement/>
          </ol>
        </div>
      </div>
  </>
);
}

function whiteSpace() {
  return <li id="whitespace"></li>;
}

function CommandElement() {

  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const terminalEndRef = useRef(null);
  const scrollToBottom = () => {
    terminalEndRef?.current.scrollIntoView();
  };
  useEffect(scrollToBottom, [items]);
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  function whiteSpace() {
    return <li id="whitespace"></li>;
  }

  function commands () {
    return (
      <>
    <li>Commands:</li>
    <li>&quot;GitHub&quot; - Visit my personal GitHub</li>
    <li>&quot;LinkedIn&quot; - View my LinkedIn profile</li>
    <li>&quot;Resume&quot; - See a copy of my Resume</li>
    </>
    )
  }

  function goToLink(link, linkName) {
    const json = JSON.stringify(linkName);
    const unquoted = json.substring(1, json.length - 1);
    setItems([...items, "C:/Users/Justin: " + inputValue.trim(), "Going to "+ unquoted + "...", whiteSpace()]);
        setTimeout(function () {
          window.open(link, '_blank');
        }, 1000)
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && inputValue.trim() !== '') {
      if (inputValue.trim().toLowerCase() === "github") {
        goToLink("https://github.com/justin-almas", "GitHub");
      } else if (inputValue.trim().toLowerCase() === "linkedin") {
        goToLink("https://www.linkedin.com/in/justin-almas", "LinkedIn");
      } else if (inputValue.trim().toLowerCase() === "resume") {
        goToLink('/JustinAlmasResume.pdf', "Resume");
      } else if (inputValue.trim().toLowerCase() === "justin help") {
        setItems([...items, "C:/Users/Justin: " + inputValue.trim(), commands(), whiteSpace()]);
      } else {
        setItems([...items, "C:/Users/Justin: " + inputValue.trim(), "Error! Run 'justin help' to see list of valid commands", whiteSpace()]);
      }
      setInputValue(''); // Clear the input field after adding the item
    }
  };

  return (
    <div id="terminalElements">
      
      <li> Justin OS [Version 1.0] </li>
      <li>(c) Justin Corporation. All rights reserved.</li>
      <li id="whitespace"></li>

      <ul>
        {items.map((item, order) => (
          <li key={order}> {item}</li>
        ))}
      </ul>
      <div>
        C:/Users/Justin:&nbsp;
        <input autoFocus className='inputText'
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
        />
      </div>
      <div ref={terminalEndRef}/>
    </div>
  );
}
