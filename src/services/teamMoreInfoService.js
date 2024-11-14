const TeamMoreInfoRepository = require("../repositories/teamMoreInfoRepository");

class TeamMoreInfoService {
  async getTeamInfo(name) {
    return await TeamMoreInfoRepository.getTeamInfo(name);
  }

  async postTeamInfo(name, titles, relegation, crowd, last_title_date) {
    
    return await TeamMoreInfoRepository.postTeamInfo(
      name,
      titles,
      relegation,
      crowd,
      last_title_date
    );
  }
}

module.exports = new TeamMoreInfoService();
