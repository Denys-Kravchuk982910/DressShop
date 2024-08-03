import { useContext, useEffect, useState } from 'react';
import { Field } from '../custom/Field/Field';
import './styles/style.scss';
import { login } from '../../http/AdminHttpClient';
import { TokenContext } from '../../../contexts/TokenContextProvider';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

export interface LoginType {
    email: string;
    password: string;
}

export interface LoginError {
    errors: LoginErrorData;
}

export interface LoginErrorData {
    email: string[];
    password: string[];
}

const Login = () => {
    const { token, setToken } = useContext(TokenContext);
    const navigate = useNavigate();
    const locState = useLocation();

    const [state, setState] = useState<LoginType>({
        email: '',
        password: ''
    });

    const [error, setError] = useState<LoginError>({
        errors: {
            email: [],
            password: []
        }
    });
    
    const fillError = (type: 'email' | 'password', errors: string[]) => {
        if (type === 'email') {
            setError(prev => ({
                errors: {
                    ...prev.errors,
                    email: errors
                }
            }))
        }

        if (type === 'password') {
            setError(prev => ({
                errors: {
                    ...prev.errors,
                    password: errors
                }
            }))
        }
    }

    const submit = () => {
        if (!state.email) {
            fillError('email', ['Поле <e-mail> не може бути порожнім!']);

            return;
        }

        if (!state.password) {
            fillError('password', ['Поле <Пароль> не може бути порожнім!']);

            return;
        }

        login(state.email, state.password)
            .then(response => {
                localStorage.setItem('dressshop/token', response.token);
                setToken(response.token);

                navigate(locState.state || '/admin');
            })
            .catch(error => {
                const log = error as Promise<LoginError>;
                
                if (log) {
                    log.then(res => {
                        setError(prev => ({
                            errors: {...prev.errors, ...res.errors}
                        }));
                    })
                }
            })
    }

    useEffect(() => {
        if (error.errors.email.length > 0 || error.errors.password.length > 0) {
            setTimeout(() => {
                setError({
                    errors: {
                        email: [],
                        password: []
                    }
                });
            }, 4000);
        }
    }, [error]);

    if (token) {
        return <Navigate to={locState.state || '/admin'} replace />
    }

    return (<div className='login'>
        <div className="login__form">
            <div className="login__form-header">
                <h2 className='login__form-title'>Логін</h2>
            </div>

            <div className="login__form-body">
                <Field
                    type='email'
                    placeholder='E-mail'
                    name='email'
                    value={state.email}
                    setValue={(arg: string)=> setState({
                        ...state,
                        email: arg
                    })}
                />
                
                <Field
                    type='password'
                    placeholder='Пароль'
                    name='password'
                    value={state.password}
                    setValue={(arg: string)=> setState({
                        ...state,
                        password: arg
                    })}
                />

                <div className="login__form-btn">
                    <button onClick={() => submit()}>Увійти</button>
                </div>

                {(error.errors.email.length > 0 || error.errors.password.length > 0) && 
                    <div className="login__error">
                        {error.errors.email.map(el => (
                            <p key={el}>{el}</p>
                        ))}

                        {error.errors.password.map(el => (
                            <p key={el}>{el}</p>
                        ))}
                    </div>
                }
            </div>
        </div>
    </div>);
}

export default Login;