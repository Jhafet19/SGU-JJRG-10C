import { useEffect, useRef, useState } from "react";
import {Modal} from "bootstrap";
import {
    findAllUsers,
    createUser,
    updateUser,
    deleteUser,
} from "./api/user.api.js";

import UsersTable from "./components/UsersTable.jsx";
import UserForm from "./components/UserForm.jsx";

export default function App() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [form, setForm] = useState({
        id: null,
        name: "",
        lastname: "",
        surname: "",
        email: "",
        password: "",
        status: true,
    });

    const modalRef = useRef(null);
    const bsModalRef = useRef(null);

    useEffect(() => {
        if (modalRef.current) {
            bsModalRef.current = new Modal(modalRef.current, { backdrop: "static" });
        }
        loadUsers();
    }, []);

    async function loadUsers() {
        setLoading(true);
        setError(null);
        try {
            const raw = await findAllUsers();
            const list =
                Array.isArray(raw) ? raw :
                    Array.isArray(raw?.data) ? raw.data :
                        Array.isArray(raw?.result) ? raw.result :
                            Array.isArray(raw?.users) ? raw.users :
                                Array.isArray(raw?.content) ? raw.content : [];
            setUsers(list);
        } catch (e) {
            setError(e.message || "Error al cargar usuarios");
            setUsers([]);
        } finally {
            setLoading(false);
        }
    }

    function openCreate() {
        setForm({
            id: null,
            name: "",
            lastname: "",
            surname: "",
            email: "",
            password: "",
            status: true,
        });
        bsModalRef.current?.show();
    }

    function openEdit(user) {
        setForm({
            id: user.id ?? null,
            name: user.name ?? "",
            lastname: user.lastname ?? "",
            surname: user.surname ?? "",
            email: user.email ?? "",
            password: "",
            status: user.status ?? true,
        });
        bsModalRef.current?.show();
    }

    async function saveForm(e) {
        e.preventDefault();
        try {
            if (form.id == null) {
                await createUser(form);
            } else {
                await updateUser(form);
            }
            bsModalRef.current?.hide();
            await loadUsers();
        } catch (e2) {
            alert(e2.message || "Error al guardar");
        }
    }

    async function removeUser(user) {
        if (!confirm(`¿Eliminar a ${user.name}?`)) return;
        try {
            await deleteUser(user); // envía el objeto completo, como dijiste
            await loadUsers();
        } catch (e) {
            alert(e.message || "Error al eliminar");
        }
    }

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="m-0">Usuarios</h2>
                <button className="btn btn-success" onClick={openCreate}>
                    + Nuevo usuario
                </button>
            </div>

            <UsersTable
                users={users}
                loading={loading}
                error={error}
                onEdit={openEdit}
                onDelete={removeUser}
            />

            {/* Modal Bootstrap con el formulario como componente */}
            <div className="modal fade" tabIndex="-1" ref={modalRef}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <UserForm
                            form={form}
                            setForm={setForm}
                            onSubmit={saveForm}
                            onCancel={() => bsModalRef.current?.hide()}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
