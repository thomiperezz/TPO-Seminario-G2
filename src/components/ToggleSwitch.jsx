import '../assets/styles/global.css';

/**
 * Componente ToggleSwitch
 * Switch toggle accesible con soporte para checked y onChange
 *
 * Props:
 *   - checked: estado actual del toggle
 *   - onChange: callback cuando el estado cambia
 *   - disabled: deshabilita el toggle (opcional)
 */
const ToggleSwitch = ({ checked, onChange, disabled = false }) => {
  return (
    <label className="toggle-switch">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
      />
      <span className="toggle-slider"></span>
    </label>
  );
};

export default ToggleSwitch;
