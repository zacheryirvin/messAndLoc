import React, { useState } from "react";

import { Input } from "react-native-elements";

const LoginForm = () => {
  return (
    <>
      <Input placeholder="Username" />
      <Input placeholder="Password" />
    </>
  );
};

export default LoginForm;
