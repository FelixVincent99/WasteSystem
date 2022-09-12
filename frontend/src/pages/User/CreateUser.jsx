import {React, useState, useEffect} from 'react'
import {FaUser} from 'react-icons/fa'
import {toast} from 'react-toastify'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {createUser, reset} from '../../features/auth/authSlice'
import Spinner from '../../components/Spinner'

function CreateUser() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    })

    const {name, email, password, password2} = formData
    const role = 1

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const {user, isLoading, isError, isSuccess, message} = useSelector(state => state.auth)    

    useEffect(()=>{
        if(isError){
            toast.error(message)
        }
        if(isSuccess){
            navigate('/')
        }

        dispatch(reset());
    }, [isError, isSuccess, user, message, navigate, dispatch])    

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        })) 
    }

    const onSubmit = (e) => {
        e.preventDefault();        

        if(password !== password2){
            toast.error('password do not match')
        }else{
            const userData = {
                name,
                email,
                password,
                role, //todo: add role in future
            }

            dispatch(createUser(userData));
        }
    }

    if(isLoading){
        return <Spinner />
    }
    
    return (
        <>
            <section className="heading">
                <h1>
                    <FaUser />Create User
                </h1>
            </section>
            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input type="text" className="form-control" id="name" name='name' value={name} onChange={onChange} placeholder="Enter Name" required/>
                    </div>
                    <div className="form-group">
                        <input type="email" className="form-control" id="email" name='email' value={email} onChange={onChange} placeholder="Enter Email" required/>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" id="password" name='password' value={password} onChange={onChange} placeholder="Enter Password" required/>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" id="password2" name='password2' value={password2} onChange={onChange} placeholder="Confirm Password" required/>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-block">Submit</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default CreateUser