import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { cloudinaryService } from '../services/cloudinaryService'
import { setUser, clearUser } from '../store/actions/userAction'
import { GoogleLogin } from 'react-google-login';
import { GoogleLogout } from 'react-google-login';
// refresh token
import { refreshTokenSetup } from '../services/googleService';


const clientId = '996251564221-qedkti8vudlin8md60j8dllv408gqodo.apps.googleusercontent.com';

export class _LoginSignup extends Component {

    state = {
        signupCred: {
            username: '',
            fullname: '',
            password: '',
            imgUrl: ''
        },
        loginCred: {
            username: '',
            password: ''
        },
        googleCreds: {},
        isNewUser: false,
        msg: '',
        isUploading: false,
    }


    handleInput = ({ target }) => {
        const value = target.value
        const field = target.name
        var typeOfForm = this.state.isNewUser ? 'signupCred' : 'loginCred'
        this.setState(prevState => {
            return {
                [typeOfForm]: {
                    ...prevState[typeOfForm],
                    [field]: value
                }
            }
        })

    }
    // -------------------------------------------------GOOGLE----------------------------------------
    onSuccessGoogleLogin = (res) => {
        console.log(res.profileObj);
        const user = res.profileObj
        this.setState({
            signupCred: {
                username: user.email,
                fullname: user.name,
                password: user.googleId,
                imgUrl: user.imageUrl
            },
        })
        refreshTokenSetup(res);
    };

    onFailureGoogleLogin = (res) => {
        console.log('Login failed: res:', res);
        alert(
            `Failed to login.  Please ping this to repo owner twitter.com/sivanesh_fiz`
        );
    };



    onSubmit = async (ev) => {
        ev.preventDefault()
        const { signupCred, loginCred, isNewUser } = this.state

        var userCreds;
        if (isNewUser) userCreds = signupCred
        else userCreds = loginCred

        if (!userCreds.password || !userCreds.username) {
            this.setState({ msg: 'you need to fill all the feilds' })
            return
        }


        try {
            await this.props.setUser(userCreds, isNewUser)
            this.setState({ msg: '' })
            this.props.history.push(`/board`)//then gos to the boards page
        } catch (err) {
            console.log(err);
            this.setState({ msg: 'somthing went worng!' })
        }

    }




    toggleForms = (ev) => {
        ev.preventDefault()

        this.setState(prevState => {
            return {
                isNewUser: !prevState.isNewUser
            }
        })
    }




    onUploadImg = async ev => {
        this.setState({ isUploading: true })
        try {
            const { secure_url } = await cloudinaryService.uploadImg(ev.target.files[0])
            console.log('url:', secure_url);
            this.setState({ signupCred: { ...this.state.signupCred, imgUrl: secure_url }, isUploading: false }
                , console.log('imgUrl', this.state.signupCred))

        } catch (err) {
            this.setState({ msg: 'Couldnt upload your image try again' })
            console.log('problem loading the img ', err);
        }
    }

    onLogout = async () => {
        await this.props.clearUser()
        this.setState({
            signupCred: {
                username: '',
                fullname: '',
                password: '',
                imgUrl: ''
            },
            loginCred: {
                username: '',
                password: ''
            },
            isNewUser: true,
            msg: '',
            isUploading: false,

        }, () => this.props.history.push(`/login`))

    }



    render() {
        const { signupCred, loginCred, isNewUser, isUploading, msg } = this.state
        const { user } = this.props
        return (

            <Fragment>
                <div className="login-bg-screen" > </div>
                <div className="login-container flex justify-center">


                    <div className={`login-signup-wrapper flex  ${isUploading && 'uploadStage'}`} >




                        {user && <div className="glass-form ">
                            <h1>Welcome {user.fullname}</h1>
                            <div className="avatar" style={{ backgroundImage: `url(${user.imgUrl})` }}> </div>
                            <button> <Link to="/board"> Start Now </Link> </button>
                            <a onClick={this.onLogout}>logout</a>

                            <GoogleLogout
                                clientId={clientId}
                                buttonText="Logout"
                                onLogoutSuccess={this.onLogout}
                            ></GoogleLogout>

                        </div>}


                        {!user && isNewUser && <div>
                            <form className={`glass-form`} onSubmit={this.onSubmit}>


                                <h1>Sign Up</h1>

                                <div className="avatar" style={{
                                    backgroundImage: ` url(${signupCred.imgUrl})`
                                }}>  </div>


                                <div>
                                    <GoogleLogin
                                        className="with-btn"
                                        clientId={clientId}
                                        buttonText="Login"
                                        onSuccess={this.onSuccessGoogleLogin}
                                        onFailure={this.onFailureGoogleLogin}
                                        cookiePolicy={'single_host_origin'}
                                        style={{ marginTop: '100px' }}
                                        isSignedIn={user === true}
                                    />
                                </div>

                                {/* <button className="with-btn">Sign up with google <i className="fab fa-google"></i></button> */}
                                <button className="with-btn">Sign up with facebook <i className="fab fa-facebook"></i></button>

                                <label> click here to upload your profile
                     <input onChange={this.onUploadImg} type="file" hidden /></label>

                                <input type="text" value={signupCred.fullname} name="fullname" placeholder="Name" onChange={this.handleInput} />
                                <input type="text" value={signupCred.username} name="username" placeholder="username" onChange={this.handleInput} />
                                <input type="password" className="password" value={signupCred.password} name="password" placeholder="Password" onChange={this.handleInput} />
                                <span >{msg}</span>


                            </form>
                            <button className="primary-btn" onClick={this.onSubmit}><ArrowForwardIcon /></button>
                            <p>Already have an account? <span onClick={this.toggleForms} >sign In</span> </p>

                        </div>
                        }
                        {!user && !isNewUser && <div>
                            < form className={`glass-form  login`} onSubmit={this.onSubmit}>


                                <h1 >Log In</h1>

                                <input type="text" name="username" value={loginCred.username} placeholder="username" onChange={this.handleInput} />
                                <input type="password" name="password" value={loginCred.password} placeholder="Password" onChange={this.handleInput} />

                                <span>{msg}</span>

                            </form>
                            <button className="primary-btn" onClick={this.onSubmit}><ArrowForwardIcon /></button>
                            <p>Dont have an account? <span onClick={this.toggleForms} >sign Up</span> </p>

                        </div>
                        }
                        <div className="SVG" ></div>
                    </div>


                </div>
            </Fragment >
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.userReducer.user
    }
}

const mapDispatchToProps = {
    setUser,
    clearUser
}

export const LoginSignup = connect(mapStateToProps, mapDispatchToProps)(_LoginSignup)