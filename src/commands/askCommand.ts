import Command from "./command";
import CommandContext from "../models/command_context";

export default class AskCommand implements Command {
    aliases = ["ask"];
    
    hasPermissionToExecute(context: CommandContext): boolean {
        return true
    }

    async execute(context: CommandContext): Promise<void> {
        const replies = ["Yes.", "No."];
        await context.originalMessage.reply(replies[Math.floor(Math.random() * replies.length)]);
    }

    // TODO: Implement help message here
    helpMessage(prefix: string): string {
        return "";
    }
}