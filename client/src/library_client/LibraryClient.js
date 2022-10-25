const API_URL = "http://89.46.196.238:8080/";
//const API_URL = "http://localhost:8080/";

const register = (username, name, password) => {
    return fetch(`${API_URL}register`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify({
            username,
            name,
            password,
        }),
    }).then((resp) => {
        if (!resp.ok) {
            throw new Error("Error during registration", { cause: resp });
        }
        return resp.json();
    });
};

const login = (username, password) => {
    return fetch(`${API_URL}tokens`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify({
            username,
            password,
        }),
    })
        .then((resp) => {
            if (!resp.ok) {
                throw new Error("Error during login", { cause: resp });
            }
            return resp.text();
        })
        .then((data) => {
            localStorage.setItem("token", JSON.stringify(data));
            return data;
        });
};

const logout = () => {
    localStorage.removeItem("token");
};

const getCurrentUserToken = () => {
    return JSON.parse(localStorage.getItem("token"));
};

const getCurrentUser = async () => {
    return await fetch(`${API_URL}users`, { headers: authHeader() }).then((resp) => {
        if (!resp.ok) {
            throw new Error("Cannot fetch user", { cause: resp });
        }
        return resp.json();
    });
};

const authHeader = () => {
    const token = getCurrentUserToken();

    if (token) {
        return { Authorization: "Bearer " + token };
    }
    return {};
};

const getAllBooks = async () => {
    return await fetch(`${API_URL}books`, {
        method: "GET",
        headers: {
            ...authHeader(),
            Accept: "application/json",
        },
    }).then((resp) => resp.json());
};

const loanReturnBook = (id, username, holder) => {
    return fetch(`${API_URL}books/${id}`, {
        method: "PATCH",
        headers: {
            ...authHeader(),
            "Content-Type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify({
            id,
            borrowed: holder ? "" : username,
        }),
    }).then((resp) => {
        if (!resp.ok) {
            throw new Error("Error during loan/return", { cause: resp });
        }
        return resp.json();
    });
};

const addNewBook = (title, subtitle, author, description, link) => {
    return fetch(`${API_URL}books`, {
        method: "POST",
        headers: {
            ...authHeader(),
            "Content-Type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify({ title, subtitle, author, description, link }),
    }).then((resp) => {
        if (!resp.ok) {
            throw new Error("Error during upload", { cause: resp });
        }
        return resp.json();
    });
};

const removeBook = (id) => {
    return fetch(`${API_URL}books/${id}`, {
        method: "DELETE",
        headers: {
            ...authHeader(),
            "Content-Type": "application/json;charset=UTF-8",
        },
    });
};

const LibraryClient = {
    register,
    login,
    logout,
    getCurrentUserToken,
    getCurrentUser,
    // books
    getAllBooks,
    loanReturnBook,
    addNewBook,
    removeBook,
};

export default LibraryClient;
