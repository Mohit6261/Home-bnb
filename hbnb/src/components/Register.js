import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import { API_END_POINT } from "./utils/constant";
import toast from"react-hot-toast";
import { useGlobal } from './GlobalContext.js';
import {useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../redux/userSlice";

function Register() {
    //const passwordRules = /^(?=.\d)(?=.[a-z])(?=.*[A-Z]).{5,}$/;
    //.matches(passwordRules, { message: "Please create a stronger password" })
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const isLoading = useSelector((store) => store.app.isLoading);
    const initialValues = {
        name: "",
        email: "",
        password: "",
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("*Required"),
        email: Yup.string().email().required("*Required"),
        password: Yup
            .string()
            .required("*Required"),
    });

    const onSubmit = async (data) => {
        console.log(data);
        dispatch(setLoading(true));
        try {
            const res = await axios.post(`${API_END_POINT}/register`, data, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });

            if (res.data.success) {
                toast.success(res.data.message);
            }
            navigate("/login");
        }
        catch (errors) {
            alert(errors.response.data.errors[0].message)
        }
        finally{
            dispatch(setLoading(false));
        }

    };

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-40">
                <h1 className="text-4xl text-center">Register</h1>
                <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    validationSchema={validationSchema}
                >
                    <Form className="max-w-md mx-auto">
                        <Field
                            autoComplete="off"
                            id="inputName"
                            name="name"
                            placeholder="Enter Your Name"
                            className="w-full border mt-8 mb-2 py-2 px-3 rounded-2xl"
                        />
                        <ErrorMessage
                            name="name"
                            component="span"
                            className="text-red-500 text-xs italic"
                        />
                        <Field
                            autoComplete="off"
                            id="inputEmail"
                            name="email"
                            placeholder="your@email.com"
                            className="w-full border py-2 px-3 mb-2 rounded-2xl"
                        />
                        <ErrorMessage
                            name="email"
                            component="span"
                            className="text-red-500 text-xs italic relative top-0"
                        />
                        <Field
                            autoComplete="off"
                            id="inputPassword"
                            name="password"
                            type="password"
                            placeholder="Password"
                            className="w-full border mb-3 py-2 px-3 rounded-2xl"
                        />
                        <ErrorMessage
                            name="password"
                            component="span"
                            className="text-red-500 text-xs italic"
                        />
                        <button
                            type="submit"
                            className="w-full bg-[#ff385c] text-white rounded-2xl mt-3 py-2"
                        >
                            Register
                        </button>
                        <div className="text-center text-sm py-2 text-[#717171]">
                            Already have an account? <Link className="underline text-black" to={'/login'}>Login</Link>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    );
}

export default Register;