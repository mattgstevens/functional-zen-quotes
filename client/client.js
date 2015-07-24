import React from 'react/addons';
import Debug from 'debug';

import quoteFactory from '../components/Quotes';
import Chat from '../components/Chat'

const Quotes = quoteFactory({ React });
window.Chat = new Chat()

Debug.enable('app.*');
let debug = Debug('app.client');

const actions = {
  // TODO: should this be passed into component?
  displayKey: () => {
    return store.quoteOffset % store.quotes.length;
  },

  // render side effect
  nextQuote: (event) => {
    store.quoteOffset++;
    render();
  },
  addQuote: (quote) => {
    store.quotes.push(quote);
    render();
  },
  toggleInput: () => {
    store.displayInput = !store.displayInput;
    render();
  }
}

let store = {
  // data
  imageUrl: '/img/monks at the river.jpg',
  quotes: [ //https://medium.com/javascript-scene/the-dao-of-immutability-9f91a70c88cd
    'A list represented over time is a stream',
    'Sometimes, the elegant implementation is just a function. Not a method. Not a class. Not a framework. Just a function.',
    'Immutability: The true constant is change. Mutation hides change. Hidden change manifests chaos. Therefore, the wise embrace history.',
    'Separation: Logic is thought. Effects are action. Therefore the wise think before acting, and act only when the thinking is done.',
    'Composition: All things in nature work in harmony. A tree cannot grow without water. A bird cannot fly without air. Therefore the wise mix ingredients together to make their soup taste better.',
    'Conservation: Time is precious, and effort takes time. Therefore the wise reuse their tools as much as they can. The foolish create special tools for each new creation.',
    'Flow: still waters are unsafe to drink. Food left alone will rot. The wise prosper because they let things flow.',
    'Wisdom: The wise programmer understands the way before walking the path. Therefore the wise programmer is functional, while the unwise get lost in the jungle.'
  ],
  // meta
  quoteOffset: 0,
  displayInput: false
};

let timeoutId;

const render = () => {
  window.clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    actions.nextQuote();
  }, 7000);

  React.render(
    <Quotes
      imageUrl={ store.imageUrl }
      quotes={ store.quotes }
      displayInput={ store.displayInput }
      actions={ actions } />,
    document.getElementById('app-root')
  );
}

// call first render
render();

