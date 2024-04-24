import React, { useEffect } from 'react';

function Home() {
  useEffect(() => {
    decodeText();
    const interval = setInterval(() => {
      decodeText();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  function decodeText() {
    const text = document.getElementsByClassName('decode-text')[0];
    const state: number[] = [];
    for (let i = 0, j = text.children.length; i < j; i++) {
      text.children[i].classList.remove('state-1', 'state-2', 'state-3');
      state[i] = i;
    }
    const shuffled = shuffle(state);

    for (let i = 0, j = shuffled.length; i < j; i++) {
      const child = text.children[shuffled[i]] as HTMLElement;
      const classes = child.classList;

      const state1Time = Math.round(Math.random() * (2000 - 300)) + 50;
      if (classes.contains('text-animation')) {
        setTimeout(() => firstStages(child), state1Time);
      }
    }
  }

  function firstStages(child: HTMLElement) {
    if (child.classList.contains('state-2')) {
      child.classList.add('state-3');
    } else if (child.classList.contains('state-1')) {
      child.classList.add('state-2');
    } else if (!child.classList.contains('state-1')) {
      child.classList.add('state-1');
      setTimeout(() => secondStages(child), 100);
    }
  }

  function secondStages(child: HTMLElement) {
    if (child.classList.contains('state-1')) {
      child.classList.add('state-2');
      setTimeout(() => thirdStages(child), 100);
    } else if (!child.classList.contains('state-1')) {
      child.classList.add('state-1');
    }
  }

  function thirdStages(child: HTMLElement) {
    if (child.classList.contains('state-2')) {
      child.classList.add('state-3');
    }
  }

  function shuffle(array: number[]) {
    let currentIndex = array.length;
    let temporaryValue: number, randomIndex: number;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  return (
    <div>
      {/* Your JSX content goes here */}
    </div>
  );
}

export default Home;
