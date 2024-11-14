const Team_More_info = require("../models/team_more_info");

class TeamMoreInfoRepository {
  async getTeamInfo(name) {
    return await Team_More_info.findOne({ where: { name } });
  }

  async postTeamInfo(name, titles, relegation, crowd, last_title_date) {
    console.log(name, titles, relegation, crowd, last_title_date);
    return await Team_More_info.create({
      name: name,
      titles: titles,
      relegation: relegation,
      crowd: crowd,
      last_title_date: last_title_date,
    });
  }
}

module.exports = new TeamMoreInfoRepository();
