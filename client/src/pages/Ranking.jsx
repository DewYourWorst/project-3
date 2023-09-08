import React from 'react';
import { ListComponent } from '../components';

const apTop25 = {
  title: 'AP Top 25 Poll',
  items: [
    { text: 'Item 1', link: '#' },
    { text: 'Google', link: 'https://www.google.com' },
    { text: 'Item 3', link: '#' },
    { text: 'Item 4', link: '#' },
    { text: 'Item 5', link: '#' },
  ],
};

const coachesPoll = {
  title: 'Coaches Poll',
  items: [
    { text: 'Item 1', link: '#' },
    { text: 'Google', link: 'https://www.google.com' },
    { text: 'Item 3', link: '#' },
    { text: 'Item 4', link: '#' },
    { text: 'Item 5', link: '#' },
  ],
};


function Ranking() {
  return (
    <div>
      <h1>Ranking Page</h1>
      <div>
        <ListComponent title={apTop25.title} items={apTop25.items} />
      </div>
       <div>
        <ListComponent title={coachesPoll.title} items={coachesPoll.items} />
      </div>
    </div>
  );
}

export default Ranking;
