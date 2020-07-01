const md = require('markdown-it')()
const matter = require('gray-matter')
import { NowRequest, NowResponse } from '@now/node'

module.exports = async (req: NowRequest, res: NowResponse) => {
  const slug = req.url.match(/([^\/]+)\.json$/)[1]
  let { data: metadata, content } = matter.read(`${__dirname}/${slug}.md`)
  content = md.render(content)
  res.json({ metadata, content })
}
