import React, { Component } from 'react'

export class HomePage extends Component {
    render() {
        return (
            <main className="home-page">
                <section className="homepage-fold flex">
                    <div className="homepage-heading flex column justify-center align-center">
                        <h1>Chello</h1>
                        <h2>Task Managment.</h2>
                        <h2>The <span>Clever</span> Way.</h2>
                        <a href="/board/6008a088b5c86f53d8c9d788" className="cta-btn primary-btn">Start Now</a>
                    </div>
                    <div className="homepage-image">
                    </div>
                </section>

                <section className="features flex column align-center ">
                    <h3 className="features-heading">Chello enables your team to collaborate, plan, analyze and manage everyday tasks</h3>
                    <div className="features-feature-1 flex align-center">
                        <div className="feature-1-bg"></div>
                        <div className="feature-1-txt">
                            <h3>Lorem ipsum dolor sit amet.</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, nobis?</p>
                        </div>
                    </div>
                    <div className="features-feature-2 flex align-center">
                        <div className="feature-2-txt">
                            <h3>Lorem ipsum dolor sit amet.</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, nobis?</p>
                        </div>
                        <div className="feature-2-bg"></div>
                    </div>
                    <div className="features-feature-3 flex align-center">
                        <div className="feature-3-bg"></div>
                        <div className="feature-3-txt">
                            <h3>Lorem ipsum dolor sit amet.</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, nobis?</p>
                        </div>
                    </div>
                </section>
            </main>
        )
    }
}
