import React, { Component } from 'react'

export class HomePage extends Component {
    render() {
        return (
            <main className="home-page">
                <section className="homepage-fold flex">
                    <div className="homepage-heading flex column justify-center align-center">
                        <h1>Chello</h1>
                        <h2>Task Managment.</h2>
                        <h2>The Clever Way.</h2>
                        <a href="/board/60072298cbf9ab1410de17fc" className="cta-btn primary-btn">Start Now</a>
                    </div>
                    <div className="homepage-image">
                    </div>
                </section>
            </main>
        )
    }
}
