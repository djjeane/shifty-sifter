const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const MongoHelper = require("../../modules/MongoHelper");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("blackjack")
    .setDescription("Plays a game of blackjack!")
    .addIntegerOption((option) =>
      option
        .setName("wager")
        .setDescription(
          "The minutes before the event that users should be reminded"
        )
        .setRequired(true)
    ),
  async execute(interaction) {
    let wager = interaction.options.getInteger("wager");

    var deck = new Deck();

    // Shuffle the deck
    deck.shuffle();

    // Create a hand
    var playerHand = new Hand();
    var dealerHand = new Hand();

    // Deal two cards each
    playerHand.hit(deck.deal());
    playerHand.hit(deck.deal());

    dealerHand.hit(deck.deal());
    dealerHand.hit(deck.deal());

    var initEmbed = new MessageEmbed()
      .setTitle("Cards!")
      .setDescription(
        `Player hand: ${playerHand.toString()} \n Dealer hand: ${dealerHand.toString()}`
      )
      .setColor("RANDOM")
      .setFooter("are you lucky bitch?");

    var message = await interaction.editReply({ embeds: [initEmbed] });

    //make button to hit or stand
    var filter = (reaction, user) => {
      return (
        ["💰", "💵"].includes(reaction.emoji.name) &&
        user.id === interaction.member.id
      );
    };
    await message.react("💰");
    await message.react("💵");

    var collector = message.createReactionCollector({ filter, time: 15000 });

    collector.on(`collect`, async (reaction, user) => {
      if (reaction.emoji.name === "💰") {
        playerHand.hit(deck.deal());

        initEmbed = new MessageEmbed()
          .setTitle("Cards!")
          .setDescription(
            `Player hand: ${playerHand.toString()} \n Dealer hand: ${dealerHand.toString()}`
          )
          .setColor("RANDOM")
          .setFooter("are you lucky bitch?");

        await interaction.editReply({ embeds: [initEmbed] });
      } else if (reaction.emoji.name === "💵") {
        collector.stop();
      }
    });

    collector.on(`end`, async (collected, reason) => {
      var playerHandValue = playerHand.getValue();
      var dealerHandValue = dealerHand.getValue();

      if (!(playerHandValue > 21)) {
        while (dealerHandValue < 17 && dealerHandValue < 21) {
          dealerHand.hit(deck.deal());
          dealerHandValue = dealerHand.getValue();
          initEmbed = new MessageEmbed()
            .setTitle("Dealer Hits!")
            .setDescription(
              `Player hand: ${playerHand.toString()} \n Dealer hand: ${dealerHand.toString()}`
            )
            .setColor("RANDOM")
            .setFooter("are you lucky bitch?");

          await interaction.editReply({ embeds: [initEmbed] });
        }
      }

      var playerwon =
        playerHandValue > dealerHandValue && playerHandValue <= 21;
      var dealerwon =
        dealerHandValue > playerHandValue && dealerHandValue <= 21;
      var push =
        playerHandValue === dealerHandValue ||
        (playerHandValue > 21 && dealerHandValue > 21);
      let resultEmmbed = new MessageEmbed();
      var amountWon = 0;

      if (push) {
        resultEmmbed
          .setTitle("Push")
          .setDescription("It's a push!")
          .setColor("RANDOM")
          .setFooter(`You keep your bet!`);
      } else if (playerwon) {
        resultEmmbed
          .setTitle("You won!")
          .setDescription(
            `Player hand: ${playerHand.toString()} \n Dealer hand: ${dealerHand.toString()}`
          )
          .setColor("RANDOM")
          .setFooter(`You won ${wager * 2} points!`);
        amountWon = wager * 2;
      } else if (dealerwon) {
        resultEmmbed
          .setTitle("Dealer won!")
          .setDescription(
            `Player hand: ${playerHand.toString()} \n Dealer hand: ${dealerHand.toString()}`
          )
          .setColor("RANDOM")
          .setFooter(`You lost ${wager} points!`);
        amountWon = -wager;
      }
      await interaction.editReply({ embeds: [resultEmmbed] });

      MongoHelper.UpdatePoints(interaction.member.id, amountWon);
    });
  },
  settings: {
    cost: 0,
  },
};

class Deck {
  cards;
  suits = ["Spades", "Hearts", "Diamonds", "Clubs"];
  values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

  constructor() {
    this.cards = this.createDeck();
  }

  createDeck() {
    var cards = new Array();
    for (var i = 0; i < this.values.length; i++) {
      for (var x = 0; x < this.suits.length; x++) {
        var weight = parseInt(this.values[i]);
        if (
          this.values[i] == "J" ||
          this.values[i] == "Q" ||
          this.values[i] == "K"
        )
          weight = 10;
        if (this.values[i] == "A") weight = 11;
        var card = {
          Value: this.values[i],
          Suit: this.suits[x],
          Weight: weight,
        };
        cards.push(card);
      }
    }
    return cards;
  }

  shuffle() {
    // for 1000 turns
    // switch the values of two random cards
    for (var i = 0; i < 1000; i++) {
      var location1 = Math.floor(Math.random() * this.cards.length);
      var location2 = Math.floor(Math.random() * this.cards.length);
      var tmp = this.cards[location1];

      this.cards[location1] = this.cards[location2];
      this.cards[location2] = tmp;
    }
  }

  deal() {
    return this.cards.pop();
  }
}

class Hand {
  cards;

  constructor() {
    this.cards = new Array();
  }

  hit(card) {
    this.cards.push(card);
  }

  getValue() {
    var total = 0;
    for (var i = 0; i < this.cards.length; i++) {
      total += this.cards[i].Weight;
    }
    var containsAce = this.cards.some((card) => card.Value === "A");

    if (containsAce && total > 21) {
      total -= 10;
    }
    return total;
  }

  toString() {
    var str = "";
    for (var i = 0; i < this.cards.length; i++) {
      str += this.cards[i].Value + " " + this.cards[i].Suit + "\n";
    }
    return str;
  }

  getCard(index) {
    return this.cards[index];
  }

  getCardCount() {
    return this.cards.length;
  }

  clear() {
    this.cards = new Array();
  }
}
