const axios = require('axios');

const year = 2022; 
const weekNumber = 1; 

const apiUrl = `https://api.collegefootballdata.com/rankings?year=${year}&week=${weekNumber}&seasonType=regular`;

const apiKey = 'g9Cyukj2ECHLTBzMSVaMAWfJWuC8o1nf3RlNqKpOXHZ8BCz9kJlJUulmPm4TjRFy';

const headers = {
  Authorization: `Bearer ${apiKey}`,
};

axios
  .get(apiUrl, { headers })
  .then((response) => {
    const polls = response.data[0].polls;

    polls.forEach((poll) => {
      console.log(`Poll: ${poll.poll}`);
      poll.ranks.forEach((rank) => {
        console.log(rank);
      });
    });
  })
  .catch((error) => {
    console.error('Error:', error);
  });