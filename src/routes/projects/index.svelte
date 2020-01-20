<style>
    div {
        background-color: #F0F0FF;
        padding-bottom: 20px;
        padding-left: 20px;
        padding-right: 10px;
        padding-top: 5px;
        margin-left: -30px;
        margin-bottom: 30px;
        width: 100vw;
    }
    img {
        width: calc(100vw - 40px);
    }

    @media (min-width: 768px) {
        div {
            border-radius: 25px;
            margin-left: 0;
            padding-left: 30px;
            padding-right: 20px;
            width: calc(100vw - var(--sidebar-width) - 120px);
        }

        img {
            float: left;
            margin-right: 20px;
            width: 306px;
        }

        p {
            margin-top: -7px;
        }
    }
</style>

<div>
    <h2>Juliatto.dev</h2>
    <img src="vfj-page.png" alt="A printscreen of this website.">
    <p>This very page! It was written using the new hottest thing in JavaScript-land, Svelte, and the accompanying application framework, Sapper. Except for constructing the components, the only thing I had to do on top of Sapper was to add support for writing my blog posts in Markdown. The site is completely server side rendered and exported as a static website.</p>
    <p>I have deployed it using Amazon Web Services. It is hosted on S3 and served from the CloudFront CDN, which not only helps with speed but allows me to serve the site over https.</p>
</div>

<div>
    <h2>Sash</h2>
    <img src="sash.png" alt="A printscreen of a terminal program.">
    <p>Sash is a shell for UNIX systems. It was built and tested on Linux, but should work on any system supporting basic POSIX facilities, including Mac.</p>
    <p>It is extremely bare bones. It is not nearly full featured enough to be used as your daily shell - not that I would recommend it, anyway. In the future, I intend to add at least tab completion and globbing, but this is just a learning project and not meant to be used in production.</p>
    <p>Sash was written in C. It uses only the standard library and POSIX. My goal was to have a really hands on experience and so I chose not to use GNU extensions or third-party libraries.</p>
</div>