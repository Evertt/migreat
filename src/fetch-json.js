export default async function(url) {
  const resp = await fetch(url)

  return await resp.json()
}
