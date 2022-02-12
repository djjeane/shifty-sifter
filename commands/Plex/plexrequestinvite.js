const { SlashCommandBuilder } = require("@discordjs/builders");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("plexrequestinvite")
    .setDescription("Requests an invite to the plex server.")
    .addStringOption((option) =>
      option
        .setName("plexemail")
        .setDescription(
          "The email of the user who will be invited to the Plex server."
        )
        .setRequired(true)
    ),
  async execute(interaction) {
    //Grab the needed paramaters from the argu from the message
    try {
      let plexemail = interaction.options.getString("plexemail");
      if (!plexemail) {
        await interaction.reply({
          content: "You must enter a valid email address!",
          ephemeral: true,
        });
        return;
      }
      let plexClient = interaction.client.PlexAPIClient;

      let machineID = "";
      let servers = await plexClient.getServers();

      if (servers.length > 0) {
        servers.forEach((element) => {
          if (element.name == "Dawsons PC v3") {
            machineID = element.machineIdentifier;
          }
        });
      }

      var userAlreadyInvited = false;
      let users = await plexClient.getAllUsers();

      if (users.length > 0) {
        users.forEach((element) => {
          if (element.email == plexemail) {
            userAlreadyInvited = true;
          }
        });
      }

      if (userAlreadyInvited) {
        interaction.editReply("User already invited");
      } else {
        await plexClient.inviteUser(plexemail, machineID);
        interaction.editReply("Invite sent!");
      }
    } catch (error) {
      interaction.editReply("There was an error while executing this command!");
      console.error(error);
    }
  },
  settings: {
    cost: 100,
  },
};
