import React, { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/inertia-react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        address: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <form onSubmit={submit}>
            <div className=''>
                    <h1 className="text-white text-6xl font-bold text-center">REGISTER</h1>
                </div>
                <div>
                    <InputLabel forInput="name" value="NAME" className="text-white text-xl py-2 font-semibold"/>

                    <TextInput
                        type="text"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full py-2"
                        autoComplete="name"
                        isFocused={true}
                        handleChange={onHandleChange}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>
                
                <div>
                    <InputLabel forInput="address" value="ADDRESS" className="text-white text-xl py-2 font-semibold"/>

                    <TextInput
                        type="text"
                        name="address"
                        value={data.address}
                        className="mt-1 block w-full py-2"
                        autoComplete="address"
                        isFocused={true}
                        handleChange={onHandleChange}
                        required
                    />

                    <InputError message={errors.address} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel forInput="email" value="EMAIL" className="text-white text-xl pb-2 font-semibold" />

                    <TextInput
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full py-2"
                        autoComplete="username"
                        handleChange={onHandleChange}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel forInput="password" value="PASSWORD" className="text-white text-xl pb-2 font-semibold" />

                    <TextInput
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full py-2"
                        autoComplete="new-password"
                        handleChange={onHandleChange}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel forInput="password_confirmation" value="CONFIRM PASSWORD" className="text-white text-xl pb-2 font-semibold" />

                    <TextInput
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full py-2"
                        handleChange={onHandleChange}
                        required
                    />

                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="flex items-center justify-center mt-4">
                    {/* <Link href={route('login')} className="underline text-sm text-gray-600 hover:text-gray-900">
                        Already registered?
                    </Link> */}

                    <PrimaryButton className="mt-6" processing={processing}>
                        Register
                    </PrimaryButton>
                </div>
                <div className='my-14'>
                    <h2 className="or text-white font-bold text-xl"><span>OR</span></h2>
                </div>
                <div className='mt-4'>
                    <div className='flex items-center justify-center'>
                        <h1 className="text-white text-md font-semibold text-center">ALREADY A USER?</h1>
                        <Link
                            href={route('login')}
                            className="underline text-2xl font-bold text-white hover:text-gray-500 mx-4 mb-2 transition ease-in-out duration-150"
                        >
                            LOGIN
                        </Link>
                    </div>
                </div>
            </form>
        </GuestLayout>
    );
}
