import axios from "axios"
import AnimeBrBiz from "./src/scraper/AnimeBrBiz"


const animeBrBiz = new AnimeBrBiz()

const html  = animeBrBiz.getScraper(['escolar'])

console.log(html)