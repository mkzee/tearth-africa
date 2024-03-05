import { useStateProvider } from "@context/StateContext";
import { reducerCases } from "@context/constants";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { MdFacebook } from "react-icons/md";

function Authwrapper({type}) {
    const [{ showLoginModal, showSignUpModal }, dispatch] = useStateProvider();
    const [values, setValues] = useState({email: "", password: ""});

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
     };

  return (
    <div className="fixed top-0 z-[100]">
        <div className="h-[100vh] w-[100vw] backdrop-blur-md fixed top-0" id="blur-div">

        </div>
        <div className="h-[100vh] w-[100vw] flex flex-col justify-center items-center">
            <div className="fixed z-[101] h-max w-max bg-white flex flex-col justify-center items-center" id="auth-modal">
                <div className="flex flex-col justify-center items-center p-8 gap-7">
                    <h3 className="text-2xl font-semibold text-slate-700">
                        {type === "login" ? "login" : "signup"}
                    </h3>
                    <div className="flex flex-col gap-5">
                        <button className="border border-slate-300 p-3 font-medium w-80 flex items-center justify-center relative">
                            <FcGoogle className="absolute left-4 text-2xl" />
                            Continue with Google
                        </button>
                        <button className="text-white bg-blue-500 p-3 font-semibold w-80 flex items-center justify-center relative">
                            <MdFacebook className="absolute left-4 text-2xl" />
                            Continue with Facebook
                        </button>
                    </div>
                    <div className="relative  w-full text-center">
                        <span className="before:content-[''] before:h-[0.5px] before:w-80 before:absolute before:top-[50%] before:left-0 before:bg-slate-400">
                            <span className="bg-white relative z-10 px-2">OR</span>
                        </span>
                    </div>
                    <div className="flex flex-col gap-5">
                        <input
                            type="text"
                            name="email"
                            placeholder="Email / Username"
                            className="border border-slate-300 p-3 w-80"
                            value={values.email}
                            onChange={handleChange}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="border border-slate-300 p-3 w-80"
                            name="password"
                            value={values.email}
                            onChange={handleChange}
                        />
                        <button
                            className="bg-[#1DBF73] text-white px-12 text-lg font-semibold rounded-r-md p-3 w-80"
                            type="button"
                        >
                            Continue
                        </button>
                    </div>
                </div>
                <div className="py-5 w-full flex items-center justify-center border-t border-r-slate-400">
                    <span className="text-sm  text-slate-700">
                        {" "}
                        {type === "login" ? (
                            <>
                                Not a member yet?&nbsp;
                                <span
                                    className="text-[#1DBF73] cursor-pointer"
                                    onClick={() => {
                                        dispatch({
                                            type: reducerCases.TOGGLE_SIGNUP_MODAL,
                                            showSignUpModal: true,
                                        })
                                        dispatch({
                                            type: reducerCases.TOGGLE_LOGIN_MODAL,
                                            showLoginModal: false,
                                        });
                                    }}
                                >
                                    Join Now
                                </span>
                            </>
                        ) : (
                            <>
                                Already a member?&nbsp;
                                <span
                                    className="text-[#1DBF73] cursor-pointer"
                                    onClick={() => {
                                        dispatch({
                                            type: reducerCases.TOGGLE_LOGIN_MODAL,
                                            showLoginModal: true,
                                        });
                                        dispatch({
                                            type: reducerCases.TOGGLE_SIGNUP_MODAL,
                                            showSignUpModal: false,
                                        });
                                    }}
                                >
                                    Login Now
                                </span>
                            </>
                        )}
                    </span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Authwrapper