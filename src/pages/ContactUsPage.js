import React from "react";

function ContactUsPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("hola");
  };
  return (
    <div style={{ overFlowX: "hidden" }}>
      <h1>Contáctanos</h1>

      <div className="row">
        <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto text-center form p-4">
          <form
            className="card card-body"
            id="provider_form"
            onSubmit={handleSubmit}
          >
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Nombre"
                className="form-control"
                autoFocus
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="address"
                placeholder="Dirección"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <input
                type="number"
                name="cellphone"
                step="any"
                placeholder="Celular"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <textarea
                type="text"
                name="observations"
                placeholder="Observaciones"
                className="form-control"
              />
            </div>
            <br />
            <button
              type="submit"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactUsPage;
