// src/components/UsersTable.jsx
export default function UsersTable({ users, loading, onEdit, onDelete, error }) {
    return (
        <>
            {error && <div className="alert alert-danger">{error}</div>}

            <div className="table-responsive">
                <table className="table table-striped table-hover align-middle">
                    <thead className="table-light">
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Apellido paterno</th>
                        <th>Apellido materno</th>
                        <th>Email</th>
                        <th>Activo</th>
                        <th className="text-end">Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan="7" className="text-center py-4">Cargando...</td>
                        </tr>
                    ) : users.length === 0 ? (
                        <tr>
                            <td colSpan="7" className="text-center py-4">Sin usuarios</td>
                        </tr>
                    ) : (
                        users.map((u) => (
                            <tr key={u.id}>
                                <td>{u.id}</td>
                                <td>{u.name}</td>
                                <td>{u.lastname}</td>
                                <td>{u.surname}</td>
                                <td>{u.email}</td>
                                <td>
                    <span className={`badge ${u.status ? "bg-success" : "bg-secondary"}`}>
                      {u.status ? "Sí" : "No"}
                    </span>
                                </td>
                                <td className="text-end">
                                    <button className="btn btn-sm btn-primary me-2" onClick={() => onEdit(u)}>
                                        Editar
                                    </button>
                                    <button className="btn btn-sm btn-danger" onClick={() => onDelete(u)}>
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>
        </>
    );
}
