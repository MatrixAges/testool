import fs from 'fs'
import path from 'path'
import lessToJs from 'less-vars-to-js'

const THEME = lessToJs(
      fs.readFileSync(
            path.join( __dirname, `./skins/default.less` ),
            'utf8'
      )
)

export default THEME
