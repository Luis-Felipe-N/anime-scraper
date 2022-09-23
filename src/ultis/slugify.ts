
export function slugify(text: string): string {
    const newText = text.replaceAll(/  | /g, "-").toLowerCase()
    console.log(newText)
    return newText
}