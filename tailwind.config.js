module.exports = {
  purge: {
    content: ['./src/**/*.svelte'],
    options: {
      defaultExtractor: content => {
        // Capture as liberally as possible, including things like `h-(screen-1.5)`
        const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || []

        // Capture classes within other delimiters like .block(class="w-1/2") in Pug
        const innerMatches = content.match(/[^<>"'`\s.(){}\[\]#=%]*[^<>"'`\s.(){}\[\]#=%:]/g) || []

        // Capture classes using Svelte's class:something={condition} syntax
        const svelteMatches = content.match(/(?<=class:)[^<>"'`\s.(){}\[\]#=%]*[^<>"'`\s.(){}\[\]#=%:]/g) || []

        return broadMatches.concat(innerMatches).concat(svelteMatches)
      }
    }
  }
}
