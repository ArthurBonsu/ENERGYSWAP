import React from 'react';
import '../App.css';
import { Button } from './Button';
import './ProjectMain.css';

function ProjectMain() {
  return (
    <div className='hero-container'>
      <video src='/videos/video-1.mp4' autoPlay loop muted />
      <h1>WELCOME TO YOUR TRADER</h1>
      <p>What are you waiting for?</p>
      <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          GET STARTED
        </Button>
        <Button
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
          // WE HAVE TO SET AN ACTION FOR THIS CLICK BUTTON TO START, HOW TO WATCH A VIDEO
          onClick={console.log('hey')}
        >
          WATCH TRAILER <i className='far fa-play-circle' />
        </Button>
      </div>
    </div>
  );
}

export default ProjectMain;
