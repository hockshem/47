require('dotenv').config();
import CommandContext from "../models/command_context";
import Command from "./command";
import Axios from "axios";
import { validateEnvEntry } from "../utils/validation_util";
import CovidFeed from "../models/covid_feed";
import Discord = require('discord.js');

export default class CovidFeedCommand implements Command {
    aliases = ["coronavirusupdate", "coronaupdate", "cv"];

    private readonly apiKey: string;

    constructor() {
        this.apiKey = validateEnvEntry(process.env.RAPID_API_KEY);
    }

    hasPermissionToExecute(context: CommandContext): boolean {
        return true;
    }

    // TODO: Move the http client to a higher level. 
    async execute(context: CommandContext): Promise<void> {
        if (context.arguments.length == 0) {
            await context.originalMessage.reply(this.helpMessage(context.prefix));
            // TODO: Checkout on Promise Reject & Resolve.
        }

        const targetUrl: string = "https://coronavirus-monitor.p.rapidapi.com/coronavirus/latest_stat_by_country.php";

        const instance = Axios.create({
            // url: targetUrl,
            headers: {
                "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
                "x-rapidapi-key": this.apiKey
            },
            timeout: 10000,
        })

        const requestUrl: string = targetUrl + `?country=${context.arguments[0]}`;
        console.log(requestUrl);
        instance.get(requestUrl)
            .then((response) => new CovidFeed().deserialize(response.data.latest_stat_by_country[0]))
            .then((feed) => {
                const thumbnailUrl = "https://s3-eu-west-2.amazonaws.com/north-live/wp-content/uploads/2020/03/05163005/Coronavirus-Thumbnail-Image.jpg";

                // TODO: Could be moved to inside util.
                const feedEmbed = new Discord.MessageEmbed()
                    .setColor('#008080')
                    .setTitle(`${feed.countryName}'s COVID-19 Updates`)
                    .setDescription("Realtime information about the coronavirus situation.")
                    .addFields(
                        { name: "Country", value: `${feed.countryName}` },
                        { name: "Active Cases", value: `${feed.activeCases}` },
                        { name: "Total Cases", value: `${feed.totalCases}`, inline: true },
                        { name: "Total Deaths", value: `${feed.totalDeaths}`, inline: true },
                        { name: "New Cases", value: `${feed.newCases}`, inline: true },
                        { name: "New Deaths", value: `${feed.newDeaths}`, inline: true },
                        { name: "Total Recovered", value: `${feed.totalRecovered}`, inline: true },
                        { name: "Serious Critical", value: `${feed.seriousCritical}`, inline: true },
                    )
                    .setThumbnail(thumbnailUrl)
                    .setFooter(`${feed.recordDate}`)
                return feedEmbed;
            })
            .then((feedEmbed) => context.originalMessage.reply(feedEmbed))
            .catch((error) => console.error(`Rejected promise: ${error}`));
    }

    // TODO: Update help message for each command.
    helpMessage(prefix: string): string {
        return `Use ${prefix} CoronaUpdate <country_name> to get the latest update of coronavirus in the country.`;
    }

}