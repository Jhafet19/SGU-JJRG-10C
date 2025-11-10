export default function UserForm({ form, setForm, onSubmit, onCancel }) {
    return (
        <form onSubmit={onSubmit}>
            <div className="modal-header">
                <h5 className="modal-title">
                    {form.id == null ? "Nuevo usuario" : `Editar #${form.id}`}
                </h5>
                <button type="button" className="btn-close" onClick={onCancel} />
            </div>

            <div className="modal-body">
                <div className="row g-3">
                    <div className="col-md-6">
                        <label className="form-label">Nombre</label>
                        <input
                            className="form-control"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            required
                        />
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Apellido paterno</label>
                        <input
                            className="form-control"
                            value={form.lastname}
                            onChange={(e) => setForm({ ...form, lastname: e.target.value })}
                            required
                        />
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Apellido materno</label>
                        <input
                            className="form-control"
                            value={form.surname}
                            onChange={(e) => setForm({ ...form, surname: e.target.value })}
                        />
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            required
                        />
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Contraseña</label>
                        <input
                            type="password"
                            className="form-control"
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            required={form.id == null}
                        />
                    </div>

                    <div className="col-md-6 d-flex align-items-end">
                        <div className="form-check form-switch">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="statusSwitch"
                                checked={!!form.status}
                                onChange={(e) => setForm({ ...form, status: e.target.checked })}
                            />
                            <label className="form-check-label" htmlFor="statusSwitch">
                                Activo
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal-footer">
                <button type="button" className="btn btn-outline-secondary" onClick={onCancel}>
                    Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                    {form.id == null ? "Crear" : "Guardar"}
                </button>
            </div>
        </form>
    );
}
