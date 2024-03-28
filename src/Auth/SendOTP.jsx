import {Button, Divider, TextField ,CircularProgress} from "@mui/material";
import {BiSend} from "react-icons/bi";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import toast from "react-hot-toast";
import {sendOTP} from "../Redux/slice/AuthSlice.jsx";
import {Link, useNavigate} from "react-router-dom";


export default function SendOTP() {

    const [otp, setOtp] = useState("")

    const {isLoading} = useSelector((state) => state.auth)

    const  navigate = useNavigate()


    const dispatch = useDispatch()

    async function sendOtpHandler(e) {
        e.preventDefault()


        const email = {
            email: otp
        }


        const res = await dispatch(sendOTP(email))


        if (res.payload?.success === true) {
            toast.success("otp send successfully send")
            navigate("/signup")
            setOtp(" ")

        }


    }


    return (
        <div className="w-full h-[80vh] flex justify-center items-center">

            <div
                className="w-full  shadow-lg sm:w-1/2  p-6 rounded-l flex-col flex justify-center flex-wrap items-center">
                <form>

                    <div className="text-center mx-auto mb-3">
                        {
                            isLoading ? <div> <CircularProgress/></div> : ""
                        }
                    </div>


                    <div className="mb-3 text-center text-xl">

                        <h1>Sign Up Now </h1>
                    </div>
                    <div className="mb-3 w-[21rem] ">
                        <TextField type="email" onChange={(e) => setOtp(e.target.value)} fullWidth className="w-full"
                                   label="Enter Email Id" id="email"
                                   size="small"/>
                    </div>


                    <div className="mb-3">
                        <Button onClick={sendOtpHandler} variant="contained" className="w-full"
                                endIcon={<BiSend/>}> Send Otp </Button>
                    </div>


                </form>

                <div className="">
                    <Divider>Or</Divider>
                    <p className="text-center"> Already have an account? <span
                        className="text-blue-400"> <Link to="/login">  Login now  </Link> </span>
                    </p>
                </div>

            </div>

        </div>
    )
}