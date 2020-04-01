import { Message } from "discord.js";

/** An encapsulation of user-invoked command along with the specified arguments.  */
export default class CommandContext {
    /** The extracted command name.  */
    readonly invokedCommand: string;
    /** The extracted command arguments. */
    readonly arguments: string[];

    constructor(readonly prefix: string, readonly originalMessage: Message) {
        /** The raw invocation, that is, the command name plus the arguments.  */
        const invocation = originalMessage.content.slice(prefix.length).trim().split(/ +/);
    
        this.invokedCommand = invocation.shift()?.toLowerCase() ?? "";
        this.arguments = invocation;
    }
}