export function validateEnvEntry(entry: string | undefined): string {
    if (!entry) {
        throw new Error('Invalid entry in .env file.');
    } else return entry;
}