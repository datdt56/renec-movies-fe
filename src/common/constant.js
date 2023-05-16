const IS_PROD = process.env.APP_ENV === 'production'
export const API_KEY = 'AIzaSyCuhITB31itgU5XFRcZoUZlbo2risU4YKo'
export const API_URL = IS_PROD ? 'https://renec-movies-be.onrender.com' : 'http://localhost:8080'

export const WEBSOCKET_URL = IS_PROD ? 'ws://renec-movies-be.onrender.com' : 'ws://localhost:8000'