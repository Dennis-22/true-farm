import '../css/about.css'
import Layout from "../Components/Layout"
import logo from '../asserts/leaf.svg'

const aboutData = {
    name:'True Farm',
    description : 'A simple ecormece fruits and vetables website',
    link:'https://github.com/Dennis-22/true-farm'
}

export default function About(){
    return <Layout>
        <div className="about">
            <img className="about-logo" src={logo}/>
            <section className="about-details">
               
                <p>
                    <span className='about-name'>App name </span> -
                    <span className='about-text'> {aboutData.name}</span>
                </p>
                <hr />
                <p>
                    <span className='about-name'>Description </span> -
                    <span className='about-text'> {aboutData.description}</span>
                </p>
                <hr />

                <p>
                    <span className='about-name'>Source code </span> -
                    <a href={aboutData.link} target="_black"> {aboutData.link}</a>
                </p>
            </section>
        </div>
    </Layout>
}
