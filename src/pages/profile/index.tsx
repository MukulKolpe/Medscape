import React, { useState, useEffect } from "react";
import userabijson from "../../utils/usersideabi.json";
import { ethers } from "ethers";
import { useAuth } from "@polybase/react";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [aadharNo, setAadharNo] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState(0);
  const [bloodGrp, setBloodGrp] = useState("");
  const [dob, setDob] = useState("");
  const [isDiabetic, setIsDiabetic] = useState(true);
  const [hasHighBP, setHasHighBP] = useState(true);
  const [hasDisability, setHasDisability] = useState(true);

  const { auth, state } = useAuth();

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const userContract = new ethers.Contract(
      "0x353cefb7f0a4B01e88D4C6d772FE9e5FA808DFDf",
      userabijson,
      signer
    );

    // console.log(state?.userId);
    userContract.getUserbyWalletAddress(state?.userId).then((res: any) => {
      console.log(
        res.name,
        res.email,
        res.aadharNo,
        res.gender,
        res.age,
        res.bloodGrp,
        res.dob,
        res.isDiabetic,
        res.isHandicap,
        res.isHighBp
      );
      setName(res.name);
      setEmail(res.email);
      setAadharNo(res.aadharNo);
      setGender(res.gender);
      setAge(res.age);
      setBloodGrp(res.bloodGrp);
      setDob(res.dob);
      setIsDiabetic(res.isDiabetic);
      setHasDisability(res.isHandicap);
      setHasHighBP(res.isHighBp);
    });
  }, [state?.userId]);

  return (
    <div>
      <p>
        {name}, {email}, {aadharNo}, {gender}, {age}, {bloodGrp}, {dob},
        {String(isDiabetic)}, {String(hasHighBP)}, {String(hasDisability)}
      </p>
    </div>
  );
};

export default Profile;
