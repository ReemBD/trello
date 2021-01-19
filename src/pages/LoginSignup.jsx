import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { cloudinaryService } from '../services/cloudinaryService'
import { setUser, clearUser } from '../store/actions/userAction'
export class _LoginSignup extends Component {

    state = {
        signupCred: {
            username: '',
            fullname: '',
            password: '',
            imgUrl: 'https://res.cloudinary.com/nofar/image/upload/c_thumb,w_200,g_face/v1610699691/kisspng-user-interface-design-computer-icons-default-stephen-salazar-photography-5b1462e1dab901.4508913715280626898959_lmrsj5.png'
        },
        loginCred: {
            username: '',
            password: ''
        },
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
                imgUrl: 'https://res.cloudinary.com/nofar/image/upload/c_thumb,w_200,g_face/v1610699691/kisspng-user-interface-design-computer-icons-default-stephen-salazar-photography-5b1462e1dab901.4508913715280626898959_lmrsj5.png'
            },
            loginCred: {
                username: '',
                password: ''
            },
            isNewUser: false,
            msg: '',
            isUploading: false,
        })
    }



    render() {
        const { signupCred, loginCred, isNewUser, isUploading, msg } = this.state
        const { user } = this.props
        return (

            <Fragment>
                <div className="login-bg-screen" > </div>

                <div className={`login-signup-wrapper flex justify-center ${isUploading && 'uploadStage'}`} >

                    {user && <div className="glass-form flex column">
                        <h1>Welcome {user.fullname}</h1>
                        <div className="avatar" style={{ backgroundImage: `url(${user.imgUrl})` }}> </div>
                        <button> <Link to="/board"> Start Now </Link> </button>
                        <a onClick={this.onLogout}>logout</a>
                    </div>}


                    <form className={`glass-form ${!isNewUser && !user && "ghost"} flex column`} onSubmit={this.onSubmit}>
                        <span><span className={`form-nav ${isNewUser && 'active'}`} onClick={this.toggleForms}> Signup</span>
                            <span className={`form-nav ${!isNewUser && 'active'}`} onClick={this.toggleForms}>Login</span> </span>



                        <label> click here to upload your profile
                     <input onChange={this.onUploadImg} type="file" hidden /></label>
                        <div className="avatar" style={{
                            backgroundImage: ` url(${signupCred.imgUrl})`
                        }}>  </div>
                        <h1>Create Account</h1>
                        <input type="text" value={signupCred.fullname} name="fullname" placeholder="Name" onChange={this.handleInput} />
                        <input type="text" value={signupCred.username} name="username" placeholder="username" onChange={this.handleInput} />
                        <input type="password" value={signupCred.password} name="password" placeholder="Password" onChange={this.handleInput} />
                        <button>Sign Up</button>
                        <span style={{ color: '#fff' }}>{msg}</span>


                    </form>
                    <form className={`glass-form ${!user && isNewUser && "ghost"} flex column`} onSubmit={this.onSubmit}>
                        <span><span className={`form-nav ${isNewUser && 'active'}`} onClick={this.toggleForms}> Signup</span>
                            <span className={`form-nav ${!isNewUser && 'active'}`} onClick={this.toggleForms}>Login</span> </span>

                        <h1 className="login-h1" >Log In</h1>

                        <input type="text" name="username" value={loginCred.username} placeholder="username"  onChange={this.handleInput} />
                        <input type="password" name="password" value={loginCred.password} placeholder="Password" onChange={this.handleInput} />
                        <button>Sign In</button>
                        <span style={{ color: '#fff' }}>{msg}</span>

                    </form>
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