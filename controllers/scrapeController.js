const cheerio = require('cheerio')
const fetch = require('node-fetch')

const scrape = async (req, res, next) => {
  const params = req.params[0]
  const url = encodeURI(addHttpPrefix(params))
  console.log(url)

  const headlines = {
    h1: [],
    h2: [],
    h3: [],
    h4: [],
    h5: [],
    h6: [],
  }

  try {
    const result = await fetch(url)
    const body = await result.text()
    const $ = cheerio.load(body)

    Object.keys(headlines).map((h) => {
      const element = $(h)
        .toArray()
        .map((x) => $(x).text())
      headlines[h] = element
    })

    res.send({ headlines })
  } catch (error) {
    res.send(error)
  }
}

const addHttpPrefix = (url) => {
  return url && !url.includes('http') ? 'http://' + url : url
}

module.exports = {
  scrape,
}
