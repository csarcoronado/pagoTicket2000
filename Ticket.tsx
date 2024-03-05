import './estilos.css'
import './nuevoEstilos.css'
import { PiCirclesThreeFill } from "react-icons/pi";
import { BsPlus } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { AiOutlineSolution } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import {useState} from 'react';
import Input from '../componentesjesus/input';
import CustomDropdown from './CustomDropdown';
import { nuevoAlmacen, nuevoticket } from '../interfaces/InterfacesAlmacen';
const Ticket = () => {  
const [itemShow, ] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
  setSearchTerm(event.target.value);
  setCurrentPage(1); 
  }
  const [valueSelect, setValueSelect] = useState<keyof nuevoAlmacen>('cajero')
  const [cajero, setCajero] = useState('');
  const [cajeroEdit, setCajeroEdit] = useState('');
  const [cliente, setCliente] = useState('');
  const [clienteEdit, setClienteEdit] = useState('');
  const [folio, setFolio] = useState('');
  const [folioEdit, setFolioEdit] = useState('');
  const [editadoIndex, setEditadoIndex] = useState<any>('');
  const [mercado, setMercado] = useState('');
  const [moneda, setMoneda] = useState('');
  const [producto, setProducto] = useState('');
  const [datosAlmacen, setDatosAlmacen] = useState<nuevoAlmacen[]>([]);
  const [datosTicket, setDatosTicket] = useState<nuevoticket[]>([]);
  const [cantidad, setCantidad] = useState('');
  const [cantidadEdit, setCantidadEdit] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [importe, setImporte] = useState ('');
  const [editandoIndex, setEditandoIndex] = useState<any>('');
  const [datosActualizados, setDatosActualizados] = useState<nuevoticket[]>([]);
  const [datosOriginales, setdatosOriginales] = useState<nuevoAlmacen[]>([]);
  const filteredProducts = datosAlmacen.filter((empresa) => {
    return empresa[valueSelect]?.toString()?.toLowerCase()?.includes(searchTerm.toLowerCase());
    }
    );
    const indexOfLastItem = currentPage * itemShow;
    const indexOfFirstItem = indexOfLastItem - itemShow;
    const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
    const totaldeproductos = datosTicket.length;
    /* -------------------------------------------------------------------------------------------------------------------------- */
    const handleAlmacen = () => {
          if (!cajero || !cliente || !folio || !mercado || !moneda || !producto) {
            alert('No completó todos los campos, inténtelo de nuevo');
            return; 
          }
        const nuevoAlmacen = {
          cajero,
          cliente,
          folio,
          mercado,
          moneda,
          producto
        };
        setDatosAlmacen([...datosAlmacen, nuevoAlmacen]);
        setdatosOriginales([...datosOriginales, nuevoAlmacen]);
        setCajero('');
        setCliente('');
        setFolio('');
        setMercado('');
        setMoneda('');
        setProducto('');
    }
    const guardar = () => {
      if (editadoIndex !== null){
        const datonuevo = [...datosAlmacen];
        datonuevo[editadoIndex] = {
          ...datonuevo[editadoIndex],
          cliente: clienteEdit,
          folio: folioEdit,
          cajero: cajeroEdit
        };
        setDatosAlmacen(datonuevo);
        setEditadoIndex(null);
      }
    }
    const abrirModal = (index:any)=>{
      const ticketEdit = datosAlmacen[index];
      setCajeroEdit(ticketEdit.cajero);
      setClienteEdit(ticketEdit.cliente);
      setFolioEdit(ticketEdit.folio);
      setEditadoIndex(index);
    }
    const eliminarAlmacen = (index: number) => {
      const nuevosDatos = [...datosAlmacen];
      nuevosDatos.splice(index, 1);
      setDatosAlmacen(nuevosDatos);
    };
/* -------------------------------------------------------------------------------------------------------------------------- */
    const handleTicket = () => {
      if(!cantidad || !descripcion || !importe) {
        alert('No completó todos los campos, inténtelo de nuevo');
          return;
      }
      const nuevoticket = {
        cantidad,
        descripcion,
        importe
      };
      setDatosTicket([...datosTicket, nuevoticket]);
      setDatosActualizados([...datosActualizados, nuevoticket])
      setCantidad('');
      setDescripcion('');
      setImporte('');
    }
    const eliminarproducto = (index: number) =>{
      const newDate = [...datosTicket];
      newDate.splice(index, 1);
      setDatosTicket(newDate)
    }
    const guardarticket = () => {
      if ( editandoIndex != null){
        const nuevostickets = [...datosTicket];
        nuevostickets[editandoIndex] = {
          ...nuevostickets[editandoIndex],
          cantidad: cantidadEdit,
        }
        setDatosTicket(nuevostickets);
        setEditandoIndex(null)
      }
    }
    const abrirModalCantidad = (index: any) => {
      const edit = datosTicket[index];
      setCantidadEdit(edit.cantidad);
      setEditandoIndex(index);
    }
/* -------------------------------------------------------------------------------------------------------------------------- */
  const ordenarCajeroAlfabeticamente = () => {
    const productosOrdenados = [...datosAlmacen].sort((a, b) => {
      const nombreA = a.cajero.toUpperCase();
      const nombreB = b.cajero.toUpperCase();
      if (nombreA < nombreB) {
        return -1;
      }
      if (nombreA > nombreB) {
        return 1;
      }
      return 0;
    });
    setDatosAlmacen(productosOrdenados);
  };
  const ordenarClientesAlfabeticamente = () => {
    const productosOrdenados = [...datosAlmacen].sort((a, b) => {
      const nombreA = a.cliente.toUpperCase();
      const nombreB = b.cliente.toUpperCase();
      if (nombreA < nombreB) {
        return -1;
      }
      if (nombreA > nombreB) {
        return 1;
      }
      return 0;
    });
    setDatosAlmacen(productosOrdenados);
  };
  const optionsCajeros = [
    {
      label:"Alfabeticamente",
      onClick: ordenarCajeroAlfabeticamente
    },
  ]
  const optionsClientes = [
    {
      label:"Alfabeticamente",
      onClick: ordenarClientesAlfabeticamente
    },
  ]

  return (
    <>
      <div className="bg-white p-3 ">
        <div  className="bg-gray-200 p-2 mb-2">
          <div>
            <div className={ ' flex space-x-2 gap-3 mb-2'}>
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 bg-yellow-300">
              Back
              </button>
              <button data-bs-toggle="modal" data-bs-target="#exampleModal" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 bg-blue-300">
              <BsPlus/>
              </button>
              <div className='izquierdas'>
                <select onChange={(e)=> setValueSelect(e.target.value as keyof nuevoAlmacen)}>
                <option>Buscar por</option>
                <option value='empresa'>Empresa</option>
                <option value='almacen'>Almacén</option>
                <option value='activo'>Activo</option>
                </select>
              </div>
              <div className='izquierda'>
              <Input onChange={onSearch} placeholder='Buscar'/>
              </div>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <div className="relative w-full ProductsOver" >
            <table className="w-full caption-bottom text-sm">
              <thead  className="[&_tr]:border-b bg-pos thead-sticky bg-pos">
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th style={{ textAlign: 'center' }} className="letras h-12 px-4 text-left align-middle font-medium text-white [&:has([role=checkbox])]:pr-0 w-[100px]">
                    <CustomDropdown title='Cajero' options={optionsCajeros}/>
                  </th>
                  <th style={{ textAlign: 'center' }} className="letras h-12 px-4 text-left align-middle font-medium text-white [&:has([role=checkbox])]:pr-0 w-[100px]">
                    <CustomDropdown title='Cliente' options={optionsClientes}/>
                  </th>
                  <th style={{ textAlign: 'center' }} className="letras h-12 px-4 text-left align-middle font-medium text-white [&:has([role=checkbox])]:pr-0">
                    <CustomDropdown title='Folio'/>
                  </th>
                  <th style={{ textAlign: 'center' }} className="letras h-12 px-4 text-left align-middle font-medium text-white [&:has([role=checkbox])]:pr-0">
                    <CustomDropdown title='Mercado de Pago'/>
                  </th>
                  <th style={{ textAlign: 'center' }} className="letras h-12 px-4 text-left align-middle font-medium text-white [&:has([role=checkbox])]:pr-0">
                    <CustomDropdown title='Moneda'/>
                  </th>
                  <th style={{ textAlign: 'center' }} className="letras h-12 px-4 text-left align-middle font-medium text-white [&:has([role=checkbox])]:pr-0">
                    <CustomDropdown title='No. Productos'/>
                  </th>
                  <th style={{ textAlign: 'center' }} className="letras h-12 px-4 text-left align-middle font-medium text-white [&:has([role=checkbox])]:pr-0">
                    <CustomDropdown title='Total'/>
                  </th>
                  <th style={{ textAlign: 'center' }} className="letras h-12 px-4 text-left align-middle font-medium text-white [&:has([role=checkbox])]:pr-0">
                    Opciones
                  </th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0 ">
                {currentItems.map((item,index)=>(
                <tr key={index}>
                  <td style={{ textAlign: 'center' }}>{item.cajero}</td>
                  <td style={{ textAlign: 'center' }}>{item.cliente}</td>
                  <td style={{ textAlign: 'center' }}>{item.folio}</td>
                  <td style={{ textAlign: 'center' }}>{item.mercado}</td>
                  <td style={{ textAlign: 'center' }}>{item.moneda}</td>
                  <td style={{ textAlign: 'center' }}>{totaldeproductos}</td>
                  <td style={{ textAlign: 'center' }}>{datosTicket.reduce((total, item) => total + (Number(item.importe) * Number(item.cantidad)), 0)}</td>
                  <td style={{ textAlign: 'center' }}>
                    <button onClick={() => abrirModal(index)} data-bs-toggle="modal" data-bs-target="#exampleModali" className="azul inline-flex items-center justify-center rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 text-primary-foreground hover:bg-primary/90 h-10 px-2 py-2"><AiOutlineSolution /></button>
                    <button onClick={() => eliminarAlmacen(index)} className="rojo inline-flex items-center justify-center rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 text-primary-foreground hover:bg-primary/90 h-10 px-2 py-2"><MdDelete /></button>
                  </td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-1">
        </div>
      </div>
      <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Nuevo Almacén</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p>Cajero</p><Input value={cajero} onChange={(e) => setCajero(e.target.value)}/>
              <p>Cliente</p><Input value={cliente} onChange={(e) => setCliente(e.target.value)}/>
              <p>Folio</p><Input value={folio} onChange={(e) => setFolio(e.target.value)}/>
              <p>Mercado</p><Input value={mercado} onChange={(e) => setMercado(e.target.value)}/>
              <p>Moneda</p><Input value={moneda} onChange={(e) => setMoneda(e.target.value)}/>
              <p>Producto</p><Input value={producto} onChange={(e) => setProducto(e.target.value)}/>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={handleAlmacen}>Agregar</button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="exampleModali" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Ticket</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">       
                <p>Folio: {folioEdit}</p>
                <p>Cajero: {cajeroEdit}</p>
                <p>Cliente: {clienteEdit}</p>
              <p>Descripcion</p><Input value={descripcion} onChange={(e) => setDescripcion(e.target.value)}/>
              <p>Cantidad</p><Input value={cantidad} onChange={(e) => setCantidad(e.target.value)}/>
              <p>Precio</p><Input value={importe} onChange={(e) => setImporte(e.target.value)}/>
              <div>
                <p>Fecha y Hora.</p>
                <div>
                  <table className='table'>
                    <thead className='align-middle'>
                      <tr>
                        <th style={{ textAlign: 'center' }}>Descripción</th>
                        <th style={{ textAlign: 'center' }}>Cantidad</th>
                        <th style={{ textAlign: 'center' }}>Precio</th>
                        <th style={{ textAlign: 'center' }}>Importe</th>
                        <th style={{ textAlign: 'center' }}><PiCirclesThreeFill /></th>
                      </tr>
                    </thead>
                    <tbody className='align-middle'>
                      {datosTicket.map((item,index) =>(
                        <tr key={index}>
                        <td style={{ textAlign: 'center' }}>{item.descripcion}</td> 
                        <td style={{ textAlign: 'center' }}> <button onClick={() => abrirModalCantidad(index)} data-bs-toggle="modal" data-bs-target="#exampleModalii"
                          className=" form-control inline-flex items-center justify-center 
                          rounded-md ring-offset-background transition-colors 
                          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring 
                          focus-visible:ring-offset-2 text-primary-foreground hover:bg-primary/90 h-10 px-2 py-2">{item.cantidad}</button></td>
                        <td style={{ textAlign: 'center' }}>{item.importe}</td>
                        <td style={{ textAlign: 'center' }}>{Number(item.importe) * Number(item.cantidad)}</td>
                        <td style={{ textAlign: 'center' }}> <button className='btn-danger'><MdDelete  onClick={() => eliminarproducto(index)}/></button></td>
                      </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <p>Pago con:</p>
              <p>Total: {datosTicket.reduce((total, item) => total + (Number(item.importe) * Number(item.cantidad)), 0)}</p>
           </div>
            <div className="modal-footer">
            <button type="button" className="btn btn-success" onClick={handleTicket}>Agregar</button>
              <button type="button" className="btn btn-success" data-bs-dismiss="modal">Imprimir Copia</button>
              <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={guardar}>Guardar</button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="exampleModalii" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header colorblue">
              <h3 className="modal-title">DEVOLUCIÓN</h3>
              <button type="button" className="btn" data-bs-dismiss="modal"><IoMdClose className='x'/></button>
            </div>
            <div className='bg-gray-200'>
              <p>¿Cantidad a devolver?</p>
                <Input type='number' className='form-control w-50' value={cantidadEdit} onChange={(e) => setCantidadEdit(e.target.value)}/>
              <div className="modal-footer">
                <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={guardarticket}>Aceptar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Ticket