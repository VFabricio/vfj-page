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

const getDateAsMs = html => {
	const end = html.lastIndexOf('<')
	const start = html.lastIndexOf('>', end)
	if (start === -1 || end === -1)
		return ''
	const timestamp = html.slice(start + 1, end)
	return Date.parse(timestamp)
}

const stringInsert = (string, insert, position) => (
    string.slice(0, position) + insert + string.slice(position)
)

const renderDate = (html, date) => {
	const lastTagEnd = html.lastIndexOf('>')
	const lastTagStart = html.lastIndexOf('<', html.lastIndexOf('<') - 1) 
	if (lastTagEnd === -1 || lastTagStart === -1)
		return ''
    const timestampWithTags = html.slice(lastTagStart, lastTagEnd + 1)
    const htmlWithoutTimestamp = html.replace(timestampWithTags, '')

    const formatedDate = new Intl.DateTimeFormat('en-US', {dateStyle: 'long'}).format(date)
	const dateString = `<p class="date-field"><em>Posted on ${formatedDate}.</em></p>` 
    const insertAt = html.indexOf('>', html.indexOf('>') + 1) + 1
	return stringInsert(htmlWithoutTimestamp, dateString, insertAt)
}

const generateSlug = text => (
	text.toLowerCase().replace(/,\ |\ -\ |:\ |:|\ /g, '-').replace(/[^a-zA-Z0-9-]/g, '')
)

const htmlToJson = html => {
	const title = getTitle(html)
    const dateAsMs = getDateAsMs(html)
	return {
		title,
		slug: generateSlug(title),
		date: dateAsMs,
		html: renderDate(html, new Date(dateAsMs))
	}
}

const compareDates = (p1, p2) => {
	return p1.date - p2.date
}

const posts = glob.sync('posts/*.md') 
	.map(file => fs.readFileSync(file, 'UTF-8'))
	.map(text => marked(text))
	.map(htmlToJson)
	.sort(compareDates)

export default posts;