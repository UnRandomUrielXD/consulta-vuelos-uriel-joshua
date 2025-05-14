import { useEffect, useState } from "react";
import ListadoVuelos from "./ListadoVuelos";

type Ciudad = {
    Nombre: string
}

type EstatusVuelo = {
    Nombre: string
}

const BuscadorVuelos = () => {

    const [ciudadesOrigen, setCiudadesOrigen] = useState<Ciudad[]>([]);
    const [ciudadesDestino, setCiudadesDestino] = useState<Ciudad[]>([]);
    const [listadoEstatus, setListaEstatus] = useState<EstatusVuelo[]>([]);

    const listarCiudadesOrigen = async () => {
        const response = await fetch("http://localhost:5000/api/vuelos/ciudades-origen");
        if(response.ok) {
            const arr = await response.json();
            let ciudades : Array<Ciudad> = [];

            arr.map((x: string) => ciudades.push({Nombre: x}));
            setCiudadesOrigen(ciudades);
        }
    }

    useEffect(()=> {
        listarCiudadesOrigen();
    },[]);

    return(
        <>
            <div className="h1">Buscador de vuelos</div>
            <div className="card mt-4">
                <div className="card-header">Búsqueda de vuelos</div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="mb-3">
                                <label>Fecha Inicial</label>
                                <input type="date" className="form-control" />
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="mb-3">
                                <label>Fecha Final</label>
                                <input type="date" className="form-control" />
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="mb-3">
                                <label>Origen</label>
                                <select className="form-control"></select>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="mb-3">
                                <label>Destino</label>
                                <select className="form-control">
                                    {
                                        ciudadesOrigen.map(x => <option key={x.Nombre} value={x.Nombre}>{x.Nombre}</option>)
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="mb-3">
                                <label>Estatus</label>
                                <select className="form-control"></select>
                            </div>
                        </div>
                        <div className="col-12 d-flex justify-content-end">
                            <button className="btn btn-primary">Buscar</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card mt-4">
                <div className="card-header">Vuelos encontrados</div>
                <div className="card-body">
                    <ListadoVuelos/>
                </div>
            </div>
        </>
    )
}

export default BuscadorVuelos;