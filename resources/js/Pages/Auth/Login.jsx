import React, { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/inertia-react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: '',
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}
            <form onSubmit={submit}>
                <div className='my-16'>
                    <h1 className="text-white text-6xl font-bold text-center">LOGIN</h1>
                </div>
                <div>
                    <InputLabel forInput="email" value="EMAIL" className="text-white text-xl py-2"/>

                    <TextInput
                        type="text"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full py-4"
                        autoComplete="username"
                        isFocused={true}
                        handleChange={onHandleChange}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel forInput="password" value="PASSWORD" className="text-white text-xl pb-2"/>

                    <TextInput
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full py-4"
                        autoComplete="current-password"
                        handleChange={onHandleChange}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="block mt-4">
                    <label className="flex items-center">
                        <Checkbox name="remember" value={data.remember} handleChange={onHandleChange}/>

                        <span className="ml-2 text-sm font-semibold text-gray-500">REMEMBER ME</span>
                    </label>
                </div>

                {/* <div className='mt-4'>
                    <div className='flex items-center justify-center'>
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="underline text-sm text-gray-500 hover:text-gray-700"
                        >
                            Forgot your password?
                        </Link>
                    )}
                    </div>
                </div> */}

                <div className="flex items-center justify-center mt-4">
                    <PrimaryButton className="mt-6" processing={processing}>
                        Login
                    </PrimaryButton>
                </div>
                <div className='my-14'>
                    <h2 className="or text-white font-bold text-xl"><span>OR</span></h2>
                </div>
                <div className='mt-4'>
                    <div className='flex items-center justify-center'>
                        <h1 className="text-white text-md font-bold text-center">NEED AN ACCOUNT?</h1>
                        <Link
                            href={route('register')}
                            className="underline text-2xl font-bold text-white hover:text-gray-500 mx-4 mb-2 transition ease-in-out duration-150"
                        >
                            REGISTER
                        </Link>
                    </div>
                </div>
            </form>
        </GuestLayout>
    );
}
