'use client'
import Image from 'next/image'
import Draggable from 'react-draggable'
import { useState, useRef, useEffect } from 'react';

export default function Home() {
  const [commandOpen, setCommandOpen] = useState(false);
  const [aboutMeOpen, setAboutMeOpen] = useState(true);
  const [readmeOpen, setReadmeOpen] = useState(false);
  let readme;
  let commandPrompt;
  let aboutMe;
  
  function closeCommand() {
    setCommandOpen(false);
  }

  function openCommand() {
    setCommandOpen(true);
  }

  function closeAboutMe() {
    setAboutMeOpen(false);
  }

  function openAboutMe() {
    setAboutMeOpen(true);
  }

  function closeReadme() {
    setReadmeOpen(false);
  }

  function openReadme() {
    setReadmeOpen(true);
  }

  if (commandOpen) {
    commandPrompt = <Command onXClickCommand={() => closeCommand()}/>;
  }

  if(aboutMeOpen) {
    aboutMe = <AboutMe onXClickCommand={() => closeAboutMe()}/>;
  }

  if(readmeOpen) {
    readme = <Readme onXClickCommand={() => closeReadme()}/>;
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
      {commandPrompt}
      {aboutMe}
      {readme}
    </main>
  )
}

function Link({link, linkName}) {
  return <a className='padding' href={link} target="_blank">{linkName}</a>;
}

function AboutMe({onXClickCommand}) {
  return (
    <>
    <Draggable>
      <div className='textDocument'>
        <div className='text-header'>
          <button className='square' onClick={onXClickCommand}>X</button>
        </div>
        <div className="innerTxtDocument">
          <p>
            My name is Justin Almas, and I&apos;m a third year computer science major at Georgia Tech from Suwanee, GA. I am interested in software engineering, data science, artificial
            intelligence, full stack development, and cybersecurity. I have a passion for all things computers and have extensive experience in Java, Python, and C programming. Additionally, I am pursuing a minor 
            in French with an intermediate level of fluency.
          </p>
        </div>
      </div>
    </Draggable>
    </>
  )
}

function Readme ({onXClickCommand}) {
  return (
    <>
    <Draggable>
      <div className='textDocument' id='readme'>
        <div className='text-header'>
          <button className='square' onClick={onXClickCommand}>X</button>
        </div>
        <div className="innerTxtDocument">
          <p>
            <p>Welcome to my personal website! I put this together to get more experience with React and web development in general.</p>
            <p>To learn more about me, open up the terminal and type &apos;justin help&apos; to see a list of commands to use.</p>
          </p>
        </div>
      </div>
    </Draggable>
    </>
  )
}

function Command({onXClickCommand}) {
  return (
    <>
    <Draggable handle=".handle">
      <div className="shell" id="movableShell">
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
    </Draggable>
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
