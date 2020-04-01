import CommandContext from "../models/command_context";

/** Base of concrete commands. */
export default interface Command {
    /** List of alternative names that can be used to invoke the command. */
    readonly aliases: string[];

    /** Returns true if the invoker has the permission to execute the command, false otherwise. */
    hasPermissionToExecute(context: CommandContext): boolean;

    /** Executes the command. */
    execute(context: CommandContext): Promise<void>;

    /** Returns the usage documentation. */
    helpMessage(prefix: string): string;
}