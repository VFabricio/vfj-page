<script>

import { toggleSidebar } from './stores.js'

import { breakpoint, isMobile } from '../media-queries.js'

const handleClick = () => {
    if (isMobile(breakpoint)) toggleSidebar()
}

</script>

<style>

    :root {
        --fancy-font: 'Gelasio', serif;
    }

    a {
        align-items: center;
        display: flex;
        font-size: 14px;
        margin-bottom: 5px;
    }

    aside {
        background-color: var(--decoration-color);
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;
    }

    i {
        float: left;
        font-size: 18px;
        margin-right: 5px;
    }

    img {
        --img-size: 80px;
        border-radius: 50%;
        height: var(--img-size);
        margin-top: 20px;
        width: var(--img-size);
    }

    p {
        font-family: var(--fancy-font);
        font-size: 14px;
        font-style: italic;
        margin: 0;
    }

    section {
        margin-bottom: 30px;
        margin-left: var(--left-line);
    }

    #contact-me {
        font-family: var(--fancy-font);
        font-size: 20px;
        margin-left: -2.5px;
        margin-bottom: 5px;
    }

    #name {
        font-family: var(--fancy-font);
        font-size: 22px;
        font-weight: bolder;
        text-decoration: none;
    }

    .icon-envelope {
        font-size: 14px;
        margin-right: 7px;
    }

    .nav-links {
        font-family: var(--fancy-font);
        font-size: 20px;
        margin-left: var(--left-line); 
        text-decoration: none;
    }

    @media (min-width: 768px) {

        a {
            font-size: 16px;
        }

        img {
            --img-size: 120px;
        }

        section {
            margin-bottom: 50px;
        }

        #contact-me {
            font-size: 30px;
            margin-bottom: 7px;
            margin-left: -3.5px;
        }

        #description p{
            font-size: 20px;
            margin-bottom: 2px;
        }

        #name {
            font-size: 30px;
            margin-top: 10px;
            margin-bottom: 7px;
        }

        .nav-links {
            display: none;
        }
    }

</style>

<aside>
    <section>
        <a on:click={handleClick} href="/"><img src="vfj-thinking.png" alt="A man thinking."></a>
        <a on:click={handleClick} id="name" href="/">Fabricio Juliatto</a>
        <div id="description">
            <p>Software Developer</p>
            <p>UX zealot</p>
            <p>Learner of all things awesome</p>
        </div>
    </section>
        <a on:click={handleClick} class="nav-links" href="blog">Blog</a>
        <a on:click={handleClick} class="nav-links" href="projects">Projects</a>
        <a on:click={handleClick} class="nav-links" href="about-me">About Me</a>
    <section>

    </section>

    <section>
        <p id="contact-me">Contact Me:</p>
            <a href="mailto:fabricio@juliatto.com">
                <i class="icon-envelope"></i>fabricio@juliatto.com
            </a>
            <a href="https://twitter.com/vfabricio">
                <i class="icon-twitter"></i>VFabricio
            </a>
            
            <a href="https://github.com/vfabricio">
                <i class="icon-github"></i>VFabricio
            </a>
            <a href="https://linkedin.com/in/vilson-fabricio-juliatto">
                <i class="icon-linkedin"></i>vilson-fabricio-juliatto
            </a>
    </section>
</aside>