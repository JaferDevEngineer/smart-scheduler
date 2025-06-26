const baseUrl = "http://localhost:9000/";

export const logInUser = async (email, password) => {
  try {
    const response = await fetch(`${baseUrl}auth/user/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    console.log("hello");

    if (!response.ok) {
        const error = await response.text(); // or .json() if backend sends JSON
        console.log("in failed"+ error);
        throw new Error(error || "Login failed");
    }

    return response.json();
  } catch (error) {
    console.error("Login Error:", error);
    throw new Error(error.message || "Something went wrong");
  }
};
export const registerUser = async (email, password,name) => {
  try {
    const response = await fetch(`${baseUrl}auth/user/register`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        name : name
      }),
    });
    if (!response.ok) {
        const error = await response.text(); // or .json() if backend sends JSON
        console.log("in failed"+ error);
        throw new Error(error || "Login failed");
    }

    return response;
  } catch (error) {
    console.error("Login Error:", error);
    throw new Error(error.message || "Something went wrong");
  }
};

export const logInProvider = async (email, password) => {
  try {
    const response = await fetch(`${baseUrl}auth/provider/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    console.log("hello");

    if (!response.ok) {
        const error = await response.text(); // or .json() if backend sends JSON
        console.log("in failed"+ error);
        throw new Error(error || "Login failed");
    }

    return response.json();
  } catch (error) {
    console.error("Login Error:", error);
    throw new Error(error.message || "Something went wrong");
  }
};

export const registerProvider = async (email, password, name) => {
  try {
    const response = await fetch(`${baseUrl}auth/provider/register`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        name : name
      }),
    });
    if (!response.ok) {
        const error = await response.text(); // or .json() if backend sends JSON
        console.log("in failed"+ error);
        throw new Error(error || "Login failed");
    }

    return response;
  } catch (error) {
    console.error("Login Error:", error);
    throw new Error(error.message || "Something went wrong");
  }
};
