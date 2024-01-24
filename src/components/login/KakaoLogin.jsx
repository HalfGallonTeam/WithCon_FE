const KakaoLogin = () => {
  const code = new URL(window.location.href).searchParams.get("code");
  console.log(code);
  return <div>카카오 로그인</div>;
};

export default KakaoLogin;
