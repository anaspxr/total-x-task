import EnterNumber from "../components/EnterNumber";

export default function Login() {
  // const handleVerifyOtp = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const otp = "123456";
  //   try {
  //     const res = await otpConfirmation?.confirm(otp);
  //     console.log(res);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <div className="flex h-screen items-center justify-center">
      <EnterNumber />
    </div>
  );
}
