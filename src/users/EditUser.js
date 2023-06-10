import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditUser() {
    let navigate = useNavigate();

    const { id } = useParams();

    const [user, setUser] = useState({
        name: "",
        username: "",
        email: "",
        club: "", // Dodany atrybut clubId
    });

    const [clubs, setClubs] = useState([]); // Dodany stan dla listy klubów

    const { name, username, email, club } = user;

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        loadUser();
        loadClubs(); // Wywołanie funkcji ładowania klubów przy pierwszym renderowaniu komponentu
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:8081/user/${id}`, user);
        navigate("/");
    };

    const loadUser = async () => {
        const result = await axios.get(`http://localhost:8081/user/${id}`);
        setUser(result.data);
    };

    const loadClubs = async () => {
        const result = await axios.get("http://localhost:8081/clubs");
        setClubs(result.data);
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Edit User</h2>

                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="mb-3">
                            <label htmlFor="Name" className="form-label">
                                Name
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter your name"
                                name="name"
                                value={name}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Username" className="form-label">
                                Username
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter your username"
                                name="username"
                                value={username}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Email" className="form-label">
                                E-mail
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter your e-mail address"
                                name="email"
                                value={email}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Club" className="form-label">
                                Club
                            </label>
                            <select
                                className="form-control"
                                name="club"
                                value={club}
                                onChange={(e) => onInputChange(e)}
                            >
                                {/*<option value="">Select a club</option>*/}
                                {/*{clubs.map((c) => (*/}
                                {/*    <option key={c.id} value={c.id}>*/}
                                {/*        {c.name}*/}
                                {/*    </option>*/}
                                {/*))}*/}

                                {clubs.sort((a, b) => {
                                    if (a.id === user.club?.id) return -1; // Ustawia wybrany klub na początku
                                    if (b.id === user.club?.id) return 1;
                                    return 0;
                                }).map((club) => (
                                    <option key={club?.id} value={club?.id}>
                                        {club?.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button type="submit" className="btn btn-outline-primary">
                            Submit
                        </button>
                        <Link className="btn btn-outline-danger mx-2" to="/">
                            Cancel
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}
