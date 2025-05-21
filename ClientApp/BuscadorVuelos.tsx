import { useEffect, useState } from "react";
import ListadoVuelos from "./ListadoVuelos";

type Ciudad = {
    Nombre: string
}

type EstatusVuelo = {
    Nombre: string
}

export type Vuelo = {
    PaisOrigen: string,
    CiudadOrigen: string,
    AeropuertoOrigen: string,
    PaisDestino: string,
    CiudadDestino: string,
    AeropuertoDestino: string,
    PasajerosActuales: number,
    NombrePiloto: string,
    FechaHoraSalida: string,
    FechaHoraLlegadaAproximada: string,
    EstatusVuelo: string
}

const BuscadorVuelos = () => {

    const [ciudadesOrigen, setCiudadesOrigen] = useState<Ciudad[]>([]);
    const [ciudadesDestino, setCiudadesDestino] = useState<Ciudad[]>([]);
    const [listadoEstatus, setListaEstatus] = useState<EstatusVuelo[]>([]);
    const [listadoVuelos, setListaVuelos] = useState<Vuelo[]>([]);

    const [fechaInicial, setFechaInicial] = useState("");
    const [fechaFinal, setFechaFinal] = useState("");
    const [estatus, setEstatus ] = useState("");
    const [origen, setOrigen ] = useState("");
    const [destino, setDestino ] = useState("");

    const listarCiudadesOrigen = async () => {
        const response = await fetch("http://localhost:5000/api/vuelos/ciudades-origen");
        if(response.ok) {
            const arr = await response.json();
            let ciudades : Array<Ciudad> = [];

            arr.map((x: string) => ciudades.push({Nombre: x}));

            setCiudadesOrigen(ciudades);
        }
    }

    const listarCiudadesDestino = async () => {
        const response = await fetch("http://localhost:5000/api/vuelos/ciudades-destino");
        if(response.ok) {
            const arr = await response.json();
            let ciudades : Array<Ciudad> = [];

            arr.map((x: string) => ciudades.push({Nombre: x}));

            setCiudadesDestino(ciudades);
        }
    }

    const listarEstatus = async () => {
        const response = await fetch("http://localhost:5000/api/vuelos/estatus");
        if(response.ok) {
            const arr = await response.json();
            let estatus : Array<EstatusVuelo> = [];

            arr.map((x: string) => estatus.push({Nombre: x}));

            setListaEstatus(estatus);
        }
    }

    const listarVuelo = async () => {
        let url = "http://localhost:5000/api/vuelos/listar-vuelos";
        let parametros : string[] = [];

        if(estatus){
            parametros.push("estatus=" + estatus);
        }

        if(origen){
            parametros.push("origen=" + origen);
        }

        if(destino){
            parametros.push("destino=" + destino);
        }

        if(parametros.length > 0){
            url += "?"
            url += parametros.join("&");
        }

        const response = await fetch(url);
        if(response.ok) {
            const arr = await response.json();
            setListaVuelos(arr);
        }
    }

    useEffect(()=> {
        listarCiudadesOrigen();
        listarCiudadesDestino();
        listarEstatus();
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
                                <select className="form-control" onChange={(e)=> setOrigen(e.target.value)} value={origen}>
                                    <option value="">(Todos)</option>
                                    {
                                        ciudadesOrigen.map(x => <option key={x.Nombre} value={x.Nombre}>{x.Nombre}</option>)
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="mb-3">
                                <label>Destino</label>
                                <select className="form-control" onChange={(e)=> setDestino(e.target.value)} value={destino}>
                                    <option value="">(Todos)</option>
                                    {
                                        ciudadesDestino.map(x => <option key={x.Nombre} value={x.Nombre}>{x.Nombre}</option>)
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="mb-3">
                                <label>Estatus</label>
                                <select className="form-control" onChange={(e)=> setEstatus(e.target.value)} value={estatus}>
                                    <option value="">(Todos)</option>
                                    {
                                        listadoEstatus.map(x => <option key={x.Nombre} value={x.Nombre}>{x.Nombre}</option>)
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="col-12 d-flex justify-content-end">
                            <button className="btn btn-primary" onClick={()=> {listarVuelo();}}>Buscar</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card mt-4">
                <div className="card-header">Vuelos encontrados</div>
                <div className="card-body">
                    <ListadoVuelos vuelos={listadoVuelos}/>
                </div>
            </div>
        </>
    )
}

export default BuscadorVuelos;