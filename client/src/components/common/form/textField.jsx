import React, { useState } from "react";
import PropTypes from "prop-types";

const TextField = ({ label, type, name, value, onChange, error }) => {
    const [showPassword, setShowPassword] = useState(false);
    const getClasses = () => {
        return "form-control" + (error ? " is-invalid" : "");
    };
    const toogleShowPassword = () => {
        setShowPassword((prevstate) => !prevstate);
    };
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };

    return (
        <div className="mb-4">
            <label htmlFor={name}>{label}</label>
            <div className="input-group has-validation">
                <input
                    type={showPassword ? (type = "text") : type}
                    id={name}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    className={getClasses()}
                />
                {name === "password" && (
                    <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={toogleShowPassword}
                    >
                        <i
                            className={
                                "bi bi-eye" + (showPassword ? "-slash" : "")
                            }
                        ></i>
                    </button>
                )}
                {error && <div className="invalid-feedback">{error}</div>}
            </div>
        </div>
    );
};
TextField.defaultProps = {
    type: "text"
};
TextField.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string
};
export default TextField;
