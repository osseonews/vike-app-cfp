import react from '@vitejs/plugin-react'
import vike from 'vike/plugin'
import { UserConfig } from 'vite'

const config: UserConfig = {
  resolve: {
    alias: {
      '#root': __dirname
    }
  },
  plugins: [react(), vike()]
}

export default config
