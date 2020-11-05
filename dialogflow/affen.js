const Discord = require("discord.js");
const functions = require("../functions.js");

const key = process.env.PRIVATE_KEY_AFFEN.replace(/\\n/g, "\n");
const email = process.env.CLIENT_EMAIL_AFFEN;
const id = process.env.PROJECT_ID_AFFEN;

const set = require("../info/settings.json")

module.exports = {
  Function: async function(client, message) {
    const answer = await functions.DialogflowQuery(message, key, email, id);

    //=========================================================================================================
    if (answer.intent === "history") {
      message.reply(
        "**BRIEF ECHO ARENA COMPETITIVE HISTORY**\n\nThe game released on Oculus Rift in July 2017 with ESL *VR Challenger League* (later *VR League*) season 1 starting shortly after. The 8-month long season - with the ESL ONE regionals in Hamburg (EU) & Oculus Connect 4 (NA) as a midseason event, ended at IEM Katowice in March 2018. Despite some Americans being very certain NA would dominate all EU team except Jacks, this was the result:\n\n#1    :flag_us: ec.LiP.se (Lemming, Palidore, iShiny)\n#2    :flag_eu: Jacks (Boop90, Slin, Affenterror)\n#3    :flag_us: Kangorillaz (sealablebag, Loveridge, grumpiestbroom)\n#4    :flag_eu: Team Gravity (VR Jersey, MartinThe3rd, Viatrex)\n#5-6    :flag_us: Phangasms (simeonk21, speedy_v, Guygasm), :flag_eu: DiNG! (tehNileZ, Quantumboredom, Matti-)\n#7-8    :flag_us: Lamplighters (noob_fodder, SoMuch4Subtlety, leoPWNadon), :flag_eu: *(DQ) Triversity (Raemus, Fin-, Cyanister)*\n\u200b\n"
      );
      message.reply(
        "The 6-month long *VRL season 2*, starting right after season 1 finals, had a midseason cross-continental summer event in Leicester (UK) and ended at Oculus Connect 5 in San Jose, California in autumn 2018 with the following results:\n\n#1    :flag_us: ec.LiP.se (Lemming, Palidore, simeonk21)\n#2    :flag_eu: Team Gravity (VR Jersey, Viatrex, Affenterror)\n#3    :flag_us: MetaMercs (Strembitsky, Fahrenuf, speedy_v)\n#4    :flag_eu: BLAST! (Boop90, LoneGecko, idyllego)\n\n*VRL season 3* was a short 6 week season in the spring of 2019 without a midseason event. It ran a tech-issue riddled finals event in Leicester, UK with the following results:\n\n#1    :flag_us: Kangorillaz (sealablebag,Strembitsky,Loveridge)\n#2    :flag_eu: Ouroboros (Torin_, T_Sundance_K, Nillewick)\n#3-4    :flag_us: Team JoKR (Ryann8, 00JayWalker00, Kungg), :flag_eu: Team Gravity (Viatrex, Boop90, TutorialBot)\nVRL has since paused its Echo Arena pro league and VRML took over with a preseason in late 2019 and season 1 in spring 2020."
      );
      //=========================================================================================================
    } else if (answer.intent === "urban") {
      const entityValue =
        answer.result[0].queryResult.parameters.fields.word.stringValue;
      const body = await fetch(
        `https://api.urbandictionary.com/v0/define?term=${entityValue}`
      )
        .then(response => response.json())
        .catch(error => {
          functions.error(client, error);
        });
      if (body.list[0] == undefined) {
        message.reply(
          " even the urban dictionary doesn't know that word. Admit it, you made that shit up!"
        );
      } else {
        message.reply(
          `**The Urban Dictionary defines "${entityValue}" as:**\n\n *${body.list[0].definition}*\n\n You can read more about "${entityValue}" here: <${body.list[0].permalink}>`
        );
      }
    }
    //=========================================================================================================
    else if (set["Affen"].roles[answer.intent]) {
      if (message.channel.type == "dm") {
        message.reply("Yeah uhm no. That doesn't work in a dm!");
      } else {
        message.guild
          .member(message.author.id)
          .roles.add(set["Affen"].roles[answer.intent]);
        message.reply(answer.response);
      }
    } else if (answer.intent.substring(0, 6) === "remove") {
      if (message.channel.type == "dm") {
        message.reply("Yeah uhm no. That doesn't work in a dm!");
      } else {
        const roleString = answer.intent.substring(7);
        message.guild
          .member(message.author.id)
          .roles.remove(set["Affen"].roles[roleString].id);
        message.reply(answer.response);
      }
    }
    //=========================================================================================================
    else if (answer.intent === "Spam | Spoon") {
      message.react("587741249214218260");
    }
    //=========================================================================================================
    else {
      message.reply(answer.response);
      functions.Inform(client, answer, message);
    }
  }
};
