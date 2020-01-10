// Ordinarily, you'd generate this data from markdown files in your
// repo, or fetch them from a database of some kind. But in order to
// avoid unnecessary dependencies in the starter template, and in the
// service of obviousness, we're just going to leave it here.

// This file is called `_posts.js` rather than `posts.js`, because
// we don't want to create an `/blog/posts` route — the leading
// underscore tells Sapper not to do that.

import fs from 'fs'
import glob from 'glob'
import marked from 'marked'

const getTitle = html => {
	const start = html.indexOf('>')
	const end = html.indexOf('<', start)
	if (start === -1 || end === -1)
		return ''
	return html.slice(start + 1, end)
}
const generateSlug = text => (
	text.toLowerCase().replace(/,\ |\ -\ |:\ |:|\ /g, '-').replace(/[^a-zA-Z-]/, '')
)

const htmlToJson = html => {
	const title = getTitle(html)
	return {
		title,
		slug: generateSlug(title),
		html
	}
}

const posts = glob.sync('posts/*.md') 
	.map(file => fs.readFileSync(file, 'UTF-8'))
	.map(text => marked(text))
	.map(htmlToJson)

export default posts;