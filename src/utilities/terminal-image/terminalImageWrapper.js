const terminalImage = require('./terminalImage')

async function terminalImageWrapper () {
  // const path1 = '/Users/stiwari/Downloads/icons8-bookmark-100.png'
  const path2 = '/Users/stiwari/Downloads/icons8-sms-100.png'
  const val = 50
  const ans = await terminalImage.file(path2,
    {
      width: `${val}%`,
      height: `${val}%`,
      preserveAspectRatio: false
    })
  console.log(ans)
}

module.exports = terminalImageWrapper
