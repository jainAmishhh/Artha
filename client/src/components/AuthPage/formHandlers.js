export const handleSignup = async (formData) => {
  try {
    if (formData.password !== formData.confirmPassword) {
      throw new Error("Passwords do not match");
    }

    const res = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullname: formData.fullname,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        phonenumber: formData.number || "",
      }),
    });

    const data = await res.json();
    console.log("📌 Signup response:", data);

    if (!res.ok) throw new Error(data.message || "Signup failed");

    // Save to Local Storage
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    return data;
  } catch (err) {
    console.error("❌ Signup error:", err);
    throw err;
  }
};

export const handleLogin = async (formData) => {
  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    console.log("📌 Login response:", data);

    if (!res.ok) throw new Error(data.message || "Login failed");

    // Save to Local Storage
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    return data;
  } catch (err) {
    console.error("❌ Login error:", err);
    throw err;
  }
};

export const handleSendOtp = async (phoneNumber) => {
  try {
    const res = await fetch("http://localhost:5000/api/auth/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phonenumber: phoneNumber }),
    });

    const data = await res.json();
    console.log("📌 OTP sent response:", data);

    if (!res.ok) throw new Error(data.message || "Failed to send OTP");
    return data;
  } catch (err) {
    console.error("❌ OTP send error:", err);
    throw err;
  }
};

export const handleVerifyOtp = async (
  phoneNumber,
  otp,
  fullname = "Anonymous User"
) => {
  try {
    const res = await fetch("http://localhost:5000/api/auth/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phonenumber: phoneNumber, otp, fullname }),
    });

    const data = await res.json();
    console.log("📌 OTP verify response:", data);

    if (!res.ok) throw new Error(data.message || "OTP verification failed");

    // ADDED: Save to Local Storage upon successful OTP verification
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    return data;
  } catch (err) {
    console.error("❌ OTP verify error:", err);
    throw err;
  }
};

// export const handleSignup = async (formData) => {
//   try {
//     if (formData.password !== formData.confirmPassword) {
//       throw new Error("Passwords do not match");
//     }

//     const res = await fetch("http://localhost:5000/api/auth/signup", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         fullname: formData.fullname,
//         email: formData.email,
//         password: formData.password,
//         confirmPassword: formData.confirmPassword,
//         phonenumber: formData.number || "",
//       }),
//     });

//     const data = await res.json();
//     console.log("📌 Signup response:", data);

//     if (!res.ok) throw new Error(data.message || "Signup failed");

//     localStorage.setItem("token", data.token);
//     localStorage.setItem("user", JSON.stringify(data.user));

//     return data;
//   } catch (err) {
//     console.error("❌ Signup error:", err);
//     throw err;
//   }
// };

// export const handleLogin = async (formData) => {
//   try {
//     const res = await fetch("http://localhost:5000/api/auth/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(formData),
//     });

//     const data = await res.json();
//     console.log("📌 Login response:", data);

//     if (!res.ok) throw new Error(data.message || "Login failed");

//     localStorage.setItem("token", data.token);
//     localStorage.setItem("user", JSON.stringify(data.user));

//     return data;
//   } catch (err) {
//     console.error("❌ Login error:", err);
//     throw err;
//   }
// };

// export const handleSendOtp = async (phoneNumber) => {
//   try {
//     const res = await fetch("http://localhost:5000/api/auth/send-otp", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ phonenumber: phoneNumber }),
//     });

//     const data = await res.json();
//     console.log("📌 OTP sent response:", data);

//     if (!res.ok) throw new Error(data.message || "Failed to send OTP");
//     return data;
//   } catch (err) {
//     console.error("❌ OTP send error:", err);
//     throw err;
//   }
// };

// export const handleVerifyOtp = async (
//   phoneNumber,
//   otp,
//   fullname = "Anonymous User"
// ) => {
//   try {
//     const res = await fetch("http://localhost:5000/api/auth/verify-otp", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ phonenumber: phoneNumber, otp, fullname }),
//     });

//     const data = await res.json();
//     console.log("📌 OTP verify response:", data);

//     if (!res.ok) throw new Error(data.message || "OTP verification failed");
//     return data;
//   } catch (err) {
//     console.error("❌ OTP verify error:", err);
//     throw err;
//   }
// };

// // // client/src/utils/formHandlers.js

// // export const handleSignup = async (formData) => {
// //   try {
// //     if (formData.password !== formData.confirmPassword) {
// //       throw new Error("Passwords do not match");
// //     }

// //     const res = await fetch("http://localhost:5000/api/auth/signup", {
// //       method: "POST",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify({
// //         fullname: formData.fullname,
// //         email: formData.email,
// //         password: formData.password,
// //         confirmPassword: formData.confirmPassword, 
// //         phonenumber: formData.number || "",
// //       }),
// //     });

// //     const data = await res.json();
// //     console.log("📌 Signup response:", data);

// //     if (!res.ok) throw new Error(data.message || "Signup failed");

// //     localStorage.setItem("token", data.token);
// //     localStorage.setItem("user", JSON.stringify(data.user));

// //     return data;
// //   } catch (err) {
// //     console.error("❌ Signup error:", err);
// //     throw err;
// //   }
// // };

// // export const handleLogin = async (formData) => {
// //   try {
// //     const res = await fetch("http://localhost:5000/api/auth/login", {
// //       method: "POST",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify(formData), // { email, password }
// //     });

// //     const data = await res.json();
// //     console.log("📌 Login response:", data);

// //     if (!res.ok) throw new Error(data.message || "Login failed");

// //     localStorage.setItem("token", data.token);
// //     localStorage.setItem("user", JSON.stringify(data.user));

// //     return data;
// //   } catch (err) {
// //     console.error("❌ Login error:", err);
// //     throw err;
// //   }
// // };

// // export const handleSendOtp = async (phoneNumber) => {
// //   try {
// //     const res = await fetch("http://localhost:5000/api/auth/send-otp", {
// //       method: "POST",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify({ phonenumber: phoneNumber }),
// //     });

// //     const data = await res.json();
// //     console.log("📌 OTP sent response:", data);

// //     if (!res.ok) throw new Error(data.message || "Failed to send OTP");
// //     return data;
// //   } catch (err) {
// //     console.error("❌ OTP send error:", err);
// //     throw err;
// //   }
// // };

// // export const handleVerifyOtp = async (
// //   phoneNumber,
// //   otp,
// //   fullname = "Anonymous User"
// // ) => {
// //   try {
// //     const res = await fetch("http://localhost:5000/api/auth/verify-otp", {
// //       method: "POST",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify({ phonenumber: phoneNumber, otp, fullname }),
// //     });

// //     const data = await res.json();
// //     console.log("📌 OTP verify response:", data);

// //     if (!res.ok) throw new Error(data.message || "OTP verification failed");
// //     return data;
// //   } catch (err) {
// //     console.error("❌ OTP verify error:", err);
// //     throw err;
// //   }
// // };
