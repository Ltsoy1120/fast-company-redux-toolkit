import React, { useEffect, useState } from "react";
import TextField from "../common/form/textField";
import validator from "../../utils/validator";
import CheckBoxField from "../common/form/checkBoxField";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAuthErrors, login } from "../../store/users";
// import * as yup from "yup"; // библиотека для валидации полей формы

const LoginForm = () => {
    // console.log(process.env); // для проверки переменных окружения
    const history = useHistory();
    const dispatch = useDispatch();
    const [data, setData] = useState({
        email: "",
        password: "",
        stayOn: false
    });
    const loginError = useSelector(getAuthErrors());
    const [errors, setErrors] = useState({});

    const handleChange = (target) => {
        setData((prevState) => ({ ...prevState, [target.name]: target.value }));
    };
    // валидация через библиотеку yup
    // const validateSchema = yup.object().shape({
    //     password: yup
    //         .string()
    //         .required("Пароль обязателен для заполнения")
    //         .matches(
    //             /(?=.*[A-Z])/,
    //             "Пароль должен содержать хотя бы одну заглавную букву"
    //         )
    //         .matches(
    //             /(?=.*[0-9])/,
    //             "Пароль должен содержать хотя бы одну цифру"
    //         )
    //         .matches(
    //             /(?=.*[!@#$%^&*])/,
    //             "Пароль должен содержать хотя бы один из символов !@#$%^&*"
    //         )
    //         .matches(
    //             /(?=.{8,})/,
    //             "Пароль одолжен содержать минимум 8 символов"
    //         ),
    //     email: yup
    //         .string()
    //         .required("Электронная почта обязательна для заполнения")
    //         .email("Электронная почта введена не корректно")
    // });
    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Электронная почта введена не корректно"
            }
        },
        password: {
            isRequired: {
                message: "Пароль обязателен для заполнения"
            },
            isCapital: {
                message: "Пароль должен содержать хотя бы одну заглавную букву"
            },
            isContainDigit: {
                message: "Пароль должен содержать хотя бы одну цифру"
            },
            min: {
                message: "Пароль одолжен содержать минимум 8 символов",
                value: 8
            }
        }
    };
    useEffect(() => {
        validate();
    }, [data]);

    // метод validate c yup
    // const validate = () => {
    //     validateSchema
    //         .validate(data)
    //         .then(() => setErrors({}))
    //         .catch((err) => setErrors({ [err.path]: err.message }));
    //     return Object.keys(errors).length === 0;
    // };
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        console.log(data);
        const redirect = history.location.state
            ? history.location.state.from.pathname
            : "/";
        dispatch(login({ payload: data, redirect }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Электронная почта"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />
            <TextField
                label="Пароль"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
            />
            <CheckBoxField
                value={data.stayOn}
                onChange={handleChange}
                name="stayOn"
            >
                Оставаться в системе
            </CheckBoxField>
            {loginError && <p className="text-danger">{loginError}</p>}
            <button
                type="submit"
                disabled={!isValid}
                className="btn btn-primary w-100"
            >
                Submit
            </button>
        </form>
    );
};

export default LoginForm;
