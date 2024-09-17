import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Button,
    useToast,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

export default function Login() {
    const [, setCookie] = useCookies(['auth']);
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);
    const toast = useToast();

    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await fetch('/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!data.errors) {
                console.log(data.data.token);
                setLoading(false);

                const d = moment().add(1, 'm').utc(true).local().toDate();
                setCookie('auth', data.data.token, {
                    expires: d,
                    path: '/', // Pastikan cookie tersedia di seluruh situs
                    sameSite: 'strict', // Perlindungan terhadap CSRF
                });

                toast({
                    title: 'Sukses Login',
                    description: 'Terimakasih!',
                    status: 'success',
                });
                navigate('/');
            } else {
                toast({
                    title: 'Gagal',
                    description: `${data.errors}`,
                    status: 'error',
                });
                setLoading(false);
                throw new Error(data.errors);
            }
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };
    return (
        <section>
            <div className="min-h-screen flex justify-center items-center">
                <div className="w-1/3 rounded-xl bg-white p-6 border-2 border-darks2 shadow-box">
                    <h1 className="text-5xl font-semibold text-left my-2">
                        Login
                    </h1>
                    <p className="text-left mb-6">
                        Silahkan masukan data anda dengan benar
                    </p>
                    <form>
                        <FormControl className="text-darks-2" isRequired>
                            <FormLabel fontWeight="bold">Email</FormLabel>
                            <Input
                                id="email"
                                type="email"
                                bgColor="white"
                                color="GrayText"
                                borderColor="black"
                                onChange={handleChange}
                            />
                            <FormHelperText textAlign="left">
                                Mohon masukan email anda!
                            </FormHelperText>
                            <FormErrorMessage textAlign="left">
                                Email is required.
                            </FormErrorMessage>
                            <FormLabel fontWeight="bold" marginTop={5}>
                                Password
                            </FormLabel>
                            <Input
                                id="password"
                                type="password"
                                bgColor="white"
                                color="GrayText"
                                borderColor="black"
                                onChange={handleChange}
                            />
                            <FormHelperText textAlign="left">
                                Mohon masukan password anda!
                            </FormHelperText>
                            <FormErrorMessage textAlign="left">
                                Email is required.
                            </FormErrorMessage>
                            <Button
                                loadingText="Login"
                                isLoading={loading}
                                onClick={handleSubmit}
                                marginTop={5}
                                backgroundColor="purples"
                                color="white"
                                width="100%"
                                type="submit"
                            >
                                Login
                            </Button>
                        </FormControl>
                    </form>
                </div>
            </div>
        </section>
    );
}
