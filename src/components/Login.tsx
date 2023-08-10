import axios from "axios";
import { Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { AuthContext, AuthContextType } from "../contexts/AuthContext";
import { CONSOLE_BASE_URL } from "../utils/Constants";
import DozeeIcon from "../assets/Icon";
import { FetchState } from "../interfaces/Interfaces";
import { useFetchNewToken } from "../customHooks/useFetchNewToken";

const Login = () => {
  const [medium, setMedium] = useState<string>("");
  const [mediumValue, setMediumValue] = useState<string>("");
  const [mediumValueError, setMediumValueError] = useState(false);
  const [otpRequested, setOtpRequested] = useState(false);
  const [otpRequestOk, setOtpRequestOk] = useState(false);
  const [sessionId, setSessionId] = useState<string>("");
  const [otpSubmitted, setOtpSubmitted] = useState(false);
  const [otp, setOtp] = useState<string>("");
  const [otpFieldError, setOtpFieldError] = useState(false);
  const [otpVerfied, setOtpVerified] = useState(false);
  const [selectedOrganzationId, setSelectedOrganzationId] = useState();
  const [organizationOptions, setOrganizationOptions] = useState([]);
  const [tokenRequested, setTokenRequested] = useState(false);

  const { authModel, setAuthModel } = React.useContext(
    AuthContext
  ) as AuthContextType;
  const [fetchState, getNewTokenRequest] = useFetchNewToken();

  const navigate = useNavigate();

  useEffect(() => {
    if (authModel?.verified()) {
      navigate("/alerts");
    }
  }, [authModel, navigate]);

  function setMediumAndValue(e: any) {
    const mediumValue = "" + e.target.value;
    if (mediumValue.indexOf("@") !== -1) {
      setMedium("Email");
    } else {
      setMedium("Mobile");
    }
    setMediumValue(mediumValue);
  }

  function isValidMediumValue(): boolean {
    const expression =
      /^[\w!#$%&'*+/=?`{|}~^-]+(?:\.[\w!#$%&'*+/=?`{|}~^-]+)*@(?:[A-Za-z0-9-]+\.)+[A-Za-z]{2,6}|(\+91[0-9]{10})$/;
    const emailPhoneRegex = new RegExp(expression);
    const result = emailPhoneRegex.test(mediumValue);
    setMediumValueError(!result);
    return result;
  }

  function requestOtp(e: any) {
    if (!isValidMediumValue()) {
      return;
    }
    setMediumValueError(false);
    setOtpRequested(true);
    axios
      .post(`${CONSOLE_BASE_URL}/api/otp/request`, {
        Medium: medium,
        MediumValue: mediumValue,
      })
      .then((e) => {
        setSessionId(e.data.SessionId);
        setOtpRequestOk(true);
      })
      .catch((e) => {
        setOtpRequested(false);
      })
      .finally(() => console.log("Otp Request Completed"));
    e.preventDefault();
  }

  function isValidOtp(): boolean {
    if (otp === "" || isNaN(Number(otp))) {
      setOtpFieldError(true);
      return false;
    }
    setOtpFieldError(false);
    return true;
  }

  function verifyOtp(e: any) {
    if (!isValidOtp()) {
      return;
    }

    setOtpSubmitted(true);
    const data = {
      Medium: medium,
      MediumValue: mediumValue,
      SessionId: sessionId,
      Otp: otp,
    };
    axios
      .post(`${CONSOLE_BASE_URL}/api/otp/verify`, data, {
        params: { category: "OPERATOR" },
      })
      .then((e) => {
        localStorage.setItem("AccessToken", e.data.AuthToken);
        return axios.get(`${CONSOLE_BASE_URL}/api/auths/check`);
      })
      .then((e) => {
        if (e.data.length === 0) {
          alert("Operator not found");
          window.location.reload();
        }
        const options = e.data[0].Operators.map((o: any) => {
          return {
            label: o.Organizations.OrganizationName,
            value: o.Organizations.OrganizationId,
          };
        });
        setOrganizationOptions(options);
        setOtpVerified(true);
      })
      .catch((e) => {
        setOtpRequested(true);
        setOtpRequestOk(true);
        setOtpVerified(false);
        setOtpSubmitted(false);
        console.log("Error", e.toString());
      })
      .finally(() => console.log("Verify Otp Completed"));
    e.preventDefault();
  }

  useEffect(() => {
    switch (fetchState) {
      case FetchState.SUCCESS:
        navigate("/alerts");
        break;
      case FetchState.ERROR:
        setTokenRequested(false);
        console.log("Error in fetching the access token");
        break;

      default:
        break;
    }
  }, [fetchState]);

  function newToken(e: any) {
    e.preventDefault();
    if (selectedOrganzationId !== undefined) {
      setTokenRequested(true);
      getNewTokenRequest(selectedOrganzationId);
    } else {
      console.log("OrganzationId is not selected");
    }
  }

  return (
    <div>
      <div className="flex h-screen flex-col">
        <div className="flex w-full items-center justify-center h-screen">
          <DozeeIcon />
        </div>
        <div className="flex justify-center">
          <div className="flex basis-1/3 justify-center border border-blue-200 rounded-t-lg text-2xl border-b-0 p-2">
            <div className="drop-shadow-sm text-[#0055d2]">Sign In</div>
          </div>
        </div>
        <div className="flex w-full justify-center items-center h-screen">
          <div className="flex flex-col basis-1/3">
            <div className="shadow-lg p-8 rounded-b-lg border border-blue-200 border-t-0">
              <form className="flex flex-col gap-4">
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="mediumValue" value="Your Email or Phone" />
                  </div>
                  <TextInput
                    id="mediumValue"
                    type="text"
                    data-testid="mediumValue"
                    placeholder="Email or Phone"
                    required={true}
                    disabled={otpRequested}
                    onChange={setMediumAndValue}
                    onBlur={isValidMediumValue}
                    color={mediumValueError ? "failure" : ""}
                    helperText={
                      mediumValueError && (
                        <React.Fragment>
                          <span className="font-medium">
                            Please enter a valid email or phone number
                          </span>
                        </React.Fragment>
                      )
                    }
                  />
                </div>
                {otpRequestOk && (
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="otp" value="Received OTP" />
                    </div>
                    <TextInput
                      id="otp"
                      type="text"
                      data-testid="otp"
                      required={true}
                      disabled={otpSubmitted}
                      onChange={(e) => setOtp(e.target.value)}
                      onBlur={isValidOtp}
                      color={otpFieldError ? "failure" : ""}
                      helperText={
                        otpFieldError && (
                          <React.Fragment>
                            <span className="font-medium">
                              Please enter a valid otp
                            </span>
                          </React.Fragment>
                        )
                      }
                    />
                  </div>
                )}
                {!otpRequestOk && (
                  <Button onClick={requestOtp} className="bg-[#1A56DB]">
                    {otpRequested && <Spinner size="sm" />}
                    <span className="px-2">Submit</span>
                  </Button>
                )}
                {otpRequestOk && !otpVerfied && (
                  <div>
                    <Button className="w-full bg-[#1A56DB]" onClick={verifyOtp}>
                      {otpSubmitted && <Spinner size="sm" />}
                      <span className="px-2">Verify</span>
                    </Button>
                    <div className="text-center mt-2 ">
                      <span
                        onClick={requestOtp}
                        className=" text-blue-600 hover:underline hover:cursor-pointer"
                      >
                        Resend OTP
                      </span>
                    </div>
                  </div>
                )}
              </form>
              {otpVerfied && (
                <form className="flex flex-col gap-4">
                  <div>
                    <div className="mb-2 block">
                      <Label
                        htmlFor="selectOrganization"
                        value="Select Organization"
                      />
                    </div>
                    <div data-testid="selectOrganization1">
                      <Select
                        onChange={(e: any) => setSelectedOrganzationId(e.value)}
                        className="form-control block w-full p-1"
                        id="selectOrganization"
                        data-testid="selectOrganization2"
                        options={organizationOptions}
                        placeholder="Select"
                      />
                    </div>
                  </div>
                  <Button onClick={newToken} className="bg-[#1A56DB]">
                    {tokenRequested && <Spinner size="sm" />}
                    <span className="px-2">Continue</span>
                  </Button>
                </form>
              )}
              <div className="flex">
                <p className="text-sm text-center text-gray-500 mt-4">
                  By proceeding further, you agree to the{" "}
                  <a
                    rel="noreferrer"
                    target="_blank"
                    className="text-blue-600 hover:underline"
                    href="https://www.dozee.health/tnc"
                  >
                    Terms and Conditions
                  </a>
                  ,
                  <a
                    rel="noreferrer"
                    target="_blank"
                    className="text-blue-600 hover:underline"
                    href="https://www.dozee.health/privacypolicy"
                  >
                    {" "}
                    Privacy Policy
                  </a>{" "}
                  and
                  <a
                    rel="noreferrer"
                    target="_blank"
                    className="text-blue-600 hover:underline"
                    href="https://www.dozee.health/terms-of-use"
                  >
                    {" "}
                    Terms of Use
                  </a>
                  .
                </p>
              </div>
            </div>
            <div className="flex text-sm justify-center font-light">
              <div className="flex basis-10/12 pt-4">
                In case you face issues in logging in, please contact your
                relationship manager or reach out at +91-8884436933
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full justify-center h-screen"></div>
      </div>
    </div>
  );
};

export default Login;
