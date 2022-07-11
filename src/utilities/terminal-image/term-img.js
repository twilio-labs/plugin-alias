const fs = require('fs')

const OSC = '\u001B]'
const BEL = '\u0007'

class UnsupportedTerminalError extends Error {
  constructor () {
    super('iTerm >=3 required')
    this.name = 'UnsupportedTerminalError'
  }
}

function unsupported () {
  throw new UnsupportedTerminalError()
}

const ansiEscapesImage = (buffer, options = {}) => {
  let ret = `${OSC}1337;File=inline=1`

  if (options.width) {
    ret += `;width=${options.width}`
  }

  if (options.height) {
    ret += `;height=${options.height}`
  }

  if (options.preserveAspectRatio === false) {
    ret += ';preserveAspectRatio=0'
  }

  return ret + ':' + buffer.toString('base64') + BEL
}

function terminalImage (image, options = {}) {
  const fallback = typeof options.fallback === 'function' ? options.fallback : unsupported

  if (!(image && image.length > 0)) {
    throw new TypeError('Image required')
  }

  if (process.env.TERM_PROGRAM !== 'iTerm.app') {
    return fallback()
  }

  if (typeof image === 'string') {
    image = fs.readFileSync(image)
  }

  return ansiEscapesImage(image, options)
}

module.exports = terminalImage
