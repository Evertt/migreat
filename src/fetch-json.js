async function getFileFromVercel(url) {
  return await fetchUrl(`https://migreat.evertt.vercel.app/${url}`)
}

async function getFile(url) {
  const fs = await import('fs')
  const p = await import('path')

  if (p.resolve('./').match(/^\/private/)) {
    return await getFileFromVercel(url)
  }

  const path = p.resolve(`./dist/${url}`)
  const file = fs.readFileSync(path, 'utf8')

  return JSON.parse(file)
}

async function fetchUrl(url) {
  const resp = await fetch(url)

  return await resp.json()
}

export default async function(url) {
  return navigator.userAgent.match('jsdom')
    ? await getFile(url) : await fetchUrl(url)
}
