import '../../assets/styles/global.css';
import ToggleSwitch from '../ui/ToggleSwitch.jsx';

/**
 * Componente ActiveParameters
 * Panel de configuración con toggles para parámetros de la corrección asistida
 *
 * Props:
 *   - parameters: array de objetos con estructura:
 *     {
 *       id: string,
 *       label: string,
 *       value: boolean,
 *       onChange: function
 *     }
 */
const ActiveParameters = ({ parameters = [] }) => {
  return (
    <div className="active-parameters">
      <h4 className="parameters-title">Parámetros activos</h4>

      {parameters.map((param) => (
        <div key={param.id} className="parameter-row">
          <span className="parameter-label">{param.label}</span>
          <ToggleSwitch
            checked={param.value}
            onChange={param.onChange}
          />
        </div>
      ))}
    </div>
  );
};

export default ActiveParameters;
