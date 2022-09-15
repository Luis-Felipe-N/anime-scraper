import AnimeBrBiz from "./src/scraper/AnimeBrBiz"


const animeBrBiz = new AnimeBrBiz()

const html  = animeBrBiz.getScraper()

console.log(html)