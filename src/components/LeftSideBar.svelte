<script>

import { toggleSidebar } from './stores.js'

import { breakpoint, isMobile } from '../media-queries.js'

const handleClick = () => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches
    if (isMobile) toggleSidebar()
}

</script>

<style>

    a {
        align-items: center;
        display: flex;
        font-size: 15px;
        margin-bottom: 5px;
    }

    aside {
        background-color: var(--lighter-blue);
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;
        position: relative;
    }

    i {
        float: left;
        margin-right: 5px;
    }

    img {
        border-radius: 50%;
        height: 120px;
        margin: 20px 0 0 0;
        width: 120px;
    }

    p {
        font-family: 'Itim', cursive;
        font-size: 18px;
        font-style: italic;
        margin: 0;
    }

    section {
        margin-left: var(--left-line);
        margin-bottom: 30px;
    }

    #contact-me {
        font-family: 'Itim', cursive;
        font-size: 25px;
        margin-left: -2.5px;
    }

    #name {
        font-family: 'Itim', cursive;
        font-size: 32px;
        font-style: normal;
        font-weight: bolder;
        padding: 5px 0;
        text-decoration: none;
    }

    .nav-links {
        font-family: 'Itim', cursive;
        font-size: 20px;
        padding-left: var(--left-line);
        text-decoration: none;
    }

    @media (max-width: 768px) {

        a {
            font-size: 12px;
        }

        img {
            height: 80px;
            width: 80px;
        }

        section {
            margin-bottom: 30px;
        }

        #contact-me {
            font-size: 20px;
            margin-top: 10px;
        }

        #description p{
            font-size: 12px;
        }

        #name {
            font-size: 23px;
            margin-top: 10px;
            margin-bottom: 5px;
        }
    }

    @media (min-width: 768px) {
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
            <p>Byte herder</p>
            <p>Learner of all things awesome</p>
        </div>
    </section>
        <a on:click={handleClick} class="nav-links" href="blog">Blog</a>
        <a on:click={handleClick} class="nav-links" href="projects">Projects</a>
    <section>

    </section>

    <section>
        <p id="contact-me">Contact Me:</p>
            <a href="mailto:fabricio@juliatto.com">
                <i class="fas fa-envelope"></i>fabricio@juliatto.com
            </a>
            <a href="https://twitter.com/vfabricio">
                <i class="fab fa-twitter"></i>VFabricio
            </a>
            
            <a href="https://github.com/vfabricio">
                <i class="fab fa-github"></i>VFabricio
            </a>
            <a href="https://linkedin.com/in/vilson-fabricio-juliatto">
                <i class="fab fa-linkedin"></i>vilson-fabricio-juliatto
            </a>
    </section>
</aside>