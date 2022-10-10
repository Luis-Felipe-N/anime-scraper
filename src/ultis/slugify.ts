
export function slugify(text: string): string {
    const newText = text.replaceAll(/  | /g, "-").toLowerCase()
    return newText
}