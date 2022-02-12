const axios = require("axios");
const url = process.env.OMBI_URL;
const token = process.env.OMBI_TOKEN;

axios.defaults.headers.common = {
  "X-API-Key": token,
};

module.exports = {
  async Search(searchTerm) {
    let config = {
      headers: {
        ApiKey: token,
      },
    };

    let data = {
      movies: true,
      tvShows: true,
      music: true,
      people: true,
    };

    const response = await axios.post(
      `${url}/api/v2/Search/multi/${searchTerm}`,
      data,
      config
    );
    return response.data;
  },

  async Request(id, type) {
    let config = {
      headers: {
        ApiKey: token,
        UserName: "Discord",
      },
    };

    if (type == "movie") {
      let data = {
        theMovieDbId: id,
        languageCode: null,
        requestedByAlias: null,
        requestOnBehalf: null,
        rootFolderOverride: 0,
        qualityPathOverride: 0,
      };
      const response = await axios.post(
        `${url}/api/v1/Request/movie`,
        data,
        config
      );
      console.log(response.data);
      return response.data;
    } else if (type == "tv") {
      // let searchResponse = await axios.get(
      //   `${url}/api/v2/Search/tv/${id}`,
      //   config
      // );

      let data = {
        theMovieDbId: id,
        requestAll: true,
        latestSeason: false,
        firstSeason: false,
        seasons: [],
        languageProfile: 0,
        requestedByAlias: null,
        requestOnBehalf: null,
        rootFolderOverride: 0,
        qualityPathOverride: 0,
      };

      let response = await axios.post(
        `${url}/api/v2/Requests/tv`,
        data,
        config
      );
      console.log(response.data);

      return response.data;
    }
  },
};
