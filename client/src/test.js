const axios = require('axios');

async function fetchCollegeFootballRankings() {
  try {
    const year = 2022;
    const weekNumber = 1;
    const apiUrl = `https://api.collegefootballdata.com/rankings?year=${year}&week=${weekNumber}&seasonType=regular`;
    const apiKey = 'g9Cyukj2ECHLTBzMSVaMAWfJWuC8o1nf3RlNqKpOXHZ8BCz9kJlJUulmPm4TjRFy';

    const headers = {
      Authorization: `Bearer ${apiKey}`,
    };

    const response = await axios.get(apiUrl, { headers });
    const polls = response.data[0].polls;

    axios.get(apiUrl)

    const result = [];
    polls.forEach((poll) => {
      result.push({
        poll: poll.poll,
        ranks: poll.ranks,
      });
    });

    return result;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

module.exports = {
  fetchCollegeFootballRankings,
};


// const axios = require('axios');

// async function fetchCollegeFootballRankings(year, weekNumber, apiKey) {
//   const apiUrl = `https://api.collegefootballdata.com/rankings?year=${year}&week=${weekNumber}&seasonType=regular`;

//   const headers = {
//     Authorization: `Bearer ${apiKey}`,
//   };

//   try {
//     const response = await axios.get(apiUrl, { headers });
//     const polls = response.data[0].polls;

//     polls.forEach((poll) => {
//       console.log(`Poll: ${poll.poll}`);
//       poll.ranks.forEach((rank) => {
//         console.log(rank);
//       });
//     });
//   } catch (error) {
//     console.error('Error:', error);
//   }
// }

// module.exports = {
//   fetchCollegeFootballRankings,
// };
