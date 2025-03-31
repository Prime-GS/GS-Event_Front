import slugify from 'slugify'

export const createSlug = (text: string) => {
  return slugify(text, {
    lower: true,
    strict: true,
    locale: 'ru',
    remove: /[*+~.()'"!:@]/g,
  })
}
