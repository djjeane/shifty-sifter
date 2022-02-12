const Ombi = require("../modules/Ombi");

module.exports.Name = "plexrequestresponse";

module.exports.Execute = async function (interaction) {
  let request = await Ombi.Request(
    interaction.values[0].split("-")[1],
    interaction.values[0].split("-")[0]
  );
  if (!request.isError) {
    await interaction.update({
      components: [],
      content: "Request sent!",
      ephemeral: true,
    });
  } else {
    await interaction.update({
      components: [],
      content: `There was an error while requesting this movie! \n Error message: ${request.errorMessage}`,
      ephemeral: true,
    });
  }
};
