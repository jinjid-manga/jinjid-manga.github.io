declare module "virtual:manga" {
    interface Manga {
        id: string;
        name: string;
        pages: string[];
    }

    const library: Record<string, Manga>;

    export default library;
}
