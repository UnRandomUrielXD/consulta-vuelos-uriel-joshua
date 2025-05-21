import { Vuelo } from "./BuscadorVuelos";

interface Props  {
    vuelos : Array<Vuelo>
}

const ListadoVuelos = ({vuelos}: Props) => {

    const formatoFecha = (fecha: string) => {
        const formato = new Intl.DateTimeFormat("es-MX", {day: "2-digit",month:"2-digit", year:"numeric"});
        const dt = new Date(fecha);

        return formato.format(dt);
    }

    const formatoHora = (fecha: string) => {
        const formato = new Intl.DateTimeFormat("es-MX", {hour: "2-digit",minute:"2-digit"});
        const dt = new Date(fecha);

        return formato.format(dt);
    }

    return(
        <table className="table">
            <thead>
                <tr>
                    <th>Fecha Salida</th>
                    <th>Fecha Llegada</th>
                    <th>Origen</th>
                    <th>Destino</th>
                    <th>Pasajeros</th>
                    <th>Piloto</th>
                    <th>Estatus</th>
                </tr>
            </thead>
            <tbody>
                {
                    vuelos.length === 0 &&
                    <tr>
                        <td colSpan={7}>No se han encontrado vuelos</td>
                    </tr>
                }
                {
                    vuelos.length > 0 && 
                    vuelos.map(x =>
                    <tr>
                        <td>
                            <div>{formatoFecha(x.FechaHoraSalida)}</div>
                            <div>{formatoHora(x.FechaHoraSalida)}</div>
                        </td>
                        <td>
                            <div>{formatoFecha(x.FechaHoraLlegadaAproximada)}</div>
                            <div>{formatoHora(x.FechaHoraLlegadaAproximada)}</div>
                        </td>
                        <td>
                            <div>{x.PaisOrigen}</div>
                            <div className="text-primary">{x.CiudadOrigen}</div>
                            <div>{x.AeropuertoOrigen}</div>
                        </td>
                        <td>
                            <div>{x.PaisDestino}</div>
                            <div className="text-primary">{x.CiudadDestino}</div>
                            <div>{x.AeropuertoDestino}</div>
                        </td>
                        <td>{x.PasajerosActuales}</td>
                        <td>{x.NombrePiloto}</td>
                        <td>{x.EstatusVuelo}</td>
                    </tr>
                    )
                }
            </tbody>
        </table>
    )
}

export default ListadoVuelos;