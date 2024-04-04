import { useNavigate } from "react-router-dom";
import { auth } from "./config/firebase";
import { signOut } from "firebase/auth";
import { useState, useEffect } from "react";
import axios from 'axios';
import "./Profile.css";
import { genderOptions, genderMaritalOptions, districtOptions, cityOptions, productCodeOptions, assetTypeOptions, contractStatusOptions } from "./options";
import Loader from "./Loader";
import CenterBox from "./CenterBox";
import Card from "./card";
import {  useDispatch } from 'react-redux';
import {addNewCard } from './actions/actions';
import { useSelector} from 'react-redux';
import {filterCards} from './util';


const Profile = () => {

    const navigate = useNavigate();
    const user = auth.currentUser;
    const [isGetting,setIsGetting] = useState(false);
    const [isShowAlert,setShowAlert] = useState(false);
    const [isDeafult,setIsDeafult] = useState("");
    const [safeAmount,setSafeAmount] = useState("");
    const [safeFactor,setSafeFactor] = useState("");
    const dispatch =useDispatch();
    const history =useSelector((state)=>state.historyListReducer);
    console.log(history, ' all jobs')

    // Initialize form data with values from local storage or defaults
    const initialFormData = () => {
        return {
            firstName: "",
            lastName: "",
            age: "",
            email: user.email,
            gender:"",
            matrialStatus: "",
            district:"",
            city:"",
            income:"",
            expense:"",
            finAmount: "",
            noOfRentals: "",
            noOfPaidRentals: "",
            effectiveRate: "",
            netRental:"",
            reshedule: false,
            reg: false,
            yom:"",
            pName:"",
            cStatus:"",
            aType:"",
        };
    };

    const [formData, setFormData] = useState(initialFormData);

    useEffect(() => {

        const checkAuthentication = async () => {
            if (!user) {
                // User is not authenticated, redirect to login page
                navigate("/login");
            }
        };

        checkAuthentication();
    }, [user, navigate]);
    const handleChange = (e) => {
        const { name, value, type } = e.target;
        const newValue = type === "checkbox" ? !formData[name] : value;
        setFormData((prevState) => ({
            ...prevState,
            [name]: newValue,
        }));
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Here you can handle the submission of the form data, e.g., saving it to a database
        console.log("Form submitted:", formData);
        setIsGetting(true)
    const res = await axios.post("http://127.0.0.1:5000/predict_api",formData);    
    setIsGetting(false);
    console.log(res.data);
    setIsDeafult(res.data.is_deafult);
    setSafeAmount(res.data.safe_amount);
    setSafeFactor(res.data.safe_factor);
    setShowAlert(true)
    };

    const logoutUser = async (e) => {
        e.preventDefault();

        await signOut(auth);
        navigate("/");
    }

    return (
        <>
        {isGetting? <Loader />:
            (<div className="container">
            <div className="row justify-content-center">
                <div className="col-md-4 text-center">
                    <p>Welcome <em className="text-decoration-underline">{user.email}</em>. You are logged in!</p>
                </div>
            </div>
            <div style={{ position: 'fixed', top: '10px', right: '10px', zIndex: '1000' }}>
    <button type="submit" className="btn btn-primary pt-3 pb-3" onClick={(e) => logoutUser(e)}>Logout</button>
</div>

            <div className="row justify-content-center">
                <div className="col-md-8"> {/* Adjust the width of the form container */}
                    <form onSubmit={handleSubmit} className="profile-form"> {/* Apply CSS class to the form */}
                        <div className="row justify-content-center">
                            <div className="row justify-content-center text-center">
                                <h4>Personal Details</h4>
                            </div>
                            <div className="col-md-6"> {/* Adjust the column width */}
                                <div className="mb-3">
                                    <label htmlFor="firstName" className="form-label">First Name *</label>
                                    <input type="text" className="form-control" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="age" className="form-label">Age *</label>
                                    <input type="number" className="form-control" id="age" name="age" value={formData.age} onChange={handleChange} />
                                </div>
                                <div className="row justify-content-center">
                                    <div className="mb-3 col-md-6">
                                        <label htmlFor="district" className="form-label">District</label>
                                        <select className="form-control" value={formData.district} onChange={handleChange} name="district">
                                            <option value="" disabled selected hidden>Select a district</option>
                                            {districtOptions.map(option => (
                                                <option key={option.value} value={option.value}>{option.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-3 col-md-6">
                                        <label htmlFor="maritalStatus" className="form-label">City</label>
                                        <select className="form-control" value={formData.city} onChange={handleChange} name="city">
                                            <option value="" disabled selected hidden>Select a city</option>
                                            {cityOptions.map(option => (
                                                <option key={option.value} value={option.value}>{option.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6"> {/* Adjust the column width */}
                                <div className="mb-3">
                                    <label htmlFor="lastName" className="form-label">Last Name *</label>
                                    <input type="text" className="form-control" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} />
                                </div>
                                <div className="row justify-content-center">
                                    <div className="mb-3 col-md-6">
                                        <label htmlFor="gender" className="form-label">Gender *</label>
                                        <select className="form-control" value={formData.gender} onChange={handleChange} name="gender">
                                        <option value="" disabled selected hidden>Select Gender</option>
                                            {genderOptions.map(option => (
                                                <option key={option.value} value={option.value}>{option.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-3 col-md-6">
                                        <label htmlFor="maritalStatus" className="form-label">Marital Status *</label>
                                        <select className="form-control" value={formData.matrialStatus} onChange={handleChange} name="matrialStatus">
                                        <option value="" disabled selected hidden>Select Marital Status</option>
                                            {genderMaritalOptions.map(option => (
                                                <option key={option.value} value={option.value}>{option.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="row justify-content-center text-center">
                                <h4>Loan Details</h4>
                            </div>
                            <div className="col-md-6"> {/* Adjust the column width */}
                                <div className="mb-3">
                                    <label htmlFor="income" className="form-label">Income *</label>
                                    <input type="text" className="form-control" id="firstName" name="income" value={formData.income} onChange={handleChange} />
                                </div>
                                <div className="row justify-content-center">
                                    <div className="mb-3 col-md-6">
                                        <label htmlFor="finAmount" className="form-label">Finance Ammount * (LKR)</label>
                                        <input type="text" className="form-control" id="finAmount" name="finAmount" value={formData.finAmount} onChange={handleChange} />
                                    </div>
                                    <div className="mb-3 col-md-6">
                                        <label htmlFor="netRental" className="form-label">Net Rental * (LKR)</label>
                                        <input type="text" className="form-control" id="netRental" name="netRental" value={formData.netRental} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="mb-3 form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="reshedule"
                                        name="reshedule"
                                        checked={formData.reshedule}
                                        onChange={handleChange}
                                    />
                                    <label className="form-check-label" htmlFor="reshedule">
                                        Reschedule
                                    </label>
                                </div>
                            </div>
                            <div className="col-md-6"> {/* Adjust the column width */}
                                <div className="mb-3">
                                    <label htmlFor="expense" className="form-label">Expense *</label>
                                    <input type="text" className="form-control" id="expense" name="expense" value={formData.expense} onChange={handleChange} />
                                </div>
                                <div className="row justify-content-center">
                                    <div className="mb-3 col-md-4">
                                        <label htmlFor="noOfRentals" className="form-label">Total Rentals *</label>
                                        <input type="number" className="form-control" id="noOfRentals" name="noOfRentals" value={formData.noOfRentals} onChange={handleChange} />
                                    </div>
                                    <div className="mb-3 col-md-4">
                                        <label htmlFor="noOfPaidRentals" className="form-label">Paid Rentals *</label>
                                        <input type="number" className="form-control" id="noOfPaidRentals" name="noOfPaidRentals" value={formData.noOfPaidRentals} onChange={handleChange} />
                                    </div>
                                    <div className="mb-3 col-md-4">
                                        <label htmlFor="effectiveRate" className="form-label">Rate * %</label>
                                        <input type="number" className="form-control" id="effectiveRate" name="effectiveRate" value={formData.effectiveRate} onChange={handleChange} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="row justify-content-center text-center">
                                <h4>Property Details</h4>
                            </div>
                            <div className="col-md-6"> {/* Adjust the column width */}
                                <div className="mb-3">
                                    <label htmlFor="pName" className="form-label">Product Category *</label>
                                    <select className="form-control" value={formData.pName} onChange={handleChange} name="pName">
                                        <option value="" disabled selected hidden>Select a Product Code</option>
                                        {productCodeOptions.map(option => (
                                            <option key={option.value} value={option.value}>{option.label}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="yom" className="form-label">Year Of Manufactured *</label>
                                    <input type="number" className="form-control" id="yom" name="yom" value={formData.yom} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="col-md-6"> {/* Adjust the column width */}
                                <div className="mb-3">
                                    <label htmlFor="aType" className="form-label">Asset Type</label>
                                    <select className="form-control" value={formData.aType} onChange={handleChange} name="aType">
                                        <option value="" disabled selected hidden>Select a Product Code</option>
                                        {assetTypeOptions.map(option => (
                                            <option key={option.value} value={option.value}>{option.label}</option>
                                        ))}
                                    </select>   
                                </div>
                                <div className="row justify-content-center">
                                    <div className="mb-3 col-md-6">
                                        <label htmlFor="cStatus" className="form-label">Contract Status *</label>
                                        <select className="form-control" value={formData.cStatus} onChange={handleChange} name="cStatus">
                                            <option value="" disabled selected hidden>Select Contract Status</option>
                                            {contractStatusOptions.map(option => (
                                                <option key={option.value} value={option.value}>{option.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-3 col-md-6 form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id="reg"
                                            name="reg"
                                            checked={formData.reg}
                                            onChange={handleChange}
                                        />
                                        <label className="form-check-label" htmlFor="reg">
                                            Registered
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <button type="submit" className="btn btn-primary pt-3 pb-3" style={{ maxWidth: '100px' }}>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-md-4 text-center">
                   <h4>History</h4>
                </div>
            <div className="row justify-content-center">   
            {filterCards(user.email, history.jobs).map(job => (
                        <div className="col-md-4" key={job.timestamp} >
                            <Card jobCard={job} />
                        </div>
            ))}
            </div>
            </div>
        </div>
        )};
        {isShowAlert? <div className="alert-box">
            <CenterBox status={isDeafult} amount= {safeAmount} factor = {safeFactor} name = {formData.firstName} name2 = {formData.lastName} onClose={() =>{ 
                setShowAlert(false); 
                setFormData(initialFormData);
                const res = {
                    income: formData.income,
                    expense: formData.expense,
                    pName : formData.pName,
                    finAmount : formData.finAmount,
                    noOfRentals : formData.noOfRentals,
                    noOfPaidRentals: formData.noOfPaidRentals,
                    is_default: isDeafult,
                    safeAmount : safeAmount,
                    safeFactor : safeFactor,
                    user : user.email,               
                };
                dispatch(addNewCard(res));


        }}/>
            </div> : ""}
        </>
    )
}

export default Profile;
