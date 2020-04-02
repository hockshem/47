import CommandContext from "./models/command_context";
import Command from "./commands/command";
import CovidFeedCommand from "./commands/feedCommand";
import { Message } from "discord.js";

export default class CommandHandler {
    private static commands: Command[] = [
        new CovidFeedCommand()
    ];

    static async handleCommand(prefix: string, message: Message): Promise<void> {
        if (message.author.bot || !message.content.startsWith(prefix)) {
            return;
        }

        const commandContext = new CommandContext(prefix, message);

        const matchedCommand = this.commands.find((command) => command.aliases.includes(commandContext.invokedCommand));
        const allowedCommands = this.commands.filter((command) => command.hasPermissionToExecute(commandContext));

        if (!matchedCommand) {
            this.sendFeedback(`I'm afraid that I don't recognize this command.`,
                commandContext);
        } else if (!allowedCommands.includes(matchedCommand)) {
            this.sendFeedback(`I'm sorry, but you don't have permissions to execute this command.`,
                commandContext);
        } else {
            await matchedCommand.execute(commandContext);
        }
    }

    static async sendFeedback(feedback: string, context: CommandContext) {
        await context.originalMessage.reply(feedback);
    }
}